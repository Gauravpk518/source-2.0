function videoPlay() {
    const containers = document.querySelectorAll('.container, .container-2, .container-3, .container-4');
    const videos = document.querySelectorAll('video');
    
    // Custom order: container(0) → container-2(1) → container-4(3) → container-3(2)
    const customOrder = [0, 1, 3, 2];
    
    // Pick a random position in the custom order
    const randomPosition = Math.floor(Math.random() * customOrder.length);
    const randomContainerIndex = customOrder[randomPosition];
    
    let currentPosition = 0;
    const highlightSpeed = 250; // milliseconds per highlight
    const totalSpins = 3; // number of complete rotations before landing
    const totalHighlights = totalSpins * customOrder.length + randomPosition;
    let highlightCount = 0;
    
    // Remove any existing highlight
    containers.forEach(container => container.classList.remove('highlight'));
    
    const highlightInterval = setInterval(() => {
        // Remove highlight from all containers
        containers.forEach(container => container.classList.remove('highlight'));
        
        // Add highlight to next container in custom order
        currentPosition = highlightCount % customOrder.length;
        const containerIndex = customOrder[currentPosition];
        containers[containerIndex].classList.add('highlight');
        
        highlightCount++;
        
        // Stop when landing on the random container
        if (highlightCount > totalHighlights) {
            clearInterval(highlightInterval);
            
            // 🔥 Fade background to black
            document.body.classList.add('video-playing');
            
            // Play the selected video only
            videos.forEach((video, index) => {
                if (index === randomContainerIndex) {
                    video.play();
                } else {
                    video.pause();
                    video.currentTime = 0;
                }
            });
            
            // 🔥 Remove fade ONLY when video ends
            videos[randomContainerIndex].addEventListener(
                'ended',
                () => {
                    document.body.classList.remove('video-playing');
                },
                { once: true }
            );
        }
    }, highlightSpeed);
}
