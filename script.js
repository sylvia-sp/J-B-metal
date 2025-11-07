// Loading Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1000);
});

// Custom Cursor
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 50);
});

document.querySelectorAll('a, button, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
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

//Modal popup
const images = [
    {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        caption: 'Beautiful mountain landscape at sunset'
    },
    {
        src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
        caption: 'Misty forest with morning light'
    },
    {
        src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
        caption: 'Serene lake reflection'
    },
    {
        src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
        caption: 'Desert canyon at golden hour'
    },
    {
        src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
        caption: 'Dense green wilderness'
    },
    {
        src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800',
        caption: 'Peaceful countryside pathway'
    },
    {
        src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800',
        caption: 'Ocean waves meeting the shore'
    },
    {
        src: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800',
        caption: 'Dramatic cloudy sky over mountains'
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