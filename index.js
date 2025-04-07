// DOM Elements
// Add this at the top of your index.js

function checkLogin() {
    if (localStorage.getItem('userLoggedIn') !== 'true') {
        window.location.href = 'index.html';
    }
}

// Call this function at the start of your main initialization
document.addEventListener('DOMContentLoaded', function() {
    checkLogin();
    
    // Your existing initialization code...
});

// Add logout functionality
function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');
            window.location.href = 'index.html';
        });
    }
}

// Call this when showing store content
function initStore() {
    setupLogout();
    // Your existing store initialization...
}

// Update your existing hamburger menu code to include logout
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Add logout button to mobile menu if it doesn't exist
    if (!document.querySelector('.nav-links .logout-mobile')) {
        const logoutMobile = document.createElement('li');
        logoutMobile.className = 'logout-mobile';
        logoutMobile.innerHTML = '<a href="#" id="logoutMobileBtn"><i class="fas fa-sign-out-alt"></i> Logout</a>';
        document.querySelector('.nav-links ul').appendChild(logoutMobile);
        
        document.getElementById('logoutMobileBtn').addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');
            window.location.href = 'index.html';
        });
    }
});
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const searchBtn = document.querySelector('.search-btn');
const searchModal = document.querySelector('.search-modal');
const closeSearch = document.querySelector('.close-search');
const cartBtn = document.querySelector('.cart-btn');
const cartSidebar = document.querySelector('.cart-sidebar');
const closeCart = document.querySelector('.close-cart');
const newsletterForm = document.querySelector('.newsletter-form');
const searchForm = document.querySelector('.search-form');
const productsGrid = document.getElementById('featured-products');
// In your script.js
document.addEventListener('DOMContentLoaded', function() {
    // Your code here
  });
// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Search Modal Toggle
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchModal.classList.add('open');
});

closeSearch.addEventListener('click', () => {
    searchModal.classList.remove('open');
});

// Cart Sidebar Toggle
cartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cartSidebar.classList.add('open');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
});

// Newsletter Form Submission
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    // Here you would typically send this to your backend
    alert(`Thank you for subscribing with ${email}! Check your email for your discount code.`);
    e.target.reset();
});

// Search Form Submission
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = e.target.querySelector('input').value;
    // Here you would typically fetch search results
    alert(`Searching for: ${query}`);
    e.target.reset();
});

// Sample Product Data
const products = [
    {
        id: 1,
        title: "KDMV Signature Tee",
        price: 49.99,
        image: "images/product-1.jpg",
        category: "men-tees",
        badge: "Bestseller"
    },
    {
        id: 2,
        title: "KDMV Ori Hoodie",
        price: 79.99,
        image: "images/product-2.jpg",
        category: "men-hoodies",
        badge: "New"
    },
    {
        id: 3,
        title: "Streetwear Sweatpants",
        price: 59.99,
        image: "images/product-3.jpg",
        category: "men-pants",
        badge: ""
    },
    {
        id: 4,
        title: "Women's Crop Hoodie",
        price: 69.99,
        image: "images/product-4.jpg",
        category: "women-hoodies",
        badge: "Popular"
    }
];

// Load Featured Products
function loadFeaturedProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-details">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <div class="product-actions">
                    <button class="btn btn-outline" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="btn btn-primary" onclick="viewProduct(${product.id})">View</button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// View Product Details
function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    // In a real app, this would navigate to a product detail page
    alert(`Viewing details for: ${product.title}`);
}

// Add to Cart Functionality
let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    alert(`${product.title} added to cart!`);
}

function updateCartUI() {
    const cartItems = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const totalPrice = document.querySelector('.total-price');
    
    // Update cart items
    cartItems.innerHTML = '';
    
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-actions">
                    <div class="cart-item-quantity">
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <span class="remove-item" onclick="removeFromCart(${item.id})">Remove</span>
                </div>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    // Update cart count and total
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    totalPrice.textContent = `$${total.toFixed(2)}`;
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        
        updateCartUI();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    
    // Close modals when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.classList.remove('open');
        }
    });
    
    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (!cartSidebar.contains(e.target) && e.target !== cartBtn) {
            cartSidebar.classList.remove('open');
        }
    });
});

