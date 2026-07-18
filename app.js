// ---- Firebase ----
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ---- Мови ----
const LANGS = ['uk', 'ru', 'pl', 'en'];
const LANG_NAMES = { uk: 'UA', ru: 'RU', pl: 'PL', en: 'EN' };
const LOCALE_MAP = { uk: 'uk-UA', ru: 'ru-RU', pl: 'pl-PL', en: 'en-US' };

const T = {
  uk: {
    appTitle: 'Мої фінанси',
    authTitleLogin: 'Вхід', authTitleSignup: 'Реєстрація',
    authSub: 'Увійди, щоб дані синхронізувались між твоїми пристроями.',
    emailLabel: 'Email', passwordLabel: 'Пароль',
    loginBtn: 'Увійти', signupBtn: 'Зареєструватися', waitBtn: 'Зачекай…',
    switchToSignup: 'Ще немає акаунта?', switchToLogin: 'Вже є акаунт?',
    fillBoth: 'Заповни email і пароль',
    err_invalidEmail: 'Некоректний email', err_missingPassword: 'Введи пароль',
    err_weakPassword: 'Пароль надто короткий (мінімум 6 символів)',
    err_emailInUse: 'Цей email вже зареєстровано. Спробуй увійти',
    err_invalidCred: 'Невірний email або пароль', err_userNotFound: 'Акаунт з таким email не знайдено',
    err_tooMany: 'Забагато спроб. Спробуй трохи пізніше', err_generic: 'Щось пішло не так. Спробуй ще раз',
    rememberMe: 'Запам’ятати мене', forgotPassword: 'Забув(ла) пароль?',
    enterEmailFirst: 'Спочатку введи свій email',
    resetSent: 'Лист для відновлення паролю надіслано на {email}',
    err_resetFailed: 'Не вдалося надіслати лист. Перевір email і спробуй ще раз',
    balanceLabel: 'Загальний баланс', logout: 'Вийти',
    incomeMonthLabel: 'Дохід за місяць', expenseMonthLabel: 'Витрати за місяць',
    tabEntries: 'Записи', tabStats: 'Статистика', tabPages: 'Сторінки',
    prevMonthAria: 'Попередній місяць', nextMonthAria: 'Наступний місяць',
    newPageBtn: 'Нова сторінка', pageTitleLabel: 'Назва', pageContentLabel: 'Текст',
    pageTitlePlaceholder: 'Напр. Ідеї на відпустку', pageContentPlaceholder: 'Пиши тут що завгодно…',
    editPageTitle: 'Редагувати сторінку', newPageTitle: 'Нова сторінка',
    savePageBtn: 'Зберегти', deletePageBtn: 'Видалити',
    pageEmptyTitle: 'Ще немає сторінок', pageEmptySub: 'Створи першу кнопкою внизу',
    pageError: 'Введи назву сторінки', pageSaveError: 'Не вдалося зберегти. Перевір інтернет-з’єднання',
    confirmTitlePage: 'Видалити сторінку?',
    pageNoTitle: 'Без назви',
    emptyTitle: 'Тут поки порожньо', emptySub: 'Додай перший запис кнопкою внизу',
    deleteAria: 'Видалити запис',
    statsCatTitle: 'Витрати за категоріями', statsNoExpenses: 'Немає витрат цього місяця',
    statsTrendTitle: 'Дохід і витрати', statsTrendSub: 'Останні 6 місяців',
    chartIncome: 'Дохід', chartExpense: 'Витрати',
    fabExpense: 'Витрата', fabIncome: 'Дохід',
    newExpenseTitle: 'Нова витрата', newIncomeTitle: 'Новий дохід',
    amountLabel: 'Сума, {symbol}', catLabel: 'Категорія', dateLabel: 'Дата',
    noteLabel: 'Нотатка (необовʼязково)', notePlaceholder: 'Напр. кава з другом',
    saveBtn: 'Зберегти запис', amountError: 'Введи суму більшу за нуль',
    saveError: 'Не вдалося зберегти. Перевір інтернет-з’єднання',
    confirmTitle: 'Видалити запис?', confirmSub: 'Цю дію не можна скасувати.',
    cancelBtn: 'Скасувати', deleteBtn: 'Видалити',
    settingsTitle: 'Налаштування', langLabel: 'Мова', currencyLabel: 'Валюта',
  },
  ru: {
    appTitle: 'Мои финансы',
    authTitleLogin: 'Вход', authTitleSignup: 'Регистрация',
    authSub: 'Войди, чтобы данные синхронизировались между твоими устройствами.',
    emailLabel: 'Email', passwordLabel: 'Пароль',
    loginBtn: 'Войти', signupBtn: 'Зарегистрироваться', waitBtn: 'Подожди…',
    switchToSignup: 'Ещё нет аккаунта?', switchToLogin: 'Уже есть аккаунт?',
    fillBoth: 'Заполни email и пароль',
    err_invalidEmail: 'Некорректный email', err_missingPassword: 'Введи пароль',
    err_weakPassword: 'Пароль слишком короткий (минимум 6 символов)',
    err_emailInUse: 'Этот email уже зарегистрирован. Попробуй войти',
    err_invalidCred: 'Неверный email или пароль', err_userNotFound: 'Аккаунт с таким email не найден',
    err_tooMany: 'Слишком много попыток. Попробуй позже', err_generic: 'Что-то пошло не так. Попробуй ещё раз',
    rememberMe: 'Запомнить меня', forgotPassword: 'Забыл(а) пароль?',
    enterEmailFirst: 'Сначала введи свой email',
    resetSent: 'Письмо для восстановления пароля отправлено на {email}',
    err_resetFailed: 'Не удалось отправить письмо. Проверь email и попробуй ещё раз',
    balanceLabel: 'Общий баланс', logout: 'Выйти',
    incomeMonthLabel: 'Доход за месяц', expenseMonthLabel: 'Расходы за месяц',
    tabEntries: 'Записи', tabStats: 'Статистика', tabPages: 'Страницы',
    prevMonthAria: 'Предыдущий месяц', nextMonthAria: 'Следующий месяц',
    newPageBtn: 'Новая страница', pageTitleLabel: 'Название', pageContentLabel: 'Текст',
    pageTitlePlaceholder: 'Напр. Идеи на отпуск', pageContentPlaceholder: 'Пиши здесь что угодно…',
    editPageTitle: 'Редактировать страницу', newPageTitle: 'Новая страница',
    savePageBtn: 'Сохранить', deletePageBtn: 'Удалить',
    pageEmptyTitle: 'Пока нет страниц', pageEmptySub: 'Создай первую кнопкой внизу',
    pageError: 'Введи название страницы', pageSaveError: 'Не удалось сохранить. Проверь интернет-соединение',
    confirmTitlePage: 'Удалить страницу?',
    pageNoTitle: 'Без названия',
    emptyTitle: 'Здесь пока пусто', emptySub: 'Добавь первую запись кнопкой внизу',
    deleteAria: 'Удалить запись',
    statsCatTitle: 'Расходы по категориям', statsNoExpenses: 'Нет расходов в этом месяце',
    statsTrendTitle: 'Доход и расходы', statsTrendSub: 'Последние 6 месяцев',
    chartIncome: 'Доход', chartExpense: 'Расходы',
    fabExpense: 'Расход', fabIncome: 'Доход',
    newExpenseTitle: 'Новый расход', newIncomeTitle: 'Новый доход',
    amountLabel: 'Сумма, {symbol}', catLabel: 'Категория', dateLabel: 'Дата',
    noteLabel: 'Заметка (необязательно)', notePlaceholder: 'Напр. кофе с другом',
    saveBtn: 'Сохранить запись', amountError: 'Введи сумму больше нуля',
    saveError: 'Не удалось сохранить. Проверь интернет-соединение',
    confirmTitle: 'Удалить запись?', confirmSub: 'Это действие нельзя отменить.',
    cancelBtn: 'Отмена', deleteBtn: 'Удалить',
    settingsTitle: 'Настройки', langLabel: 'Язык', currencyLabel: 'Валюта',
  },
  pl: {
    appTitle: 'Moje finanse',
    authTitleLogin: 'Logowanie', authTitleSignup: 'Rejestracja',
    authSub: 'Zaloguj się, aby dane synchronizowały się między urządzeniami.',
    emailLabel: 'Email', passwordLabel: 'Hasło',
    loginBtn: 'Zaloguj się', signupBtn: 'Zarejestruj się', waitBtn: 'Czekaj…',
    switchToSignup: 'Nie masz konta?', switchToLogin: 'Masz już konto?',
    fillBoth: 'Wypełnij email i hasło',
    err_invalidEmail: 'Nieprawidłowy email', err_missingPassword: 'Wpisz hasło',
    err_weakPassword: 'Hasło za krótkie (min. 6 znaków)',
    err_emailInUse: 'Ten email już zarejestrowano. Spróbuj się zalogować',
    err_invalidCred: 'Nieprawidłowy email lub hasło', err_userNotFound: 'Nie znaleziono konta z tym emailem',
    err_tooMany: 'Zbyt wiele prób. Spróbuj później', err_generic: 'Coś poszło nie tak. Spróbuj ponownie',
    rememberMe: 'Zapamiętaj mnie', forgotPassword: 'Zapomniałeś(aś) hasła?',
    enterEmailFirst: 'Najpierw wpisz swój email',
    resetSent: 'Wysłano email do resetowania hasła na {email}',
    err_resetFailed: 'Nie udało się wysłać emaila. Sprawdź adres i spróbuj ponownie',
    balanceLabel: 'Saldo ogólne', logout: 'Wyloguj',
    incomeMonthLabel: 'Przychód w tym miesiącu', expenseMonthLabel: 'Wydatki w tym miesiącu',
    tabEntries: 'Wpisy', tabStats: 'Statystyki', tabPages: 'Strony',
    prevMonthAria: 'Poprzedni miesiąc', nextMonthAria: 'Następny miesiąc',
    newPageBtn: 'Nowa strona', pageTitleLabel: 'Tytuł', pageContentLabel: 'Treść',
    pageTitlePlaceholder: 'Np. Pomysły na wakacje', pageContentPlaceholder: 'Napisz tu cokolwiek…',
    editPageTitle: 'Edytuj stronę', newPageTitle: 'Nowa strona',
    savePageBtn: 'Zapisz', deletePageBtn: 'Usuń',
    pageEmptyTitle: 'Jeszcze brak stron', pageEmptySub: 'Utwórz pierwszą przyciskiem poniżej',
    pageError: 'Wpisz tytuł strony', pageSaveError: 'Nie udało się zapisać. Sprawdź połączenie z internetem',
    confirmTitlePage: 'Usunąć stronę?',
    pageNoTitle: 'Bez tytułu',
    emptyTitle: 'Tu jeszcze pusto', emptySub: 'Dodaj pierwszy wpis przyciskiem poniżej',
    deleteAria: 'Usuń wpis',
    statsCatTitle: 'Wydatki wg kategorii', statsNoExpenses: 'Brak wydatków w tym miesiącu',
    statsTrendTitle: 'Przychody i wydatki', statsTrendSub: 'Ostatnie 6 miesięcy',
    chartIncome: 'Przychód', chartExpense: 'Wydatki',
    fabExpense: 'Wydatek', fabIncome: 'Przychód',
    newExpenseTitle: 'Nowy wydatek', newIncomeTitle: 'Nowy przychód',
    amountLabel: 'Kwota, {symbol}', catLabel: 'Kategoria', dateLabel: 'Data',
    noteLabel: 'Notatka (opcjonalnie)', notePlaceholder: 'Np. kawa ze znajomym',
    saveBtn: 'Zapisz wpis', amountError: 'Wpisz kwotę większą od zera',
    saveError: 'Nie udało się zapisać. Sprawdź połączenie z internetem',
    confirmTitle: 'Usunąć wpis?', confirmSub: 'Tej czynności nie można cofnąć.',
    cancelBtn: 'Anuluj', deleteBtn: 'Usuń',
    settingsTitle: 'Ustawienia', langLabel: 'Język', currencyLabel: 'Waluta',
  },
  en: {
    appTitle: 'My Finances',
    authTitleLogin: 'Log in', authTitleSignup: 'Sign up',
    authSub: 'Log in so your data syncs across your devices.',
    emailLabel: 'Email', passwordLabel: 'Password',
    loginBtn: 'Log in', signupBtn: 'Sign up', waitBtn: 'Please wait…',
    switchToSignup: "Don't have an account?", switchToLogin: 'Already have an account?',
    fillBoth: 'Fill in email and password',
    err_invalidEmail: 'Invalid email', err_missingPassword: 'Enter a password',
    err_weakPassword: 'Password too short (min. 6 characters)',
    err_emailInUse: 'This email is already registered. Try logging in',
    err_invalidCred: 'Incorrect email or password', err_userNotFound: 'No account found with this email',
    err_tooMany: 'Too many attempts. Try again later', err_generic: 'Something went wrong. Try again',
    rememberMe: 'Remember me', forgotPassword: 'Forgot password?',
    enterEmailFirst: 'Enter your email first',
    resetSent: 'Password reset email sent to {email}',
    err_resetFailed: 'Could not send the email. Check the address and try again',
    balanceLabel: 'Total balance', logout: 'Log out',
    incomeMonthLabel: 'Income this month', expenseMonthLabel: 'Expenses this month',
    tabEntries: 'Entries', tabStats: 'Stats', tabPages: 'Pages',
    prevMonthAria: 'Previous month', nextMonthAria: 'Next month',
    newPageBtn: 'New page', pageTitleLabel: 'Title', pageContentLabel: 'Content',
    pageTitlePlaceholder: 'E.g. Vacation ideas', pageContentPlaceholder: 'Write anything here…',
    editPageTitle: 'Edit page', newPageTitle: 'New page',
    savePageBtn: 'Save', deletePageBtn: 'Delete',
    pageEmptyTitle: 'No pages yet', pageEmptySub: 'Create your first one with the button below',
    pageError: 'Enter a page title', pageSaveError: 'Could not save. Check your internet connection',
    confirmTitlePage: 'Delete page?',
    pageNoTitle: 'Untitled',
    emptyTitle: 'Nothing here yet', emptySub: 'Add your first entry using the button below',
    deleteAria: 'Delete entry',
    statsCatTitle: 'Expenses by category', statsNoExpenses: 'No expenses this month',
    statsTrendTitle: 'Income & expenses', statsTrendSub: 'Last 6 months',
    chartIncome: 'Income', chartExpense: 'Expenses',
    fabExpense: 'Expense', fabIncome: 'Income',
    newExpenseTitle: 'New expense', newIncomeTitle: 'New income',
    amountLabel: 'Amount, {symbol}', catLabel: 'Category', dateLabel: 'Date',
    noteLabel: 'Note (optional)', notePlaceholder: 'E.g. coffee with a friend',
    saveBtn: 'Save entry', amountError: 'Enter an amount greater than zero',
    saveError: 'Could not save. Check your internet connection',
    confirmTitle: 'Delete entry?', confirmSub: 'This action cannot be undone.',
    cancelBtn: 'Cancel', deleteBtn: 'Delete',
    settingsTitle: 'Settings', langLabel: 'Language', currencyLabel: 'Currency',
  },
};

