// Video Portfolio Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Video files in the portfolio folder - currently empty for future uploads
    const videoFiles = [];
    
    const videoContainer = document.getElementById('video-portfolio');
    
    // Create video cards for each video file
    videoFiles.forEach(videoFile => {
        // Extract title from filename (remove .mp4 extension)
        const title = videoFile.replace('.mp4', '').replace(/_/g, ' ');
        
        // Create portfolio item
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        
        // Create video element with lazy loading
        const video = document.createElement('video');
        video.className = 'portfolio-video';
        video.controls = false;
        video.loop = true;
        video.muted = true; // Start muted
        video.preload = 'none'; // Lazy loading
        video.innerHTML = `<source src="portfolio/${videoFile}" type="video/mp4">`;
        
        // Create audio toggle icon
        const audioToggle = document.createElement('div');
        audioToggle.className = 'audio-toggle muted';
        audioToggle.title = 'Toggle audio';
        
        // Create info section
        const infoDiv = document.createElement('div');
        infoDiv.className = 'portfolio-info';
        infoDiv.innerHTML = `<h3>${title}</h3>`;
        
        // Append elements
        portfolioItem.appendChild(video);
        portfolioItem.appendChild(audioToggle);
        portfolioItem.appendChild(infoDiv);
        videoContainer.appendChild(portfolioItem);
        
        // Audio toggle functionality
        let isMuted = true;
        
        audioToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            isMuted = !isMuted;
            video.muted = isMuted;
            
            if (isMuted) {
                audioToggle.className = 'audio-toggle muted';
            } else {
                audioToggle.className = 'audio-toggle unmuted';
            }
        });
        
        // Add hover effect to play/pause video
        portfolioItem.addEventListener('mouseenter', () => {
            video.play().catch(e => console.log("Auto-play prevented:", e));
        });
        
        portfolioItem.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Play video when in view
                const video = entry.target.querySelector('video');
                if (video) {
                    video.preload = 'auto';
                }
            }
        });
    }, observerOptions);
    
    // Observe all portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        observer.observe(item);
    });
    
    // Form submission handling
    document.addEventListener('DOMContentLoaded', function() {
        // Improved Form submission handling
        const form = document.querySelector("form");
        if (form) {
            form.addEventListener("submit", function (e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(form);
                
                // Send form data via FormSubmit
                fetch(form.action, {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        // Show success toast message
                        alert("✅ Thanks for reaching out! Your message has been sent successfully.");
                        
                        // Reset form
                        form.reset();
                        
                        // Open WhatsApp after a short delay
                        setTimeout(() => {
                            window.open("https://wa.me/7977649205?text=Hello%20Keval,%20I%20just%20filled%20the%20contact%20form%20on%20World%20Edits!", "_blank");
                        }, 1000);
                    } else {
                        throw new Error('Form submission failed');
                    }
                }).catch(error => {
                    console.error('Error:', error);
                    alert("❌ Oops! Something went wrong. Please try again later.");
                });
            });
        }
    });
});