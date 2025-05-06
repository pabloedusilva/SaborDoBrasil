document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const openLoginBtn = document.getElementById('open-login');
    const openRegisterBtn = document.getElementById('open-register');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const exploreBtn = document.getElementById('explore-btn');
    const likeBtn = document.querySelector('.like-btn');
    const dislikeBtn = document.querySelector('.dislike-btn');
    const commentBtn = document.querySelector('.dish-comments .btn-secondary');
    const homeSection = document.getElementById('home');
    const profileSection = document.getElementById('profile');
    const profileLink = document.querySelector('.profile-link');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    // Mostrar página inicial por padrão
    homeSection.style.display = 'block';
    profileSection.style.display = 'none';

    // Navegação entre páginas
    navLinksAll.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');

            // Atualizar estado ativo dos links
            navLinksAll.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');

            // Alternar entre páginas
            if (target === '#home') {
                homeSection.style.display = 'block';
                profileSection.style.display = 'none';
            } else if (target === '#profile') {
                homeSection.style.display = 'none';
                profileSection.style.display = 'block';
            } else if (target === '#dishes') {
                homeSection.style.display = 'block';
                profileSection.style.display = 'none';
                document.querySelector('.featured-dish').scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // Fechar menu mobile se aberto
            navLinks.classList.remove('active');
        });
    });

    // Abrir Modal de Login
    if (openLoginBtn) {
        openLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    // Abrir Modal de Cadastro
    if (openRegisterBtn) {
        openRegisterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            registerModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    // Fechar Modais
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    // Alternar entre Login e Cadastro
    if (switchToRegister) {
        switchToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'none';
            registerModal.style.display = 'flex';
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerModal.style.display = 'none';
            loginModal.style.display = 'flex';
        });
    }

    // Fechar modal ao clicar fora
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Menu Hamburguer
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Rolagem suave para a seção de pratos
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            document.querySelector('.featured-dish').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Interação de Like/Dislike
    let liked = false;
    let disliked = false;
    const likesCount = document.querySelector('.likes');
    const dislikesCount = document.querySelector('.dislikes');

    if (likeBtn) {
        likeBtn.addEventListener('click', function() {
            if (!liked) {
                this.style.backgroundColor = 'var(--primary)';
                this.style.color = 'var(--white)';
                likesCount.textContent = `${parseInt(likesCount.textContent) + 1} `;

                if (disliked) {
                    dislikeBtn.style.backgroundColor = 'var(--white)';
                    dislikeBtn.style.color = 'var(--primary)';
                    dislikesCount.textContent = `${parseInt(dislikesCount.textContent) - 1} `;
                    disliked = false;
                }

                liked = true;
            } else {
                this.style.backgroundColor = 'var(--white)';
                this.style.color = 'var(--primary)';
                likesCount.textContent = `${parseInt(likesCount.textContent) - 1} `;
                liked = false;
            }
        });
    }

    if (dislikeBtn) {
        dislikeBtn.addEventListener('click', function() {
            if (!disliked) {
                this.style.backgroundColor = 'var(--red)';
                this.style.color = 'var(--white)';
                dislikesCount.textContent = `${parseInt(dislikesCount.textContent) + 1} `;

                if (liked) {
                    likeBtn.style.backgroundColor = 'var(--white)';
                    likeBtn.style.color = 'var(--primary)';
                    likesCount.textContent = `${parseInt(likesCount.textContent) - 1} `;
                    liked = false;
                }

                disliked = true;
            } else {
                this.style.backgroundColor = 'var(--white)';
                this.style.color = 'var(--primary)';
                dislikesCount.textContent = `${parseInt(dislikesCount.textContent) - 1} `;
                disliked = false;
            }
        });
    }

    // Adicionar comentário
    if (commentBtn) {
        commentBtn.addEventListener('click', function() {
            const commentTextarea = document.querySelector('.comment-form textarea');
            const commentText = commentTextarea.value.trim();

            if (commentText) {
                const commentsList = document.querySelector('.comments-list');
                const newComment = document.createElement('div');
                newComment.className = 'comment';
                newComment.innerHTML = `
                    <div class="comment-author">Você</div>
                    <div class="comment-text">${commentText}</div>
                `;

                commentsList.prepend(newComment);
                commentTextarea.value = '';

                // Animação para o novo comentário
                newComment.style.opacity = '0';
                newComment.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    newComment.style.transition = 'all 0.3s ease';
                    newComment.style.opacity = '1';
                    newComment.style.transform = 'translateY(0)';
                }, 10);
            }
        });
    }

    // Simular login (para demonstração)
    const loginForm = document.querySelector('#login-modal .auth-form');
    const registerForm = document.querySelector('#register-modal .auth-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login realizado com sucesso!');
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';

            // Atualizar link do perfil
            profileLink.innerHTML = '<i class="fas fa-user"></i>';
            profileLink.style.backgroundColor = 'var(--primary)';
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Cadastro realizado com sucesso! Agora você pode fazer login.');
            registerModal.style.display = 'none';
            loginModal.style.display = 'flex';
        });
    }
});