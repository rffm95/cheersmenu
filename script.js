const menuData = {
    "Packs": [
        { name: "Régua Sagres", price: "6.50", desc: "A nossa clássica régua de finos (20cl).", img: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400", popular: true },
        { name: "Pack 6 Gins Maracuja", price: "35.00", desc: "Gin, maracujá, lima e açúcar em dose de grupo.", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400" },
        { name: "Pack 6 Shots da Casa", price: "10.00", desc: "Vodka com puré de fruta.", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400" },
        { name: "Régua Heineken", price: "7.50", desc: "5 Heineken de 25cl.", img: "https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=400" }
    ],
    "Cocktails": [
        { name: "Gin Lima Maracujá", price: "7.00", desc: "O favorito: Gin, lima e maracujá fresco.", img: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400", popular: true },
        { name: "Mojito", price: "7.00", desc: "Rum, hortelã e frescura máxima.", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400" },
        { name: "Moscow Mule", price: "8.00", desc: "Vodka e a nossa icónica espuma de gengibre.", img: "https://images.unsplash.com/photo-1513415277900-a62401e19be4?w=400" },
        { name: "Pornstar Martini", price: "7.00", desc: "Vodka, baunilha e maracujá.", img: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=400" },
        { name: "Espresso Martini", price: "7.00", desc: "Café e Vodka para despertar.", img: "https://images.unsplash.com/photo-1545438102-799c3991ffb2?w=400" },
        { name: "Gin Tropical", price: "7.00", desc: "Sabor a verão o ano inteiro.", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400" }
    ],
    "Cerveja": [
        { name: "Fino Sagres", price: "1.50", desc: "O clássico imperdível.", popular: true },
        { name: "Heineken 50cl", price: "3.50", desc: "Frescura em dose dupla.", popular: false },
        { name: "Caneca", price: "2.50", desc: "40cl de sabor.", popular: false },
        { name: "Bandida do Pomar", price: "3.00", desc: "Sidra refrescante.", popular: false },
        { name: "Guinness", price: "4.50", desc: "Cerveja preta lendária.", popular: false }
    ],
    "Cozinha": [
        { name: "Tosta Mista", price: "4.50", desc: "Pão artesanal, queijo e fiambre.", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400", popular: true },
        { name: "Batatas Grandes", price: "3.50", desc: "Porção generosa para partilhar.", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400" },
        { name: "4 Mini Pizzas", price: "5.00", desc: "Snack perfeito para acompanhar um copo.", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400" },
        { name: "Nuggets", price: "5.00", desc: "Crocantes e deliciosos.", img: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400" }
    ],
    "Whiskies/Gins": [
        { name: "Adamus", price: "10.00", desc: "Gin premium Português." },
        { name: "Jameson", price: "6.00", desc: "Irish Whiskey clássico." },
        { name: "Nordés", price: "9.00", desc: "Gin com alma Galega." },
        { name: "Hendricks", price: "11.00", desc: "Pétalas de rosa e pepino." }
    ],
    "Soft Drinks": [
        { name: "Café", price: "0.80", desc: "O nosso blend forte." },
        { name: "Coca-Cola", price: "1.80", desc: "33cl." },
        { name: "Água Luso", price: "1.20", desc: "50cl." },
        { name: "Pedras Sabores", price: "1.80", desc: "Limão ou frutos vermelhos." }
    ]
};

const nav = document.querySelector('nav');
const list = document.getElementById('menuList');

function init() {
    renderNav();
    showCategory("Packs");
    lucide.createIcons();
}

function renderNav() {
    nav.innerHTML = Object.keys(menuData).map(cat => `
        <button onclick="showCategory('${cat}')" class="cat-item py-4 px-4 text-[11px] uppercase tracking-widest whitespace-nowrap opacity-60 transition-all font-semibold">
            ${cat}
        </button>
    `).join('');
}

function showCategory(cat) {
    document.querySelectorAll('.cat-item').forEach(el => el.classList.remove('active-cat', 'opacity-100'));
    event?.target?.classList.add('active-cat', 'opacity-100');
    
    const items = menuData[cat];
    list.innerHTML = items.map((item, i) => `
        <div class="menu-item flex items-center gap-4 p-5 animate-in" onclick="openModal('${cat}', ${i})">
            <img src="${item.img || 'https://via.placeholder.com/150/111/c5a059?text=Cheers'}" class="thumb">
            <div class="flex-1">
                <div class="flex justify-between items-baseline">
                    <h4 class="font-semibold text-sm">${item.name} ${item.popular ? '⭐' : ''}</h4>
                    <span class="text-[#c5a059] font-bold text-sm">${item.price}€</span>
                </div>
                <p class="text-[10px] opacity-40 mt-1 leading-tight">${item.desc}</p>
            </div>
        </div>
    `).join('');
    
    gsap.from(".menu-item", { opacity: 0, x: -10, stagger: 0.05, duration: 0.4 });
}

function quickFilter(type) {
    if(type === 'fome') showCategory("Cozinha");
    if(type === 'beber') showCategory("Cocktails");
}

function openModal(cat, index) {
    const item = menuData[cat][index];
    const modal = document.getElementById('modal');
    document.getElementById('modalContent').innerHTML = `
        <img src="${item.img || 'https://via.placeholder.com/400/111/c5a059?text=Cheers'}" class="w-full h-64 object-cover">
        <div class="p-6">
            <h2 class="serif text-2xl mb-2">${item.name}</h2>
            <p class="text-xs opacity-60 mb-4">${item.desc}</p>
            <div class="flex justify-between items-center pt-4 border-t border-white/5">
                <span class="text-xl font-bold text-[#c5a059]">${item.price}€</span>
                <a href="https://instagram.com/cheers_o_bar" class="text-[10px] opacity-40 uppercase tracking-widest">@cheers_o_bar</a>
            </div>
        </div>
    `;
    modal.style.display = "flex";
    gsap.from("#modal > div", { scale: 0.9, opacity: 0, duration: 0.3 });
}

function closeModal() {
    document.getElementById('modal').style.display = "none";
}

init();
