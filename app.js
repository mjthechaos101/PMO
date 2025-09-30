// PMO Presentation App for Mouad JOUID - Executive Dashboard Style

class PMOPresentationApp {
  constructor() {
    this.currentSection = 'accueil';
    this.sections = ['accueil', 'plan-90j', 'problemes-solutions', 'competences-resultats', 'fit-culturel'];
    this.isAnimating = false;
    this.init();
  }

  init() {
    this.bindEvents();
    this.initSkillBars();
    this.initExecutiveDashboard();
    this.showSection('accueil');
    this.initPMOTooltips();
  }

  bindEvents() {
    // Navigation links with executive smooth transitions
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        if (!this.isAnimating) {
          const targetSection = link.getAttribute('data-section');
          this.showSection(targetSection);
          this.updateNavigation(targetSection);
        }
      });
    });

    // Executive navigation buttons
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        if (!this.isAnimating) {
          const targetSection = button.getAttribute('data-target');
          this.showSection(targetSection);
          this.updateNavigation(targetSection);
          this.createExecutiveRipple(e, button);
        }
      });
    });

    // Enhanced hover effects for PMO cards
    this.addPMOHoverEffects();

    // Executive keyboard navigation
    this.initExecutiveKeyboard();

    // Handle browser navigation
    window.addEventListener('popstate', (e) => {
      const section = e.state ? e.state.section : 'accueil';
      this.showSection(section);
      this.updateNavigation(section);
    });

    // Initialize executive tooltips and interactive elements
    this.initInteractiveElements();
  }

  showSection(sectionId) {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    
    // Fade out current section
    const currentSection = document.querySelector('.section.active');
    if (currentSection) {
      currentSection.style.opacity = '0';
      currentSection.style.transform = 'translateY(20px)';
    }

    setTimeout(() => {
      // Hide all sections
      const sections = document.querySelectorAll('.section');
      sections.forEach(section => {
        section.classList.remove('active');
        section.style.opacity = '';
        section.style.transform = '';
      });

      // Show target section with executive animation
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.classList.add('active');
        targetSection.classList.add('fadeIn');
        
        // Executive entrance animation
        setTimeout(() => {
          targetSection.style.opacity = '1';
          targetSection.style.transform = 'translateY(0)';
        }, 50);
        
        // Remove animation class
        setTimeout(() => {
          targetSection.classList.remove('fadeIn');
          this.isAnimating = false;
        }, 600);
      } else {
        this.isAnimating = false;
      }

      this.currentSection = sectionId;

      // Section-specific animations
      this.handleSectionSpecificAnimations(sectionId);

      // Update URL for executive navigation
      const newUrl = sectionId === 'accueil' ? '/' : `/#${sectionId}`;
      history.pushState({ section: sectionId }, '', newUrl);
    }, 150);
  }

  handleSectionSpecificAnimations(sectionId) {
    switch(sectionId) {
      case 'competences-resultats':
        setTimeout(() => this.animateSkillBars(), 300);
        break;
      case 'plan-90j':
        setTimeout(() => this.animatePMOTimeline(), 300);
        break;
      case 'problemes-solutions':
        setTimeout(() => this.animateProblemCards(), 300);
        break;
      case 'fit-culturel':
        setTimeout(() => this.animateCulturalValues(), 300);
        break;
    }
  }

  updateNavigation(activeSection) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === activeSection) {
        link.classList.add('active');
        // Executive navigation highlight
        this.highlightActiveNav(link);
      }
    });
  }

  highlightActiveNav(activeLink) {
    // Add executive glow effect
    activeLink.style.boxShadow = '0 0 20px rgba(43, 119, 173, 0.3)';
    setTimeout(() => {
      activeLink.style.boxShadow = '';
    }, 1000);
  }

  initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
      bar.style.width = '0%';
    });
  }

  animateSkillBars() {
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
      setTimeout(() => {
        category.style.transform = 'translateX(0)';
        category.style.opacity = '1';
        
        const skillBar = category.querySelector('.skill-progress');
        if (skillBar) {
          const skillLevel = skillBar.getAttribute('data-skill');
          setTimeout(() => {
            skillBar.style.width = skillLevel + '%';
          }, 200);
        }
      }, index * 150);
    });
  }

  animatePMOTimeline() {
    const phases = document.querySelectorAll('.timeline-phase');
    phases.forEach((phase, index) => {
      setTimeout(() => {
        phase.style.transform = 'translateY(0) scale(1)';
        phase.style.opacity = '1';
        
        // Add executive pulse effect
        setTimeout(() => {
          phase.style.boxShadow = '0 8px 32px rgba(26, 54, 93, 0.2)';
        }, 300);
      }, index * 200);
    });
  }

  animateProblemCards() {
    const cards = document.querySelectorAll('.problem-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
        
        // Executive card entrance
        const icon = card.querySelector('.problem-icon');
        if (icon) {
          icon.style.transform = 'scale(1.2)';
          setTimeout(() => {
            icon.style.transform = 'scale(1)';
          }, 300);
        }
      }, index * 150);
    });
  }

  animateCulturalValues() {
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
        
        // Animate testimonial appearance
        const testimonial = card.querySelector('.testimonial');
        if (testimonial) {
          setTimeout(() => {
            testimonial.style.transform = 'scale(1)';
            testimonial.style.opacity = '1';
          }, 200);
        }
      }, index * 100);
    });
  }

  addPMOHoverEffects() {
    // Enhanced executive card interactions
    const cards = document.querySelectorAll('.problem-card, .value-card, .timeline-phase, .skill-category');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = '0 12px 40px rgba(26, 54, 93, 0.2)';
        card.style.borderColor = 'var(--color-gold)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 4px 20px rgba(26, 54, 93, 0.08)';
        card.style.borderColor = 'rgba(212, 175, 55, 0.2)';
      });
    });

    // Executive metrics hover
    const metrics = document.querySelectorAll('.impact-metric, .stat-item');
    metrics.forEach(metric => {
      metric.addEventListener('mouseenter', () => {
        metric.style.transform = 'scale(1.08)';
        metric.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });
      
      metric.addEventListener('mouseleave', () => {
        metric.style.transform = 'scale(1)';
      });
    });

    // PMO skill bars interactive highlight
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
      const parent = bar.closest('.skill-category');
      if (parent) {
        parent.addEventListener('mouseenter', () => {
          bar.style.boxShadow = '0 0 20px rgba(43, 119, 173, 0.4)';
        });
        parent.addEventListener('mouseleave', () => {
          bar.style.boxShadow = '';
        });
      }
    });
  }

  createExecutiveRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      transform: scale(0);
      animation: executiveRipple 0.8s ease-out;
      z-index: 1;
    `;
    
    ripple.classList.add('executive-ripple');
    
    const existingRipple = element.querySelector('.executive-ripple');
    if (existingRipple) {
      existingRipple.remove();
    }
    
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 800);
  }

  initExecutiveDashboard() {
    // Simulate real-time KPI updates
    this.simulateKPIUpdates();
    
    // Initialize executive tooltips
    this.initExecutiveTooltips();
    
    // Add performance metrics animation
    this.initPerformanceMetrics();
  }

  simulateKPIUpdates() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
      const originalValue = stat.textContent;
      let currentValue = 0;
      const targetValue = parseInt(originalValue) || originalValue;
      
      if (typeof targetValue === 'number') {
        const increment = targetValue / 30;
        const counter = setInterval(() => {
          currentValue += increment;
          if (currentValue >= targetValue) {
            stat.textContent = originalValue;
            clearInterval(counter);
          } else {
            stat.textContent = Math.floor(currentValue) + (originalValue.includes('%') ? '%' : '');
          }
        }, 50);
      }
    });
  }

  initPMOTooltips() {
    // PMO-specific tooltips
    const pmoTooltips = {
      'PSPO I': 'Professional Scrum Product Owner - Certification Agile/Scrum pour la gestion de produit',
      'Power BI': 'Plateforme Microsoft de Business Intelligence et visualisation de données',
      'PMO Expert': 'Project Management Office - Expertise en gouvernance et pilotage de projets',
      'Jira personnalisé': 'Configuration avancée de Jira pour le suivi de projets et reporting exécutif',
      'KPI consolidés': 'Indicateurs de performance clés regroupés en tableaux de bord unifiés',
      'Comités pilotage': 'Instances de gouvernance pour le suivi et l\'arbitrage des projets',
      'Processus transverses': 'Méthodes standardisées pour la coordination multi-équipes',
      'Gestion dépendances': 'Identification et suivi des interdépendances entre projets et équipes'
    };

    Object.keys(pmoTooltips).forEach(term => {
      const elements = document.querySelectorAll(`[title*="${term}"], .tool, .method, .innovation, .cert-badge`);
      elements.forEach(el => {
        if (el.textContent.includes(term)) {
          el.title = pmoTooltips[term];
          el.style.cursor = 'help';
          el.classList.add('pmo-tooltip');
        }
      });
    });
  }

  initExecutiveTooltips() {
    const tooltipElements = document.querySelectorAll('.pmo-tooltip');
    tooltipElements.forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        this.showExecutiveTooltip(e, element.title);
      });
      element.addEventListener('mouseleave', () => {
        this.hideExecutiveTooltip();
      });
    });
  }

  showExecutiveTooltip(event, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'executive-tooltip';
    tooltip.innerHTML = text;
    tooltip.style.cssText = `
      position: absolute;
      background: var(--color-navy);
      color: var(--color-executive-white);
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      max-width: 250px;
      z-index: 10000;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      border: 1px solid var(--color-gold);
      animation: fadeIn 0.2s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
  }

  hideExecutiveTooltip() {
    const tooltip = document.querySelector('.executive-tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  }

  initPerformanceMetrics() {
    // Animate performance metrics on hover
    const performanceElements = document.querySelectorAll('.impact-value, .stat-number');
    performanceElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        element.style.transform = 'scale(1.15)';
        element.style.color = 'var(--color-gold)';
        element.style.textShadow = '0 2px 10px rgba(212, 175, 55, 0.3)';
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'scale(1)';
        element.style.color = '';
        element.style.textShadow = '';
      });
    });
  }

  initExecutiveKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (this.isAnimating) return;
      
      switch(e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          this.navigateToNext();
          e.preventDefault();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          this.navigateToPrevious();
          e.preventDefault();
          break;
        case 'Home':
          this.showSection('accueil');
          this.updateNavigation('accueil');
          e.preventDefault();
          break;
        case 'End':
          this.showSection('fit-culturel');
          this.updateNavigation('fit-culturel');
          e.preventDefault();
          break;
      }
    });
  }

  navigateToNext() {
    const currentIndex = this.sections.indexOf(this.currentSection);
    const nextIndex = (currentIndex + 1) % this.sections.length;
    this.showSection(this.sections[nextIndex]);
    this.updateNavigation(this.sections[nextIndex]);
  }

  navigateToPrevious() {
    const currentIndex = this.sections.indexOf(this.currentSection);
    const prevIndex = currentIndex === 0 ? this.sections.length - 1 : currentIndex - 1;
    this.showSection(this.sections[prevIndex]);
    this.updateNavigation(this.sections[prevIndex]);
  }

  initInteractiveElements() {
    // ROI Calculator simulation
    this.initROICalculator();
    
    // Dashboard mockup interactions
    this.initDashboardMockup();
    
    // Timeline interactions
    this.initTimelineInteractions();
  }

  initROICalculator() {
    const impactMetrics = document.querySelectorAll('.impact-metric');
    impactMetrics.forEach(metric => {
      metric.addEventListener('click', () => {
        this.showROIBreakdown(metric);
      });
    });
  }

  showROIBreakdown(metricElement) {
    const value = metricElement.querySelector('.impact-value').textContent;
    const label = metricElement.querySelector('.impact-label').textContent;
    
    // Create ROI breakdown popup
    const popup = document.createElement('div');
    popup.className = 'roi-breakdown';
    popup.innerHTML = `
      <div class="roi-content">
        <h4>Détail ROI: ${value} ${label}</h4>
        <div class="roi-details">
          <div class="roi-item">
            <span>Temps économisé:</span>
            <span>2h/jour par équipe</span>
          </div>
          <div class="roi-item">
            <span>Coût évité:</span>
            <span>€15k/trimestre</span>
          </div>
          <div class="roi-item">
            <span>Amélioration qualité:</span>
            <span>-80% erreurs</span>
          </div>
        </div>
        <button onclick="this.parentElement.parentElement.remove()">Fermer</button>
      </div>
    `;
    
    popup.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: fadeIn 0.3s ease;
    `;
    
    popup.querySelector('.roi-content').style.cssText = `
      background: var(--color-executive-white);
      padding: 24px;
      border-radius: 12px;
      border: 2px solid var(--color-gold);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      max-width: 400px;
      width: 90%;
    `;
    
    document.body.appendChild(popup);
  }

  initDashboardMockup() {
    // Simulate dashboard interactivity
    const dashboardElements = document.querySelectorAll('.skill-category');
    dashboardElements.forEach(element => {
      element.addEventListener('click', () => {
        element.style.background = 'rgba(43, 119, 173, 0.1)';
        setTimeout(() => {
          element.style.background = '';
        }, 1000);
      });
    });
  }

  initTimelineInteractions() {
    const phases = document.querySelectorAll('.timeline-phase');
    phases.forEach((phase, index) => {
      phase.addEventListener('click', () => {
        this.expandPhaseDetails(phase, index);
      });
    });
  }

  expandPhaseDetails(phase, index) {
    const details = phase.querySelector('.phase-content');
    const isExpanded = details.style.maxHeight && details.style.maxHeight !== '0px';
    
    if (isExpanded) {
      details.style.maxHeight = '0px';
      details.style.opacity = '0';
    } else {
      details.style.maxHeight = details.scrollHeight + 'px';
      details.style.opacity = '1';
      details.style.transition = 'all 0.5s ease';
    }
  }

  // Export functionality for executive reporting
  exportPMOData() {
    const data = {
      profile: {
        name: 'Mouad JOUID',
        role: 'Project Management Officer (PMO)',
        expertise: ['Gouvernance Projet', 'Reporting Exécutif', 'Pilotage Multi-acteurs']
      },
      competencies: this.extractCompetencyData(),
      results: this.extractResultsData(),
      timestamp: new Date().toISOString()
    };
    
    return data;
  }

  extractCompetencyData() {
    const skills = document.querySelectorAll('.skill-category');
    return Array.from(skills).map(skill => ({
      name: skill.querySelector('h3').textContent,
      level: skill.querySelector('.skill-progress').getAttribute('data-skill'),
      impact: skill.querySelector('.result-text strong').textContent
    }));
  }

  extractResultsData() {
    const metrics = document.querySelectorAll('.impact-metric');
    return Array.from(metrics).map(metric => ({
      value: metric.querySelector('.impact-value').textContent,
      label: metric.querySelector('.impact-label').textContent
    }));
  }

  // Handle hash navigation
  handleHashNavigation() {
    const hash = window.location.hash.substring(1);
    if (hash && this.sections.includes(hash)) {
      this.showSection(hash);
      this.updateNavigation(hash);
    }
  }
}

// Initialize PMO Application
document.addEventListener('DOMContentLoaded', () => {
  const app = new PMOPresentationApp();
  
  // Handle initial navigation
  app.handleHashNavigation();
  
  // Make globally available
  window.pmoApp = app;
  
  // Add executive print functionality
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'p') {
      e.preventDefault();
      window.print();
    }
  });
  
  // Performance optimization
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('loaded');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });

  // Add smooth scrolling
  document.documentElement.style.scrollBehavior = 'smooth';
});

// Add executive CSS animations
const executiveCSS = `
  @keyframes executiveRipple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  .roi-breakdown .roi-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
  }
  
  .roi-breakdown button {
    margin-top: 16px;
    padding: 8px 16px;
    background: var(--color-royal-blue);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
  }
  
  .roi-breakdown button:hover {
    background: var(--color-navy);
  }
  
  .timeline-phase .phase-content {
    overflow: hidden;
    transition: all 0.5s ease;
  }
  
  .skill-category {
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .pmo-tooltip {
    position: relative;
  }
  
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

// Inject executive styles
const executiveStyleSheet = document.createElement('style');
executiveStyleSheet.textContent = executiveCSS;
document.head.appendChild(executiveStyleSheet);