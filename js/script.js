document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    const cards = document.querySelectorAll('.card');
    const buttons = document.querySelectorAll('.btn');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);
    
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
    fadeElements.forEach(el => observer.observe(el));
    
    const animateOnScroll = () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroSection.style.opacity = 1 - (scrolled * 0.001);
        }
    };
    
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            (currentPath === '/' && link.getAttribute('href') === 'index.html') ||
            (currentPath.endsWith('index.html') && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
        
        animateOnScroll();
    });
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
            ripple.style.left = e.clientX - rect.left - (Math.max(rect.width, rect.height) / 2) + 'px';
            ripple.style.top = e.clientY - rect.top - (Math.max(rect.width, rect.height) / 2) + 'px';
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    const letters = document.querySelectorAll('.hero h1');
    letters.forEach(heading => {
        const text = heading.textContent;
        heading.innerHTML = text.split('').map((char, i) => 
            `<span style="animation-delay: ${i * 0.05}s">${char}</span>`
        ).join('');
    });
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

function initMap() {
    const clinicLocation = { lat: 35.8278, lng: 139.7208 };
    
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: clinicLocation,
        styles: [
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [{ "visibility": "off" }]
            },
            {
                "featureType": "transit",
                "elementType": "labels",
                "stylers": [{ "visibility": "off" }]
            }
        ]
    });
    
    const marker = new google.maps.Marker({
        position: clinicLocation,
        map: map,
        title: "新井町内科消化器クリニック"
    });
    
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px;">
                <h3 style="margin-bottom: 5px;">新井町内科消化器クリニック</h3>
                <p style="margin: 0;">〒332-0005 埼玉県川口市新井町16-1</p>
            </div>
        `
    });
    
    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });
}