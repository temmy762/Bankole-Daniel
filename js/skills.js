// Skills Animation
document.addEventListener('DOMContentLoaded', function() {
    // Skill bars animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const target = bar.getAttribute('data-width');
            bar.style.width = target;
        });
    }
    
    // Observer for skill bars
    const skillsSection = document.querySelector('.skills-section');
    
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(skillsSection);
    }
    
    // Circular progress bars
    const circleProgress = document.querySelectorAll('.circle-progress');
    
    if (circleProgress.length > 0) {
        circleProgress.forEach(progress => {
            const value = progress.getAttribute('data-value');
            const radius = progress.getAttribute('r');
            const circumference = 2 * Math.PI * radius;
            
            progress.style.strokeDasharray = circumference;
            progress.style.strokeDashoffset = circumference;
            
            setTimeout(() => {
                const offset = circumference - (value / 100) * circumference;
                progress.style.strokeDashoffset = offset;
            }, 500);
        });
    }
});

// Add SVG circular progress charts to skills section if present
function initCircularCharts() {
    const skillCircles = document.querySelectorAll('.skill-circle');
    
    if (skillCircles.length > 0) {
        skillCircles.forEach(circle => {
            const percentage = circle.getAttribute('data-percentage');
            const color = circle.getAttribute('data-color') || '#0F9D58';
            const size = 120;
            const radius = 50;
            const circumference = 2 * Math.PI * radius;
            
            // Create SVG
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', size);
            svg.setAttribute('height', size);
            svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
            
            // Background circle
            const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            bgCircle.setAttribute('cx', size / 2);
            bgCircle.setAttribute('cy', size / 2);
            bgCircle.setAttribute('r', radius);
            bgCircle.setAttribute('fill', 'none');
            bgCircle.setAttribute('stroke', '#e5e7eb');
            bgCircle.setAttribute('stroke-width', '8');
            
            // Progress circle
            const progressCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            progressCircle.setAttribute('cx', size / 2);
            progressCircle.setAttribute('cy', size / 2);
            progressCircle.setAttribute('r', radius);
            progressCircle.setAttribute('fill', 'none');
            progressCircle.setAttribute('stroke', color);
            progressCircle.setAttribute('stroke-width', '8');
            progressCircle.setAttribute('stroke-linecap', 'round');
            progressCircle.setAttribute('class', 'circle-progress');
            progressCircle.setAttribute('data-value', percentage);
            progressCircle.style.transform = 'rotate(-90deg)';
            progressCircle.style.transformOrigin = 'center';
            progressCircle.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
            
            // Percentage text
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', size / 2);
            text.setAttribute('y', size / 2 + 5);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('fill', '#333');
            text.setAttribute('font-size', '20px');
            text.setAttribute('font-weight', 'bold');
            text.textContent = percentage + '%';
            
            // Append elements
            svg.appendChild(bgCircle);
            svg.appendChild(progressCircle);
            svg.appendChild(text);
            
            // Clear and append to container
            circle.innerHTML = '';
            circle.appendChild(svg);
        });
    }
}

window.addEventListener('load', initCircularCharts);
