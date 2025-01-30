// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        nav.style.background = 'white';
        nav.style.boxShadow = 'none';
    }
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

// Modal elements
const modal = document.getElementById('cart-modal');
const closeBtn = document.querySelector('.close');
const cartBtn = document.getElementById('cart-btn');

// Modal controls
cartBtn.onclick = () => {
    modal.style.display = 'block';
    updateCartDisplay();
};

closeBtn.onclick = () => {
    modal.style.display = 'none';
};

window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
};

// Add to cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const dishCard = this.parentElement;
        const dishName = dishCard.querySelector('h3').textContent;
        const dishPrice = parseFloat(dishCard.querySelector('.price').textContent.replace('$', ''));
        
        // Add item to cart
        const existingItem = cart.find(item => item.name === dishName);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: dishName,
                price: dishPrice,
                quantity: 1
            });
        }
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update UI
        updateCartCount();
        showAddedAnimation(this);
    });
});

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function showAddedAnimation(button) {
    button.innerHTML = '✓ Added';
    button.style.background = '#28a745';
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
        button.style.background = '#ff4757';
    }, 2000);
}

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total-price');
    
    // Clear current display
    cartItemsDiv.innerHTML = '';
    
    // Add each item
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <small>Quantity: ${item.quantity}</small>
            </div>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            <div class="remove-item" onclick="removeFromCart('${item.name}')">×</div>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalSpan.textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

// Checkout functionality
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your order! Proceeding to checkout...');
    // Here you would typically redirect to a checkout page
});

// Search functionality
const searchButton = document.querySelector('.search-bar button');
const searchInput = document.querySelector('.search-bar input');

searchButton.addEventListener('click', function() {
    if (searchInput.value.trim() !== '') {
        alert(`Searching for restaurants near: ${searchInput.value}`);
    } else {
        alert('Please enter a delivery address');
    }
});

// Order now button functionality
const orderBtn = document.querySelector('.order-btn');
orderBtn.addEventListener('click', function() {
    window.scrollTo({
        top: document.querySelector('#menu').offsetTop - 100,
        behavior: 'smooth'
    });
});

// Contact Form Handling
const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send this data to your server
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

// Newsletter Form Handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        // Here you would typically send this to your server
        console.log('Newsletter subscription:', email);
        
        // Show success message
        alert('Thank you for subscribing to our newsletter!');
        
        // Reset form
        this.reset();
    });
}