function t(key, vars) {
  let s = (T[currentLang] && T[currentLang][key]) || T.uk[key] || key;
  if (vars) Object.keys(vars).forEach(k => { s = s.replace(`{${k}}`, vars[k]); });
  return s;
}

// ---- Категорії (зберігаються як ID, перекладаються для показу) ----
const EXPENSE_CATEGORY_IDS = ['food', 'transport', 'housing', 'fun', 'health', 'clothes', 'other'];
const INCOME_CATEGORY_IDS = ['salary', 'freelance', 'gift', 'other'];
const CAT_LABELS = {
  uk: { food: 'Їжа', transport: 'Транспорт', housing: 'Житло', fun: 'Розваги', health: 'Здоров\u2019я', clothes: 'Одяг', other: 'Інше', salary: 'Зарплата', freelance: 'Фріланс', gift: 'Подарунок' },
  ru: { food: 'Еда', transport: 'Транспорт', housing: 'Жильё', fun: 'Развлечения', health: 'Здоровье', clothes: 'Одежда', other: 'Другое', salary: 'Зарплата', freelance: 'Фриланс', gift: 'Подарок' },
  pl: { food: 'Jedzenie', transport: 'Transport', housing: 'Mieszkanie', fun: 'Rozrywka', health: 'Zdrowie', clothes: 'Ubrania', other: 'Inne', salary: 'Wypłata', freelance: 'Freelance', gift: 'Prezent' },
  en: { food: 'Food', transport: 'Transport', housing: 'Housing', fun: 'Fun', health: 'Health', clothes: 'Clothes', other: 'Other', salary: 'Salary', freelance: 'Freelance', gift: 'Gift' },
};
function catLabel(id) {
  return (CAT_LABELS[currentLang] && CAT_LABELS[currentLang][id]) || id;
}

