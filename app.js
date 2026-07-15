// ---- Firebase ----
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const EXPENSE_CATEGORIES = ['Їжа', 'Транспорт', 'Житло', 'Розваги', 'Здоров\u2019я', 'Одяг', 'Інше'];
const INCOME_CATEGORIES = ['Зарплата', 'Фріланс', 'Подарунок', 'Інше'];
const CATEGORY_PALETTE = ['#1F6F4A', '#3D6E9E', '#C9A227', '#A3402E', '#7A5C9E', '#4E7D3D', '#9E6B3D', '#3A8E8E'];
const MONTH_NAMES = ['січня','лютого','березня','квітня','травня','червня','липня','серпня','вересня','жовтня','листопада','грудня'];
const MONTH_NAMES_NOM = ['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'];

let transactions = [];
let monthOffset = 0;
let currentTab = 'entries';
let formType = 'expense';
let selectedCategory = EXPENSE_CATEGORIES[0];
let pendingDeleteId = null;
let pieChart = null, barChart = null;
let unsubscribeSnapshot = null;
let authMode = 'login'; // 'login' | 'signup'

// ---- Утиліти ----
function formatMoney(n) {
  const sign = n < 0 ? '\u2212' : '';
  return sign + Math.abs(n).toLocaleString('uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' \u20B4';
}
function todayISO() {
  const d = new Date();
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60000);
  return local.toISOString().slice(0, 10);
}
function catColor(cat) {
  let h = 0;
  for (let i = 0; i < cat.length; i++) h = (h * 31 + cat.charCodeAt(i)) >>> 0;
  return CATEGORY_PALETTE[h % CATEGORY_PALETTE.length];
}
function catRotation(cat) {
  let h = 0;
  for (let i = 0; i < cat.length; i++) h = (h * 17 + cat.charCodeAt(i)) >>> 0;
  const options = [-2, -1, 0, 1, 2];
  return options[h % options.length];
}
function escapeHtml(s) {
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

// ---- Автентифікація ----
function authErrorMessage(code) {
  const map = {
    'auth/invalid-email': 'Некоректний email',
    'auth/missing-password': 'Введи пароль',
    'auth/weak-password': 'Пароль надто короткий (мінімум 6 символів)',
    'auth/email-already-in-use': 'Цей email вже зареєстровано. Спробуй увійти',
    'auth/invalid-credential': 'Невірний email або пароль',
    'auth/wrong-password': 'Невірний email або пароль',
    'auth/user-not-found': 'Акаунт з таким email не знайдено',
    'auth/too-many-requests': 'Забагато спроб. Спробуй трохи пізніше',
  };
  return map[code] || 'Щось пішло не так. Спробуй ще раз';
}

function setAuthMode(mode) {
  authMode = mode;
  document.getElementById('authTitle').textContent = mode === 'login' ? 'Вхід' : 'Реєстрація';
  document.getElementById('authSubmit').textContent = mode === 'login' ? 'Увійти' : 'Зареєструватися';
  document.getElementById('authSwitch').innerHTML = mode === 'login'
    ? 'Ще немає акаунта? <a id="authToggle">Зареєструватися</a>'
    : 'Вже є акаунт? <a id="authToggle">Увійти</a>';
  document.getElementById('authError').style.display = 'none';
  document.getElementById('authToggle').addEventListener('click', () => setAuthMode(mode === 'login' ? 'signup' : 'login'));
}

document.getElementById('authToggle').addEventListener('click', () => setAuthMode('signup'));

document.getElementById('authSubmit').addEventListener('click', async () => {
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value;
  const errEl = document.getElementById('authError');
  const btn = document.getElementById('authSubmit');
  errEl.style.display = 'none';
  if (!email || !password) {
    errEl.textContent = 'Заповни email і пароль';
    errEl.style.display = 'block';
    return;
  }
  btn.disabled = true;
  btn.textContent = 'Зачекай…';
  try {
    if (authMode === 'login') {
      await auth.signInWithEmailAndPassword(email, password);
    } else {
      await auth.createUserWithEmailAndPassword(email, password);
    }
  } catch (e) {
    errEl.textContent = authErrorMessage(e.code);
    errEl.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.textContent = authMode === 'login' ? 'Увійти' : 'Зареєструватися';
  }
});

document.getElementById('logoutBtn').addEventListener('click', () => auth.signOut());

auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('appScreen').style.display = 'block';
    subscribeToTransactions(user.uid);
  } else {
    if (unsubscribeSnapshot) { unsubscribeSnapshot(); unsubscribeSnapshot = null; }
    transactions = [];
    document.getElementById('appScreen').style.display = 'none';
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('authEmail').value = '';
    document.getElementById('authPassword').value = '';
  }
});

// ---- Дані (Firestore, реалтайм-синхронізація) ----
function subscribeToTransactions(uid) {
  if (unsubscribeSnapshot) unsubscribeSnapshot();
  const col = db.collection('users').doc(uid).collection('transactions');
  unsubscribeSnapshot = col.onSnapshot((snapshot) => {
    transactions = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    render();
  }, (err) => {
    console.error('Sync error', err);
  });
}

