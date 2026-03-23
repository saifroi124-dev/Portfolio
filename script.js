/* ========================================
   MELVATECH - Portfolio Script
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ---- Mobile Navigation Toggle ---- */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav__link');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    /* ---- Header Scroll Effect ---- */
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for background change
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    /* ---- Active Navigation Highlight ---- */
    const sections = document.querySelectorAll('section[id]');

    function highlightNav() {
        const scrollY = window.pageYOffset + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (navLink && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav__link').forEach(l => l.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNav);

    /* ---- Counter Animation ---- */
    function animateCounters() {
        const counters = document.querySelectorAll('.stat__number');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const easeOut = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.floor(target * easeOut);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    /* ---- Scroll Animations (Intersection Observer) ---- */
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    let countersAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);

                // Trigger counter animation when stats come into view
                if (entry.target.closest('.hero__stats') && !countersAnimated) {
                    countersAnimated = true;
                    animateCounters();
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    /* ---- Portfolio Filter ---- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                    item.classList.add('hidden');
                }
            });
        });
    });

    /* ---- Smooth Scroll for Anchor Links ---- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ---- Back to Top Button ---- */
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ---- Parallax subtle effect on hero ---- */
    const heroImage = document.querySelector('.hero__image-wrapper');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < 800) {
                heroImage.style.transform = `translateY(${scrolled * 0.05}px)`;
            }
        });
    }

});
