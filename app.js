// Імпорт необхідних функцій з Firebase SDK
// Примітка: переконайтеся, що версія CDN збігається з іншими вашими файлами (наприклад, 10.x.x)
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { app } from "./firebase-config.js"; // Перевірте правильність імпорту вашого ініціалізованого app

const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('rememberMe');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = emailInput.value;
            const password = passwordInput.value;

            // Визначаємо тип збереження сесії на основі чекбоксу:
            // browserLocalPersistence — користувач залишається авторизованим навіть після закриття браузера
            // browserSessionPersistence — сесія видаляється після закриття вкладки сайту
            const persistenceType = rememberMeCheckbox.checked 
                ? browserLocalPersistence 
                : browserSessionPersistence;

            try {
                // Спочатку встановлюємо тип збереження сесії (Persistence)
                await setPersistence(auth, persistenceType);
                
                // Після успішного встановлення виконуємо вхід
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log("Успішний вхід користувача:", userCredential.user);
                
                alert("Вхід виконано успішно!");
                // Перенаправлення користувача на головну сторінку вашого сайту після входу:
                // window.location.href = "dashboard.html"; 

            } catch (error) {
                console.error("Помилка авторизації:", error.code, error.message);
                
                // Зручне відображення помилок для користувача
                if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    alert("Неправильний email або пароль.");
                } else {
                    alert("Помилка входу: " + error.message);
                }
            }
        });
    }
});
