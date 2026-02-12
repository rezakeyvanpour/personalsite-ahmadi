// ===== Hamburger menu for mobile =====
(function() {
    'use strict';
    
    function initHamburgerMenu() {
        const header = document.querySelector('.header');
        const menu = document.querySelector('.menu');
        
        if (!header || !menu) return;
        
        let menuToggle = document.querySelector('.menu-toggle');
        
        if (!menuToggle) {
            menuToggle = document.createElement('div');
            menuToggle.className = 'menu-toggle';
            menuToggle.innerHTML = '<span></span><span></span><span></span>';
            header.appendChild(menuToggle);
        }
        
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            menu.classList.toggle('active');
            
            if (menu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        const menuItems = document.querySelectorAll('.menu li');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                menu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        document.addEventListener('click', function(e) {
            if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                menu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        window.addEventListener('scroll', function() {
            if (menu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                menu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                menu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHamburgerMenu);
    } else {
        initHamburgerMenu();
    }
})();

// ===== Header scroll to site sections =====
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const menuItems = document.querySelectorAll('.menu li');
    
    function scrollToSection(sectionName) {
        let targetElement = null;
        let extraOffset = 0;
        const headerHeight = header.offsetHeight;
        
        switch(sectionName.toLowerCase()) {
            case 'about me':
                targetElement = document.querySelector('.base-page2');
                break;
            case 'web development':
                targetElement = document.querySelector('.base-page3');
                break;
            case 'user experience':
                targetElement = document.querySelector('.base-page3');
                extraOffset = 450;
                break;
            case 'contact':
                targetElement = document.querySelector('.site-footer');
                break;
        }
        
        if (targetElement) {
            const targetPosition = targetElement.getBoundingClientRect().top + 
                                  window.pageYOffset - headerHeight + extraOffset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            menuItems.forEach(li => li.classList.remove('active'));
            this.classList.add('active');
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            const itemText = this.textContent.trim();
            scrollToSection(itemText);
        });
    });
    
    function updateActiveMenu() {
        const scrollPosition = window.scrollY + 100;
        const aboutSection = document.querySelector('.base-page2');
        const webDevSection = document.querySelector('.base-page3');
        
        let activeItem = '';
        
        if (aboutSection && scrollPosition >= aboutSection.offsetTop && 
            scrollPosition < aboutSection.offsetTop + aboutSection.offsetHeight) {
            activeItem = 'about me';
        }
        else if (webDevSection && scrollPosition >= webDevSection.offsetTop && 
                 scrollPosition < webDevSection.offsetTop + (webDevSection.offsetHeight * 0.5)) {
            activeItem = 'web development';
        }
        else if (webDevSection && 
                 scrollPosition >= webDevSection.offsetTop + (webDevSection.offsetHeight * 0.5)) {
            activeItem = 'user experience';
        }
        
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.textContent.trim().toLowerCase() === activeItem) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveMenu);
    updateActiveMenu();
});

