let cart = JSON.parse(localStorage.getItem('cart')) || [];
const products = JSON.parse(localStorage.getItem('products')) || [];
const cartItemsContainer = document.getElementById("cart-items");

// Generate cart items
const generateCartItems = () => {
    if (cart.length !== 0) {
        cartItemsContainer.innerHTML = cart.map(item => {
            const product = products.find(prod => prod.id === item.id);
            return `
                <div class="cart-item">
                    <img src="${product.img}" alt="${product.name}">
                    <div class="details">
                        <h4>${product.name}</h4>
                        <p>$${product.price} x ${item.quantity}</p>
                        <button onclick="removeItem('${item.id}')">Remove</button>
                    </div>
                </div>
            `;
        }).join("");
    } else {
        cartItemsContainer.innerHTML = "<h2>Your cart is empty</h2>";
    }
};

// Remove a specific item from the cart
const removeItem = (id) => {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    generateCartItems();
};

// Clear the entire cart
const clearCart = () => {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    generateCartItems();
};

// Generate cart items when the page loads
generateCartItems();
