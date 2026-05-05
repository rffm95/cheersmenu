const menuData = {
    "Cocktails": [
        { 
            name: "Gin Maracujá", 
            price: "7.00", 
            desc: "Gin premium, polpa de maracujá fresco, sumo de lima.",
            img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80", // Exemplo de foto
            popular: true 
        },
        { 
            name: "Moscow Mule", 
            price: "8.00", 
            desc: "Vodka, ginger beer artesanal e espuma de gengibre.",
            img: "https://images.unsplash.com/photo-1513415277900-a62401e19be4?auto=format&fit=crop&w=500&q=80",
            popular: false
        }
    ],
    "Comida": [
        { 
            name: "Tosta Kebab", 
            price: "13.50", 
            desc: "O nosso bestseller. Carne marinada com molho secreto.",
            img: "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=500&q=80",
            popular: true 
        },
        { 
            name: "Chicken Wings", 
            price: "6.00", 
            desc: "Asinhas crocantes com glaze de mel e sriracha.",
            img: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=500&q=80",
            popular: false
        }
    ],
    "Packs": [
        { 
            name: "Régua 5 Finos", 
            price: "6.50", 
            desc: "Perfeito para começar a noite com amigos.",
            img: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=500&q=80",
            popular: true 
        }
    ]
};

const grid = document.getElementById('menuGrid');
const nav = document.getElementById('catNav');
const highlights = document.getElementById('foodHighlights');

function init() {
    renderHighlights();
    renderCategories();
    renderItems("Cocktails"); // Categoria inicial
}

function renderHighlights() {
    const food = menuData["Comida"].filter(i => i.popular);
    highlights.innerHTML = food.map(item => `
        <div class="min-w-[280px] glass-card p-3">
            <div class="img-container mb-3">
                <span class="badge">Chef's Choice</span>
                <img src="${item.img}" alt="${item.name}">
            </div>
            <div class="flex justify-between items-center">
                <h4 class="font-semibold text-sm">${item.name}</h4>
                <span class="text-[#c5a059] text-sm">${item.price}€</span>
            </div>
        </div>
    `).join('');
}

function renderCategories() {
    nav.innerHTML = Object.keys(menuData).map(cat => `
        <button onclick="renderItems('${cat}')" class="category-btn opacity-50 hover:opacity-100 transition-all">${cat}</button>
    `).join('');
}

function renderItems(category) {
    // Animação de saída
    gsap.to(".item-card", { opacity: 0, y: 20, stagger: 0.05, onComplete: () => {
        grid.innerHTML = menuData[category].map(item => `
            <div class="glass-card p-4 item-card opacity-0">
                <div class="img-container mb-4">
                    ${item.popular ? '<span class="badge">Popular</span>' : ''}
                    <img src="${item.img}" alt="${item.name}">
                </div>
                <div class="flex justify-between items-start mb-2">
                    <h3 class="serif text-xl">${item.name}</h3>
                    <span class="text-[#c5a059] font-bold">${item.price}€</span>
                </div>
                <p class="text-[11px] opacity-50 leading-relaxed">${item.desc}</p>
                <button class="mt-4 w-full border border-white/10 py-2 rounded-xl text-[9px] uppercase tracking-widest hover:bg-white/5 transition-all">Ver Detalhes</button>
            </div>
        `).join('');

        // Animação de entrada
        gsap.to(".item-card", { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power4.out" });
    }});
}

init();
