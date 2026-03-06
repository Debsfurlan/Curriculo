// script.js - funcionalidades: menu mobile, scroll reveal, animação de barras, validação de formulário, rolagem suave

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ------------------------------
    // 1. MENU RESPONSIVO (mobile)
    // ------------------------------
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // animação do ícone (opcional)
            const bars = mobileBtn.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('change'));
        });
    }

    // fechar menu ao clicar em link (para mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // ------------------------------
    // 2. ROLAGEM SUAVE ENTRE SEÇÕES (reforço, pois scroll-behavior já existe)
    // ------------------------------
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault(); // se quiser usar o smooth nativo apenas, pode remover. Mas garantimos:
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // ------------------------------
    // 3. SCROLL REVEAL (animação ao rolar)
    // ------------------------------
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // se for skill progress, dispara animação
                if (entry.target.classList.contains('skill-item') || entry.target.querySelector('.progress')) {
                    animateProgressBars();
                }
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -20px 0px' });
    
    revealElements.forEach(el => revealObserver.observe(el));

    // ------------------------------
    // 4. ANIMAÇÃO DAS BARRAS DE PROGRESSO (habilidades)
    // ------------------------------
    function animateProgressBars() {
        const progresses = document.querySelectorAll('.progress');
        progresses.forEach(progress => {
            // se já foi preenchido, não repetir
            if (progress.style.width !== '' && progress.style.width !== '0%' && progress.style.width !== '0px') return;
            const percent = progress.getAttribute('data-percent') || '70';
            progress.style.width = percent + '%';
        });
    }
    // chama uma vez no início caso já esteja visível (ex: se a seção estiver no topo)
    setTimeout(() => {
        animateProgressBars();
    }, 300);

    // ------------------------------
    // 5. VALIDAÇÃO DO FORMULÁRIO (simples, com feedback)
    // ------------------------------
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nome = document.getElementById('nome')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const mensagem = document.getElementById('mensagem')?.value.trim();
            const feedback = document.getElementById('form-feedback');
            
            // validações básicas
            if (!nome || !email || !mensagem) {
                feedback.textContent = '❌ Todos os campos são obrigatórios.';
                feedback.classList.add('error');
                return;
            }
            if (!email.includes('@') || !email.includes('.')) {
                feedback.textContent = '❌ Por favor, insira um e-mail válido.';
                feedback.classList.add('error');
                return;
            }
            // sucesso
            feedback.textContent = '✅ Mensagem enviada com sucesso (simulação). Obrigada!';
            feedback.classList.remove('error');
            contactForm.reset();

            // esconder feedback após 4 segundos
            setTimeout(() => {
                feedback.textContent = '';
            }, 4000);
        });
    }

    // ------------------------------
    // 6. AJUSTE DO HEADER FIXO PARA NÃO SOBREPOR CONTEÚDO (opcional)
    // ------------------------------
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const navbarHeight = navbar.offsetHeight;
        document.documentElement.style.scrollPaddingTop = navbarHeight + 'px';
    }

    // ------------------------------
    // 7. EFEITOS HOVER NOS CARDS (já tem no CSS, mas garantimos interação)
    // ------------------------------
    // (nada necessário, apenas garantia de classe)
    
    // Ativar reveal para elementos já visíveis no load
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('active');
            if (el.querySelector('.progress')) animateProgressBars();
        }
    });
});