const CATEGORY_PALETTE = [
  { text: '#3E7C59', bg: '#EAF5EF' },
  { text: '#3D6E9E', bg: '#EAF1F8' },
  { text: '#A8792B', bg: '#FBF3E7' },
  { text: '#B6584A', bg: '#FBEEEC' },
  { text: '#7A5C9E', bg: '#F3EFF8' },
  { text: '#4C7A83', bg: '#EAF3F4' },
  { text: '#8A6A45', bg: '#F6F0E9' },
  { text: '#5B7A9D', bg: '#EAF0F5' },
];
function catPair(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return CATEGORY_PALETTE[h % CATEGORY_PALETTE.length];
}
function catColor(id) { return catPair(id).text; }

// ---- Місяці ----
const MONTHS_NOM = {
  uk: ['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'],
  ru: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
  pl: ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'],
  en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
};
const MONTHS_GEN = {
  uk: ['січня','лютого','березня','квітня','травня','червня','липня','серпня','вересня','жовтня','листопада','грудня'],
  ru: ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
  pl: ['stycznia','lutego','marca','kwietnia','maja','czerwca','lipca','sierpnia','września','października','listopada','grudnia'],
  en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
};

// ---- Валюта ----
const CURRENCIES = {
  UAH: { symbol: '\u20B4', position: 'after' },
  USD: { symbol: '$', position: 'before' },
  EUR: { symbol: '\u20AC', position: 'after' },
  PLN: { symbol: 'zł', position: 'after' },
};
const CURRENCY_CODES = ['UAH', 'USD', 'EUR', 'PLN'];