function addTransactionRemote(t) {
  const uid = auth.currentUser.uid;
  return db.collection('users').doc(uid).collection('transactions').add(t);
}
function deleteTransactionRemote(id) {
  const uid = auth.currentUser.uid;
  return db.collection('users').doc(uid).collection('transactions').doc(id).delete();
}

// ---- Обчислення на основі поточного місяця ----
function getTargetDate() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
}

function render() {
  const target = getTargetDate();
  const ty = target.getFullYear(), tm = target.getMonth();

  document.getElementById('monthLabel').textContent = `${MONTH_NAMES_NOM[tm]} ${ty}`;
  document.getElementById('statsMonthLabel').textContent = `${MONTH_NAMES_NOM[tm]} ${ty}`;
  document.getElementById('nextMonth').disabled = monthOffset === 0;

  const balance = transactions.reduce((s, t) => s + (t.type === 'income' ? t.amount : -t.amount), 0);
  const balEl = document.getElementById('balance');
  balEl.textContent = formatMoney(balance);
  balEl.className = 'balance' + (balance < 0 ? ' neg' : '');

  const monthTx = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getFullYear() === ty && d.getMonth() === tm;
  }).sort((a, b) => b.date.localeCompare(a.date) || String(b.id).localeCompare(String(a.id)));

  const monthIncome = monthTx.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const monthExpense = monthTx.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  document.getElementById('monthIncome').textContent = formatMoney(monthIncome);
  document.getElementById('monthExpense').textContent = formatMoney(monthExpense);

  renderEntries(monthTx);
  if (currentTab === 'stats') renderStats(monthTx, ty, tm);
}

function renderEntries(monthTx) {
  const container = document.getElementById('entriesTab');
  if (monthTx.length === 0) {
    container.innerHTML = `<div class="empty"><div class="title">Тут поки порожньо</div><div>Додай перший запис кнопкою внизу</div></div>`;
    return;
  }
  const groups = {};
  monthTx.forEach(t => { (groups[t.date] = groups[t.date] || []).push(t); });
  const dates = Object.keys(groups).sort((a, b) => b.localeCompare(a));

  container.innerHTML = dates.map(d => {
    const dateObj = new Date(d);
    const dayLabel = `${dateObj.getDate()} ${MONTH_NAMES[dateObj.getMonth()]}`;
    const items = groups[d].map(t => `
      <div class="entry">
        <span class="cat-tag" style="border-color:${catColor(t.category)};color:${catColor(t.category)};transform:rotate(${catRotation(t.category)}deg);">${escapeHtml(t.category)}</span>
        <div class="entry-note">${escapeHtml(t.note || '')}</div>
        <div class="entry-amount ${t.type === 'income' ? 'inc' : ''}">${t.type === 'income' ? '+' : '\u2212'}${formatMoney(t.amount).replace('\u2212', '')}</div>
        <button class="del-btn" data-id="${t.id}" aria-label="Видалити запис">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14Z"/></svg>
        </button>
      </div>`).join('');
    return `<div class="day-group"><div class="day-label">${dayLabel}</div><div class="day-card">${items}</div></div>`;
  }).join('');

  container.querySelectorAll('.del-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      pendingDeleteId = btn.dataset.id;
      document.getElementById('confirmOverlay').classList.add('show');
    });
  });
}

function renderStats(monthTx, ty, tm) {
  const map = {};
  monthTx.filter(t => t.type === 'expense').forEach(t => { map[t.category] = (map[t.category] || 0) + t.amount; });
  const entries = Object.entries(map).sort((a, b) => b[1] - a[1]);

  const pieEmpty = document.getElementById('pieEmpty');
  const pieCanvas = document.getElementById('pieChart');
  if (entries.length === 0) {
    pieEmpty.style.display = 'block';
    pieCanvas.style.display = 'none';
    document.getElementById('pieLegend').innerHTML = '';
  } else {
    pieEmpty.style.display = 'none';
    pieCanvas.style.display = 'block';
    const labels = entries.map(e => e[0]);
    const values = entries.map(e => e[1]);
    const colors = labels.map(catColor);
    if (pieChart) pieChart.destroy();
    pieChart = new Chart(pieCanvas, {
      type: 'doughnut',
      data: { labels, datasets: [{ data: values, backgroundColor: colors, borderColor: '#FFFFFF', borderWidth: 2 }] },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${formatMoney(ctx.raw)}` } }
        }
      }
    });
    document.getElementById('pieLegend').innerHTML = entries.map(([name, value]) => `
      <div class="legend-row">
        <span class="legend-dot" style="background:${catColor(name)}"></span>
        <span class="legend-name">${escapeHtml(name)}</span>
        <span class="legend-val">${formatMoney(value)}</span>
      </div>`).join('');
  }

  const now = new Date();
  const labels = [], incomeData = [], expenseData = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const y = d.getFullYear(), m = d.getMonth();
    labels.push(MONTH_NAMES_NOM[m].slice(0, 3));
    incomeData.push(transactions.filter(t => { const td = new Date(t.date); return td.getFullYear() === y && td.getMonth() === m && t.type === 'income'; }).reduce((s, t) => s + t.amount, 0));
    expenseData.push(transactions.filter(t => { const td = new Date(t.date); return td.getFullYear() === y && td.getMonth() === m && t.type === 'expense'; }).reduce((s, t) => s + t.amount, 0));
  }
  const barCanvas = document.getElementById('barChart');
  if (barChart) barChart.destroy();
  barChart = new Chart(barCanvas, {
    type: 'bar',
    data: { labels, datasets: [
      { label: 'Дохід', data: incomeData, backgroundColor: '#1F6F4A', borderRadius: 3 },
      { label: 'Витрати', data: expenseData, backgroundColor: '#A3402E', borderRadius: 3 },
    ]},
    options: {
      maintainAspectRatio: false,
      plugins: { tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${formatMoney(ctx.raw)}` } } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { family: 'IBM Plex Sans', size: 12 }, color: '#7A857F' } },
        y: { grid: { color: '#DEDFD6' }, ticks: { font: { family: 'IBM Plex Mono', size: 11 }, color: '#7A857F' } }
      }
    }
  });
}

