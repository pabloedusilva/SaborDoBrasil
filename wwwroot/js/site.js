// Modal Login e Register

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    const toRegister = document.getElementById('to-register');
    const toLogin = document.getElementById('to-login');
    const modalTitle = document.getElementById('exampleModalLabel');

    switchToRegister.addEventListener('click', function (e) {
        e.preventDefault();
        loginForm.style.display = 'none';
        toRegister.style.display = 'none';
        registerForm.style.display = 'block';
        toLogin.style.display = 'block';
        modalTitle.textContent = 'Cadastro';
    });

    switchToLogin.addEventListener('click', function (e) {
        e.preventDefault();
        loginForm.style.display = 'block';
        toRegister.style.display = 'block';
        registerForm.style.display = 'none';
        toLogin.style.display = 'none';
        modalTitle.textContent = 'Login';
    });
});