// Scroll Animation Trigger
function animateOnScroll() {
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const viewportHeight = window.innerHeight;

        if (elementTop < viewportHeight * 0.85 && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Navbar Hide/Show on Scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const navbar = document.querySelector('.navbar');

    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    lastScroll = currentScroll;
});

// Parallax Effect
window.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax-item').forEach(item => {
        const speed = parseFloat(item.dataset.speed) || 0.3;
        const yPos = -window.pageYOffset * speed;
        item.style.transform = `translateY(${yPos}px)`;
    });
});


function loadAllClothes() {
    // Hide home section and show clothes section with smooth transition
    document.getElementById("home-section").style.display = "none";
    document.getElementById("all-clothes-section").style.display = "block";
    
    // Scroll to top of the products section for better UX
    document.getElementById("all-clothes-section").scrollIntoView({ behavior: 'smooth' });

    // Product data with corrected image paths and additional product info
    const products = [
        { 
            id: 1,
            img: "images/products/ao-thun-local-brand-dep-dkmv-blue-jersey-tee-streetwear.webp", 
            title: "KDMV Signature Tee", 
            price: 49.99,
            colors: ["Blue", "White", "Black"],
            sizes: ["S", "M", "L", "XL"],
            description: "Premium quality cotton tee with KDMV signature print"
        },
        { 
            id: 2,
            img: "images/products/dosiin-dkmv-dkmv-tee-original-black.jpeg", 
            title: "KDMV Classic Tee", 
            price: 29.99,
            colors: ["Black", "White"],
            sizes: ["S", "M", "L"],
            description: "Essential black tee with minimalist KDMV logo"
        },
        { 
            id: 3,
            img: "images/products/HOODIES_0003_2-1.webp", 
            title: "KDMV ORiO Hoodie", 
            price: 79.99,
            colors: ["Black", "Gray"],
            sizes: ["M", "L", "XL"],
            description: "Heavyweight hoodie with embroidered ORiO design"
        },
        { 
            id: 4,
            img: "images/products/sf74r_51_z_prod.jpg", 
            title: "KDMV Sweatpants", 
            price: 59.99,
            colors: ["Black", "Navy"],
            sizes: ["S", "M", "L"],
            description: "Comfortable sweatpants with adjustable waist"
        },
        { 
            id: 5,
            img: "images/products/kansas_city_hoodie_black.webp", 
            title: "KDMV Beer Hoodie", 
            price: 69.99,
            colors: ["Black", "Red"],
            sizes: ["S", "M", "L", "XL"],
            description: "Limited edition hoodie with specialty print"
        },
        { 
            id: 6,
            img: "images/products/pink-hoodie.webp", 
            title: "KDMV Pink Hoodie", 
            price: 65.99,
            colors: ["Pink", "Lavender"],
            sizes: ["XS", "S", "M"],
            description: "Soft pink hoodie with oversized fit"
        }
    ];

    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Clear previous content

    // Create product cards
    products.forEach(product => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");
        productItem.innerHTML = `
            <div class="product-image-container">
                <img src="${product.img}" alt="${product.title}" class="product-image">
                <div class="product-badge">New</div>
                <div class="quick-view" onclick="viewDetails(${product.id})">Quick View</div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-colors">${product.colors.length} colors available</div>
                <div class="product-actions">
                    <button class="btn-view" onclick="viewDetails(${product.id})">
                        <i class="fas fa-eye"></i> Details
                    </button>
                    <button class="btn-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
        productList.appendChild(productItem);
    });

    // Update the page title for better SEO
    document.title = "KDMV | Shop All Clothing";
}

// Supporting functions you'll need to add:
function viewDetails(productId) {
    // This should redirect to a product detail page or show a modal
    console.log("Viewing details for product ID:", productId);
    // In a real implementation, you would:
    // 1. Find the product by ID
    // 2. Display a detailed view with all information
    // 3. Show size/color selection options
}

function addToCart(productId) {
    // This should add the item to the shopping cart
    console.log("Adding to cart product ID:", productId);
    // In a real implementation, you would:
    // 1. Find the product by ID
    // 2. Add it to the cart array or localStorage
    // 3. Update the cart UI
}

function showQRCode(productTitle, price) {
    // Your existing ABA payment functionality
    console.log("Showing QR code for:", productTitle, "Price:", price);
    document.getElementById("qr-popup").style.display = "flex";
}




