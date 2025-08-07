const cartItemsContainer = document.getElementById("cart-items");
const cartTotalDisplay = document.getElementById("cart-total");
const cartCountDisplay = document.getElementById("cart-count");

function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItemsContainer.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";

        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="80">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <div class="quantity-controls">
                    <button class="qty-btn decrease" data-index="${index}">–</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn increase" data-index="${index}">+</button>
                </div>
            </div>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-btn" data-index="${index}">🗑️</button>
        `;

        total += item.price * item.quantity;
        count += item.quantity;
        cartItemsContainer.appendChild(itemDiv);
    });

    cartTotalDisplay.textContent = total.toFixed(2);
    cartCountDisplay.textContent = count;

    setupButtons();
}

function setupButtons() {
    document.querySelectorAll(".increase").forEach(btn => {
        btn.addEventListener("click", () => {
            updateQuantity(parseInt(btn.dataset.index), 1);
        });
    });

    document.querySelectorAll(".decrease").forEach(btn => {
        btn.addEventListener("click", () => {
            updateQuantity(parseInt(btn.dataset.index), -1);
        });
    });

    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            removeItem(parseInt(btn.dataset.index));
        });
    });
}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1); // remove item if quantity is 0
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Normalize image path
    const fullImagePath = image.startsWith("/") ? image : "/" + image.replace(/^\.?\/*/, "");
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, image: fullImagePath, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
}

window.onload = loadCart;
