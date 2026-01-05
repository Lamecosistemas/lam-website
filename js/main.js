/* ================================================
   LAM ECOSISTEMAS INMOBILIARIOS
   Main JavaScript
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initTestSection();
    initContactForm();
    initHeroCarousel();
});

/* -------------------- Hero Carousel Fade -------------------- */
function initHeroCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.hero-indicator');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    const intervalTime = 5000; // 5 segundos
    
    function goToSlide(index) {
        // Remove active from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        // Add active to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        goToSlide(next);
    }
    
    // Auto-advance slides
    let autoPlay = setInterval(nextSlide, intervalTime);
    
    // Click on indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(autoPlay);
            goToSlide(index);
            autoPlay = setInterval(nextSlide, intervalTime);
        });
    });
}

/* -------------------- Header Scroll Effect -------------------- */
function initHeader() {
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/* -------------------- Mobile Menu -------------------- */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = menuToggle.querySelectorAll('span');
            if (menuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                menuToggle.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

/* -------------------- Smooth Scroll -------------------- */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/* -------------------- Scroll Reveal Animation -------------------- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.section-title, .section-title-line, .differentiator-card, .project-card, .proyecto-card, .servicio-card, .blog-card, .servicio-detalle-imagenes .img-container, .proyectos-hero-content');
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load
}

/* -------------------- Test Section Functionality -------------------- */
function initTestSection() {
    const testOptions = document.querySelectorAll('.test-option');
    const progressSteps = document.querySelectorAll('.progress-step');
    
    // Test data structure
    const testQuestions = [
        {
            question: '¿CUAL ES TU PERFIL?',
            description: 'Esto nos ayudará a entender mejor tus necesidades y experiencia en el sector',
            options: [
                { value: 'constructor', label: 'Constructor independiente' },
                { value: 'entusiasta', label: 'Entusiasta de la Construcción' },
                { value: 'inversionista', label: 'Inversionista inmobiliario' },
                { value: 'propietario', label: 'Propietario de terreno' }
            ]
        },
        {
            question: '¿EN QUE ETAPA ESTA TU PROYECTO?',
            description: 'Identifiquemos el punto de partida de tu desarrollo inmobiliario',
            options: [
                { value: 'necesito-predio', label: 'Necesito predio para desarrollar mi proyecto' },
                { value: 'tengo-predio', label: 'Tengo el predio pero necesito saber que puedo hacer en él rapidamente' },
                { value: 'tengo-estructura', label: 'Ya tengo la estructura de mi proyecto pero necesito profundizar en lo técnico' },
                { value: 'listo', label: 'Estoy listo para construir, solo necesito diseños y licencias' }
            ]
        },
        {
            question: '¿CUAL ES TU PRINCIPAL PREOCUPACIÓN?',
            description: 'Enfoquemonos en resolver tu principal inquietud',
            options: [
                { value: 'riesgos', label: 'Identificar y minimizar riesgos futuros' },
                { value: 'aprovechamiento', label: 'Lograr el aprovechamiento mas eficiente del proyecto' },
                { value: 'viabilidad', label: 'Revisar la viabilidad del proyecto' },
                { value: 'disenos', label: 'Diseños técnicos confiables y licenciamiento ágil' }
            ]
        }
    ];
    
    let currentStep = 0;
    let answers = [];
    
    testOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            testOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected to clicked option
            this.classList.add('selected');
            
            // Store answer
            answers[currentStep] = this.dataset.value;
            
            // Wait a moment then proceed to next step
            setTimeout(() => {
                if (currentStep < testQuestions.length - 1) {
                    currentStep++;
                    updateTestUI();
                } else {
                    showTestResult();
                }
            }, 500);
        });
    });
    
    function updateTestUI() {
        const question = testQuestions[currentStep];
        const questionTitle = document.querySelector('.test-question h2');
        const questionDesc = document.querySelector('.test-question p');
        const optionsContainer = document.querySelector('.test-options');
        
        if (questionTitle && questionDesc && optionsContainer) {
            questionTitle.textContent = question.question;
            questionDesc.textContent = question.description;
            
            optionsContainer.innerHTML = question.options.map(opt => 
                `<button class="test-option" data-value="${opt.value}">${opt.label}</button>`
            ).join('');
            
            // Update progress
            progressSteps.forEach((step, index) => {
                if (index < currentStep) {
                    step.classList.remove('active');
                    step.classList.add('completed');
                } else if (index === currentStep) {
                    step.classList.add('active');
                    step.classList.remove('completed');
                } else {
                    step.classList.remove('active', 'completed');
                }
            });
            
            // Reinitialize event listeners
            const newOptions = document.querySelectorAll('.test-option');
            newOptions.forEach(option => {
                option.addEventListener('click', function() {
                    newOptions.forEach(opt => opt.classList.remove('selected'));
                    this.classList.add('selected');
                    answers[currentStep] = this.dataset.value;
                    
                    setTimeout(() => {
                        if (currentStep < testQuestions.length - 1) {
                            currentStep++;
                            updateTestUI();
                        } else {
                            showTestResult();
                        }
                    }, 500);
                });
            });
        }
    }
    
    function showTestResult() {
        // Determine recommendation based on answers
        let recommendation = 'ESTRUCTURACIÓN PRELIMINAR';
        let description = 'Este servicio es ideal para ti porque estás comenzando y necesitas validar la viabilidad de tu proyecto antes de invertir más recursos.';
        
        if (answers.includes('listo') || answers.includes('disenos')) {
            recommendation = 'DISEÑOS Y LICENCIAMIENTO';
            description = 'Ya tienes tu proyecto estructurado, ahora necesitas los diseños técnicos y las licencias para poder construir.';
        } else if (answers.includes('tengo-estructura') || answers.includes('aprovechamiento')) {
            recommendation = 'ESTRUCTURACIÓN AVANZADA';
            description = 'Tu proyecto ya tiene una base sólida, ahora necesitas profundizar en los análisis para maximizar su potencial.';
        }
        
        const testContent = document.querySelector('.test-content');
        if (testContent) {
            testContent.innerHTML = `
                <div class="test-question">
                    <h2>RECOMENDACIÓN PERSONALIZADA</h2>
                    <p>Este puede ser el servicio ideal para tu proyecto o necesidad.</p>
                    <div class="test-progress">
                        <div class="progress-step completed">1</div>
                        <div class="progress-line"></div>
                        <div class="progress-step completed">2</div>
                        <div class="progress-line"></div>
                        <div class="progress-step completed">3</div>
                        <div class="progress-line"></div>
                        <div class="progress-step active check">✓</div>
                    </div>
                </div>
                <div class="test-result">
                    <div class="result-card">
                        <h3>${recommendation}</h3>
                        <p>${description}</p>
                        <a href="#servicios" class="btn btn-primary">Ver este servicio</a>
                        <button class="btn btn-secondary" onclick="location.reload()">Volver a responder el Test</button>
                    </div>
                </div>
            `;
        }
    }
}

/* -------------------- Contact Form -------------------- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('¡Gracias por contactarnos! Te responderemos pronto.');
            form.reset();
        });
    }
}

/* -------------------- Team Section Tabs -------------------- */
document.addEventListener('DOMContentLoaded', function() {
    const teamPositions = document.querySelectorAll('.team-positions li');
    
    teamPositions.forEach(position => {
        position.addEventListener('click', function() {
            // Remove active class from all
            teamPositions.forEach(p => p.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');
            
            // Here you would update the team member card content
            // For now, we'll just show the visual change
        });
    });
});

/* -------------------- Active Nav Link on Scroll -------------------- */
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
});

/* -------------------- Newsletter Form -------------------- */
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would send to your newsletter service
            console.log('Newsletter subscription:', email);
            alert('¡Gracias por suscribirte a nuestro newsletter!');
            this.reset();
        });
    }
});
