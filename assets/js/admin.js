let currentUser = null;

async function checkAuth() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    
    if (!user) {
        window.location.href = 'login.html';
        return null;
    }
    
    currentUser = user;
    return user;
}

async function login(email, password) {
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) throw error;
        
        window.location.href = 'index.html';
    } catch (error) {
        throw error;
    }
}

async function logout() {
    await supabaseClient.auth.signOut();
    window.location.href = 'login.html';
}

async function loadAdminProjects() {
    const { data: projects, error } = await supabaseClient
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
    
    if (error) {
        console.error('Error loading projects:', error);
        return;
    }
    
    const tbody = document.getElementById('projectsTableBody');
    if (!tbody) return;
    
    if (projects.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Aucun projet</td></tr>';
        return;
    }
    
    tbody.innerHTML = projects.map(project => `
        <tr>
            <td>${project.title}</td>
            <td>${project.location || '-'}</td>
            <td>${project.year || '-'}</td>
            <td>${project.category || '-'}</td>
            <td>${new Date(project.created_at).toLocaleDateString('fr-FR')}</td>
            <td>
                <button class="btn-edit" onclick="editProject('${project.id}')">Modifier</button>
                <button class="btn-delete" onclick="deleteProject('${project.id}')">Supprimer</button>
            </td>
        </tr>
    `).join('');
}

async function deleteProject(id) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
        return;
    }
    
    const { error } = await supabaseClient
        .from('projects')
        .delete()
        .eq('id', id);
    
    if (error) {
        alert('Erreur lors de la suppression: ' + error.message);
        return;
    }
    
    loadAdminProjects();
}

function editProject(id) {
    window.location.href = `edit-project.html?id=${id}`;
}

async function saveProject(projectData, projectId = null) {
    try {
        if (projectId) {
            const { data, error } = await supabaseClient
                .from('projects')
                .update({
                    ...projectData,
                    updated_at: new Date().toISOString()
                })
                .eq('id', projectId)
                .select();
            
            if (error) throw error;
            return data[0];
        } else {
            const { data, error } = await supabaseClient
                .from('projects')
                .insert([projectData])
                .select();
            
            if (error) throw error;
            return data[0];
        }
    } catch (error) {
        throw error;
    }
}

async function uploadImage(file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;
    
    const { data, error } = await supabaseClient.storage
        .from('projects')
        .upload(filePath, file);
    
    if (error) throw error;
    
    const { data: { publicUrl } } = supabaseClient.storage
        .from('projects')
        .getPublicUrl(filePath);
    
    return publicUrl;
}

async function loadProjectForEdit(projectId) {
    const { data: project, error } = await supabaseClient
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();
    
    if (error) {
        console.error('Error loading project:', error);
        return null;
    }
    
    return project;
}