// ---- Форма додавання ----
function openForm(type) {
  formType = type;
  selectedCategory = type === 'expense' ? EXPENSE_CATEGORIES[0] : INCOME_CATEGORIES[0];
  document.getElementById('modalTitle').textContent = type === 'income' ? 'Новий дохід' : 'Нова витрата';
  document.getElementById('modalTitle').style.color = type === 'income' ? '#1F6F4A' : '#A3402E';
  document.getElementById('amountInput').value = '';
  document.getElementById('noteInput').value = '';
  document.getElementById('dateInput').value = todayISO();
  document.getElementById('dateInput').max = todayISO();
  document.getElementById('formError').style.display = 'none';
  renderCatPicker();
  document.getElementById('formOverlay').classList.add('show');
  setTimeout(() => document.getElementById('amountInput').focus(), 50);
}

function renderCatPicker() {
  const cats = formType === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
  const picker = document.getElementById('catPicker');
  picker.innerHTML = cats.map(c => `<button type="button" class="cat-choice${c === selectedCategory ? ' selected' : ''}"
    data-cat="${escapeHtml(c)}"
    style="${c === selectedCategory ? `background:${catColor(c)};border-color:${catColor(c)};` : ''}">${escapeHtml(c)}</button>`).join('');
  picker.querySelectorAll('.cat-choice').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedCategory = btn.dataset.cat;
      renderCatPicker();
    });
  });
}

async function submitForm() {
  const amountInput = document.getElementById('amountInput');
  const num = parseFloat(amountInput.value.replace(',', '.'));
  const errEl = document.getElementById('formError');
  if (!amountInput.value || isNaN(num) || num <= 0) {
    errEl.textContent = 'Введи суму більшу за нуль';
    errEl.style.display = 'block';
    return;
  }
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  const t = {
    type: formType,
    amount: Math.round(num * 100) / 100,
    category: selectedCategory,
    note: document.getElementById('noteInput').value.trim(),
    date: document.getElementById('dateInput').value || todayISO(),
  };
  try {
    await addTransactionRemote(t);
    document.getElementById('formOverlay').classList.remove('show');
  } catch (e) {
    errEl.textContent = 'Не вдалося зберегти. Перевір інтернет-з’єднання';
    errEl.style.display = 'block';
  } finally {
    submitBtn.disabled = false;
  }
}

// ---- Події ----
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTab = btn.dataset.tab;
    document.getElementById('entriesTab').style.display = currentTab === 'entries' ? 'block' : 'none';
    document.getElementById('statsTab').style.display = currentTab === 'stats' ? 'block' : 'none';
    render();
  });
});
document.getElementById('prevMonth').addEventListener('click', () => { monthOffset--; render(); });
document.getElementById('nextMonth').addEventListener('click', () => { if (monthOffset < 0) { monthOffset++; render(); } });
document.getElementById('openExpense').addEventListener('click', () => openForm('expense'));
document.getElementById('openIncome').addEventListener('click', () => openForm('income'));
document.getElementById('closeForm').addEventListener('click', () => document.getElementById('formOverlay').classList.remove('show'));
document.getElementById('formOverlay').addEventListener('click', (e) => { if (e.target.id === 'formOverlay') e.currentTarget.classList.remove('show'); });
document.getElementById('submitBtn').addEventListener('click', submitForm);
document.getElementById('cancelDelete').addEventListener('click', () => { pendingDeleteId = null; document.getElementById('confirmOverlay').classList.remove('show'); });
document.getElementById('confirmOverlay').addEventListener('click', (e) => { if (e.target.id === 'confirmOverlay') e.currentTarget.classList.remove('show'); });
document.getElementById('confirmDelete').addEventListener('click', async () => {
  const id = pendingDeleteId;
  pendingDeleteId = null;
  document.getElementById('confirmOverlay').classList.remove('show');
  try { await deleteTransactionRemote(id); } catch (e) { console.error(e); }
});
