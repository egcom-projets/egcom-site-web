document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initStickyHeader();
    loadProjects();
    initProjectFilters();
});

function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

function initStickyHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

async function loadProjects(limit = null, filter = 'all') {
    const projectsGrid = document.getElementById('projectsGrid');
    const allProjectsGrid = document.getElementById('allProjectsGrid');
    const targetGrid = allProjectsGrid || projectsGrid;
    
    if (!targetGrid) return;
    
    try {
        if (typeof supabaseClient === 'undefined') {
            console.error('Supabase client not loaded');
            targetGrid.innerHTML = '<p class="loading-text">Erreur de chargement. Veuillez rafraîchir la page.</p>';
            return;
        }
        
        let query = supabaseClient
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (filter !== 'all') {
            query = query.eq('category', filter);
        }
        
        if (limit) {
            query = query.limit(limit);
        }
        
        const { data: projects, error } = await query;
        
        if (error) {
            console.error('Error loading projects:', error);
            targetGrid.innerHTML = '<p class="loading-text">Erreur lors du chargement des projets.</p>';
            return;
        }
        
        if (!projects || projects.length === 0) {
            targetGrid.innerHTML = '<p class="loading-text">Aucun projet disponible pour le moment.</p>';
            return;
        }
        
        targetGrid.innerHTML = projects.map(project => createProjectCard(project)).join('');
        
    } catch (error) {
        console.error('Error:', error);
        targetGrid.innerHTML = '<p class="loading-text">Erreur lors du chargement des projets.</p>';
    }
}

function createProjectCard(project) {
    const imageUrl = project.cover_image_url || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23003366%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23fff%22 font-family=%22Arial%22 font-size=%2224%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EProjet%3C/text%3E%3C/svg%3E';
    
    const categoryLabels = {
        'construction': 'Construction',
        'renovation': 'Rénovation',
        'management': 'Management',
        'autre': 'Autre'
    };
    
    const categoryLabel = categoryLabels[project.category] || project.category;
    
    return `
        <div class="project-card" data-category="${project.category}">
            <div class="project-image">
                <img src="${imageUrl}" alt="${project.title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23003366%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23fff%22 font-family=%22Arial%22 font-size=%2224%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EProjet%3C/text%3E%3C/svg%3E'">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <div class="project-meta">
                    ${project.location ? `<span>● ${project.location}</span>` : ''}
                    ${project.year ? `<span>■ ${project.year}</span>` : ''}
                    ${project.category ? `<span>▲ ${categoryLabel}</span>` : ''}
                </div>
                ${project.description ? `<p class="project-description">${project.description.substring(0, 150)}${project.description.length > 150 ? '...' : ''}</p>` : ''}
            </div>
        </div>
    `;
}

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            loadProjects(null, filter);
        });
    });
}

if (document.getElementById('projectsGrid')) {
    loadProjects(6);
}
