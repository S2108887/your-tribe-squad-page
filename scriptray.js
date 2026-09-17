const cards = document.querySelectorAll('.card-preview > div');
const prevBtn = document.querySelector('.arrow.prev-btn') || document.querySelectorAll('.arrow')[0];
const nextBtn = document.querySelector('.arrow.next-btn') || document.querySelectorAll('.arrow')[1];
const searchInput = document.querySelector('.search input');

let currentIndex = 0;


function updateCarousel() {
    
    cards.forEach(card => {
        card.style.display = ''; 
        card.classList.remove('active', 'prev', 'next');
    });

   
    const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
    const nextIndex = (currentIndex + 1) % cards.length;

    cards[currentIndex].classList.add('active');
    cards[prevIndex].classList.add('prev');
    cards[nextIndex].classList.add('next');
}


if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    });
}


if (searchInput) {
    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase().trim();

        
        if (filter === '') {
            updateCarousel();
            return;
        }

        
        cards.forEach(card => {
            const cardName = card.innerText.trim().toLowerCase();
            
            card.classList.remove('active', 'prev', 'next');

            if (cardName.startsWith(filter)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

updateCarousel();