// ---- Стан ----
let currentLang = (localStorage.getItem('financeAppLang')) || 'uk';
let currentCurrency = (localStorage.getItem('financeAppCurrency')) || 'UAH';
if (!LANGS.includes(currentLang)) currentLang = 'uk';
if (!CURRENCY_CODES.includes(currentCurrency)) currentCurrency = 'UAH';

let transactions = [];
let monthOffset = 0;
let currentTab = 'entries';
let formType = 'expense';
let selectedCategory = EXPENSE_CATEGORY_IDS[0];
let pendingDeleteId = null;
let pendingDeleteType = 'entry'; // 'entry' | 'page'
let pages = [];
let unsubscribePages = null;
let currentPageId = null; // page being edited, null = new page
let pieChart = null, barChart = null;
let unsubscribeSnapshot = null;
let unsubscribeProfile = null;
let authMode = 'login'; // 'login' | 'signup'

// ---- Утиліти ----
function formatMoney(n) {
  const sign = n < 0 ? '\u2212' : '';
  const cur = CURRENCIES[currentCurrency] || CURRENCIES.UAH;
  const num = Math.abs(n).toLocaleString(LOCALE_MAP[currentLang] || 'uk-UA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return cur.position === 'before' ? `${sign}${cur.symbol}${num}` : `${sign}${num} ${cur.symbol}`;
}
function todayISO() {
  const d = new Date();
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60000);
  return local.toISOString().slice(0, 10);
}
function escapeHtml(s) {
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

// ---- Переклад статичних елементів ----
function applyStaticTranslations() {
  document.getElementById('htmlRoot').setAttribute('lang', currentLang);
  document.title = t('appTitle');
  document.getElementById('authSub').textContent = t('authSub');
  document.getElementById('authEmailLabel').textContent = t('emailLabel');
  document.getElementById('authPasswordLabel').textContent = t('passwordLabel');
  document.getElementById('rememberMeLabel').textContent = t('rememberMe');
  document.getElementById('forgotPasswordLink').textContent = t('forgotPassword');
  setAuthMode(authMode);
  document.getElementById('balanceLabel').textContent = t('balanceLabel');
  document.getElementById('logoutBtn').textContent = t('logout');
  document.getElementById('incomeLabel').textContent = t('incomeMonthLabel');
  document.getElementById('expenseLabel').textContent = t('expenseMonthLabel');
  document.getElementById('tabEntries').textContent = t('tabEntries');
  document.getElementById('tabStats').textContent = t('tabStats');
  document.getElementById('tabPages').textContent = t('tabPages');
  document.getElementById('sidebarBrandLabel').textContent = t('appTitle');
  document.getElementById('fabNewPageLabel').textContent = t('newPageBtn');
  document.getElementById('pageTitleLabel').textContent = t('pageTitleLabel');
  document.getElementById('pageContentLabel').textContent = t('pageContentLabel');
  document.getElementById('pageTitleInput').placeholder = t('pageTitlePlaceholder');
  document.getElementById('pageContentInput').placeholder = t('pageContentPlaceholder');
  document.getElementById('savePageBtn').textContent = t('savePageBtn');
  document.getElementById('deletePageBtn').textContent = t('deletePageBtn');
  document.getElementById('prevMonth').setAttribute('aria-label', t('prevMonthAria'));
  document.getElementById('nextMonth').setAttribute('aria-label', t('nextMonthAria'));
  document.getElementById('statsCatTitle').textContent = t('statsCatTitle');
  document.getElementById('pieEmpty').textContent = t('statsNoExpenses');
  document.getElementById('statsTrendTitle').textContent = t('statsTrendTitle');
  document.getElementById('statsTrendSub').textContent = t('statsTrendSub');
  document.getElementById('fabExpLabel').textContent = t('fabExpense');
  document.getElementById('fabIncLabel').textContent = t('fabIncome');
  document.getElementById('catLabel').textContent = t('catLabel');
  document.getElementById('dateLabel').textContent = t('dateLabel');
  document.getElementById('noteLabel').textContent = t('noteLabel');
  document.getElementById('confirmTitle').textContent = t('confirmTitle');
  document.getElementById('confirmSub').textContent = t('confirmSub');
  document.getElementById('cancelDelete').textContent = t('cancelBtn');
  document.getElementById('confirmDelete').textContent = t('deleteBtn');
  document.getElementById('settingsTitle').textContent = t('settingsTitle');
  document.getElementById('settingsLangLabel').textContent = t('langLabel');
  document.getElementById('settingsCurrencyLabel').textContent = t('currencyLabel');
  const cur = CURRENCIES[currentCurrency] || CURRENCIES.UAH;
  document.getElementById('amountLabel').textContent = t('amountLabel', { symbol: cur.symbol });
  renderLangPicker();
  renderCurrencyPicker();
  renderAuthLangRow();
}

function renderAuthLangRow() {
  const row = document.getElementById('authLangRow');
  row.innerHTML = LANGS.map(l => `<button type="button" class="lang-chip${l === currentLang ? ' selected' : ''}" data-lang="${l}">${LANG_NAMES[l]}</button>`).join('');
  row.querySelectorAll('.lang-chip').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
}

function renderLangPicker() {
  const picker = document.getElementById('langPicker');
  picker.innerHTML = LANGS.map(l => `<button type="button" class="cat-choice${l === currentLang ? ' selected' : ''}"
    data-lang="${l}" style="${l === currentLang ? 'background:var(--accent);' : ''}">${LANG_NAMES[l]}</button>`).join('');
  picker.querySelectorAll('.cat-choice').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
}

function renderCurrencyPicker() {
  const picker = document.getElementById('currencyPicker');
  picker.innerHTML = CURRENCY_CODES.map(c => `<button type="button" class="cat-choice${c === currentCurrency ? ' selected' : ''}"
    data-cur="${c}" style="${c === currentCurrency ? 'background:var(--accent);' : ''}">${c} ${CURRENCIES[c].symbol}</button>`).join('');
  picker.querySelectorAll('.cat-choice').forEach(btn => {
    btn.addEventListener('click', () => setCurrency(btn.dataset.cur));
  });
}

function setLang(lang) {
  if (!LANGS.includes(lang)) return;
  currentLang = lang;
  localStorage.setItem('financeAppLang', lang);
  if (auth.currentUser) {
    db.collection('users').doc(auth.currentUser.uid).set({ lang }, { merge: true }).catch(() => {});
  }
  applyStaticTranslations();
  render();
}

function setCurrency(cur) {
  if (!CURRENCY_CODES.includes(cur)) return;
  currentCurrency = cur;
  localStorage.setItem('financeAppCurrency', cur);
  if (auth.currentUser) {
    db.collection('users').doc(auth.currentUser.uid).set({ currency: cur }, { merge: true }).catch(() => {});
  }
  applyStaticTranslations();
  render();
}

// ---- Автентифікація ----
function authErrorMessage(code) {
  const map = {
    'auth/invalid-email': t('err_invalidEmail'),
    'auth/missing-password': t('err_missingPassword'),
    'auth/weak-password': t('err_weakPassword'),
    'auth/email-already-in-use': t('err_emailInUse'),
    'auth/invalid-credential': t('err_invalidCred'),
    'auth/wrong-password': t('err_invalidCred'),
    'auth/user-not-found': t('err_userNotFound'),
    'auth/too-many-requests': t('err_tooMany'),
  };
  return map[code] || t('err_generic');
}

function setAuthMode(mode) {
  authMode = mode;
  document.getElementById('authTitle').textContent = mode === 'login' ? t('authTitleLogin') : t('authTitleSignup');
  document.getElementById('authSubmit').textContent = mode === 'login' ? t('loginBtn') : t('signupBtn');
  document.getElementById('authSwitch').innerHTML = mode === 'login'
    ? `${t('switchToSignup')} <a id="authToggle">${t('signupBtn')}</a>`
    : `${t('switchToLogin')} <a id="authToggle">${t('loginBtn')}</a>`;
  document.getElementById('authError').style.display = 'none';
  document.getElementById('authInfo').style.display = 'none';
  document.getElementById('authToggle').addEventListener('click', () => setAuthMode(mode === 'login' ? 'signup' : 'login'));
}

document.getElementById('authToggle').addEventListener('click', () => setAuthMode('signup'));

document.getElementById('authSubmit').addEventListener('click', async () => {
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value;
  const remember = document.getElementById('rememberMe').checked;
  const errEl = document.getElementById('authError');
  const infoEl = document.getElementById('authInfo');
  const btn = document.getElementById('authSubmit');
  errEl.style.display = 'none';
  infoEl.style.display = 'none';
  if (!email || !password) {
    errEl.textContent = t('fillBoth');
    errEl.style.display = 'block';
    return;
  }
  btn.disabled = true;
  btn.textContent = t('waitBtn');
  try {
    await auth.setPersistence(remember ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION);
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
    btn.textContent = authMode === 'login' ? t('loginBtn') : t('signupBtn');
  }
});

document.getElementById('forgotPasswordLink').addEventListener('click', async () => {
  const email = document.getElementById('authEmail').value.trim();
  const errEl = document.getElementById('authError');
  const infoEl = document.getElementById('authInfo');
  const link = document.getElementById('forgotPasswordLink');
  errEl.style.display = 'none';
  infoEl.style.display = 'none';
  if (!email) {
    errEl.textContent = t('enterEmailFirst');
    errEl.style.display = 'block';
    return;
  }
  link.style.pointerEvents = 'none';
  try {
    await auth.sendPasswordResetEmail(email);
    infoEl.textContent = t('resetSent', { email });
    infoEl.style.display = 'block';
  } catch (e) {
    errEl.textContent = e.code === 'auth/invalid-email' ? t('err_invalidEmail')
      : e.code === 'auth/user-not-found' ? t('err_userNotFound')
      : t('err_resetFailed');
    errEl.style.display = 'block';
  } finally {
    link.style.pointerEvents = '';
  }
});

document.getElementById('logoutBtn').addEventListener('click', () => auth.signOut());

auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('appScreen').style.display = 'block';
    subscribeToTransactions(user.uid);
    subscribeToProfile(user.uid);
    subscribeToPages(user.uid);
  } else {
    if (unsubscribeSnapshot) { unsubscribeSnapshot(); unsubscribeSnapshot = null; }
    if (unsubscribeProfile) { unsubscribeProfile(); unsubscribeProfile = null; }
    if (unsubscribePages) { unsubscribePages(); unsubscribePages = null; }
    transactions = [];
    pages = [];
    document.getElementById('appScreen').style.display = 'none';
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('authEmail').value = '';
    document.getElementById('authPassword').value = '';
    document.getElementById('authInfo').style.display = 'none';
    document.getElementById('rememberMe').checked = true;
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

function subscribeToProfile(uid) {
  if (unsubscribeProfile) unsubscribeProfile();
  unsubscribeProfile = db.collection('users').doc(uid).onSnapshot((doc) => {
    const data = doc.data();
    if (!data) return;
    let changed = false;
    if (data.lang && LANGS.includes(data.lang) && data.lang !== currentLang) { currentLang = data.lang; localStorage.setItem('financeAppLang', currentLang); changed = true; }
    if (data.currency && CURRENCY_CODES.includes(data.currency) && data.currency !== currentCurrency) { currentCurrency = data.currency; localStorage.setItem('financeAppCurrency', currentCurrency); changed = true; }
    if (changed) { applyStaticTranslations(); render(); }
  }, () => {});
}

function addTransactionRemote(tx) {
  const uid = auth.currentUser.uid;
  return db.collection('users').doc(uid).collection('transactions').add(tx);
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
  const nomMonths = MONTHS_NOM[currentLang] || MONTHS_NOM.uk;

  document.getElementById('monthLabel').textContent = `${nomMonths[tm]} ${ty}`;
  document.getElementById('statsMonthLabel').textContent = `${nomMonths[tm]} ${ty}`;
  document.getElementById('nextMonth').disabled = monthOffset === 0;

  const balance = transactions.reduce((s, tx) => s + (tx.type === 'income' ? tx.amount : -tx.amount), 0);
  const balEl = document.getElementById('balance');
  balEl.textContent = formatMoney(balance);
  balEl.className = 'balance' + (balance < 0 ? ' neg' : '');

  const monthTx = transactions.filter(tx => {
    const d = new Date(tx.date);
    return d.getFullYear() === ty && d.getMonth() === tm;
  }).sort((a, b) => b.date.localeCompare(a.date) || String(b.id).localeCompare(String(a.id)));

  const monthIncome = monthTx.filter(tx => tx.type === 'income').reduce((s, tx) => s + tx.amount, 0);
  const monthExpense = monthTx.filter(tx => tx.type === 'expense').reduce((s, tx) => s + tx.amount, 0);
  document.getElementById('monthIncome').textContent = formatMoney(monthIncome);
  document.getElementById('monthExpense').textContent = formatMoney(monthExpense);

  renderEntries(monthTx);
  if (currentTab === 'stats') renderStats(monthTx, ty, tm);
  if (currentTab === 'pages') renderPages();
}

function catDisplay(rawCat) {
  // rawCat may be an id (new data) or legacy Ukrainian text (old data)
  const label = catLabel(rawCat);
  return label === rawCat && !(CAT_LABELS.uk[rawCat]) ? rawCat : label;
}

function renderEntries(monthTx) {
  const container = document.getElementById('entriesTab');
  if (monthTx.length === 0) {
    container.innerHTML = `<div class="empty"><div class="title">${t('emptyTitle')}</div><div>${t('emptySub')}</div></div>`;
    return;
  }
  const genMonths = MONTHS_GEN[currentLang] || MONTHS_GEN.uk;
  const groups = {};
  monthTx.forEach(tx => { (groups[tx.date] = groups[tx.date] || []).push(tx); });
  const dates = Object.keys(groups).sort((a, b) => b.localeCompare(a));

  container.innerHTML = dates.map(d => {
    const dateObj = new Date(d);
    const dayLabel = `${dateObj.getDate()} ${genMonths[dateObj.getMonth()]}`;
    const items = groups[d].map(tx => `
      <div class="entry">
        <span class="cat-tag" style="color:${catPair(tx.category).text};background:${catPair(tx.category).bg};">${escapeHtml(catDisplay(tx.category))}</span>
        <div class="entry-note">${escapeHtml(tx.note || '')}</div>
        <div class="entry-amount ${tx.type === 'income' ? 'inc' : ''}">${tx.type === 'income' ? '+' : '\u2212'}${formatMoney(tx.amount).replace('\u2212', '')}</div>
        <button class="del-btn" data-id="${tx.id}" aria-label="${t('deleteAria')}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14Z"/></svg>
        </button>
      </div>`).join('');
    return `<div class="day-group"><div class="day-label">${dayLabel}</div><div class="day-card">${items}</div></div>`;
  }).join('');

  container.querySelectorAll('.del-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      pendingDeleteId = btn.dataset.id;
      pendingDeleteType = 'entry';
      document.getElementById('confirmTitle').textContent = t('confirmTitle');
      document.getElementById('confirmOverlay').classList.add('show');
    });
  });
}

