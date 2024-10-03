const shop = document.getElementById('shop');
let basket = JSON.parse(localStorage.getItem('cart')) || [];









// Firestore REST API URL
const firestoreUrl = "https://firestore.googleapis.com/v1/projects/student-crud-5899b/databases/(default)/documents/products?key=AIzaSyBOWnmO2SpHc9Gpn9MJ_uQ63Oib4hpCiRs";

// Fetch products from Firestore
const fetchProducts = async () => {
    try {
        const response = await fetch(firestoreUrl);
        const data = await response.json();
        const products = data.documents.map(doc => ({
            id: doc.name.split('/').pop(),
            name: doc.fields.name.stringValue,
            price: doc.fields.price.integerValue,
            img: doc.fields.img.stringValue
        }));

        localStorage.setItem('products', JSON.stringify(products));
        displayProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

// Display products on the page
const displayProducts = (products) => {
    shop.innerHTML = products.map(product => {
        return `
            <div class="product-card">
                <img src="${product.img}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>$${product.price}</p>
                <button onclick="addToCart('${product.id}')">Add to Cart</button>
            </div>
        `;
    }).join('');
};

// Add product to cart
const addToCart = (id) => {
    let selectedItem = basket.find(item => item.id === id);

    if (!selectedItem) {
        basket.push({ id, quantity: 1 });
    } else {
        selectedItem.quantity += 1;
    }

    localStorage.setItem('cart', JSON.stringify(basket));
    updateCartCount();
};

// Update the cart item count
const updateCartCount = () => {
    const cartAmount = document.getElementById('cartAmount');
    const totalItems = basket.reduce((total, item) => total + item.quantity, 0);
    cartAmount.textContent = totalItems;
};

// Redirect to cart page on cart icon click
document.getElementById('cartIcon').addEventListener('click', () => {
    window.location.href = 'cart.html';
});

// Fetch products when page loads
fetchProducts();
updateCartCount();