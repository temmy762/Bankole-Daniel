// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Main.js: DOM loaded');
    
    // Initialize AOS animations (skip if already initialized)
    if (typeof AOS !== 'undefined' && !window.aosInitialized) {
        try {
            AOS.init({
                duration: 1000,
                once: true,
                mirror: false
            });
            window.aosInitialized = true;
            console.log('✅ Main.js: AOS initialized');
        } catch (error) {
            console.error('Main.js: AOS initialization failed:', error);
        }
    }

    // Note: Preloader is now handled inline in HTML for reliability    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        console.log('✅ Mobile menu elements found');
        mobileMenuBtn.addEventListener('click', function() {
            if (mobileMenu.classList.contains('invisible')) {
                mobileMenu.classList.remove('invisible', '-translate-y-full', 'opacity-0');
                mobileMenu.classList.add('translate-y-0', 'opacity-100');
                mobileMenuBtn.innerHTML = '<i class="ri-close-line ri-lg"></i>';
            } else {
                mobileMenu.classList.add('invisible', '-translate-y-full', 'opacity-0');
                mobileMenu.classList.remove('translate-y-0', 'opacity-100');
                mobileMenuBtn.innerHTML = '<i class="ri-menu-line ri-lg"></i>';
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target) && !mobileMenu.classList.contains('invisible')) {
                mobileMenu.classList.add('invisible', '-translate-y-full', 'opacity-0');
                mobileMenu.classList.remove('translate-y-0', 'opacity-100');
                mobileMenuBtn.innerHTML = '<i class="ri-menu-line ri-lg"></i>';
            }
        });
    } else {
        console.log('⚠️ Mobile menu elements not found - skipping mobile menu functionality');
    }

    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        // Show/hide scroll to top button
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.remove('opacity-0', 'invisible');
                scrollToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                scrollToTopBtn.classList.add('opacity-0', 'invisible');
                scrollToTopBtn.classList.remove('opacity-100', 'visible');
            }
        });

        // Scroll to top when button is clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Portfolio Filter
    const filterBtns = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects with animation
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // GitHub Repositories - using your GitHub username temmy762
    const reposContainer = document.getElementById('githubRepos');
    if (reposContainer) {
        const username = 'temmy762';
        
        async function fetchGitHubRepos() {
            try {
                const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
                if (!response.ok) {
                    throw new Error('Failed to fetch repositories');
                }
                
                const repos = await response.json();
                
                reposContainer.innerHTML = '';
                repos.forEach(repo => {
                    const repoCard = document.createElement('div');
                    repoCard.className = 'bg-white rounded-lg shadow-md p-6 flex flex-col';
                    repoCard.setAttribute('data-aos', 'fade-up');
                    repoCard.setAttribute('data-aos-delay', '100');
                    
                    repoCard.innerHTML = `
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold text-secondary">${repo.name}</h3>
                            <a href="${repo.html_url}" target="_blank" class="text-primary hover:underline">
                                <i class="ri-github-fill text-xl"></i>
                            </a>
                        </div>
                        <p class="text-gray-700 mb-4 flex-grow">${repo.description || 'No description available'}</p>
                        <div class="flex items-center justify-between mt-4">
                            <div class="flex items-center space-x-4">
                                <span class="flex items-center text-gray-600 text-sm">
                                    <i class="ri-star-line mr-1"></i>
                                    ${repo.stargazers_count}
                                </span>
                                <span class="flex items-center text-gray-600 text-sm">
                                    <i class="ri-git-branch-line mr-1"></i>
                                    ${repo.forks_count}
                                </span>
                            </div>
                            <span class="text-sm text-gray-600">${repo.language || 'N/A'}</span>
                        </div>
                    `;
                    
                    reposContainer.appendChild(repoCard);
                });
                
                // Refresh AOS animations
                AOS.refresh();
            } catch (error) {
                console.error('Error fetching GitHub repositories:', error);
                reposContainer.innerHTML = `
                    <div class="col-span-full text-center py-8">
                        <i class="ri-error-warning-line text-4xl text-gray-400 mb-4"></i>
                        <p class="text-gray-600">Failed to load repositories. Please try again later.</p>
                    </div>
                `;
                // Add mock data for demonstration when GitHub API fails
                createMockRepos();
            }
        }

        // Mock repositories for fallback
        function createMockRepos() {
            const mockRepos = [
                {
                    name: 'wordpress-headless-cms',
                    description: 'A headless WordPress setup with React frontend for better performance and security.',
                    language: 'PHP',
                    stars: 42,
                    forks: 12
                },
                {
                    name: 'ai-chatbot-framework',
                    description: 'Open-source framework for building custom AI chatbots with natural language processing.',
                    language: 'Python',
                    stars: 78,
                    forks: 23
                },
                {
                    name: 'mern-ecommerce-template',
                    description: 'A ready-to-use e-commerce template built with the MERN stack (MongoDB, Express, React, Node.js).',
                    language: 'JavaScript',
                    stars: 56,
                    forks: 18
                },
                {
                    name: 'react-portfolio-starter',
                    description: 'A clean, modern portfolio template for developers built with React and Tailwind CSS.',
                    language: 'JavaScript',
                    stars: 34,
                    forks: 15
                },
                {
                    name: 'nextjs-blog-starter',
                    description: 'A simple, powerful blog starter template built with Next.js and MDX.',
                    language: 'TypeScript',
                    stars: 29,
                    forks: 8
                },
                {
                    name: 'tensorflow-image-classifier',
                    description: 'A customizable image classification model built with TensorFlow and Keras.',
                    language: 'Python',
                    stars: 45,
                    forks: 13
                }
            ];
            
            reposContainer.innerHTML = '';
            mockRepos.forEach(repo => {
                const repoCard = document.createElement('div');
                repoCard.className = 'bg-white rounded-lg shadow-md p-6 flex flex-col';
                repoCard.setAttribute('data-aos', 'fade-up');
                repoCard.setAttribute('data-aos-delay', '100');
                
                repoCard.innerHTML = `
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-secondary">${repo.name}</h3>
                        <a href="https://github.com/${username}/${repo.name}" target="_blank" class="text-primary hover:underline">
                            <i class="ri-github-fill text-xl"></i>
                        </a>
                    </div>
                    <p class="text-gray-700 mb-4 flex-grow">${repo.description}</p>
                    <div class="flex items-center justify-between mt-4">
                        <div class="flex items-center space-x-4">
                            <span class="flex items-center text-gray-600 text-sm">
                                <i class="ri-star-line mr-1"></i>
                                ${repo.stars}
                            </span>
                            <span class="flex items-center text-gray-600 text-sm">
                                <i class="ri-git-branch-line mr-1"></i>
                                ${repo.forks}
                            </span>
                        </div>
                        <span class="text-sm text-gray-600">${repo.language}</span>
                    </div>
                `;
                
                reposContainer.appendChild(repoCard);
            });
            
            // Refresh AOS animations
            AOS.refresh();
        }
        
        fetchGitHubRepos();
    }    // Animated Counters
    const counters = document.querySelectorAll('[data-target]');
    
    function startCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const speed = 200; // Animation speed
            let count = 0;
            
            const updateCount = () => {
                const increment = target / speed;
                
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            
            updateCount();
        });
    }

    // Start counters when they come into view
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const counterSection = document.querySelector('.counter-box');
    if (counterSection) {
        observer.observe(counterSection);
    }

    // Dark Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        // Check for saved theme preference or use device preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            document.documentElement.classList.add('dark');
        }
        
        // Update button state
        updateThemeToggleButton();
        
        // Toggle theme on button click
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            
            // Save preference
            if (document.documentElement.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
            
            updateThemeToggleButton();
        });
        
        function updateThemeToggleButton() {
            const isDark = document.documentElement.classList.contains('dark');
            const sunIcon = themeToggle.querySelector('.ri-sun-line');
            const moonIcon = themeToggle.querySelector('.ri-moon-line');
            
            if (isDark) {
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
            } else {
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            }
        }
    }

    // Floating Contact Button and Modal
    const floatingContactBtn = document.getElementById('floatingContactBtn');
    const contactFormModal = document.getElementById('contactFormModal');
    const closeContactModal = document.getElementById('closeContactModal');
    const quickContactForm = document.getElementById('quickContactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (floatingContactBtn && contactFormModal && closeContactModal) {
        floatingContactBtn.addEventListener('click', () => {
            contactFormModal.classList.remove('hidden');
            setTimeout(() => {
                contactFormModal.querySelector('.bg-white').classList.remove('scale-95', 'opacity-0');
                contactFormModal.querySelector('.bg-white').classList.add('scale-100', 'opacity-100');
            }, 10);
        });
        
        closeContactModal.addEventListener('click', closeModal);
        
        // Close modal when clicking outside
        contactFormModal.addEventListener('click', (e) => {
            if (e.target === contactFormModal) {
                closeModal();
            }
        });
        
        function closeModal() {
            contactFormModal.querySelector('.bg-white').classList.remove('scale-100', 'opacity-100');
            contactFormModal.querySelector('.bg-white').classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                contactFormModal.classList.add('hidden');
                formSuccess.classList.add('hidden');
                if (quickContactForm) quickContactForm.reset();
            }, 300);
        }
        
        // Form submission
        if (quickContactForm) {
            quickContactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Simulate form submission
                setTimeout(() => {
                    quickContactForm.style.display = 'none';
                    formSuccess.classList.remove('hidden');
                    
                    // Reset form after 3 seconds
                    setTimeout(() => {
                        closeModal();
                        quickContactForm.style.display = 'block';
                    }, 3000);
                }, 1000);
            });
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('invisible')) {
                    mobileMenu.classList.add('invisible', '-translate-y-full', 'opacity-0');
                    mobileMenu.classList.remove('translate-y-0', 'opacity-100');
                    mobileMenuBtn.innerHTML = '<i class="ri-menu-line ri-lg"></i>';
                }
            }
        });
    });

    // Navbar active link highlight
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
      window.addEventListener('scroll', highlightNavLink);

    // Testimonial Slider
    const testimonialWrapper = document.querySelector('.testimonial-wrapper');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    
    if (testimonialWrapper && testimonialDots.length > 0) {
        let currentSlide = 0;
        const totalSlides = testimonialDots.length;
        
        function showSlide(index) {
            const slideWidth = 100 / totalSlides;
            testimonialWrapper.style.transform = `translateX(-${index * slideWidth}%)`;
            
            // Update active dot
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            testimonialDots[index].classList.add('active');
        }
        
        // Add click handlers for dots
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Auto-scroll testimonials
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }, 5000);
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Typing effect for hero section
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const texts = ['WordPress Expert', 'Full Stack Developer', 'UI/UX Designer', 'Problem Solver'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
            
            const typeSpeed = isDeleting ? 50 : 100;
            setTimeout(typeEffect, typeSpeed);
        }
        
        typeEffect();
    }

    // Initialize particles.js if available
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#ffffff' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
});
