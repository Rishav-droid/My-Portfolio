// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 200
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Skills progress animation
const skillBars = document.querySelectorAll('.skill-progress');
const animateSkills = () => {
    skillBars.forEach(skill => {
        const percentage = skill.getAttribute('data-progress');
        skill.style.width = percentage + '%';
    });
};

// Project cards hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Remove or comment out the animateName function since we're using CSS animation instead
// function animateName() { ... }

// Run animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Remove animateName() call

    // Typing animation for hero section
    const typeWriter = new Typed('#typed-text', {
        strings: ['Web Developer', 'Designer', 'Problem Solver'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });

    // Form submission feedback
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    
    if (status === 'success') {
        alert('Message sent successfully!');
    } else if (status === 'error') {
        alert('Error sending message. Please try again.');
    }
});

// Remove or comment out this entire block since we're not using it
/*
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formMessage = document.querySelector('.form-message');
    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // Show sending state
    formMessage.textContent = 'Sending...';
    formMessage.style.color = 'var(--accent-1)';
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Get form data
    const formData = new FormData(form);
    
    // Send form data
    fetch('process_form.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            formMessage.textContent = 'Message sent successfully!';
            formMessage.style.color = 'var(--accent-3)';
            form.reset();
        } else {
            throw new Error('Failed to send message');
        }
    })
    .catch(error => {
        formMessage.textContent = 'Error sending message. Please try again.';
        formMessage.style.color = 'var(--accent-2)';
    })
    .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    });
});
*/

// Feedback form handling
document.getElementById('feedback-form').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Form submission started'); // Debug log
    
    const formMessage = this.querySelector('.feedback-message');
    const submitButton = this.querySelector('button');
    const originalButtonText = submitButton.textContent;
    
    // Show sending state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    formMessage.textContent = 'Sending feedback...';
    formMessage.style.color = '#4a9eff';
    
    // Get form values
    const userName = document.getElementById('from_email').value;
    const userMessage = document.getElementById('message').value;
    
    // Prepare template parameters
    const templateParams = {
        to_name: 'Rishav',
        from_name: userName,
        message: userMessage,
        reply_to: 'no-reply@example.com' // Since we're not collecting email anymore
    };
    
    console.log('Sending email with params:', templateParams); // Debug log
    
    // Send using EmailJS
    emailjs.sendForm(
        'service_d5idr7l', 
        'template_076f6p2',
        this, // Pass the form directly
        'yXLCsyQN762aZnex5'
    ).then(
        function(response) {
            console.log('SUCCESS!', response.status, response.text);
            formMessage.textContent = '✅ Email sent successfully!';
            formMessage.style.color = '#50fa7b';
            e.target.reset();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Thank you! Your message has been sent.';
            successMessage.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #50fa7b;
                color: #000;
                padding: 15px 25px;
                border-radius: 5px;
                animation: slideIn 0.5s ease forwards;
            `;
            document.body.appendChild(successMessage);
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.style.animation = 'slideOut 0.5s ease forwards';
                setTimeout(() => successMessage.remove(), 500);
            }, 3000);
        },
        function(error) {
            console.error('FAILED...', error);
            formMessage.textContent = '❌ Error sending message. Please try again.';
            formMessage.style.color = '#ff49db';
        }
    ).finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    });
});

// Add these animations to help with the success message
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Check for form submission status
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const formMessage = document.querySelector('.form-message');
    
    if (status === 'success') {
        formMessage.textContent = 'Message sent successfully!';
        formMessage.style.color = 'var(--accent-3)';
    } else if (status === 'error') {
        formMessage.textContent = 'Error sending message. Please try again.';
        formMessage.style.color = 'var(--accent-2)';
    }
});

// Add cursor trail effect
document.addEventListener('DOMContentLoaded', () => {
    const coords = { x: 0, y: 0 };
    const dots = [];
    const trailContainer = document.createElement('div');
    trailContainer.className = 'cursor-trail';
    document.body.appendChild(trailContainer);

    // Create dots
    for (let i = 0; i < 15; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail-dot';
        trailContainer.appendChild(dot);
        dots.push(dot);
    }

    // Update mouse position
    document.addEventListener('mousemove', e => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    // Animate dots
    function animateDots() {
        let x = coords.x;
        let y = coords.y;

        dots.forEach((dot, index) => {
            const nextDot = dots[index + 1] || dots[0];
            
            dot.style.opacity = 1 - (index / dots.length);
            dot.style.transform = `translate(${x}px, ${y}px)`;
            
            x += (nextDot.offsetLeft - dot.offsetLeft) * 0.3;
            y += (nextDot.offsetTop - dot.offsetTop) * 0.3;
        });

        requestAnimationFrame(animateDots);
    }

    animateDots();
});

// Add profile photo click effect
document.addEventListener('DOMContentLoaded', () => {
    const profileImage = document.querySelector('.profile-image');
    const nameElement = document.getElementById('animated-name');
    
    profileImage.addEventListener('click', () => {
        // Remove existing animation
        nameElement.classList.remove('name-highlight');
        
        // Force reflow to restart animation
        void nameElement.offsetWidth;
        
        // Add animation class
        nameElement.classList.add('name-highlight');
        
        // Remove class after animation completes
        setTimeout(() => {
            nameElement.classList.remove('name-highlight');
        }, 1000);
    });
});

// Add name highlight effect on profile photo click
document.addEventListener('DOMContentLoaded', () => {
    const profileImage = document.querySelector('.profile-image');
    const name = document.getElementById('animated-name');

    profileImage.addEventListener('click', () => {
        // Remove existing animation class
        name.classList.remove('name-highlight-effect');
        
        // Force DOM reflow
        void name.offsetWidth;
        
        // Add animation class
        name.classList.add('name-highlight-effect');
        
        // Create highlight particles
        for (let i = 0; i < 10; i++) {
            createHighlightParticle(name);
        }
    });

    function createHighlightParticle(element) {
        const particle = document.createElement('div');
        const rect = element.getBoundingClientRect();
        
        particle.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: var(--accent-${Math.ceil(Math.random() * 3)});
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
        `;
        
        // Random starting position around the name
        particle.style.left = rect.left + rect.width * Math.random() + 'px';
        particle.style.top = rect.top + rect.height * Math.random() + 'px';
        
        document.body.appendChild(particle);
        
        // Animate particle
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 4;
        const tx = Math.cos(angle) * 100 * Math.random();
        const ty = Math.sin(angle) * 100 * Math.random();
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => particle.remove();
    }
});

// Add greeting animation
document.addEventListener('DOMContentLoaded', () => {
    const greeting = document.querySelector('.greeting-container');
    
    // Show greeting
    setTimeout(() => {
        greeting.style.display = 'flex';
    }, 1000);
    
    // Hide greeting after 5 seconds
    setTimeout(() => {
        greeting.style.animation = 'slideIn 0.5s ease reverse';
        setTimeout(() => {
            greeting.style.display = 'none';
        }, 500);
    }, 5000);
});

// Add hamburger menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Back to Top Button functionality
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('back-to-top-btn');
    if (btn) {
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
