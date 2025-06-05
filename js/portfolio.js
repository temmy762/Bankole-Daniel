// Portfolio JavaScript Functionality
class PortfolioManager {
    constructor() {
        this.projects = [];
        this.filteredProjects = [];
        this.currentFilter = 'all';
        this.currentPage = 1;
        this.projectsPerPage = 9;
        this.isLoading = false;
        this.currentView = 'grid';
        this.currentSort = 'date';
        this.searchQuery = '';
          this.init();
    }    init() {
        this.loadProjects();
        this.setupEventListeners();
        this.setupAnimations();
        this.setupAdminDataSync();
        this.setupMobileMenu();
    }

    // Setup mobile menu functionality
    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                const isOpen = mobileMenu.classList.contains('opacity-100');
                
                if (isOpen) {
                    // Close menu
                    mobileMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
                    mobileMenu.classList.add('opacity-0', 'invisible', '-translate-y-full');
                    mobileMenuBtn.querySelector('i').className = 'ri-menu-line ri-lg';
                } else {
                    // Open menu
                    mobileMenu.classList.remove('opacity-0', 'invisible', '-translate-y-full');
                    mobileMenu.classList.add('opacity-100', 'visible', 'translate-y-0');
                    mobileMenuBtn.querySelector('i').className = 'ri-close-line ri-lg';
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    mobileMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
                    mobileMenu.classList.add('opacity-0', 'invisible', '-translate-y-full');
                    mobileMenuBtn.querySelector('i').className = 'ri-menu-line ri-lg';
                }
            });

            // Close menu on window resize if opened
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 768) {
                    mobileMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
                    mobileMenu.classList.add('opacity-0', 'invisible', '-translate-y-full');
                    mobileMenuBtn.querySelector('i').className = 'ri-menu-line ri-lg';
                }
            });
        }
    }

    // Setup live data sync with admin system
    setupAdminDataSync() {
        // Listen for admin data updates
        window.addEventListener('portfolioDataUpdated', (event) => {
            console.log('📡 Received updated data from admin system');
            this.projects = event.detail.projects || [];
            this.filteredProjects = [...this.projects];
            this.currentPage = 1;
            this.renderProjects();
            this.updatePortfolioStats();
        });

        // Check for existing synced data
        const syncedData = localStorage.getItem('portfolioSync');
        if (syncedData) {
            try {
                const data = JSON.parse(syncedData);
                if (data.projects && data.projects.length > 0) {
                    console.log('📊 Loading data from admin system');
                    this.projects = data.projects;
                    this.filteredProjects = [...this.projects];
                }
            } catch (e) {
                console.warn('Failed to load synced data, using sample data:', e.message);
                // Fallback to sample data will be handled by getSampleProjectsData()
            }
        }
    }

    // Load projects from admin system or use sample data
    getProjectsData() {
        // Try to get data from admin system first
        const adminProjects = JSON.parse(localStorage.getItem('portfolioProjects'));
        if (adminProjects && adminProjects.length > 0) {
            return adminProjects.filter(project => project.active);
        }
        
        // Fallback to sample data
        return this.getSampleProjectsData();
    }

    // Sample project data (fallback when no admin data exists)
    getSampleProjectsData() {
        return [
            {
                id: 1,
                title: "E-commerce WordPress Site",
                description: "Complete online store with custom WooCommerce integration, payment gateways, and inventory management.",
                category: "wordpress",
                tags: ["WordPress", "WooCommerce", "PHP", "MySQL"],
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
                images: [
                    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                ],
                liveUrl: "https://example-ecommerce.com",
                githubUrl: "https://github.com/example/ecommerce",
                client: "TechStore Inc.",
                date: "2024-01-15",
                duration: "6 weeks",
                featured: true,
                technologies: ["WordPress", "WooCommerce", "PHP", "MySQL", "JavaScript", "CSS3"]
            },
            {
                id: 2,
                title: "React Task Management App",
                description: "Full-stack task management application with real-time collaboration, drag-and-drop functionality, and team analytics.",
                category: "fullstack",
                tags: ["React", "Node.js", "MongoDB", "Socket.io"],
                image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
                images: [
                    "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                ],
                liveUrl: "https://taskmaster-app.com",
                githubUrl: "https://github.com/example/taskmaster",
                client: "ProductivityCorp",
                date: "2024-02-20",
                duration: "8 weeks",
                featured: true,
                technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Redux"]
            },
            {
                id: 3,
                title: "AI-Powered Analytics Dashboard",
                description: "Machine learning dashboard for business intelligence with predictive analytics and automated reporting.",
                category: "ai",
                tags: ["Python", "TensorFlow", "React", "FastAPI"],
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
                images: [
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                ],
                liveUrl: "https://ai-analytics.com",
                githubUrl: "https://github.com/example/ai-analytics",
                client: "DataCorp",
                date: "2024-03-10",
                duration: "12 weeks",
                featured: true,
                technologies: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL", "Docker"]
            },
            {
                id: 4,
                title: "Mobile-First Restaurant Website",
                description: "Responsive restaurant website with online ordering system, reservation management, and menu builder.",
                category: "wordpress",
                tags: ["WordPress", "Elementor", "WooCommerce", "Mobile"],
                image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop",
                images: [
                    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop"
                ],
                liveUrl: "https://restaurant-example.com",
                githubUrl: null,
                client: "Bella Vista Restaurant",
                date: "2024-01-05",
                duration: "4 weeks",
                featured: false,
                technologies: ["WordPress", "Elementor", "WooCommerce", "PHP", "CSS3"]
            },
            {
                id: 5,
                title: "Vue.js SaaS Platform",
                description: "Multi-tenant SaaS platform with subscription management, user analytics, and API integrations.",
                category: "fullstack",
                tags: ["Vue.js", "Laravel", "PostgreSQL", "Stripe"],
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
                images: [
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                ],
                liveUrl: "https://saas-platform.com",
                githubUrl: "https://github.com/example/saas",
                client: "TechStartup LLC",
                date: "2024-02-01",
                duration: "10 weeks",
                featured: true,
                technologies: ["Vue.js", "Laravel", "PostgreSQL", "Stripe", "Redis", "Docker"]
            },
            {
                id: 6,
                title: "React Native Fitness App",
                description: "Cross-platform mobile app for fitness tracking with workout plans, progress monitoring, and social features.",
                category: "mobile",
                tags: ["React Native", "Firebase", "Redux", "Expo"],
                image: "https://images.unsplash.com/photo-1571019613914-85e8d90b5d0e?w=500&h=300&fit=crop",
                images: [
                    "https://images.unsplash.com/photo-1571019613914-85e8d90b5d0e?w=800&h=600&fit=crop"
                ],
                liveUrl: "https://fitness-app.com",
                githubUrl: "https://github.com/example/fitness-app",
                client: "FitLife Inc.",
                date: "2024-03-01",
                duration: "14 weeks",
                featured: true,
                technologies: ["React Native", "Firebase", "Redux", "Expo", "Node.js"]
            },
            {
                id: 7,
                title: "Multi-Vendor Marketplace",
                description: "Complete marketplace solution with vendor management, commission tracking, and advanced search functionality.",
                category: "ecommerce",
                tags: ["Laravel", "Vue.js", "MySQL", "Stripe"],
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
                images: [
                    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
                ],
                liveUrl: "https://marketplace-example.com",
                githubUrl: "https://github.com/example/marketplace",
                client: "MarketPlace Corp",
                date: "2024-01-20",
                duration: "16 weeks",
                featured: true,
                technologies: ["Laravel", "Vue.js", "MySQL", "Stripe", "Elasticsearch", "Redis"]
            },
            {
                id: 8,
                title: "AI Chatbot Integration",
                description: "Smart chatbot with natural language processing for customer support and lead generation.",
                category: "ai",
                tags: ["Python", "OpenAI", "Flask", "WebSocket"],
                image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=500&h=300&fit=crop",
                images: [
                    "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop"
                ],
                liveUrl: "https://chatbot-demo.com",
                githubUrl: "https://github.com/example/ai-chatbot",
                client: "Support Solutions",
                date: "2024-02-15",
                duration: "6 weeks",
                featured: false,
                technologies: ["Python", "OpenAI", "Flask", "WebSocket", "MongoDB"]
            },
            {
                id: 9,
                title: "Corporate WordPress Portal",
                description: "Enterprise-level WordPress site with employee portal, document management, and intranet features.",
                category: "wordpress",
                tags: ["WordPress", "Custom Theme", "ACF", "LDAP"],
                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=300&fit=crop",
                images: [
                    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"
                ],
                liveUrl: "https://corporate-portal.com",
                githubUrl: null,
                client: "Enterprise Corp",
                date: "2024-03-05",
                duration: "8 weeks",
                featured: false,
                technologies: ["WordPress", "PHP", "MySQL", "LDAP", "JavaScript"]
            },
            {
                id: 10,
                title: "Flutter E-learning App",
                description: "Cross-platform educational app with video streaming, progress tracking, and offline content support.",
                category: "mobile",
                tags: ["Flutter", "Dart", "Firebase", "Video"],
                image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=300&fit=crop",
                images: [
                    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop"
                ],
                liveUrl: "https://elearning-app.com",
                githubUrl: "https://github.com/example/elearning",
                client: "EduTech Solutions",
                date: "2024-01-30",
                duration: "12 weeks",
                featured: true,
                technologies: ["Flutter", "Dart", "Firebase", "Video Streaming", "SQLite"]
            },
            {
                id: 11,
                title: "Blockchain DeFi Platform",
                description: "Decentralized finance platform with yield farming, staking, and NFT marketplace integration.",
                category: "fullstack",
                tags: ["Solidity", "Web3", "React", "Ethereum"],
                image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop",
                images: [
                    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop"
                ],
                liveUrl: "https://defi-platform.com",
                githubUrl: "https://github.com/example/defi",
                client: "CryptoVentures",
                date: "2024-02-10",
                duration: "20 weeks",
                featured: true,
                technologies: ["Solidity", "Web3", "React", "Ethereum", "IPFS", "MetaMask"]
            },
            {
                id: 12,
                title: "Healthcare Management System",
                description: "Comprehensive healthcare platform with patient records, appointment scheduling, and telemedicine features.",
                category: "fullstack",
                tags: ["Next.js", "Node.js", "PostgreSQL", "Socket.io"],
                image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop",
                images: [
                    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop"
                ],
                liveUrl: "https://healthcare-system.com",
                githubUrl: "https://github.com/example/healthcare",
                client: "MedCare Solutions",
                date: "2024-03-15",
                duration: "18 weeks",
                featured: true,
                technologies: ["Next.js", "Node.js", "PostgreSQL", "Socket.io", "WebRTC", "Docker"]
            }
        ];
    }    loadProjects() {
        this.showLoading();
        
        // Simulate API call
        setTimeout(() => {
            this.projects = this.getProjectsData();
            this.filteredProjects = [...this.projects];
            this.renderProjects();
            this.updateProjectCount();
            this.hideLoading();
        }, 500);
    }

    setupEventListeners() {
        // Filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.setActiveFilter(e.target);
                this.filterProjects(filter);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('portfolioSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.handleSearch(e.target.value);
            });
        }

        // Clear search button
        const clearSearchBtn = document.getElementById('clearSearch');
        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', () => {
                this.clearSearch();
            });
        }

        // View toggle buttons
        const gridViewBtn = document.getElementById('gridView');
        const listViewBtn = document.getElementById('listView');
        
        if (gridViewBtn) {
            gridViewBtn.addEventListener('click', () => {
                this.setView('grid');
            });
        }
        
        if (listViewBtn) {
            listViewBtn.addEventListener('click', () => {
                this.setView('list');
            });
        }

        // Sort functionality
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.sortAndRenderProjects();
            });
        }

        // Reset filters button
        const resetFiltersBtn = document.getElementById('resetFilters');
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', () => {
                this.resetAllFilters();
            });
        }

        // Load more functionality
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreProjects();
            });
        }
    }

    setActiveFilter(activeBtn) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    filterProjects(category) {
        this.currentFilter = category;
        
        if (category === 'all') {
            this.filteredProjects = [...this.projects];
        } else {
            this.filteredProjects = this.projects.filter(project => 
                project.category === category
            );
        }
        
        // Apply search if active
        if (this.searchQuery) {
            this.searchProjects(this.searchQuery);
            return;
        }
        
        this.sortAndRenderProjects();
        this.updateProjectCount();
        this.updateFilterInfo();
    }searchProjects(query) {
        if (!query) {
            this.filterProjects(this.currentFilter);
            return;
        }

        const lowercaseQuery = query.toLowerCase();
        this.filteredProjects = this.projects.filter(project => {
            const matchesCategory = this.currentFilter === 'all' || project.category === this.currentFilter;
            const matchesSearch = 
                project.title.toLowerCase().includes(lowercaseQuery) ||
                project.description.toLowerCase().includes(lowercaseQuery) ||
                project.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
                project.client.toLowerCase().includes(lowercaseQuery);
            
            return matchesCategory && matchesSearch;
        });

        this.sortAndRenderProjects();
        this.updateProjectCount();
        this.toggleClearSearchButton(query);
    }

    handleSearch(query) {
        this.searchProjects(query);
        this.updateFilterInfo();
    }

    clearSearch() {
        const searchInput = document.getElementById('portfolioSearch');
        if (searchInput) {
            searchInput.value = '';
            this.searchQuery = '';
        }
        this.toggleClearSearchButton('');
        this.filterProjects(this.currentFilter);
    }

    toggleClearSearchButton(query) {
        const clearBtn = document.getElementById('clearSearch');
        if (clearBtn) {
            if (query) {
                clearBtn.classList.remove('hidden');
            } else {
                clearBtn.classList.add('hidden');
            }
        }
    }

    setView(viewType) {
        this.currentView = viewType;
        
        // Update button states
        const gridBtn = document.getElementById('gridView');
        const listBtn = document.getElementById('listView');
        
        if (gridBtn && listBtn) {
            gridBtn.classList.toggle('active', viewType === 'grid');
            listBtn.classList.toggle('active', viewType === 'list');
        }
        
        // Update grid layout
        const portfolioGrid = document.getElementById('portfolioGrid');
        if (portfolioGrid) {
            if (viewType === 'list') {
                portfolioGrid.className = 'space-y-6 transition-all duration-500';
            } else {
                portfolioGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500';
            }
        }
        
        this.renderProjects();
    }

    sortAndRenderProjects() {
        this.sortProjects();
        this.renderProjects();
    }

    sortProjects() {
        switch (this.currentSort) {
            case 'title':
                this.filteredProjects.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'client':
                this.filteredProjects.sort((a, b) => a.client.localeCompare(b.client));
                break;
            case 'featured':
                this.filteredProjects.sort((a, b) => {
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return new Date(b.date) - new Date(a.date);
                });
                break;
            case 'date':
            default:
                this.filteredProjects.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
        }
    }

    resetAllFilters() {
        // Reset search
        this.clearSearch();
        
        // Reset filter
        this.currentFilter = 'all';
        this.setActiveFilter(document.querySelector('.filter-btn[data-filter="all"]'));
        
        // Reset sort
        this.currentSort = 'date';
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.value = 'date';
        }
        
        // Apply filters
        this.filterProjects('all');
    }

    updateFilterInfo() {
        const filterInfo = document.getElementById('filterInfo');
        if (filterInfo) {
            let info = '';
            if (this.currentFilter !== 'all') {
                info += ` in ${this.currentFilter}`;
            }
            if (this.searchQuery) {
                info += ` matching "${this.searchQuery}"`;
            }
            filterInfo.textContent = info;
        }
    }

    // Update portfolio statistics on main page (now removed/unused)
    updatePortfolioStats() {
        // This function is kept for backward compatibility but no longer used
        // Counter section has been removed
        console.log('ℹ️ updatePortfolioStats: Counter section has been removed');
    }

    setupAnimations() {
        // Add intersection observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe portfolio cards as they're added
        this.portfolioObserver = observer;
    }

    renderProjects() {
        const portfolioGrid = document.getElementById('portfolioGrid');
        const noResults = document.getElementById('noResults');
        
        if (this.filteredProjects.length === 0) {
            portfolioGrid.innerHTML = '';
            noResults.classList.remove('hidden');
            return;
        }
        
        noResults.classList.add('hidden');
        
        const projectsToShow = this.filteredProjects.slice(0, this.currentPage * this.projectsPerPage);
        
        if (this.currentView === 'list') {
            portfolioGrid.innerHTML = projectsToShow.map(project => this.generateListCard(project)).join('');
        } else {
            portfolioGrid.innerHTML = projectsToShow.map(project => this.generateGridCard(project)).join('');
        }

        // Setup load more button
        this.setupLoadMore();

        // Apply animations
        this.applyCardAnimations();
        
        // Reinitialize AOS for new elements
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }

    generateGridCard(project) {
        return `
            <div class="portfolio-item portfolio-card" data-aos="fade-up" data-aos-delay="${this.filteredProjects.indexOf(project) * 100}">
                ${project.featured ? '<div class="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium z-10">Featured</div>' : ''}
                <div class="portfolio-card-image">
                    <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">                    <div class="portfolio-card-overlay">
                        <div class="portfolio-card-actions">
                            ${project.liveUrl ? `
                                <a href="${project.liveUrl}" target="_blank" class="portfolio-action-btn" title="Live Demo">
                                    <i class="ri-external-link-line"></i>
                                </a>
                            ` : ''}
                            ${project.githubUrl ? `
                                <a href="${project.githubUrl}" target="_blank" class="portfolio-action-btn" title="Source Code">
                                    <i class="ri-github-line"></i>
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </div>
                <div class="portfolio-card-content">
                    <h3 class="portfolio-card-title">${project.title}</h3>
                    <p class="portfolio-card-description">${project.description}</p>
                    <div class="portfolio-card-tags">
                        ${project.tags.slice(0, 3).map(tag => `
                            <span class="portfolio-tag ${project.tags.indexOf(tag) === 0 ? 'primary' : ''}">${tag}</span>
                        `).join('')}
                        ${project.tags.length > 3 ? `<span class="portfolio-tag">+${project.tags.length - 3}</span>` : ''}
                    </div>
                    <div class="portfolio-card-meta">
                        <span class="text-gray-500">${project.client}</span>
                        <span class="text-gray-500">${this.formatDate(project.date)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    generateListCard(project) {
        return `
            <div class="portfolio-item bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all" data-aos="fade-up">
                <div class="md:flex">
                    <div class="md:w-1/3 relative">
                        ${project.featured ? '<div class="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium z-10">Featured</div>' : ''}
                        <img src="${project.image}" alt="${project.title}" class="w-full h-48 md:h-full object-cover">
                    </div>
                    <div class="md:w-2/3 p-6 flex flex-col justify-between">
                        <div>
                            <h3 class="text-2xl font-bold text-gray-800 mb-2 hover:text-primary transition-colors">${project.title}</h3>
                            <p class="text-gray-600 mb-4">${project.description}</p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                ${project.tags.map(tag => `
                                    <span class="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">${tag}</span>
                                `).join('')}
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <div class="text-sm text-gray-500">
                                <div>${project.client}</div>
                                <div>${this.formatDate(project.date)} • ${project.duration}</div>
                            </div>                            <div class="flex space-x-2">
                                ${project.liveUrl ? `
                                    <a href="${project.liveUrl}" target="_blank" class="portfolio-action-btn" title="Live Demo">
                                        <i class="ri-external-link-line"></i>
                                    </a>
                                ` : ''}
                                ${project.githubUrl ? `
                                    <a href="${project.githubUrl}" target="_blank" class="portfolio-action-btn" title="Source Code">
                                        <i class="ri-github-line"></i>
                                    </a>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupLoadMore() {
        const loadMoreContainer = document.getElementById('loadMoreContainer');
        const totalVisible = this.currentPage * this.projectsPerPage;
        
        if (loadMoreContainer) {
            if (totalVisible < this.filteredProjects.length) {
                loadMoreContainer.classList.remove('hidden');
            } else {
                loadMoreContainer.classList.add('hidden');
            }
        }
    }

    loadMoreProjects() {
        this.currentPage++;
        this.renderProjects();
    }

    applyCardAnimations() {
        const cards = document.querySelectorAll('.portfolio-item');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
            
            if (this.portfolioObserver) {
                this.portfolioObserver.observe(card);
            }
        });    }

    updateProjectCount() {
        const totalProjects = document.getElementById('totalProjects');
        const totalProjectsCount = document.getElementById('totalProjectsCount');
        
        if (totalProjects) {
            totalProjects.textContent = this.filteredProjects.length;
        }
        
        if (totalProjectsCount) {
            totalProjectsCount.textContent = this.projects.length;
        }
    }

    showLoading() {
        const loadingSpinner = document.getElementById('loadingSpinner');
        const portfolioGrid = document.getElementById('portfolioGrid');
        
        if (loadingSpinner) loadingSpinner.classList.remove('hidden');
        if (portfolioGrid) portfolioGrid.innerHTML = this.generateSkeletonCards();
    }

    hideLoading() {
        const loadingSpinner = document.getElementById('loadingSpinner');
        if (loadingSpinner) loadingSpinner.classList.add('hidden');
    }

    generateSkeletonCards() {
        return Array.from({ length: 6 }, () => `
            <div class="portfolio-skeleton">
                <div class="skeleton-image"></div>
                <div class="skeleton-content">
                    <div class="skeleton-line short"></div>
                    <div class="skeleton-line long"></div>
                    <div class="skeleton-line long"></div>
                    <div class="flex space-x-2 mt-4">
                        <div class="skeleton-line short"></div>
                        <div class="skeleton-line short"></div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short' 
        });
    }
}

// Initialize Portfolio Manager
let portfolioManager;

document.addEventListener('DOMContentLoaded', () => {
    portfolioManager = new PortfolioManager();
    // Export for global access after initialization
    window.portfolioManager = portfolioManager;
});

//# sourceMappingURL=portfolio.js.map
