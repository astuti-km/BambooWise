
// ============================================
// BAMBOOWISE - COMPLETE STORE FUNCTIONALITY
// ============================================

const products = [
    {id:1,name:"Classic Bamboo Bottle",capacity:"500 ml",price:150,category:"classic",tag:"BESTSELLER",desc:"A natural everyday companion.",image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=85"},
    {id:2,name:"Terra Insulated Flask",capacity:"1 litre",price:300,category:"insulated",tag:"INSULATED",desc:"For long days and fresh sips.",image:"https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=700&q=85"},
    {id:3,name:"Trail Buddy Bottle",capacity:"1 litre",price:300,category:"travel",tag:"TRAVEL PICK",desc:"Ready for your outdoor adventures.",image:"https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=700&q=85"},
    {id:4,name:"Little Leaf Bottle",capacity:"500 ml",price:150,category:"classic",tag:"LIGHT & EASY",desc:"A lighter pick for everyday carry.",image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=85"},
    {id:5,name:"Slim Bamboo Bottle",capacity:"500 ml",price:150,category:"classic",tag:"SLIM DESIGN",desc:"Slim shape for bags and desks.",image:"https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=700&q=85"},
    {id:6,name:"Printed Bamboo Bottle",capacity:"1 litre",price:300,category:"classic",tag:"BOTANICAL PRINT",desc:"Nature-inspired printed design.",image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=85"},
    {id:7,name:"Active Sports Bottle",capacity:"1 litre",price:300,category:"sports",tag:"ACTIVE DAYS",desc:"For gym, sports and workouts.",image:"https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=700&q=85"},
    {id:8,name:"Daily Desk Bottle",capacity:"500 ml",price:150,category:"insulated",tag:"DESK COMPANION",desc:"A simple pick for study and office.",image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=85"},
    {id:9,name:"Mini Leaf Bottle",capacity:"250 ml",price:99,category:"classic",tag:"MINI PICK",desc:"Small and easy to carry.",image:"https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=700&q=85"},
    {id:10,name:"Pocket Bamboo Bottle",capacity:"250 ml",price:99,category:"travel",tag:"POCKET SIZE",desc:"A compact hydration companion.",image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=85"},
    {id:11,name:"Urban Sip Bottle",capacity:"750 ml",price:225,category:"classic",tag:"CITY FAVOURITE",desc:"A balanced everyday capacity.",image:"https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=700&q=85"},
    {id:12,name:"Forest Flask",capacity:"750 ml",price:225,category:"insulated",tag:"FOREST STYLE",desc:"For comfortable daily hydration.",image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=85"},
    {id:13,name:"Explorer Bottle",capacity:"2 litres",price:450,category:"travel",tag:"EXTRA CAPACITY",desc:"For long outdoor adventures.",image:"https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=700&q=85"},
    {id:14,name:"Gym Buddy Flask",capacity:"750 ml",price:225,category:"sports",tag:"GYM READY",desc:"A practical workout companion.",image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=85"},
    {id:15,name:"Nature Sip Bottle",capacity:"500 ml",price:150,category:"classic",tag:"NATURE PICK",desc:"Simple style for everyday refills.",image:"https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=700&q=85"},
    {id:16,name:"Evergreen Flask",capacity:"1 litre",price:300,category:"insulated",tag:"ALL DAY SIP",desc:"A larger bottle for busy days.",image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=85"},
    {id:17,name:"Adventure Max",capacity:"2 litres",price:450,category:"sports",tag:"MAX CAPACITY",desc:"For longer active days.",image:"https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=700&q=85"},
    {id:18,name:"Study Sip Bottle",capacity:"500 ml",price:150,category:"classic",tag:"STUDY TIME",desc:"A useful companion for study sessions.",image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=85"},
    {id:19,name:"Travel Lite Flask",capacity:"750 ml",price:225,category:"travel",tag:"TRAVEL LIGHT",desc:"Designed for everyday journeys.",image:"https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=700&q=85"},
    {id:20,name:"Bamboo Classic XL",capacity:"2 litres",price:450,category:"classic",tag:"FAMILY SIZE",desc:"Extra capacity for daily hydration.",image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=85"}
];

// ============================================
// STATE AND HELPERS
// ============================================

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const money = amount =>
    "₹" + amount.toLocaleString("en-IN");

function loadSaved(key) {
    try {
        return JSON.parse(localStorage.getItem(key) || "[]");
    } catch {
        return [];
    }
}

let cart = loadSaved("bamboowise-cart");
let wishlist = loadSaved("bamboowise-wishlist");
let activeFilter = "all";

function saveCart() {
    localStorage.setItem("bamboowise-cart", JSON.stringify(cart));
    renderCart();
}

function saveWishlist() {
    localStorage.setItem("bamboowise-wishlist", JSON.stringify(wishlist));
    renderProducts();
}

// ============================================
// PRODUCT DISPLAY
// ============================================

function renderProducts() {
    const query = $("#productSearch").value.trim().toLowerCase();
    const sorting = $("#sortProducts").value;

    let filtered = products.filter(product => {
        const matchesCategory =
            activeFilter === "all" ||
            product.category === activeFilter;

        const searchable = [
            product.name,
            product.capacity,
            product.category,
            product.tag,
            product.desc,
            product.price.toString()
        ].join(" ").toLowerCase();

        return matchesCategory &&
            searchable.includes(query);
    });

    if (sorting === "low") {
        filtered.sort((a,b) => a.price - b.price);
    }

    if (sorting === "high") {
        filtered.sort((a,b) => b.price - a.price);
    }

    if (sorting === "name") {
        filtered.sort((a,b) => a.name.localeCompare(b.name));
    }

    $("#resultCount").textContent =
        `Showing ${filtered.length} of ${products.length} bottles`;

    $("#productGrid").innerHTML = filtered.length
        ? filtered.map(product => `
            <article class="product-card">

                <div class="product-image">
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    >

                    <span class="product-tag">
                        ${product.tag}
                    </span>

                    <button
                        class="quick-add"
                        data-add="${product.id}">
                        ＋ Add to bag
                    </button>
                </div>

                <div class="product-info">
                    <h3>${product.name}</h3>

                    <p>
                        ${product.desc} · ${product.capacity}
                    </p>

                    <div class="product-meta">
                        <span>${money(product.price)}</span>

                        <button
                            class="wishlist-button ${
                                wishlist.includes(product.id) ? "selected" : ""
                            }"
                            data-wish="${product.id}"
                            aria-label="Add ${product.name} to wishlist">
                            ${wishlist.includes(product.id) ? "♥" : "♡"}
                        </button>
                    </div>
                </div>

            </article>
        `).join("")
        : `<p>No bottles found. Try searching for 500 ml, 1 litre or travel.</p>`;
}

// ============================================
// FILTERS AND SEARCH
// ============================================

$("#productSearch").addEventListener("input", renderProducts);

$("#sortProducts").addEventListener("change", renderProducts);

$("#filters").addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;

    activeFilter = button.dataset.filter;

    $$(".filter").forEach(item => {
        item.classList.toggle("active", item === button);
    });

    renderProducts();
});

// ============================================
// WISHLIST
// ============================================

$("#productGrid").addEventListener("click", event => {

    const wishButton = event.target.closest("[data-wish]");
    if (wishButton) {
        const id = Number(wishButton.dataset.wish);

        if (wishlist.includes(id)) {
            wishlist = wishlist.filter(item => item !== id);
        } else {
            wishlist.push(id);
        }

        saveWishlist();
        return;
    }

    const addButton = event.target.closest("[data-add]");
    if (addButton) {
        addToCart(Number(addButton.dataset.add));
    }
});

// ============================================
// SHOPPING CART
// ============================================

function addToCart(id) {
    const item = cart.find(product => product.id === id);

    if (item) {
        item.qty++;
    } else {
        cart.push({id, qty: 1});
    }

    saveCart();
    openDrawer("cartDrawer");
}

function renderCart() {
    const count = cart.reduce(
        (total, item) => total + item.qty, 0
    );

    const total = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product ? product.price * item.qty : 0);
    }, 0);

    $("#cartCount").textContent = count;
    $("#drawerCount").textContent = `(${count})`;
    $("#subtotal").textContent = money(total);
    $("#checkoutTotal").textContent = money(total);

    $("#cartItems").innerHTML = cart.length
        ? cart.map(item => {
            const product = products.find(p => p.id === item.id);

            if (!product) return "";

            return `
                <div class="cart-item">

                    <img src="${product.image}" alt="${product.name}">

                    <div>
                        <h4>${product.name}</h4>
                        <small>${product.capacity} · ${money(product.price)}</small>

                        <div class="qty-controls">
                            <button data-qty="${product.id}" data-change="-1">−</button>
                            <span>${item.qty}</span>
                            <button data-qty="${product.id}" data-change="1">+</button>
                        </div>
                    </div>

                    <div>
                        <strong>${money(product.price * item.qty)}</strong>
                        <button class="remove-item" data-remove="${product.id}">
                            Remove
                        </button>
                    </div>

                </div>
            `;
        }).join("")
        : `<div class="empty-cart">Your bag is empty. 🌿<br><br>Explore the collection to add a bottle.</div>`;

    $("#checkoutOpen").disabled = !cart.length;
    $("#checkoutOpen").style.opacity = cart.length ? "1" : ".5";
}

$("#cartItems").addEventListener("click", event => {
    const quantityButton = event.target.closest("[data-qty]");
    const removeButton = event.target.closest("[data-remove]");

    if (quantityButton) {
        const id = Number(quantityButton.dataset.qty);
        const change = Number(quantityButton.dataset.change);

        const item = cart.find(p => p.id === id);

        if (item) {
            item.qty += change;

            if (item.qty <= 0) {
                cart = cart.filter(p => p.id !== id);
            }

            saveCart();
        }
    }

    if (removeButton) {
        const id = Number(removeButton.dataset.remove);
        cart = cart.filter(p => p.id !== id);
        saveCart();
    }
});

// ============================================
// DRAWERS
// ============================================

function openDrawer(id) {
    $("#overlay").classList.add("show");
    $("#" + id).classList.add("open");
}

function closeDrawers() {
    $("#overlay").classList.remove("show");

    $$(".drawer").forEach(drawer => {
        drawer.classList.remove("open");
    });
}

$("#cartOpen").addEventListener("click", () => {
    openDrawer("cartDrawer");
});

$("#assistantOpen").addEventListener("click", () => {
    openDrawer("assistantDrawer");
});

$("#overlay").addEventListener("click", closeDrawers);

$$("[data-close]").forEach(button => {
    button.addEventListener("click", () => {
        closeDrawers();
        $("#checkoutModal").classList.remove("show");
    });
});

// ============================================
// MOBILE MENU
// ============================================

$("#menuToggle").addEventListener("click", () => {
    $(".desktop-nav").classList.toggle("open");
});

$$(".desktop-nav a").forEach(link => {
    link.addEventListener("click", () => {
        $(".desktop-nav").classList.remove("open");
    });
});

// ============================================
// SMART BOTTLE FINDER
// ============================================

$("#finderForm").addEventListener("submit", event => {
    event.preventDefault();

    const use = $("#useCase").value;
    const priority = $("#priority").value;

    let chosen;

    if (use === "travel") {
        chosen = products.find(p => p.id === 13);
    } else if (use === "workout") {
        chosen = products.find(p => p.id === 7);
    } else if (priority === "temperature") {
        chosen = products.find(p => p.id === 2);
    } else if (priority === "capacity") {
        chosen = products.find(p => p.id === 13);
    } else if (use === "desk") {
        chosen = products.find(p => p.id === 8);
    } else {
        chosen = products.find(p => p.id === 1);
    }

    $("#finderResult").innerHTML = `
        <strong>Your bottle match: ${chosen.name}</strong><br>
        ${chosen.desc} · ${chosen.capacity} · ${money(chosen.price)}

        <button data-match="${chosen.id}">
            Add to bag →
        </button>
    `;
});

$("#finderResult").addEventListener("click", event => {
    const button = event.target.closest("[data-match]");
    if (button) addToCart(Number(button.dataset.match));
});

// ============================================
// CHECKOUT
// ============================================

$("#checkoutOpen").addEventListener("click", () => {
    if (!cart.length) return;

    closeDrawers();

    $("#checkoutModal").classList.add("show");
    $("#checkoutForm").hidden = false;
    $("#orderSuccess").hidden = true;
});

$("#checkoutForm").addEventListener("submit", event => {
    event.preventDefault();

    if (!cart.length) return;

    const name = $("#customerName").value.trim();

    if (!name) return;

    const orderNumber =
        "BW" + Math.random().toString(36).slice(2, 8).toUpperCase();

    const total = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.id);
        return sum + (product ? product.price * item.qty : 0);
    }, 0);

    $("#checkoutForm").hidden = true;

    $("#orderSuccess").hidden = false;

    $("#orderSuccess").innerHTML = `
        <h2>Thank you, ${escapeHTML(name)}! 🌿</h2>
        <p>Your demo order has been created successfully.</p>
        <p>Order ID: <strong>${orderNumber}</strong></p>
        <p>Total: <strong>${money(total)}</strong></p>
        <p>No actual payment has been collected.</p>
        <br>
        <button class="primary-button" id="finishOrder">
            Continue shopping
        </button>
    `;

    cart = [];
    saveCart();

    $("#finishOrder").addEventListener("click", () => {
        $("#checkoutModal").classList.remove("show");
        $("#checkoutForm").reset();
    });
});

// ============================================
// GEMINI AI ASSISTANT
// ============================================

function addMessage(message, type) {
    const bubble = document.createElement("div");

    bubble.className = "chat-bubble " + type;
    bubble.textContent = message;

    $("#chatMessages").appendChild(bubble);

    $("#chatMessages").scrollTop =
        $("#chatMessages").scrollHeight;

    return bubble;
}

$("#chatForm").addEventListener("submit", async event => {
    event.preventDefault();

    const input = $("#chatInput");
    const message = input.value.trim();

    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    const pending = addMessage("Thinking...", "bot");

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({message})
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "AI assistant unavailable.");
        }

        pending.textContent = data.reply;

    } catch (error) {
        pending.textContent =
            "Sorry, I couldn't connect to the AI assistant. " +
            (error.message || "Please try again.");
    }
});

// ============================================
// NEWSLETTER
// ============================================

$("#newsletterForm").addEventListener("submit", event => {
    event.preventDefault();

    $("#newsletterMessage").textContent =
        "Thank you for joining BambooWise! 🌿";

    $("#emailInput").value = "";
});

// ============================================
// HTML ESCAPING
// ============================================

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

// ============================================
// INITIALIZE WEBSITE
// ============================================

renderProducts();
renderCart();

console.log("🌿 BambooWise website loaded successfully!");
console.log("Products available:", products.length);
