
// Efeito de digitação
class Typewriter {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = texts;
        this.speed = options.speed || 100;
        this.delay = options.delay || 2000;
        this.loop = options.loop !== false;
        this.index = 0;
        this.isDeleting = false;
        this.text = '';
        this.animate();
    }

    animate() {
        const currentText = this.texts[this.index];
        const delta = this.isDeleting ? -1 : 1;

        this.text = currentText.substring(0, this.text.length + delta);
        this.element.textContent = this.text;

        if (!this.isDeleting && this.text === currentText) {
            setTimeout(() => this.isDeleting = true, this.delay);
        } else if (this.isDeleting && this.text === '') {
            this.isDeleting = false;
            this.index = (this.index + 1) % this.texts.length;
        }

        setTimeout(() => this.animate(), this.speed);
    }
}

// Dark Mode
class DarkMode {
    constructor() {
        this.toggle = document.getElementById('themeToggle');
        this.icon = this.toggle.querySelector('i');
        this.init();
    }

    init() {
        this.loadTheme();
        this.toggle.addEventListener('click', () => this.toggleTheme());
        window.matchMedia('(prefers-color-scheme: dark)')
            .addListener(e => this.systemThemeChange(e.matches));
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
            this.enableDarkMode();
        }
    }

    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');

        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        this.icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }

    systemThemeChange(isDark) {
        if (!localStorage.getItem('theme')) {
            isDark ? this.enableDarkMode() : this.disableDarkMode();
        }
    }

    enableDarkMode() {
        document.body.classList.add('dark-mode');
        this.icon.className = 'fas fa-sun';
    }

    disableDarkMode() {
        document.body.classList.remove('dark-mode');
        this.icon.className = 'fas fa-moon';
    }
}

// Cursor Personalizado
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.custom-cursor');
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => this.moveCursor(e));
        this.addHoverEffects();
    }

    moveCursor(e) {
        this.cursor.style.left = `${e.clientX}px`;
        this.cursor.style.top = `${e.clientY}px`;
    }

    addHoverEffects() {
        const hoverElements = document.querySelectorAll('a, button, .hover-effect');

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
            });

            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
            });
        });
    }
}

// Projetos
class Projects {
    constructor() {
        this.container = document.getElementById('projectsContainer');
        this.projects = [
            {
                title: "Sistema de Gestão Web",
                tags: ["php", "mysql", "javascript"],
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                link: "#"
            },
            {
                title: "Portal Corporativo",
                tags: ["php", "javascript", "bootstrap"],
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                link: "#"
            },
            {
                title: "Aplicativo de Suporte Técnico",
                tags: ["javascript", "node", "react"],
                image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                link: "#"
            },
            {
                title: "Sistema de Inventário de TI",
                tags: ["php", "mysql", "api"],
                image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                link: "#"
            }
        ];

        this.renderProjects();
    }

    renderProjects() {
        this.container.innerHTML = this.projects.map(project => `
            <div class="project-card">
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-overlay">
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <a href="${project.link}" class="btn btn-outline">
                        <i class="fas fa-eye"></i> Ver Projeto
                    </a>
                </div>
            </div>
        `).join('');
    }
}

// Habilidades - Animar barras
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = `${width}%`;
    });
}

// Notificações
function showNotification(message, type = 'success') {
    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.transform = 'translateY(0)';
        notif.style.opacity = '1';
    }, 100);

    setTimeout(() => {
        notif.style.transform = 'translateY(100px)';
        notif.style.opacity = '0';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// Formulário
function setupForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Mensagem enviada com sucesso!', 'success');
        form.reset();
    });
}

// Scroll animations
function setupScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
}

// Ativar links do menu conforme scroll
function setupNavHighlight() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Header scroll effect
function setupHeaderEffect() {
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// Partículas no background
function setupParticles() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#3a86ff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#3a86ff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" }
            }
        }
    });
}

// Animação da foto de perfil
function animateProfile() {
    const heroSection = document.querySelector('.hero');
    setTimeout(() => {
        heroSection.classList.add('show-profile');
    }, 500);
}

// Carregar imagem de perfil com fallback
function loadProfileImage() {
    const profileImg = document.querySelector('.hero-profile');
    profileImg.onerror = function () {
        this.src = 'https://via.placeholder.com/400x400?text=Foto+Perfil';
    };
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    new Typewriter(
        document.getElementById('typewriter'),
        ["Desenvolvedor Full Stack", "Especialista em PHP/MySQL", "Técnico em Infraestrutura"],
        { speed: 100, delay: 1500 }
    );

    new DarkMode();
    new CustomCursor();
    new Projects();

    animateSkillBars();
    setupForm();
    setupScrollAnimations();
    setupNavHighlight();
    setupHeaderEffect();
    setupParticles();
    animateProfile();
    loadProfileImage();

    // Ano atual
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});