function pageSnippet(text) {
  const clean = (text || '').replace(/\s+/g, ' ').trim();
  return clean.length > 90 ? clean.slice(0, 90) + '…' : clean;
}

function formatPageDate(ts) {
  if (!ts || !ts.toDate) return '';
  const d = ts.toDate();
  const genMonths = MONTHS_GEN[currentLang] || MONTHS_GEN.uk;
  return `${d.getDate()} ${genMonths[d.getMonth()]} ${d.getFullYear()}`;
}

function renderPages() {
  const container = document.getElementById('pagesTab');
  if (pages.length === 0) {
    container.innerHTML = `<div class="empty"><div class="title">${t('pageEmptyTitle')}</div><div>${t('pageEmptySub')}</div></div>`;
    return;
  }
  const sorted = [...pages].sort((a, b) => {
    const ta = a.updatedAt && a.updatedAt.toMillis ? a.updatedAt.toMillis() : 0;
    const tb = b.updatedAt && b.updatedAt.toMillis ? b.updatedAt.toMillis() : 0;
    return tb - ta;
  });
  container.innerHTML = sorted.map(p => `
    <div class="page-card" data-id="${p.id}">
      <div class="page-card-title">${escapeHtml(p.title || t('pageNoTitle'))}</div>
      ${p.content ? `<div class="page-card-preview">${escapeHtml(pageSnippet(p.content))}</div>` : ''}
      <div class="page-card-date">${formatPageDate(p.updatedAt)}</div>
    </div>`).join('');
  container.querySelectorAll('.page-card').forEach(card => {
    card.addEventListener('click', () => openPageEditor(card.dataset.id));
  });
}

