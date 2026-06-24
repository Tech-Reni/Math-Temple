/**
 * MathTemple — Interactive Controller Layer
 * Production Grade Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. STICKY GLASSMORPHIC NAVBAR EFFECT
    // ==========================================
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);

    // ==========================================
    // 2. MOBILE DRAWER NAVIGATION MENU
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const closeToggle = document.getElementById('close-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');

    const openDrawer = () => {
        mobileDrawer.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
    };

    const closeDrawer = () => {
        mobileDrawer.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
    };

    mobileToggle.addEventListener('click', openDrawer);
    closeToggle.addEventListener('click', closeDrawer);

    // Close drawer when a link is clicked
    const drawerLinks = document.querySelectorAll('.drawer-link');
    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // ==========================================
    // 3. CURRICULUM TAB INTERACTION MAP
    // ==========================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Update active states of tab buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Transition panels smoothly
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetTab) {
                    panel.classList.add('active');
                }
            });
        });
    });

    // ==========================================
    // 4. ACCORDION FAQ LOGIC
    // ==========================================
    const faqTriggers = document.querySelectorAll('.faq-trigger');

    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const parent = trigger.parentElement;
            const content = trigger.nextElementSibling;
            const isActive = parent.classList.contains('active');

            // Reset all other open accordions
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-content').style.maxHeight = null;
            });

            // Toggle current accordion selection
            if (!isActive) {
                parent.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // ==========================================
    // 5. SCROLL TRIGGERED NUMERICAL COUNTERS
    // ==========================================
    const counters = document.querySelectorAll('.counter-num');
    const countersSection = document.getElementById('counters-section');

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                // Speed settings matching target numbers
                const increment = target / 40;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 25);
                } else {
                    // Append plus/percentage formats cleanly
                    if (target === 15 || target === 300 || target === 1000) {
                        counter.innerText = target + '+';
                    } else {
                        counter.innerText = target + '%';
                    }
                }
            };
            updateCount();
        });
    };

    // Intersection Observer to run numbers animation once visible
    let countTriggered = false;
    const observerOptions = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countTriggered) {
                startCounters();
                countTriggered = true; // Block recurrent executions
            }
        });
    }, observerOptions);

    if (countersSection) {
        observer.observe(countersSection);
    }
});