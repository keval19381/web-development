// Video Portfolio Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Video files in the portfolio folder
    const videoFiles = [
        "Advertisement.mp4",
        "Basic Yet Effective.mp4",
        "Before and After 2.mp4",
        "Before and After.mp4",
        "Devotional.mp4",
        "Documentry.mp4",
        "Gym_ Fitness Content.mp4",
        "How 35 dollar edit looks like.mp4",
        "Motivational.mp4",
        "Outreach Videos .mp4",
        "Podcast Edit.mp4",
        "Podcast.mp4",
        "Real Estate Pitch .mp4",
        "Real Estate._",
        "Restaurant 21.mp4",
        "Sigma edits.mp4",
        "Slow pace.mp4",
        "Women Empowerment Reel.mp4",
        "gym edit.mp4",
        "motivation and self help.mp4",
        "podcast clip edit (hindi).mp4",
        "podcast clips.mp4",
        "real estate coach.mp4",
        "upgrading the content .mp4"
    ];
    
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
});