function openPageEditor(id) {
  currentPageId = id || null;
  const page = id ? pages.find(p => p.id === id) : null;
  document.getElementById('pageModalTitle').textContent = page ? t('editPageTitle') : t('newPageTitle');
  document.getElementById('pageTitleInput').value = page ? (page.title || '') : '';
  document.getElementById('pageContentInput').value = page ? (page.content || '') : '';
  document.getElementById('pageError').style.display = 'none';
  document.getElementById('deletePageBtn').style.display = page ? 'block' : 'none';
  document.getElementById('pageOverlay').classList.add('show');
}

async function savePage() {
  const title = document.getElementById('pageTitleInput').value.trim();
  const content = document.getElementById('pageContentInput').value;
  const errEl = document.getElementById('pageError');
  errEl.style.display = 'none';
  if (!title) {
    errEl.textContent = t('pageError');
    errEl.style.display = 'block';
    return;
  }
  const btn = document.getElementById('savePageBtn');
  btn.disabled = true;
  const uid = auth.currentUser.uid;
  try {
    const now = firebase.firestore.FieldValue.serverTimestamp();
    if (currentPageId) {
      await db.collection('users').doc(uid).collection('pages').doc(currentPageId).update({ title, content, updatedAt: now });
    } else {
      await db.collection('users').doc(uid).collection('pages').add({ title, content, createdAt: now, updatedAt: now });
    }
    document.getElementById('pageOverlay').classList.remove('show');
  } catch (e) {
    errEl.textContent = t('pageSaveError');
    errEl.style.display = 'block';
  } finally {
    btn.disabled = false;
  }
}

