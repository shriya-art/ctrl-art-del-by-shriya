document.addEventListener('DOMContentLoaded', () => {

    // --- Master Image Data ---
    // Dynamically load all images in the images folder for the gallery autoscroll
    // If you add new images, just update this array or automate with backend/Node.js if needed.
    // Use thumbnail images as the main gallery images
    const thumbnailImages = [
        'thumbnail/WhatsApp Image 2025-07-24 at 18.12.32_7678e410.jpg', // Index 0
        'thumbnail/WhatsApp Image 2025-07-24 at 18.58.34_0bb16db9.jpg', // Index 1
        'thumbnail/WhatsApp Image 2025-07-24 at 18.58.34_48d8d4bb.jpg', // Index 2
        'thumbnail/WhatsApp Image 2025-07-24 at 18.58.34_5b5507ec.jpg', // Index 3 (This is your current 'Side Hustle' featured image)
        'thumbnail/WhatsApp Image 2025-07-24 at 18.58.34_7b679cb2.jpg', // Index 4
        'thumbnail/WhatsApp Image 2025-07-24 at 18.58.34_9479d531.jpg', // Index 5
        'thumbnail/WhatsApp Image 2025-07-24 at 18.58.34_e664c249.jpg', // Index 6
        'thumbnail/WhatsApp Image 2025-07-24 at 18.58.34_ee112d43.jpg', // Index 7
        'thumbnail/WhatsApp Image 2025-07-24 at 18.58.34_fcb7b454.jpg', // Index 8
        'thumbnail/WhatsApp Image 2025-07-24 at 19.19.18_39dd77d0.jpg', // Index 9
    ];

    // Use thumbnail as first image in carousel, then add any detail images (if you want to add more, update here)
    const masterPaintingData = [
        {
            src: thumbnailImages[0],
            title: 'Falling Radiance',
            description: 'Capturing the soft descent of light, a gentle glow on canvas.',
            detailImages: [thumbnailImages[0]]
        },
        {
            src: thumbnailImages[1],
            title: 'Nonchalance',
            description: 'Effortless elegance in every stroke, a serene indifference.',
            detailImages: [thumbnailImages[1]]
        },
        {
            src: thumbnailImages[2],
            title: 'Dusk Whispers',
            description: 'The hushed tones of twilight, secrets carried on a gentle breeze.',
            detailImages: [thumbnailImages[2]]
        },
        {
            src: thumbnailImages[3], // This is your featured artwork (originally "Side Hustle")
            title: 'Nature Drift',
            description: 'Flowing organic forms, a serene journey through natural landscapes.',
            detailImages: [
                thumbnailImages[3],
                // Add more detail images for "Nature Drift" here if you have them
            ]
        },
        {
            src: thumbnailImages[4],
            title: 'Inner Glow',
            description: 'Radiant warmth from within, a light that illuminates the soul.',
            detailImages: [thumbnailImages[4]]
        },
        {
            src: thumbnailImages[5],
            title: 'Ancient Stillness',
            description: 'Timeless peace, a moment suspended in eternal quiet.',
            detailImages: [thumbnailImages[5]]
        },
        {
            src: thumbnailImages[6],
            title: 'Royal Bloom', // SWAPPED: This was 'Timeless Roots'
            description: ' Majestic blossoms unfurling, a symbol of dignified beauty.', // SWAPPED DESCRIPTION
            detailImages: [thumbnailImages[6]]
        },
        {
            src: thumbnailImages[7],
            title: 'Starlit Reverie',
            description: 'Dreaming under a canopy of stars, celestial inspiration.',
            detailImages: [thumbnailImages[7]]
        },
        {
            src: thumbnailImages[8],
            title: 'Timeless Roots', // SWAPPED: This was 'Royal Bloom'
            description: 'Connecting to origins, strength drawn from enduring foundations.', // SWAPPED DESCRIPTION
            detailImages: [thumbnailImages[8]]
        },
        {
            src: thumbnailImages[9],
            title: 'Life Goal',
            description: 'A vibrant vision of aspiration, the pursuit of ultimate purpose.',
            detailImages: [thumbnailImages[9]]
        }
    ];

    // --- Hero Section Animation (Title only) ---
    const heroTitle = document.querySelector('.hero-title');
    setTimeout(() => {
        heroTitle.classList.add('is-visible');
    }, 500);


    // --- Background Auto-Scrolling Gallery Logic ---
    const backgroundGalleryContainer = document.getElementById('background-gallery-container');
    const backgroundGalleryGrid = document.getElementById('background-gallery-grid');
    let bgScrollPosition = 0;
    const bgScrollSpeed = 2.5; // Increased speed for faster autoscroll
    let bgAnimationFrameId;

    // Only use these images for the background autoscroll gallery
    const backgroundGalleryImages = [
        'images/WhatsApp Image 2025-07-24 at 18.12.32_093bd4bf.jpg',
        'images/WhatsApp Image 2025-07-24 at 18.12.32_256c073d.jpg',
        'images/WhatsApp Image 2025-07-24 at 18.12.32_588c50ad.jpg',
        'images/WhatsApp Image 2025-07-24 at 18.12.32_7678e410.jpg',
        'images/WhatsApp Image 2025-07-24 at 18.12.32_d79e7a34.jpg',
        'images/WhatsApp Image 2025-07-24 at 18.12.32_e8078688.jpg',
        'images/WhatsApp Image 2025-07-24 at 18.12.32_fa1fddd3.jpg',
        // Add more as needed
    ];

    // Duplicate images many times for continuous background loop
    const bgDuplicatedPaintingData = [];
    for (let i = 0; i < 5; i++) { // Duplicate 5 times
        bgDuplicatedPaintingData.push(...backgroundGalleryImages);
    }

    const createBackgroundGalleryItem = (src) => {
        const item = document.createElement('div');
        item.classList.add('background-gallery-item');
        item.innerHTML = `<img src="${src}" alt="Artwork">`;
        return item;
    };

    bgDuplicatedPaintingData.forEach(src => {
        backgroundGalleryGrid.appendChild(createBackgroundGalleryItem(src));
    });

    const bgGalleryItems = Array.from(backgroundGalleryGrid.children);

    const updateBackgroundGallery = () => {
        bgScrollPosition += bgScrollSpeed;

        const containerWidth = backgroundGalleryContainer.offsetWidth;
        const firstItemWidth = bgGalleryItems[0] ? bgGalleryItems[0].offsetWidth : 0;
        const gapWidth = 30; // Defined in CSS for .background-gallery-grid
        const totalWidthOfOneSet = masterPaintingData.length * (firstItemWidth + gapWidth);

        if (bgScrollPosition >= totalWidthOfOneSet) {
            bgScrollPosition -= totalWidthOfOneSet;
        }
        
        backgroundGalleryGrid.style.transform = `translateX(-${bgScrollPosition}px)`;

        const containerCenter = backgroundGalleryContainer.getBoundingClientRect().left + containerWidth / 2;
        let closestBgItem = null;
        let minBgDistance = Infinity;

        bgGalleryItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.left + itemRect.width / 2;
            const distance = Math.abs(containerCenter - itemCenter);

            if (distance < minBgDistance) {
                minBgDistance = distance;
                closestBgItem = item;
            }
        });

        if (closestBgItem) {
            bgGalleryItems.forEach(item => item.classList.remove('is-active'));
            closestBgItem.classList.add('is-active');
        }

        bgAnimationFrameId = requestAnimationFrame(updateBackgroundGallery);
    };

    bgAnimationFrameId = requestAnimationFrame(updateBackgroundGallery);


    // --- Main Gallery Grid Generation (Featured Painting + 9 Thumbnails) ---
    const mainGalleryGrid = document.getElementById('main-gallery-grid');
    
    // The very first painting for the large featured thumbnail
    const featuredPaintingData = masterPaintingData[3]; // Still points to index 3 for the featured spot
    
    // Function to create a standard main gallery item
    // Dynamically size grid item based on image aspect ratio
    const createMainGalleryItem = (painting, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('main-gallery-item');
        const img = document.createElement('img');
        img.src = painting.src;
        img.alt = painting.title;
        img.style.objectFit = 'cover'; // Always fill the grid cell, no white space
        img.onload = function() {
            const aspect = img.naturalWidth / img.naturalHeight;
            // Make artwork 4 (index 3) the largest
            if (index === 3) { // This condition uses the original index from masterPaintingData
                galleryItem.style.gridColumn = 'span 3';
                galleryItem.style.gridRow = 'span 3';
            } else {
                // All others: increase size by 0.5x (span 1.5, round up)
                let colSpan = 1, rowSpan = 1;
                if (aspect > 1.3) {
                    colSpan = 2; rowSpan = 1;
                } else if (aspect < 0.8) {
                    colSpan = 1; rowSpan = 2;
                }
                // Increase by 0.5x (span 1.5 -> 2, 2 -> 3, 1 -> 2)
                colSpan = Math.ceil(colSpan * 1.5);
                rowSpan = Math.ceil(rowSpan * 1.5);
                galleryItem.style.gridColumn = `span ${colSpan}`;
                galleryItem.style.gridRow = `span ${rowSpan}`;
            }
        };
        galleryItem.appendChild(img);
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        overlay.innerHTML = `<h3>${painting.title}</h3><p>${painting.description}</p>`;
        galleryItem.appendChild(overlay);
        galleryItem.dataset.paintingIndex = index; // Store original index for lightbox
        return galleryItem;
    };

    // Create all gallery items as a dynamic collage
    // Make artwork 4 (index 3 from masterPaintingData) central and on its own row
    
    // 1. Add artwork 4 (the featured one) as a special central item first
    const mainFeaturedArt = createMainGalleryItem(masterPaintingData[3], 3); // Use original index 3
    mainFeaturedArt.classList.add('main-featured-masonry'); // Add class for specific CSS styling
    mainGalleryGrid.appendChild(mainFeaturedArt);

    // 2. Add all other artworks (excluding index 3) in a specific order
    const reorderedIndexes = [9, 0, 1, 2, 4, 5, 6, 7, 8]; 
    reorderedIndexes.forEach((idx) => {
        const item = createMainGalleryItem(masterPaintingData[idx], idx);
        mainGalleryGrid.appendChild(item);
    });


    // --- Scroll-Based Animations for Main Gallery & Sections ---
    const scrollAnimationOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // observer.unobserve(entry.target); // Uncomment if you want animation to play only once
            } else {
                 // entry.target.classList.remove('is-visible'); // Uncomment if you want elements to hide on scroll out
            }
        });
    }, scrollAnimationOptions);

    document.querySelectorAll('.section-title').forEach(title => {
        scrollObserver.observe(title);
    });
    document.querySelector('.about-content') && scrollObserver.observe(document.querySelector('.about-content'));
    document.querySelector('.instagram-button') && scrollObserver.observe(document.querySelector('.instagram-button'));

    // Observe main gallery items with a staggered delay
    const allGalleryItems = document.querySelectorAll('.main-gallery-item');
    allGalleryItems.forEach((item, index) => {
        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                        itemObserver.unobserve(entry.target); // Observe once
                    }, index * 100); // Staggered animation
                }
            });
        }, { ...scrollAnimationOptions, threshold: 0.1 });
        itemObserver.observe(item);
    });


    // --- Lightbox with Image Carousel ---
    const lightbox = document.getElementById('lightbox');
    const closeButton = lightbox.querySelector('.close-button');
    const carouselTrack = document.getElementById('carousel-track');
    const carouselPrevBtn = document.getElementById('carousel-prev');
    const carouselNextBtn = document.getElementById('carousel-next');
    const carouselDotsContainer = document.getElementById('carousel-dots');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');

    let currentCarouselIndex = 0;
    let currentPaintingDetailImages = []; // Stores the 3 images for the current painting

    const showImageInCarousel = (index) => {
        // Ensure carouselTrack has children before trying to get offsetWidth
        const itemWidth = carouselTrack.children[0] ? carouselTrack.children[0].offsetWidth : 0;
        carouselTrack.style.transform = `translateX(-${index * itemWidth}px)`;
        
        // Update dots
        Array.from(carouselDotsContainer.children).forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    };

    const navigateCarousel = (direction) => {
        currentCarouselIndex += direction;
        if (currentCarouselIndex < 0) {
            currentCarouselIndex = currentPaintingDetailImages.length - 1;
        } else if (currentCarouselIndex >= currentPaintingDetailImages.length) {
            currentCarouselIndex = 0;
        }
        showImageInCarousel(currentCarouselIndex);
    };

    carouselPrevBtn.addEventListener('click', () => navigateCarousel(-1));
    carouselNextBtn.addEventListener('click', () => navigateCarousel(1));

    // Event listener for opening lightbox from any main gallery item
    mainGalleryGrid.addEventListener('click', (e) => {
        const clickedItem = e.target.closest('.main-gallery-item');
        if (clickedItem) {
            // Get the original index from the dataset, which links back to masterPaintingData
            const paintingIndex = parseInt(clickedItem.dataset.paintingIndex);
            const painting = masterPaintingData[paintingIndex];

            if (painting && painting.detailImages && painting.detailImages.length > 0) {
                currentPaintingDetailImages = painting.detailImages;
                currentCarouselIndex = 0; // Reset to first image

                // Clear previous carousel items
                carouselTrack.innerHTML = '';
                carouselDotsContainer.innerHTML = '';

                // Populate carousel with detail images
                currentPaintingDetailImages.forEach((src, index) => {
                    const carouselItem = document.createElement('div');
                    carouselItem.classList.add('carousel-item');
                    carouselItem.innerHTML = `<img src="${src}" alt="${painting.title} - ${index + 1}">`;
                    carouselTrack.appendChild(carouselItem);

                    const dot = document.createElement('span');
                    dot.classList.add('dot');
                    dot.addEventListener('click', () => {
                        currentCarouselIndex = index;
                        showImageInCarousel(currentCarouselIndex);
                    });
                    carouselDotsContainer.appendChild(dot);
                });

                // Update lightbox text
                lightboxTitle.textContent = painting.title;
                lightboxDescription.textContent = painting.description;

                // Show the first image and activate lightbox
                showImageInCarousel(currentCarouselIndex);
                lightbox.classList.add('active');
            }
        }
    });

    closeButton.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    // Close lightbox when clicking on the overlay outside the content
    lightbox.addEventListener('click', e => {
        if (e.target.id === 'lightbox') {
            lightbox.classList.remove('active');
        }
    });

    // Add keyboard navigation for carousel
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                navigateCarousel(-1);
            } else if (e.key === 'ArrowRight') {
                navigateCarousel(1);
            } else if (e.key === 'Escape') {
                lightbox.classList.remove('active');
            }
        }
    });

    // Recalculate carousel item width on window resize to ensure smooth transitions
    window.addEventListener('resize', () => {
        if (lightbox.classList.contains('active')) {
            showImageInCarousel(currentCarouselIndex); // Re-center
        }
    });
});