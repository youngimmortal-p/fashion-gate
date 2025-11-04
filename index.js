// ===== PRODUCTS =====
const products = [
  {
    name: "Denim Jacket",
    price: 15000,
    image: "Jeans.jpeg"
  },
  {
    name: "White Sneakers",
    price: 22000,
    image: "Hoodie1.jpeg"
  },
  {
    name: "Leather Bag",
    price: 18500,
    image: "Tshirt1.jpeg"
  },
  {
    name: "Classic Watch",
    price: 35000,
    image: "Hoodie2.jpeg"
  },
  {
    name: "Black Hoodie",
    price: 12000,
    image: "Hoodie3.jpeg"
  },
  {
    name: "Vintage Sunglasses",
    price: 9500,
    image: "Tshirt2.jpeg"
  }
];

// ===== ELEMENTS =====
const productGrid = document.getElementById("product-grid");
const cartBtn = document.getElementById("cart-btn");
const closeCart = document.getElementById("close-cart");
const cart = document.getElementById("cart");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

let cartData = [];

// ===== DISPLAY PRODUCTS =====
function renderProducts() {
  productGrid.innerHTML = "";
  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.className = "bg-white shadow-md rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-lg transition";

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="h-full rounded-xl mb-4">
      <h2 class="text-lg font-semibold">${product.name}</h2>
      <p class="text-gray-600 mb-2">₦${product.price.toLocaleString()}</p>
      <button class="add-to-cart bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        data-name="${product.name}" data-price="${product.price}">
        Add to Cart
      </button>
    `;

    productGrid.appendChild(productCard);
  });

  // Reattach event listeners after rendering
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = parseInt(button.dataset.price);
      const existing = cartData.find(item => item.name === name);

      if (existing) {
        existing.quantity++;
      } else {
        cartData.push({ name, price, quantity: 1 });
      }
      updateCart();
    });
  });
}

renderProducts();

// ===== CART LOGIC =====
cartBtn.addEventListener("click", () => cart.classList.remove("translate-x-full"));
closeCart.addEventListener("click", () => cart.classList.add("translate-x-full"));

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cartData.forEach((item, index) => {
    total += item.price * item.quantity;

    const li = document.createElement("li");
    li.className = "flex justify-between items-center border-b pb-2";
    li.innerHTML = `
      <div>
        <p class="font-semibold">${item.name}</p>
        <p class="text-sm text-gray-600">₦${item.price.toLocaleString()} x ${item.quantity}</p>
      </div>
      <button class="text-red-500 hover:text-red-700" data-index="${index}">🗑️</button>
    `;
    cartItems.appendChild(li);
  });

  document.querySelectorAll('[data-index]').forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = btn.dataset.index;
      cartData.splice(idx, 1);
      updateCart();
    });
  });

  cartTotal.textContent = total.toLocaleString();
  cartCount.textContent = cartData.length;
}

// ===== CHECKOUT =====
checkoutBtn.addEventListener("click", () => {
  if (cartData.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let message = "Hello Fashion Gate! I’d like to order:\n";
  cartData.forEach(item => {
    message += `• ${item.name} (₦${item.price.toLocaleString()} x ${item.quantity})\n`;
  });
  const total = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
  message += `\nTotal: ₦${total.toLocaleString()}`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/2347075028734?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
});