function deletePageRemote(id) {
  const uid = auth.currentUser.uid;
  return db.collection('users').doc(uid).collection('pages').doc(id).delete();
}

function subscribeToPages(uid) {
  if (unsubscribePages) unsubscribePages();
  const col = db.collection('users').doc(uid).collection('pages');
  unsubscribePages = col.onSnapshot((snapshot) => {
    pages = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    if (currentTab === 'pages') renderPages();
  }, (err) => {
    console.error('Pages sync error', err);
  });
}

function renderStats(monthTx, ty, tm) {
  const map = {};
  monthTx.filter(tx => tx.type === 'expense').forEach(tx => { map[tx.category] = (map[tx.category] || 0) + tx.amount; });
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
    const ids = entries.map(e => e[0]);
    const labels = ids.map(catDisplay);
    const values = entries.map(e => e[1]);
    const colors = ids.map(catColor);
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
    document.getElementById('pieLegend').innerHTML = ids.map((id, i) => `
      <div class="legend-row">
        <span class="legend-dot" style="background:${catColor(id)}"></span>
        <span class="legend-name">${escapeHtml(catDisplay(id))}</span>
        <span class="legend-val">${formatMoney(entries[i][1])}</span>
      </div>`).join('');
  }

  const now = new Date();
  const nomMonths = MONTHS_NOM[currentLang] || MONTHS_NOM.uk;
  const labels = [], incomeData = [], expenseData = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const y = d.getFullYear(), m = d.getMonth();
    labels.push(nomMonths[m].slice(0, 3));
    incomeData.push(transactions.filter(tx => { const td = new Date(tx.date); return td.getFullYear() === y && td.getMonth() === m && tx.type === 'income'; }).reduce((s, tx) => s + tx.amount, 0));
    expenseData.push(transactions.filter(tx => { const td = new Date(tx.date); return td.getFullYear() === y && td.getMonth() === m && tx.type === 'expense'; }).reduce((s, tx) => s + tx.amount, 0));
  }
  const barCanvas = document.getElementById('barChart');
  if (barChart) barChart.destroy();
  barChart = new Chart(barCanvas, {
    type: 'bar',
    data: { labels, datasets: [
      { label: t('chartIncome'), data: incomeData, backgroundColor: '#7FA88F', borderRadius: 3 },
      { label: t('chartExpense'), data: expenseData, backgroundColor: '#C97B5A', borderRadius: 3 },
    ]},
    options: {
      maintainAspectRatio: false,
      plugins: { tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${formatMoney(ctx.raw)}` } } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 12 }, color: '#8A8478' } },
        y: { grid: { color: '#EDEAE3' }, ticks: { font: { family: 'Inter', size: 11 }, color: '#8A8478' } }
      }
    }
  });
}

// ---- Форма додавання ----
function openForm(type) {
  formType = type;
  selectedCategory = type === 'expense' ? EXPENSE_CATEGORY_IDS[0] : INCOME_CATEGORY_IDS[0];
  document.getElementById('modalTitle').textContent = type === 'income' ? t('newIncomeTitle') : t('newExpenseTitle');
  document.getElementById('modalTitle').style.color = type === 'income' ? '#7FA88F' : '#C97B5A';
  document.getElementById('submitBtn').style.background = type === 'income' ? '#7FA88F' : '#C97B5A';
  document.getElementById('submitBtn').textContent = t('saveBtn');
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
  const cats = formType === 'expense' ? EXPENSE_CATEGORY_IDS : INCOME_CATEGORY_IDS;
  const picker = document.getElementById('catPicker');
  picker.innerHTML = cats.map(id => `<button type="button" class="cat-choice${id === selectedCategory ? ' selected' : ''}"
    data-cat="${id}"
    style="${id === selectedCategory ? `background:${catColor(id)};` : ''}">${escapeHtml(catLabel(id))}</button>`).join('');
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
    errEl.textContent = t('amountError');
    errEl.style.display = 'block';
    return;
  }
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  const tx = {
    type: formType,
    amount: Math.round(num * 100) / 100,
    category: selectedCategory,
    note: document.getElementById('noteInput').value.trim(),
    date: document.getElementById('dateInput').value || todayISO(),
  };
  try {
    await addTransactionRemote(tx);
    document.getElementById('formOverlay').classList.remove('show');
  } catch (e) {
    errEl.textContent = t('saveError');
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
    document.getElementById('pagesTab').style.display = currentTab === 'pages' ? 'block' : 'none';
    document.getElementById('monthNav').style.display = currentTab === 'pages' ? 'none' : 'flex';
    document.getElementById('fabRow').style.display = currentTab === 'pages' ? 'none' : 'flex';
    document.getElementById('fabRowPages').style.display = currentTab === 'pages' ? 'flex' : 'none';
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
  const type = pendingDeleteType;
  pendingDeleteId = null;
  document.getElementById('confirmOverlay').classList.remove('show');
  try {
    if (type === 'page') {
      await deletePageRemote(id);
      document.getElementById('pageOverlay').classList.remove('show');
    } else {
      await deleteTransactionRemote(id);
    }
  } catch (e) { console.error(e); }
});
document.getElementById('settingsBtn').addEventListener('click', () => document.getElementById('settingsOverlay').classList.add('show'));
document.getElementById('closeSettings').addEventListener('click', () => document.getElementById('settingsOverlay').classList.remove('show'));
document.getElementById('settingsOverlay').addEventListener('click', (e) => { if (e.target.id === 'settingsOverlay') e.currentTarget.classList.remove('show'); });
document.getElementById('openNewPage').addEventListener('click', () => openPageEditor(null));
document.getElementById('closePage').addEventListener('click', () => document.getElementById('pageOverlay').classList.remove('show'));
document.getElementById('pageOverlay').addEventListener('click', (e) => { if (e.target.id === 'pageOverlay') e.currentTarget.classList.remove('show'); });
document.getElementById('savePageBtn').addEventListener('click', savePage);
document.getElementById('deletePageBtn').addEventListener('click', () => {
  if (!currentPageId) return;
  pendingDeleteId = currentPageId;
  pendingDeleteType = 'page';
  document.getElementById('confirmTitle').textContent = t('confirmTitlePage');
  document.getElementById('confirmOverlay').classList.add('show');
});

// ---- Старт ----
applyStaticTranslations();