// ===== Back to top button =====
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// ===== Dynamic Menu Underline =====
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu li');
    
    menuItems.forEach(item => {
        const oldSpan = item.querySelector('span');
        if (oldSpan) oldSpan.remove();
        
        const underline = document.createElement('span');
        underline.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: #b8a97f;
            transition: width 0.3s ease;
            border-radius: 2px;
        `;
        
        item.style.position = 'relative';
        item.appendChild(underline);
        
        item.addEventListener('mouseenter', function() {
            const span = this.querySelector('span');
            if (span) span.style.width = '100%';
        });
        
        item.addEventListener('mouseleave', function() {
            const span = this.querySelector('span');
            if (span && !this.classList.contains('active')) {
                span.style.width = '0';
            }
        });
    });
});

//===== Three box effect at the bottom of the About Me page =====
document.addEventListener('DOMContentLoaded', function() {
    const serviceLinks = document.querySelectorAll('.link-services > a');
    
    serviceLinks.forEach(link => {
        const borderColor = getComputedStyle(link).borderColor;
        
        const wave = document.createElement('div');
        wave.className = 'wave-effect';
        wave.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: ${borderColor};
            transform: translate(-50%, -50%);
            pointer-events: none;
            opacity: 0;
            z-index: 1;
        `;
        link.appendChild(wave);
        
        link.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            
            wave.style.transition = 'width 0.6s ease-out, height 0.6s ease-out, opacity 0.6s ease-out';
            wave.style.width = size + 'px';
            wave.style.height = size + 'px';
            wave.style.opacity = '0.3';
            this.style.color = '#ffffff';
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.stroke = '#ffffff';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            wave.style.width = '0';
            wave.style.height = '0';
            wave.style.opacity = '0';
            this.style.color = '';
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.stroke = '';
            }
        });
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: rippleClick 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
            ripple.style.left = x - size/2 + 'px';
            ripple.style.top = y - size/2 + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // ===== Managing three-box links and downloading resumes =====
    
    const webDevLink = document.getElementById('webDevLink');
    if (webDevLink) {
        webDevLink.addEventListener('click', function(e) {
            e.preventDefault(); 
            console.log('Web Development clicked');
            
            const skillsSection = document.querySelector('.base-page3');
            if (skillsSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const sectionPosition = skillsSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: sectionPosition,
                    behavior: 'smooth'
                });
            }
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
    
    const userExpLink = document.getElementById('userExpLink');
    if (userExpLink) {
        userExpLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('User Experience clicked'); 
            
            const skillsSection = document.querySelector('.base-page3');
            if (skillsSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const sectionPosition = skillsSection.offsetTop - headerHeight + 450; // 450px پایین‌تر
                
                window.scrollTo({
                    top: sectionPosition,
                    behavior: 'smooth'
                });
            }
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }

    const resumeLink = document.getElementById('resumeLink');
    if (resumeLink) {
        resumeLink.addEventListener('click', function(e) {
            e.preventDefault(); 
            console.log('Resume clicked - trying to download');
            
            const resumePath = '/assets/Resume.pdf.pdf'; 
            
            const downloadLink = document.createElement('a');
            downloadLink.href = resumePath;
            downloadLink.download = 'Mohammad_Ahmadi_Resume.pdf';
            downloadLink.target = '_blank';
            
            const icon = this.querySelector('.service-icon');
            if (icon) {
                const originalStroke = icon.style.stroke;
                
                icon.style.stroke = '#4CAF50';
                icon.style.transform = 'scale(1.2)';
                this.classList.add('downloading');
                
                fetch(resumePath, { method: 'HEAD' })
                    .then(response => {
                        if (response.ok) {
                            
                            downloadLink.click();
                            console.log('Download started');
                            
                            showNotification('Download started!', 'success');
                        } else {
                            console.error('Resume file not found at:', resumePath);
                            this.classList.add('error');
                            showNotification('Resume file not found!', 'error');
                        }
                    })
                    .catch(error => {
                        console.error('Error checking file:', error);
                        this.classList.add('error');
                        showNotification('Error downloading file!', 'error');
                    })
                    .finally(() => {
                        setTimeout(() => {
                            if (icon) {
                                icon.style.stroke = originalStroke;
                                icon.style.transform = '';
                            }
                            this.classList.remove('downloading');
                            setTimeout(() => {
                                this.classList.remove('error');
                            }, 3000);
                        }, 2000);
                    });
            } else {
                downloadLink.click();
            }
        });
    }
    
    function showNotification(message, type) {
        const oldNotification = document.querySelector('.download-notification');
        if (oldNotification) {
            oldNotification.remove();
        }
        const notification = document.createElement('div');
        notification.className = `download-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            font-family: "Ubuntu", sans-serif;
            font-size: 0.9rem;
            z-index: 9999;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
            border-left: 4px solid ${type === 'success' ? '#b8a97f' : '#ff6b6b'};
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    .download-notification {
        position: fixed;
        top: 100px;
        right: 30px;
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    }
    
    .link-services-MyResume.downloading {
        animation: downloadPulse 0.8s ease infinite;
    }
    
    @keyframes downloadPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(0.98); }
    }
    
    .link-services-MyResume.error {
        border-color: #f44336 !important;
        animation: shake 0.5s ease;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-5px); }
        40%, 80% { transform: translateX(5px); }
    }
`;


document.head.appendChild(style);
//===== Creating and styling the developer skills section =====
const skillsData = [
    { 
        name: "Go", 
        percent: 100, 
        color: "#00add8",
        level: "expert",
        levelText: "Microservices, CLI Tools, High Performance Systems",
        icon: "🐹",
        class: "go-master"
    },
    { 
        name: "Python", 
        percent: 100, 
        color: "#3776ab",
        level: "expert",
        levelText: "Backend APIs, Automation, Data Processing, AI/ML",
        icon: "🐍",
        class: "python-master"
    },
    { 
        name: "MYSQL", 
        percent: 100, 
        color: "#4479a1",
        level: "expert",
        levelText: "Database Design, Optimization, Complex Queries",
        icon: "📊"
    },
    { 
        name: "SQL Server", 
        percent: 100, 
        color: "#0078d7",
        level: "expert",
        levelText: "Database Administration, Performance Tuning, High Availability",
        icon: "🗄️",
        class: "sqlserver-master"
    },
    { 
        name: "RESTful APIs", 
        percent: 90, 
        color: "#ff6b6b",
        level: "expert",
        levelText: "Design, Development, Documentation & Security",
        icon: "🔌"
    },
    { 
        name: "C# / .NET", 
        percent: 90, 
        color: "#9b4993",
        level: "expert",
        levelText: "ASP.NET Core, Desktop Apps, Enterprise Solutions",
        icon: "⚡"
    },
    { 
        name: "Django", 
        percent: 90, 
        color: "#092e20",
        level: "expert",
        levelText: "Web Applications, REST APIs, ORM, Authentication",
        icon: "🎸"
    },
    { 
        name: "Git & CI/CD", 
        percent: 90, 
        color: "#f05032",
        level: "expert",
        levelText: "Version Control, Automated Deployment, Workflows",
        icon: "📦"
    },
    { 
        name: "ASP.NET Core", 
        percent: 80, 
        color: "#512bd4",
        level: "advanced",
        levelText: "Web Applications, MVC Pattern, API Development",
        icon: "🖥️",
        class: "aspnet-advanced"
    },
    { 
        name: "Docker", 
        percent: 80, 
        color: "#2496ed",
        level: "advanced",
        levelText: "Containerization, Orchestration, DevOps, Deployment",
        icon: "🐳",
        class: "docker-advanced"
    },
    { 
        name: "HTML & CSS", 
        percent: 70, 
        color: "#e34f26",
        level: "proficient",
        levelText: "Semantic Markup, Basic Structure, Forms",
        icon: "📝",
        class: "html-proficient"
    }
];

function createSkillsHTML() {
    return `
        <div class="skills-intro">
            <h2> EXPERTISE IN BACKEND AND REQUIRED FRAMEWORKS</h2>
            
        </div>

        <div class="skills-container" id="skillsContainer">
            ${skillsData.map((skill, index) => `
                <div class="skill-card" style="animation-delay: ${0.1 + index * 0.1}s">
                    <div class="skill-header">
                        <div class="skill-name">
                            <div class="skill-dot" style="background-color: ${skill.color};"></div>
                            ${skill.name}
                        </div>
                        <div class="skill-percent">${skill.percent}%</div>
                    </div>
                    
                    <div class="progress-container">
                        <div class="progress-bar" 
                             data-percent="${skill.percent}"
                             style="background-color: ${skill.color};">
                        </div>
                    </div>
                    
                    <div class="skill-level">
                        <span class="${skill.level}">
                            ${skill.level === 'expert' ? '👑 EXPERT' : 
                              skill.level === 'advanced' ? '🚀 ADVANCED' : '⚡ PROFICIENT'}
                        </span>
                        • ${skill.levelText}
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="skills-legend">
            <h3 class="legend-title">SKILL LEVEL GUIDE</h3>
            <div class="legend-grid">
                <div class="legend-item">
                    <div class="legend-color" style="background-color: #60a5fa;"></div>
                    <span>90%-100%: Expert / Production Mastery</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background-color: #f87171;"></div>
                    <span>80%-89%: Advanced / Scalable Solutions</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background-color: #b8a97f;"></div>
                    <span>70%-79%: Proficient / Solid Experience</span>
                </div>
            </div>
        </div>
    `;
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        
        setTimeout(() => {
            bar.style.width = `${percent}%`;
        }, 500);
    });
}

function handleScrollAnimation() {
    const cards = document.querySelectorAll('.skill-card');
    const container = document.getElementById('skillsContainer');
    
    if (!container) return;
    
    const containerTop = container.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (containerTop < windowHeight - 100) {
        cards.forEach(card => {
            card.style.opacity = '1';
        });
        setTimeout(animateProgressBars, 300);
        
        window.removeEventListener('scroll', handleScrollAnimation);
    }
}

function initSkillsSection() {
    const webDevSection = document.querySelector('.base-page3 .container1');
    
    if (webDevSection) {
        const oldText = webDevSection.querySelector('.text-expert1');
        if (oldText) {
            oldText.remove();
        }
        
        const skillsDiv = document.createElement('div');
        skillsDiv.className = 'skills-section';
        skillsDiv.innerHTML = createSkillsHTML();
        
        webDevSection.appendChild(skillsDiv);
        
        window.addEventListener('scroll', handleScrollAnimation);
        
        setTimeout(handleScrollAnimation, 100);
        
        const cards = document.querySelectorAll('.skill-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const bar = this.querySelector('.progress-bar');
                if (bar) {
                    bar.style.filter = 'brightness(1.2)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const bar = this.querySelector('.progress-bar');
                if (bar) {
                    bar.style.filter = 'brightness(1)';
                }
            });
        });
    }
}
document.addEventListener('DOMContentLoaded', initSkillsSection);


//===== Interactive footer with direct links =====
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            const link = this.querySelector('.contact-link');
            
            if (icon) {
                icon.style.stroke = '#ffffff';
                icon.style.transform = 'scale(1.1)';
            }
            
            if (link) {
                link.style.color = '#b8a97f';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            const link = this.querySelector('.contact-link');
            
            if (icon) {
                icon.style.stroke = '#b8a97f';
                icon.style.transform = 'scale(1)';
            }
            
            if (link) {
                link.style.color = '#acacac';
            }
        });
    });
    
    const contactMenuItem = document.querySelector('.menu li:last-child');
    if (contactMenuItem) {
        contactMenuItem.addEventListener('click', function(e) {
            e.preventDefault();
            
            const footer = document.querySelector('.site-footer');
            if (footer) {
                window.scrollTo({
                    top: footer.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    }

    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            console.log('Navigating to:', this.href);
        });
    });
    
    const typeLinks = document.querySelectorAll('.contact-link');
    typeLinks.forEach(link => {
        const originalText = link.textContent;
        link.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                link.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 300);
                    observer.unobserve(link);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(link);
    });
});







