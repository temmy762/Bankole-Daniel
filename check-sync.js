// Check localStorage data status
console.log('=== PORTFOLIO-ADMIN SYNC STATUS CHECK ===');

// Check admin projects
const adminProjects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
console.log(`Admin Projects: ${adminProjects.length} total`);
adminProjects.forEach((project, index) => {
    console.log(`  ${index + 1}. ${project.title} (${project.category}) - Active: ${project.active}`);
});

// Check synced data
const syncedData = JSON.parse(localStorage.getItem('portfolioSync') || '{}');
console.log(`\nSynced Data: ${syncedData.projects ? syncedData.projects.length : 0} projects`);
if (syncedData.projects) {
    syncedData.projects.forEach((project, index) => {
        console.log(`  ${index + 1}. ${project.title} (${project.category})`);
    });
}

// Check what portfolio.js would load
console.log('\n=== WHAT PORTFOLIO.JS WOULD LOAD ===');
if (adminProjects && adminProjects.length > 0) {
    const activeProjects = adminProjects.filter(project => project.active);
    console.log(`Portfolio would load: ${activeProjects.length} active projects from admin`);
    activeProjects.forEach((project, index) => {
        console.log(`  ${index + 1}. ${project.title}`);
    });
} else {
    console.log('Portfolio would load: Sample data (no admin data found)');
}

// Check sync status
console.log('\n=== SYNC STATUS ===');
if (adminProjects.length === 0) {
    console.log('❌ No admin data - Portfolio will use sample data');
} else if (!syncedData.projects) {
    console.log('⚠️ Admin data exists but no sync data found');
} else {
    const activeAdminCount = adminProjects.filter(p => p.active).length;
    if (syncedData.projects.length === activeAdminCount) {
        console.log('✅ Perfect sync - Data matches');
    } else {
        console.log('⚠️ Sync mismatch detected');
    }
}

console.log('\n=== RECOMMENDATIONS ===');
if (adminProjects.length === 0) {
    console.log('1. Open portfolio-admin.html and add some projects');
    console.log('2. Or the portfolio will show sample data');
} else if (!syncedData.projects) {
    console.log('1. Open portfolio-admin.html to trigger sync');
    console.log('2. Or run the test sync button');
}
