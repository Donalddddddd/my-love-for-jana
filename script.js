// Milestone Tracker - Countdown from March 9, 2025 at 11:00 PM
function updateMilestoneCounter() {
    const startDate = new Date('March 9, 2025 23:00:00').getTime();
    const now = new Date().getTime();
    const difference = now - startDate;
    
    // Calculate days, hours, minutes, seconds
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Calculate months
    const months = Math.floor(days / 30.44); // Average days in a month
    
    // Update the DOM
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    document.getElementById('total-months').textContent = months;
}

// Love Book Functionality
function initLoveBook() {
    const bookCover = document.getElementById('bookCover');
    const bookContent = document.getElementById('bookContent');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const closeBtn = document.getElementById('closeBtn');
    const currentPageEl = document.getElementById('currentPage');
    const totalPagesEl = document.getElementById('totalPages');
    
    const pages = document.querySelectorAll('.page');
    const totalPages = pages.length;
    let currentPage = 1;
    
    // Set total pages
    totalPagesEl.textContent = totalPages;
    
    // Open book when cover is clicked
    bookCover.addEventListener('click', () => {
        bookCover.style.display = 'none';
        bookContent.classList.add('active');
    });
    
    // Close book
    closeBtn.addEventListener('click', () => {
        bookContent.classList.remove('active');
        bookCover.style.display = 'block';
    });
    
    // Function to show a specific page
    function showPage(pageNumber) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.add('hidden');
        });
        
        // Show the requested page
        const pageToShow = document.getElementById(`page${pageNumber}`);
        if (pageToShow) {
            pageToShow.classList.remove('hidden');
            currentPageEl.textContent = pageNumber;
            currentPage = pageNumber;
            
            // Update button states
            prevBtn.disabled = (pageNumber === 1);
            nextBtn.disabled = (pageNumber === totalPages);
        }
    }
    
    // Next page
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            showPage(currentPage + 1);
        }
    });
    
    // Previous page
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    });
    
    // Initialize with first page
    showPage(1);
}

// Photo Card Hover Effect Enhancement
function initPhotoCards() {
    const photoCards = document.querySelectorAll('.photocard');
    
    photoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const img = card.querySelector('img');
            img.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            const img = card.querySelector('img');
            img.style.transform = 'scale(1)';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start the milestone counter
    updateMilestoneCounter();
    setInterval(updateMilestoneCounter, 1000);
    
    // Initialize the love book
    initLoveBook();
    
    // Initialize photo cards
    initPhotoCards();
    
    // Add some interactive fun to the footer notes
    const notes = document.querySelectorAll('.note');
    notes.forEach(note => {
        note.addEventListener('click', () => {
            const icon = note.querySelector('i');
            // Toggle between solid and regular heart
            if (icon.classList.contains('fa-solid')) {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
            } else {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
            }
        });
    });
    
    // Add a subtle animation to the header
    const headerTitle = document.querySelector('header h1');
    headerTitle.addEventListener('mouseenter', () => {
        headerTitle.style.transform = 'scale(1.05)';
        headerTitle.style.transition = 'transform 0.3s ease';
    });
    
    headerTitle.addEventListener('mouseleave', () => {
        headerTitle.style.transform = 'scale(1)';
    });
    
    // Add floating hearts animation to the book cover
    const bookCover = document.getElementById('bookCover');
    bookCover.addEventListener('mouseenter', createFloatingHearts);
    
    function createFloatingHearts() {
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '<i class="fas fa-heart"></i>';
            heart.style.position = 'absolute';
            heart.style.color = '#ffddd2';
            heart.style.fontSize = Math.random() * 20 + 15 + 'px';
            heart.style.left = Math.random() * 80 + 10 + '%';
            heart.style.top = Math.random() * 80 + 10 + '%';
            heart.style.opacity = '0.7';
            heart.style.zIndex = '1';
            heart.style.pointerEvents = 'none';
            heart.style.animation = `floatHeart ${Math.random() * 2 + 3}s ease-in-out forwards`;
            
            bookCover.appendChild(heart);
            
            // Remove heart after animation completes
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 5000);
        }
    }
    
    // Add CSS for floating hearts animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatHeart {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.7;
            }
            100% {
                transform: translateY(-100px) rotate(20deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});