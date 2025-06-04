// Portfolio Admin Dashboard - Comprehensive CMS
// Enterprise-level admin panel for complete website management

class PortfolioAdmin {
    constructor() {
        this.projects = JSON.parse(localStorage.getItem('portfolioProjects')) || this.getDefaultProjects();
        this.reviews = JSON.parse(localStorage.getItem('portfolioReviews')) || this.getDefaultReviews();
        this.settings = JSON.parse(localStorage.getItem('portfolioSettings')) || this.getDefaultSettings();
        this.currentUser = null;
        this.activeSection = 'dashboard';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupLogin();
        this.updateStats();
        this.renderDashboard();
    }

    // Default Data Structures
    getDefaultProjects() {
        return [
            {
                id: 1,
                title: "E-commerce Platform",
                category: "fullstack",
                description: "Complete e-commerce solution with payment integration, inventory management, and admin dashboard.",
                client: "TechCorp Solutions",
                duration: "8 weeks",
                liveUrl: "https://demo-ecommerce.com",
                githubUrl: "https://github.com/username/ecommerce",
                technologies: ["React", "Node.js", "MongoDB", "Stripe"],
                featured: true,
                active: true,
                createdAt: "2024-01-15",
                image: "images/project-1.jpg",
                status: "completed"
            },
            {
                id: 2,
                title: "AI-Powered CRM",
                category: "ai",
                description: "Customer relationship management system with AI-driven insights and automated workflows.",
                client: "StartupHub Inc",
                duration: "12 weeks",
                liveUrl: "https://demo-crm.com",
                githubUrl: "https://github.com/username/ai-crm",
                technologies: ["Python", "Django", "TensorFlow", "PostgreSQL"],
                featured: true,
                active: true,
                createdAt: "2024-02-01",
                image: "images/project-2.jpg",
                status: "completed"
            },
            {
                id: 3,
                title: "WordPress Business Site",
                category: "wordpress",
                description: "Professional business website with custom theme, SEO optimization, and content management.",
                client: "Business Pro LLC",
                duration: "4 weeks",
                liveUrl: "https://businesspro.com",
                githubUrl: "",
                technologies: ["WordPress", "PHP", "MySQL", "JavaScript"],
                featured: false,
                active: true,
                createdAt: "2024-01-28",
                image: "images/project-3.jpg",
                status: "completed"
            }
        ];
    }

    getDefaultReviews() {
        return [
            {
                id: 1,
                name: "Sarah Johnson",
                position: "CEO, TechCorp Solutions",
                rating: 5,
                comment: "Outstanding work! The e-commerce platform exceeded our expectations. Professional, timely, and excellent communication throughout the project.",
                project: "E-commerce Platform",
                avatar: "images/avatar-1.jpg",
                featured: true,
                active: true,
                createdAt: "2024-01-20"
            },
            {
                id: 2,
                name: "Michael Chen",
                position: "CTO, StartupHub Inc",
                rating: 5,
                comment: "The AI integration was seamless and has significantly improved our customer insights. Highly recommend for complex projects.",
                project: "AI-Powered CRM",
                avatar: "images/avatar-2.jpg",
                featured: true,
                active: true,
                createdAt: "2024-02-05"
            },
            {
                id: 3,
                name: "Emily Rodriguez",
                position: "Marketing Director, Business Pro LLC",
                rating: 4,
                comment: "Great WordPress development skills. The site looks professional and performs well. Very satisfied with the results.",
                project: "WordPress Business Site",
                avatar: "images/avatar-3.jpg",
                featured: false,
                active: true,
                createdAt: "2024-02-02"
            }
        ];
    }

    getDefaultSettings() {
        return {
            siteTitle: "SolvaTree Portfolio",
            contactEmail: "hello@solvatree.com",
            projectsPerPage: 9,
            enableComments: true,
            maintenanceMode: false,
            analytics: {
                googleAnalytics: "",
                facebookPixel: ""
            },
            social: {
                linkedin: "https://linkedin.com/in/yourprofile",
                github: "https://github.com/yourusername",
                twitter: "https://twitter.com/yourhandle"
            }
        };
    }

