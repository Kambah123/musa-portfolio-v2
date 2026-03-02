/* 
  MUSA SULAIMAN — ROBUST GSAP ARCHITECTURE v2.1
  Optimized for Mobile Responsiveness & Interactivity
*/

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Initial Set
    gsap.set('.reveal-up', { y: 60, autoAlpha: 0 });
    gsap.set('nav', { y: -20, autoAlpha: 0 });

    const tl = gsap.timeline();

    // 1. Preloader Animation
    tl.to('.loader-bar', {
        width: '100%',
        duration: 1.5,
        ease: 'power4.inOut'
    })
        .to('.preloader', {
            autoAlpha: 0,
            yPercent: -100,
            duration: 0.8,
            ease: 'expo.inOut',
            onComplete: () => {
                document.querySelector('.preloader').style.display = 'none';
            }
        })
        // 2. Reveal Nav and Hero
        .to('nav', {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: 'power4.out'
        }, '-=0.2')
        .to('.hero .reveal-up', {
            y: 0,
            autoAlpha: 1,
            stagger: 0.1,
            duration: 1.2,
            ease: 'power4.out'
        }, '-=0.8');

    // 3. Reveal Other Sections on Scroll
    const scrolls = document.querySelectorAll('section:not(.hero) .reveal-up');
    scrolls.forEach(item => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 92%',
                toggleActions: 'play none none none'
            },
            y: 0,
            autoAlpha: 1,
            duration: 1.2,
            ease: 'power4.out'
        });
    });

    // 4. Mobile Menu Logic
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (toggle) {
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('menu-open');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('menu-open');
        });
    });

    // 5. Interactions - Disabled/Toned down on mobile
    const g1 = document.getElementById('glow-1');
    const g2 = document.getElementById('glow-2');
    const heroImg = document.getElementById('hero-img');
    const isMobile = window.innerWidth <= 1024;

    if (!isMobile) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const xP = (clientX / window.innerWidth - 0.5);
            const yP = (clientY / window.innerHeight - 0.5);

            gsap.to(g1, { x: clientX - 300, y: clientY - 300, duration: 2.5, ease: 'power3.out' });
            gsap.to(g2, { x: (window.innerWidth - clientX) - 300, y: (window.innerHeight - clientY) - 300, duration: 3.5, ease: 'power3.out' });

            if (heroImg) {
                gsap.to(heroImg, {
                    rotationY: xP * 15,
                    rotationX: -yP * 15,
                    transformPerspective: 1200,
                    duration: 1.5,
                    ease: 'power2.out'
                });
            }
        });
    }

    // 6. Smooth Scroll & Navbar Scroll Class
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            const h = link.getAttribute('href');
            if (h.startsWith('#')) {
                e.preventDefault();
                gsap.to(window, {
                    scrollTo: { y: h, offsetY: 80 },
                    duration: 1.5,
                    ease: 'expo.inOut'
                });
            }
        });
    });
});
