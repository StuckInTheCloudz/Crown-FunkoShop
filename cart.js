const cartItemsContainer = document.getElementById("cart-items");
const cartTotalDisplay = document.getElementById("cart-total");

function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountDisplay = document.getElementById("cart-count");
    cartCountDisplay.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);


    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";

        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="80">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        `;

        total += item.price * item.quantity;
        cartItemsContainer.appendChild(itemDiv);
    });

    cartTotalDisplay.textContent = total.toFixed(2);
}
function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);}
window.onload = loadCart;