    // Authentication System
    setupLogin() {
        const loginModal = document.getElementById('loginModal');
        const adminInterface = document.getElementById('adminInterface');
        const loginForm = document.getElementById('loginForm');
        const logoutBtn = document.getElementById('logoutBtn');

        // Check if user is already logged in
        const savedUser = localStorage.getItem('adminUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showAdminInterface();
        }

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Demo credentials
            if (username === 'admin' && password === 'password123') {
                this.currentUser = { username, loginTime: new Date().toISOString() };
                localStorage.setItem('adminUser', JSON.stringify(this.currentUser));
                this.showAdminInterface();
                this.showNotification('Login successful!', 'success');
            } else {
                this.showNotification('Invalid credentials!', 'error');
            }
        });

        logoutBtn.addEventListener('click', () => {
            this.logout();
        });
    }

    showAdminInterface() {
        document.getElementById('loginModal').classList.add('hidden');
        document.getElementById('adminInterface').classList.remove('hidden');
        this.renderCurrentSection();
    }

    logout() {
        localStorage.removeItem('adminUser');
        this.currentUser = null;
        document.getElementById('loginModal').classList.remove('hidden');
        document.getElementById('adminInterface').classList.add('hidden');
        this.showNotification('Logged out successfully!', 'info');
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Sidebar navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.dataset.section;
                this.switchSection(section);
            });
        });

        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');

        sidebarToggle?.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');
        });

        // User dropdown
        const userMenu = document.getElementById('userMenu');
        const userDropdown = document.getElementById('userDropdown');

        userMenu?.addEventListener('click', () => {
            userDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userMenu?.contains(e.target)) {
                userDropdown?.classList.add('hidden');
            }
        });

        // Project management
        this.setupProjectEventListeners();
        this.setupReviewEventListeners();
    }

    setupProjectEventListeners() {
        const addProjectBtn = document.getElementById('addProjectBtn');
        const projectModal = document.getElementById('projectModal');
        const closeProjectModal = document.getElementById('closeProjectModal');
        const cancelProject = document.getElementById('cancelProject');
        const projectForm = document.getElementById('projectForm');

        addProjectBtn?.addEventListener('click', () => {
            this.openProjectModal();
        });

        closeProjectModal?.addEventListener('click', () => {
            this.closeProjectModal();
        });

        cancelProject?.addEventListener('click', () => {
            this.closeProjectModal();
        });

        projectForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProject(new FormData(projectForm));
        });

        // Search and filter
        const projectSearch = document.getElementById('projectSearch');
        const categoryFilter = document.getElementById('categoryFilter');

        projectSearch?.addEventListener('input', () => {
            this.filterProjects();
        });

        categoryFilter?.addEventListener('change', () => {
            this.filterProjects();
        });
    }    setupReviewEventListeners() {
        const addReviewBtn = document.getElementById('addReviewBtn');
        const closeReviewModal = document.getElementById('closeReviewModal');
        const cancelReview = document.getElementById('cancelReview');
        const reviewForm = document.getElementById('reviewForm');
        
        addReviewBtn?.addEventListener('click', () => {
            this.openReviewModal();
        });

        closeReviewModal?.addEventListener('click', () => {
            this.closeReviewModal();
        });

        cancelReview?.addEventListener('click', () => {
            this.closeReviewModal();
        });

        reviewForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveReview(new FormData(reviewForm));
        });
    }

    // Section Management
    switchSection(section) {
        this.activeSection = section;
        
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Show/hide sections
        document.querySelectorAll('.admin-section').forEach(sec => {
            sec.classList.add('hidden');
        });
        document.getElementById(`${section}-section`).classList.remove('hidden');        this.renderCurrentSection();
    }

    renderCurrentSection() {
        switch(this.activeSection) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'projects':
                this.renderProjects();
                break;
            case 'reviews':
                this.renderReviews();
                break;
            case 'analytics':
                this.renderAnalytics();
                break;
            case 'content':
                this.renderContent();
                break;
            case 'users':
                this.renderUsers();
                break;
            case 'media':
                this.renderMedia();
                break;
            case 'settings':
                this.renderSettings();
                break;
        }
    }

    // Dashboard Rendering
    renderDashboard() {
        this.updateStats();
        this.renderRecentActivity();
    }

    updateStats() {
        const totalProjects = this.projects.length;
        const activeProjects = this.projects.filter(p => p.active).length;
        const totalReviews = this.reviews.length;
        const averageRating = this.reviews.length > 0 
            ? (this.reviews.reduce((sum, r) => sum + r.rating, 0) / this.reviews.length).toFixed(1)
            : '0.0';

        // Update stat counters with animation
        this.animateCounter('totalProjectsCount', totalProjects);
        this.animateCounter('activeProjectsCount', activeProjects);
        this.animateCounter('totalReviewsCount', totalReviews);
        
        const avgElement = document.getElementById('averageRating');
        if (avgElement) {
            avgElement.textContent = averageRating;
        }
    }

    animateCounter(elementId, target) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const start = parseInt(element.textContent) || 0;
        const duration = 1000;
        const increment = (target - start) / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    renderRecentActivity() {
        const container = document.getElementById('recentActivity');
        if (!container) return;

        const activities = [
            { type: 'project', action: 'Created project', item: 'E-commerce Platform', time: '2 hours ago', icon: 'ri-folder-add-line', color: 'text-green-600' },
            { type: 'review', action: 'New review received', item: 'AI-Powered CRM', time: '4 hours ago', icon: 'ri-star-line', color: 'text-yellow-600' },
            { type: 'project', action: 'Updated project', item: 'WordPress Business Site', time: '1 day ago', icon: 'ri-edit-line', color: 'text-blue-600' },
            { type: 'settings', action: 'Updated settings', item: 'Contact information', time: '2 days ago', icon: 'ri-settings-line', color: 'text-gray-600' }
        ];

        container.innerHTML = activities.map(activity => `
            <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center border">
                    <i class="${activity.icon} ${activity.color}"></i>
                </div>
                <div class="flex-1">
                    <p class="text-sm font-medium text-gray-800">${activity.action}</p>
                    <p class="text-xs text-gray-600">${activity.item}</p>
                </div>
                <span class="text-xs text-gray-500">${activity.time}</span>
            </div>
        `).join('');
    }

    // Projects Management
    renderProjects() {
        const tbody = document.getElementById('projectsTableBody');
        if (!tbody) return;

        tbody.innerHTML = this.projects.map(project => `
            <tr class="table-row" data-project-id="${project.id}">
                <td class="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" class="rounded project-checkbox" value="${project.id}">
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                <i class="ri-folder-line text-white"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${project.title}</div>
                            <div class="text-sm text-gray-500">${project.description.substring(0, 50)}...</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                        ${project.category}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${project.client}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="status-badge ${project.active ? 'status-active' : 'status-draft'}">
                        ${project.active ? 'Active' : 'Draft'}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${new Date(project.createdAt).toLocaleDateString()}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                        <button onclick="portfolioAdmin.editProject(${project.id})" class="text-primary hover:text-primary/80">
                            <i class="ri-edit-line"></i>
                        </button>
                        <button onclick="portfolioAdmin.deleteProject(${project.id})" class="text-red-600 hover:text-red-800">
                            <i class="ri-delete-bin-line"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    filterProjects() {
        const searchTerm = document.getElementById('projectSearch')?.value.toLowerCase() || '';
        const categoryFilter = document.getElementById('categoryFilter')?.value || '';

        const filteredProjects = this.projects.filter(project => {
            const matchesSearch = project.title.toLowerCase().includes(searchTerm) ||
                                project.description.toLowerCase().includes(searchTerm) ||
                                project.client.toLowerCase().includes(searchTerm);
            const matchesCategory = !categoryFilter || project.category === categoryFilter;
            
            return matchesSearch && matchesCategory;
        });

        // Re-render with filtered projects
        const tbody = document.getElementById('projectsTableBody');
        if (!tbody) return;

        tbody.innerHTML = filteredProjects.map(project => `
            <tr class="table-row" data-project-id="${project.id}">
                <td class="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" class="rounded project-checkbox" value="${project.id}">
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                <i class="ri-folder-line text-white"></i>
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${project.title}</div>
                            <div class="text-sm text-gray-500">${project.description.substring(0, 50)}...</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                        ${project.category}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${project.client}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="status-badge ${project.active ? 'status-active' : 'status-draft'}">
                        ${project.active ? 'Active' : 'Draft'}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${new Date(project.createdAt).toLocaleDateString()}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                        <button onclick="portfolioAdmin.editProject(${project.id})" class="text-primary hover:text-primary/80">
                            <i class="ri-edit-line"></i>
                        </button>
                        <button onclick="portfolioAdmin.deleteProject(${project.id})" class="text-red-600 hover:text-red-800">
                            <i class="ri-delete-bin-line"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    openProjectModal(project = null) {
        const modal = document.getElementById('projectModal');
        const title = document.getElementById('projectModalTitle');
        const form = document.getElementById('projectForm');

        if (project) {
            title.textContent = 'Edit Project';
            this.populateProjectForm(form, project);
        } else {
            title.textContent = 'Add New Project';
            form.reset();
        }

        modal.classList.remove('hidden');
    }

    closeProjectModal() {
        document.getElementById('projectModal').classList.add('hidden');
    }

    populateProjectForm(form, project) {
        form.title.value = project.title;
        form.category.value = project.category;
        form.description.value = project.description;
        form.client.value = project.client;
        form.duration.value = project.duration || '';
        form.liveUrl.value = project.liveUrl || '';
        form.githubUrl.value = project.githubUrl || '';
        form.technologies.value = project.technologies.join(', ');
        form.featured.checked = project.featured;
        form.active.checked = project.active;
        form.dataset.projectId = project.id;
    }

    saveProject(formData) {
        const projectId = document.getElementById('projectForm').dataset.projectId;
        const technologies = formData.get('technologies').split(',').map(t => t.trim()).filter(t => t);

        const projectData = {
            title: formData.get('title'),
            category: formData.get('category'),
            description: formData.get('description'),
            client: formData.get('client'),
            duration: formData.get('duration'),
            liveUrl: formData.get('liveUrl'),
            githubUrl: formData.get('githubUrl'),
            technologies: technologies,
            featured: formData.get('featured') === 'on',
            active: formData.get('active') === 'on'
        };

        if (projectId) {
            // Update existing project
            const index = this.projects.findIndex(p => p.id == projectId);
            if (index !== -1) {
                this.projects[index] = { ...this.projects[index], ...projectData };
                this.showNotification('Project updated successfully!', 'success');
            }
        } else {
            // Create new project
            const newProject = {
                id: Math.max(...this.projects.map(p => p.id), 0) + 1,
                ...projectData,
                createdAt: new Date().toISOString().split('T')[0],
                image: 'images/default-project.jpg',
                status: 'completed'
            };
            this.projects.push(newProject);
            this.showNotification('Project created successfully!', 'success');
        }

        this.saveData();
        this.closeProjectModal();
        this.renderProjects();
        this.updateStats();
    }

    editProject(id) {
        const project = this.projects.find(p => p.id === id);
        if (project) {
            this.openProjectModal(project);
        }
    }

    deleteProject(id) {
        if (confirm('Are you sure you want to delete this project?')) {
            this.projects = this.projects.filter(p => p.id !== id);
            this.saveData();
            this.renderProjects();
            this.updateStats();
            this.showNotification('Project deleted successfully!', 'success');
        }
    }

    // Reviews Management
    renderReviews() {
        const container = document.getElementById('reviewsGrid');
        if (!container) return;

        container.innerHTML = this.reviews.map(review => `
            <div class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-all">
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                        ${review.name.charAt(0)}
                    </div>
                    <div class="ml-3">
                        <h4 class="font-semibold text-gray-800">${review.name}</h4>
                        <p class="text-sm text-gray-600">${review.position}</p>
                    </div>
                </div>
                <div class="flex items-center mb-3">
                    ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                    <span class="ml-2 text-sm text-gray-600">(${review.rating}/5)</span>
                </div>
                <p class="text-gray-700 text-sm mb-3">${review.comment}</p>
                <div class="flex items-center justify-between text-xs text-gray-500">
                    <span>Project: ${review.project}</span>
                    <span>${new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <div class="flex justify-end mt-4 space-x-2">
                    <button onclick="portfolioAdmin.editReview(${review.id})" class="text-primary hover:text-primary/80">
                        <i class="ri-edit-line"></i>
                    </button>
                    <button onclick="portfolioAdmin.deleteReview(${review.id})" class="text-red-600 hover:text-red-800">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }    openReviewModal(review = null) {
        const modal = document.getElementById('reviewModal');
        const title = document.getElementById('reviewModalTitle');
        const form = document.getElementById('reviewForm');

        if (review) {
            title.textContent = 'Edit Review';
            this.populateReviewForm(form, review);
        } else {
            title.textContent = 'Add New Review';
            form.reset();
        }

        modal.classList.remove('hidden');
    }

    closeReviewModal() {
        document.getElementById('reviewModal').classList.add('hidden');
    }

    populateReviewForm(form, review) {
        if (form.name) form.name.value = review.name;
        if (form.position) form.position.value = review.position;
        if (form.rating) form.rating.value = review.rating;
        if (form.comment) form.comment.value = review.comment;
        if (form.project) form.project.value = review.project;
        if (form.featured) form.featured.checked = review.featured;
        if (form.active) form.active.checked = review.active;
        form.dataset.reviewId = review.id;
    }

    saveReview(formData) {
        const reviewId = document.getElementById('reviewForm').dataset.reviewId;

        const reviewData = {
            name: formData.get('name'),
            position: formData.get('position'),
            rating: parseInt(formData.get('rating')),
            comment: formData.get('comment'),
            project: formData.get('project'),
            featured: formData.get('featured') === 'on',
            active: formData.get('active') === 'on',
            avatar: 'images/default-avatar.jpg'
        };

        if (reviewId) {
            // Update existing review
            const index = this.reviews.findIndex(r => r.id == reviewId);
            if (index !== -1) {
                this.reviews[index] = { ...this.reviews[index], ...reviewData };
                this.showNotification('Review updated successfully!', 'success');
            }
        } else {
            // Create new review
            const newReview = {
                id: Math.max(...this.reviews.map(r => r.id), 0) + 1,
                ...reviewData,
                createdAt: new Date().toISOString().split('T')[0]
            };
            this.reviews.push(newReview);
            this.showNotification('Review created successfully!', 'success');
        }

        this.saveData();
        this.closeReviewModal();
        this.renderReviews();
        this.updateStats();
    }

    editReview(id) {
        const review = this.reviews.find(r => r.id === id);
        if (review) {
            this.openReviewModal(review);
        }
    }

    deleteReview(id) {
        if (confirm('Are you sure you want to delete this review?')) {
            this.reviews = this.reviews.filter(r => r.id !== id);
            this.saveData();
            this.renderReviews();
            this.updateStats();
            this.showNotification('Review deleted successfully!', 'success');
        }
    }

    // Analytics
    renderAnalytics() {
        this.renderCategoryChart();
        this.renderTimelineChart();
    }

    renderCategoryChart() {
        const ctx = document.getElementById('categoryChart');
        if (!ctx) return;

        // Count projects by category
        const categoryCounts = {};
        this.projects.forEach(project => {
            categoryCounts[project.category] = (categoryCounts[project.category] || 0) + 1;
        });

        // Create placeholder chart display
        ctx.innerHTML = `
            <div class="space-y-3">
                ${Object.entries(categoryCounts).map(([category, count]) => `
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600 capitalize">${category}</span>
                        <div class="flex items-center space-x-2">
                            <div class="w-20 bg-gray-200 rounded-full h-2">
                                <div class="bg-primary h-2 rounded-full" style="width: ${(count / this.projects.length) * 100}%"></div>
                            </div>
                            <span class="text-sm font-medium">${count}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderTimelineChart() {
        const ctx = document.getElementById('timelineChart');
        if (!ctx) return;

        // Group projects by month
        const monthlyData = {};
        this.projects.forEach(project => {
            const month = new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
            monthlyData[month] = (monthlyData[month] || 0) + 1;
        });

        // Create placeholder chart display
        ctx.innerHTML = `
            <div class="space-y-3">
                ${Object.entries(monthlyData).map(([month, count]) => `
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">${month}</span>
                        <div class="flex items-center space-x-2">
                            <div class="w-16 bg-gray-200 rounded-full h-2">
                                <div class="bg-accent h-2 rounded-full" style="width: ${(count / Math.max(...Object.values(monthlyData))) * 100}%"></div>
                            </div>
                            <span class="text-sm font-medium">${count}</span>
                        </div>
                    </div>            `).join('')}
            </div>
        `;
    }    // Settings
    renderSettings() {
        const container = document.getElementById('settingsContainer');
        if (!container) return;

        container.innerHTML = `
            <div class="space-y-6">
                <!-- General Settings -->
                <div class="bg-white rounded-lg shadow-sm border p-6">
                    <h3 class="text-lg font-semibold mb-4">General Settings</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">Website Title</label>
                            <input type="text" id="settingsTitle" value="${this.settings.websiteTitle || 'SolvaTree'}" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-button">
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">Contact Email</label>
                            <input type="email" id="settingsEmail" value="${this.settings.contactEmail || 'contact@solvatore.com'}" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-button">
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input type="tel" id="settingsPhone" value="${this.settings.phone || '+1 (555) 123-4567'}" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-button">
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">Location</label>
                            <input type="text" id="settingsLocation" value="${this.settings.location || 'New York, USA'}" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-button">
                        </div>
                    </div>
                </div>

                <!-- Social Media -->
                <div class="bg-white rounded-lg shadow-sm border p-6">
                    <h3 class="text-lg font-semibold mb-4">Social Media</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">LinkedIn</label>
                            <input type="url" id="settingsLinkedin" value="${this.settings.social?.linkedin || ''}" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-button" placeholder="https://linkedin.com/in/username">
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">GitHub</label>
                            <input type="url" id="settingsGithub" value="${this.settings.social?.github || ''}" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-button" placeholder="https://github.com/username">
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">Twitter</label>
                            <input type="url" id="settingsTwitter" value="${this.settings.social?.twitter || ''}" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-button" placeholder="https://twitter.com/username">
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">Portfolio Website</label>
                            <input type="url" id="settingsWebsite" value="${this.settings.social?.website || ''}" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-button" placeholder="https://yourwebsite.com">
                        </div>
                    </div>
                </div>

                <!-- SEO Settings -->
                <div class="bg-white rounded-lg shadow-sm border p-6">
                    <h3 class="text-lg font-semibold mb-4">SEO Settings</h3>
                    <div class="space-y-4">
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">Meta Description</label>
                            <textarea id="settingsMetaDescription" rows="3" 
                                      class="w-full px-3 py-2 border border-gray-300 rounded-button" 
                                      placeholder="Describe your portfolio for search engines">${this.settings.metaDescription || ''}</textarea>
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">Keywords</label>
                            <input type="text" id="settingsKeywords" value="${this.settings.keywords || ''}" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-button" 
                                   placeholder="web developer, portfolio, programming, javascript">
                        </div>
                    </div>
                </div>

                <div class="flex justify-end">
                    <button onclick="portfolioAdmin.saveSettings()" 
                            class="btn-primary px-6 py-2 rounded-button text-white">
                        Save All Settings
                    </button>
                </div>
            </div>
        `;
    }

    saveSettings() {
        // General settings
        this.settings.websiteTitle = document.getElementById('settingsTitle').value;
        this.settings.contactEmail = document.getElementById('settingsEmail').value;
        this.settings.phone = document.getElementById('settingsPhone').value;
        this.settings.location = document.getElementById('settingsLocation').value;

        // Social media
        this.settings.social = {
            linkedin: document.getElementById('settingsLinkedin').value,
            github: document.getElementById('settingsGithub').value,
            twitter: document.getElementById('settingsTwitter').value,
            website: document.getElementById('settingsWebsite').value
        };

        // SEO
        this.settings.metaDescription = document.getElementById('settingsMetaDescription').value;
        this.settings.keywords = document.getElementById('settingsKeywords').value;

        this.saveData();
        this.showNotification('Settings saved successfully!', 'success');
    }// Content Management
    renderContent() {
        const container = document.getElementById('contentContainer');
        if (!container) {
            console.log('Content management section loaded');
            return;
        }

        // Basic content management UI
        container.innerHTML = `
            <div class="space-y-6">
                <div class="bg-white rounded-lg shadow-sm border p-6">
                    <h3 class="text-lg font-semibold mb-4">Website Content</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">Homepage Title</label>
                            <input type="text" id="homepageTitle" value="${this.settings.websiteTitle || 'SolvaTree'}" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-button">
                        </div>
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">Tagline</label>
                            <input type="text" id="tagline" value="${this.settings.tagline || 'Professional Portfolio'}" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-button">
                        </div>
                    </div>
                    <div class="mt-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">About Description</label>
                        <textarea id="aboutDescription" rows="4" 
                                  class="w-full px-3 py-2 border border-gray-300 rounded-button">${this.settings.aboutDescription || 'Professional developer with expertise in modern web technologies.'}</textarea>
                    </div>
                    <button onclick="portfolioAdmin.saveContent()" 
                            class="mt-4 btn-primary px-4 py-2 rounded-button text-white">
                        Save Content
                    </button>
                </div>
            </div>
        `;
    }

    saveContent() {
        this.settings.websiteTitle = document.getElementById('homepageTitle').value;
        this.settings.tagline = document.getElementById('tagline').value;
        this.settings.aboutDescription = document.getElementById('aboutDescription').value;
        
        this.saveData();
        this.showNotification('Content updated successfully!', 'success');
    }    // Users Management
    renderUsers() {
        const container = document.getElementById('usersContainer');
        if (!container) {
            console.log('Users management section loaded');
            return;
        }

        // Basic user management UI
        container.innerHTML = `
            <div class="space-y-6">
                <div class="bg-white rounded-lg shadow-sm border p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold">User Management</h3>
                        <button onclick="portfolioAdmin.openUserModal()" 
                                class="btn-primary px-4 py-2 rounded-button text-white">
                            <i class="ri-add-line mr-2"></i>Add User
                        </button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                ${this.getUsers().map(user => `
                                    <tr>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="flex items-center">
                                                <div class="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                                                    <i class="ri-user-line text-white text-sm"></i>
                                                </div>
                                                <div class="ml-3">
                                                    <div class="text-sm font-medium text-gray-900">${user.username}</div>
                                                    <div class="text-sm text-gray-500">${user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span class="px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                                                ${user.role}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span class="status-badge ${user.active ? 'status-active' : 'status-draft'}">
                                                ${user.active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ${user.lastLogin || 'Never'}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div class="flex space-x-2">
                                                <button onclick="portfolioAdmin.editUser('${user.username}')" class="text-primary hover:text-primary/80">
                                                    <i class="ri-edit-line"></i>
                                                </button>
                                                <button onclick="portfolioAdmin.deleteUser('${user.username}')" class="text-red-600 hover:text-red-800">
                                                    <i class="ri-delete-bin-line"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    getUsers() {
        return [
            {
                username: 'admin',
                email: 'admin@solvatore.com',
                role: 'Administrator',
                active: true,
                lastLogin: new Date().toLocaleDateString()
            }
        ];
    }

    openUserModal(user = null) {
        this.showNotification('User management modal will be implemented in the next phase!', 'info');
    }

    editUser(username) {
        this.showNotification('Edit user functionality will be implemented!', 'info');
    }

    deleteUser(username) {
        this.showNotification('Delete user functionality will be implemented!', 'info');
    }    // Media Management
    renderMedia() {
        const container = document.getElementById('mediaContainer');
        if (!container) {
            console.log('Media management section loaded');
            this.setupMediaUpload();
            return;
        }

        // Media library UI
        container.innerHTML = `
            <div class="space-y-6">
                <div class="bg-white rounded-lg shadow-sm border p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-lg font-semibold">Media Library</h3>
                        <div class="space-x-2">
                            <button onclick="portfolioAdmin.uploadMedia()" 
                                    class="btn-primary px-4 py-2 rounded-button text-white">
                                <i class="ri-upload-line mr-2"></i>Upload Media
                            </button>
                        </div>
                    </div>
                    
                    <!-- Upload Area -->
                    <div id="uploadArea" class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 hover:border-primary transition-colors">
                        <i class="ri-cloud-line text-4xl text-gray-400 mb-2"></i>
                        <p class="text-gray-600">Drag and drop files here or <button class="text-primary">browse</button></p>
                        <p class="text-sm text-gray-500 mt-1">Support for images, videos, and documents</p>
                    </div>

                    <!-- Media Grid -->
                    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        ${this.getMediaFiles().map(file => `
                            <div class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                                <div class="aspect-square bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                                    <i class="ri-${file.type}-line text-2xl text-gray-500"></i>
                                </div>
                                <p class="text-xs text-gray-700 truncate">${file.name}</p>
                                <p class="text-xs text-gray-500">${file.size}</p>
                                <div class="flex justify-between mt-2">
                                    <button onclick="portfolioAdmin.viewMedia('${file.id}')" class="text-primary text-xs">
                                        <i class="ri-eye-line"></i>
                                    </button>
                                    <button onclick="portfolioAdmin.deleteMedia('${file.id}')" class="text-red-600 text-xs">
                                        <i class="ri-delete-bin-line"></i>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        // Setup drag and drop for media upload
        this.setupMediaUpload();
    }

    getMediaFiles() {
        return [
            { id: 1, name: 'project-1.jpg', type: 'image', size: '2.5 MB' },
            { id: 2, name: 'project-2.jpg', type: 'image', size: '1.8 MB' },
            { id: 3, name: 'avatar-1.jpg', type: 'image', size: '845 KB' },
            { id: 4, name: 'logo.svg', type: 'file', size: '12 KB' },
            { id: 5, name: 'demo-video.mp4', type: 'video', size: '15 MB' }
        ];
    }

    uploadMedia() {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.accept = 'image/*,video/*,.pdf,.doc,.docx';
        
        input.onchange = (e) => {
            const files = Array.from(e.target.files);
            files.forEach(file => {
                this.showNotification(`Uploading ${file.name}...`, 'info');
                // Simulate upload process
                setTimeout(() => {
                    this.showNotification(`${file.name} uploaded successfully!`, 'success');
                }, 2000);
            });
        };
        
        input.click();
    }

    viewMedia(id) {
        this.showNotification('Media viewer will be implemented!', 'info');
    }

    deleteMedia(id) {
        if (confirm('Are you sure you want to delete this media file?')) {
            this.showNotification('Media file deleted successfully!', 'success');
            this.renderMedia();
        }
    }

    setupMediaUpload() {
        const uploadBtn = document.getElementById('uploadMediaBtn');
        
        uploadBtn?.addEventListener('click', () => {
            // Create file input
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.multiple = true;
            fileInput.accept = 'image/*,video/*,audio/*,.pdf,.doc,.docx';
            
            fileInput.addEventListener('change', (e) => {
                const files = Array.from(e.target.files);
                this.handleFileUpload(files);
            });
            
            fileInput.click();
        });
    }

    handleFileUpload(files) {
        files.forEach(file => {
            console.log('Uploading file:', file.name);
            // In a real application, you would upload to your server
            this.showNotification(`File "${file.name}" uploaded successfully!`, 'success');
        });
    }    // Data Management
    saveData() {
        localStorage.setItem('portfolioProjects', JSON.stringify(this.projects));
        localStorage.setItem('portfolioReviews', JSON.stringify(this.reviews));
        localStorage.setItem('portfolioSettings', JSON.stringify(this.settings));
        
        // Auto-sync to portfolio page
        this.autoSync();
    }

    // Data Synchronization with Portfolio Page
    syncToPortfolio() {
        const portfolioData = {
            projects: this.projects.filter(p => p.active),
            reviews: this.reviews.filter(r => r.active),
            settings: this.settings,
            lastUpdated: new Date().toISOString()
        };

        // Store for portfolio page consumption
        localStorage.setItem('portfolioSync', JSON.stringify(portfolioData));
        
        // Dispatch custom event for live updates
        window.dispatchEvent(new CustomEvent('portfolioDataUpdated', { 
            detail: portfolioData 
        }));

        this.showNotification('Data synced to portfolio successfully!', 'success');
    }

    // Auto-sync whenever data changes
    autoSync() {
        if (this.settings.autoSync !== false) {
            this.syncToPortfolio();
        }
    }

    // Notifications
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white max-w-sm transition-all transform translate-x-full opacity-0`;
        
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500'
        };
        
        notification.classList.add(colors[type] || colors.info);
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="ri-${type === 'success' ? 'check' : type === 'error' ? 'error-warning' : 'information'}-line"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full', 'opacity-0');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Export Data for Portfolio Page
    exportForPortfolio() {
        const activeProjects = this.projects.filter(p => p.active);
        const activeReviews = this.reviews.filter(r => r.active);
        
        return {
            projects: activeProjects,
            reviews: activeReviews,
            settings: this.settings
        };
    }
}

// Initialize Admin Panel
const portfolioAdmin = new PortfolioAdmin();

// Export data to global scope for portfolio page
window.portfolioData = portfolioAdmin.exportForPortfolio();

// Update portfolio data when changes are made
document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
        window.portfolioData = portfolioAdmin.exportForPortfolio();
    }, 1000);
});

console.log('🚀 Portfolio Admin CMS Loaded Successfully!');
console.log('📊 Dashboard Features:', {
    'Total Projects': portfolioAdmin.projects.length,
    'Total Reviews': portfolioAdmin.reviews.length,
    'Active User': portfolioAdmin.currentUser?.username || 'Not logged in'
});
