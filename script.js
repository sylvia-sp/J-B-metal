// Loading Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1000);
});

// Custom Cursor
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '24px';
        cursor.style.height = '24px';
        cursor.style.transform = 'translate(-50%, -50%) scale(1.2)';
        cursor.style.backgroundColor = 'var(--secondary-color)';
        cursor.style.borderColor = 'var(--primary-color)';
        cursor.style.borderWidth = '3px';
        cursor.style.boxShadow = '0 0 0 2px rgba(26, 26, 26, 0.3)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '16px';
        cursor.style.height = '16px';
        cursor.style.transform = 'translate(-50%, -50%)';
        cursor.style.backgroundColor = 'var(--primary-color)';
        cursor.style.borderColor = 'var(--primary-color)';
        cursor.style.borderWidth = '2px';
        cursor.style.boxShadow = '0 0 0 2px rgba(255, 255, 255, 0.1)';
    });
});

// Sticky Header
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Product Drawing Parallax Animation
const productDrawing = document.querySelector('.landing-drawing');

function animateProductDrawing() {
    if (productDrawing) {
        const scrollPosition = window.scrollY;
        const heroSection = document.querySelector('.landing-header');
        
        if (heroSection) {
            const heroHeight = heroSection.offsetHeight;
            const scrollPercentage = Math.min(scrollPosition / heroHeight, 1);
            
            // Parallax effect - moves slower than scroll
            const translateY = scrollPosition * 0.3;
            const translateX = scrollPosition * 0.15;
            const rotate = scrollPosition * 0.05;
            
            // Fade out as you scroll
            const opacity = 1 - (scrollPercentage * 0.7);
            
            // Apply transformations
            productDrawing.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`;
            productDrawing.style.opacity = opacity;
        }
    }
}

// Call on scroll
window.addEventListener('scroll', animateProductDrawing);

// Initialize on load
animateProductDrawing();

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Web3Forms Integration
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            formMessage.textContent = 'Thank you! Your message has been sent successfully.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            form.reset();
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        formMessage.textContent = 'Oops! There was an error sending your message. Please try again.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
    }
});

// Intersection Observer for Fade-in Animations
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

document.querySelectorAll('.service-card, .stat-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

//Scroll progress indicator
// const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
//    const scrollPercentage = (window.scrollY / scrollHeight) * 100;
//    progressBar.style.width = Math.min(scrollPercentage, 100) + '%';
 // Scroll Progress Bar
 const progressBar = document.getElementById('progressBar');
 const scrollProgressContainer = document.querySelector('.scroll-progress');
        
 function updateScrollProgress() {
     // Calculate the maximum scrollable height
     const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
     
     // Calculate current scroll percentage
     const scrollPercentage = (window.scrollY / scrollHeight) * 100;
     
     // Update progress bar width (capped at 100%)
     progressBar.style.width = Math.min(scrollPercentage, 100) + '%';
 }

 // Position progress bar at the bottom of the header
 function positionProgressBar() {
     if (scrollProgressContainer && header) {
         const headerHeight = header.offsetHeight;
         scrollProgressContainer.style.top = headerHeight + 'px';
     }
 }

 // Combined scroll event listener
 window.addEventListener('scroll', () => {
     updateScrollProgress();
 });

 // Update progress bar position on resize and load
 window.addEventListener('resize', () => {
     positionProgressBar();
     updateScrollProgress();
 });

 // Initialize on page load
 positionProgressBar();
 updateScrollProgress();

//Modal popup
const images = [
    {
        src: 'assets/images/mig-welding.jpg',
        caption: 'Precision in every spark—MIG welding at its finest.'
    },
    {
        src: 'assets/images/tig-welding.jpg',
        caption: 'Precision TIG Welding Services – Flawless brass joints, zero defects, delivered on time. From prototypes to production runs, we fuse perfection into every piece.'
    },
    {
        src: 'assets/images/laser-cutting.jpg',
        caption: 'Laser cutting delivers razor-thin kerf, mirror-smooth edges, and zero tool wear on steel, aluminum, brass, titanium, and exotics up to 1.5" thick. From intricate prototypes to high-volume production, we turn your CAD into reality in hours, not days.'
    },
    {
        src: 'assets/images/shearing.jpg',
        caption: 'Our Shearing Service – Built for Speed & Precision'
    },
    {
        src: 'assets/images/press-break-forming.jpg',
        caption: 'From sheet to shape in seconds. Our 220-ton CNC press brakes deliver ±0.5° bend accuracy on stainless, aluminum, and high-strength alloys up to 1" thick and 14 ft long. Complex geometries, zero orange peel, perfect repeatability—every time'
    },
    {
        src: 'assets/images/metal-polishing.jpg',
        caption: 'From #4 brushed to #8 mirror in 24 hours. Our automated wet-belt and rotary polishers deliver flawless, Ra < 4 µin finishes on stainless, aluminum, brass, and titanium—up to 60" wide and 20 ft long. No haze. No orange peel. Just pure reflection'
    },
    {
        src: 'assets/images/infield-installing.jpg',
        caption: 'Infield Measuring & Installs – Done Right, First Time, On Your Floor'
    },
    {
        src: 'assets/images/bobcad-drawing.jpg',
        caption: 'Custom Design & Fabrication – Your Vision, Our Precision' //From napkin sketch to finished metal—no idea too complex. Our engineers turn your BobCAD, SolidWorks, or hand-drawn concepts into production-ready parts with ±0.001" accuracy. One-offs, short runs, or full assemblies: laser, brake, weld, polish, ship—all under one roof.
    }
];

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const closeModal = document.getElementById('closeModal');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const counter = document.getElementById('counter');
const caption = document.getElementById('caption');
const openGalleryBtn = document.getElementById('openGalleryBtn');
const thumbnailStrip = document.getElementById('thumbnailStrip');

let currentIndex = 0;

// Generate thumbnails
function generateThumbnails() {
    thumbnailStrip.innerHTML = '';
    images.forEach((img, index) => {
        const thumb = document.createElement('div');
        thumb.className = 'thumbnail';
        thumb.innerHTML = `<img src="${img.src}" alt="Thumbnail ${index + 1}">`;
        thumb.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = index;
            updateModal();
        });
        thumbnailStrip.appendChild(thumb);
    });
}

// Open gallery button
openGalleryBtn.addEventListener('click', () => {
    openModal(0);
});

// Open modal
function openModal(index) {
    currentIndex = index;
    modal.classList.add('active');
    generateThumbnails();
    updateModal();
}

// Update modal content
function updateModal() {
    modalImg.src = images[currentIndex].src;
    caption.textContent = images[currentIndex].caption;
    counter.textContent = `${currentIndex + 1} / ${images.length}`;
    
    // Update active thumbnail
    const thumbnails = thumbnailStrip.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        if (index === currentIndex) {
            thumb.classList.add('active');
            thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Close modal
closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Close on background click
modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-inner')) {
        modal.classList.remove('active');
    }
});

// Previous image
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateModal();
});

// Next image
nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    updateModal();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateModal();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % images.length;
            updateModal();
        } else if (e.key === 'Escape') {
            modal.classList.remove('active');
        }
    }
});