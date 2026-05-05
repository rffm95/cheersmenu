// Dados extraídos e limpos do seu CSV (Vendas > 2)
const menuData = {
    "Packs": [
        { name: "Régua Sagres", price: "8.37", sales: 275, desc: "A escolha perfeita para o grupo.", img: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=500" },
        { name: "Pack 6 Gins Maracuja", price: "23.56", sales: 34, desc: "Sabor tropical em dose industrial.", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500" },
        { name: "Pack 6 Shots da casa", price: "10.78", sales: 55, desc: "O arranque necessário.", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500" }
    ],
    "Cocktails": [
        { name: "Gin Lima Maracujá", price: "7.00", sales: 167, desc: "Fresco, cítrico e irresistível.", img: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=500", popular: true },
        { name: "Mojito", price: "7.00", sales: 55, desc: "Hortelã fresca, lima e rum.", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500" },
        { name: "Moscow Mule", price: "8.00", sales: 27, desc: "Caneca de cobre, alma de gengibre.", img: "https://images.unsplash.com/photo-1513415277900-a62401e19be4?w=500" },
        { name: "Pornstar Martini", price: "9.00", sales: 37, desc: "Elegância e paixão num copo.", img: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=500" }
    ],
    "Comida": [
        { name: "Tosta Mista", price: "4.50", sales: 443, desc: "Pão artesanal, queijo derretido e fiambre.", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500", popular: true },
        { name: "Batatas Grandes", price: "3.50", sales: 108, desc: "Crocantes por fora, macias por dentro.", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500" },
        { name: "4 Mini Pizzas", price: "5.00", sales: 22, desc: "Snack ideal para acompanhar a sua bebida.", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" }
    ],
    "Cervejas": [
        { name: "Fino", price: "1.80", sales: 3274, desc: "O clássico imperdível.", img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500", popular: true },
        { name: "Heineken 50cl", price: "3.50", sales: 165, desc: "Frescura premium.", img: "https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=500" }
    ]
};

const icons = { "Packs": "package", "Cocktails": "glass-water", "Comida": "utensils", "Cervejas": "beer" };

function renderStories() {
    const nav = document.getElementById('storyNav');
    nav.innerHTML = Object.keys(menuData).map(cat => `
        <div class="flex flex-col items-center gap-2 cursor-pointer" onclick="filterCategory('${cat}')">
            <div class="story-circle flex items-center justify-center bg-[#111]" id="story-${cat}">
                <i data-lucide="${icons[cat] || 'circle'}" class="text-[#c5a059] w-6 h-6"></i>
            </div>
            <span class="text-[9px] uppercase tracking-widest opacity-60">${cat}</span>
        </div>
    `).join('');
    lucide.createIcons();
}

function renderItems(items) {
    const grid = document.getElementById('menuGrid');
    grid.innerHTML = "";
    
    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = "glass-card relative opacity-0 translate-y-4";
        card.onclick = () => openModal(item);
        card.innerHTML = `
            <div class="h-48 overflow-hidden relative">
                ${item.popular || item.sales > 150 ? '<span class="popular-badge">MAIS PEDIDO</span>' : ''}
                <img src="${item.img}" class="w-full h-full object-cover opacity-80" alt="${item.name}">
            </div>
            <div class="p-5 flex justify-between items-end">
                <div>
                    <h3 class="serif text-xl mb-1">${item.name}</h3>
                    <p class="text-[10px] opacity-50 uppercase tracking-widest">${item.desc.substring(0, 30)}...</p>
                </div>
                <div class="text-[#c5a059] font-bold text-lg">${item.price}€</div>
            </div>
        `;
        grid.appendChild(card);
        gsap.to(card, { opacity: 1, y: 0, delay: index * 0.1, duration: 0.5 });
    });
}

function filterCategory(cat) {
    document.querySelectorAll('.story-circle').forEach(el => el.classList.remove('active-story'));
    document.getElementById(`story-${cat}`).classList.add('active-story');
    renderItems(menuData[cat]);
}

function quickFilter(type) {
    if(type === 'fome') renderItems(menuData["Comida"]);
    else if(type === 'beber') renderItems([...menuData["Cocktails"], ...menuData["Cervejas"]]);
    else renderItems(Object.values(menuData).flat());
}

function openModal(item) {
    const modal = document.getElementById('modal');
    const content = document.getElementById('modalContent');
    content.innerHTML = `
        <img src="${item.img}" class="w-full h-64 object-cover">
        <div class="p-8">
            <h2 class="serif text-3xl mb-2 gold-gradient">${item.name}</h2>
            <p class="text-sm opacity-70 leading-relaxed mb-6">${item.desc}</p>
            <div class="flex justify-between items-center border-t border-white/10 pt-6">
                <span class="text-2xl font-bold">${item.price}€</span>
                <span class="text-[10px] opacity-30 uppercase tracking-tighter">Cheers Bar & Kitchen</span>
            </div>
        </div>
    `;
    modal.style.display = "flex";
    gsap.from("#modal .glass-card", { scale: 0.8, opacity: 0, duration: 0.3 });
    lucide.createIcons();
}

function closeModal() {
    gsap.to("#modal .glass-card", { scale: 0.8, opacity: 0, duration: 0.2, onComplete: () => {
        document.getElementById('modal').style.display = "none";
    }});
}

// Inicialização
window.onload = () => {
    renderStories();
    quickFilter('all');
};
