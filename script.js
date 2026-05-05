document.addEventListener('DOMContentLoaded', () => {
    // --- DATA ---
    // Adicione os seus produtos aqui. 'type' pode ser 'food' ou 'drink'.
    const menuItems = [
        { name: "Tosta Mista", price: "4.50", desc: "O clássico que nunca falha. Pão de forma torrado com queijo e fiambre de qualidade.", type: "food", category: "Comida", img: "https://i.imgur.com/2sX1bYj.jpg", popular: true },
        { name: "Nuggets", price: "5.00", desc: "Pedaços de frango crocantes, servidos com o nosso molho especial da casa.", type: "food", category: "Comida", img: "https://i.imgur.com/JdM9IeT.jpg", popular: false },
        { name: "Gin Maracujá", price: "7.00", desc: "O nosso best-seller. Um cocktail tropical e refrescante que o transportará para a praia.", type: "drink", category: "Cocktails", img: "https://i.imgur.com/eNsm4jL.jpg", popular: true },
        { name: "Moscow Mule", price: "8.00", desc: "Uma explosão de sabor. Vodka, lima fresca e ginger beer picante, servido na caneca de cobre.", type: "drink", category: "Cocktails", img: "https://i.imgur.com/mP7D4gT.jpg", popular: false },
        { name: "Mojito", price: "7.00", desc: "A combinação perfeita de rum, hortelã fresca, lima e um toque de soda.", type: "drink", category: "Cocktails", img: "https://i.imgur.com/9C0dGLm.jpg", popular: false },
        { name: "Régua 5 Finos Sagres", price: "6.50", desc: "A forma ideal de partilhar uma rodada de cerveja com os seus amigos.", type: "drink", category: "Packs", img: "https://i.imgur.com/bW3Y4XQ.jpg", popular: true },
        { name: "Pack 6 Shots", price: "10.00", desc: "Comece a festa com 6 shots da casa à sua escolha: maracujá ou morango.", type: "drink", category: "Packs", img: "https://i.imgur.com/QhFylz7.jpg", popular: false },
        { name: "Heineken 50cl", price: "3.50", desc: "Uma caneca de 50cl da sua cerveja premium favorita, servida bem gelada.", type: "drink", category: "Cervejas", img: "https://i.imgur.com/0oZtP3g.jpg", popular: false },
        { name: "Guinness", price: "4.50", desc: "A icónica cerveja preta irlandesa, com o seu sabor rico e espuma cremosa.", type: "drink", category: "Cervejas", img: "https://i.imgur.com/fJqf5dO.jpg", popular: false }
    ];

    const categories = {
        "Comida": { icon: "utensils-crossed", type: "food" },
        "Cocktails": { icon: "martini", type: "drink" },
        "Packs": { icon: "package", type: "drink" },
        "Cervejas": { icon: "beer", type: "drink" }
    };

    // --- DOM ELEMENTS ---
    const grid = document.getElementById('menu-grid');
    const catNav = document.getElementById('category-nav');
    const detailPanel = document.getElementById('detailPanel');
    const panelBackdrop = document.getElementById('panelBackdrop');
    const closePanelBtn = document.getElementById('closePanelBtn');
    
    // Filter Buttons
    const filterButtons = {
        all: document.getElementById('filter-all'),
        food: document.getElementById('filter-food'),
        drinks: document.getElementById('filter-drinks')
    };
    
    let currentFilter = 'all';
    let currentCategory = 'all';

    // --- RENDER FUNCTIONS ---
    const renderItems = () => {
        const itemsToRender = menuItems.filter(item => {
            const filterMatch = currentFilter === 'all' || (currentFilter === 'food' && item.type === 'food') || (currentFilter === 'drinks' && item.type === 'drink');
            const categoryMatch = currentCategory === 'all' || item.category === currentCategory;
            return filterMatch && categoryMatch;
        });

        gsap.to(grid.children, {
            opacity: 0, scale: 0.9, duration: 0.2, stagger: 0.05,
            onComplete: () => {
                grid.innerHTML = '';
                itemsToRender.forEach(item => {
                    const card = document.createElement('div');
                    card.className = `bg-[var(--card-bg)] rounded-2xl p-3 border border-transparent transition-all duration-300 ${item.popular ? 'popular-card' : ''}`;
                    card.innerHTML = `
                        <div class="h-36 rounded-lg overflow-hidden mb-3">
                            <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover">
                        </div>
                        <h3 class="font-semibold text-sm truncate">${item.name}</h3>
                        <p class="gold-text font-bold text-xs">${item.price}€</p>
                    `;
                    card.onclick = () => showDetail(item);
                    grid.appendChild(card);
                });
                gsap.from(grid.children, { opacity: 0, scale: 0.9, duration: 0.3, stagger: 0.05, delay: 0.1 });
            }
        });
    };

    const renderCategories = () => {
        catNav.innerHTML = '';
        Object.keys(categories).forEach(cat => {
            if (currentFilter === 'all' || categories[cat].type === currentFilter || (currentFilter === 'drinks' && categories[cat].type === 'drink')) {
                const iconContainer = document.createElement('div');
                iconContainer.className = 'text-center flex-shrink-0';
                iconContainer.innerHTML = `
                    <button data-category="${cat}" class="category-btn w-16 h-16 rounded-full flex items-center justify-center bg-[#222] category-icon">
                        <i data-lucide="${categories[cat].icon}" class="w-6 h-6 opacity-70"></i>
                    </button>
                    <p class="text-[10px] mt-2 uppercase tracking-wider">${cat}</p>
                `;
                catNav.appendChild(iconContainer);
            }
        });
        lucide.createIcons();
        updateActiveCategory();
    };

    // --- DETAIL PANEL FUNCTIONS ---
    const showDetail = (item) => {
        document.getElementById('detail-img').src = item.img;
        document.getElementById('detail-name').textContent = item.name;
        document.getElementById('detail-price').textContent = `${item.price}€`;
        document.getElementById('detail-desc').textContent = item.desc;

        detailPanel.style.display = 'block';
        panelBackdrop.style.display = 'block';

        gsap.to(panelBackdrop, { opacity: 1, duration: 0.4 });
        gsap.to(detailPanel, { x: '0%', duration: 0.5, ease: 'power3.out' });
    };

    const hideDetail = () => {
        gsap.to(panelBackdrop, { opacity: 0, duration: 0.4, onComplete: () => panelBackdrop.style.display = 'none' });
        gsap.to(detailPanel, { x: '100%', duration: 0.5, ease: 'power3.in', onComplete: () => detailPanel.style.display = 'none' });
    };

    // --- STATE MANAGEMENT & EVENT LISTENERS ---
    const updateActiveFilter = () => {
        Object.values(filterButtons).forEach(btn => btn.classList.remove('active-filter'));
        filterButtons[currentFilter].classList.add('active-filter');
    };
    
    const updateActiveCategory = () => {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active-category', 'bg-gradient-to-br', 'from-yellow-400', 'to-orange-500');
            if (btn.dataset.category === currentCategory) {
                btn.classList.add('active-category');
            }
        });
    };

    filterButtons.all.addEventListener('click', () => { currentFilter = 'all'; currentCategory = 'all'; renderCategories(); renderItems(); updateActiveFilter(); });
    filterButtons.food.addEventListener('click', () => { currentFilter = 'food'; currentCategory = 'Comida'; renderCategories(); renderItems(); updateActiveFilter(); });
    filterButtons.drinks.addEventListener('click', () => { currentFilter = 'drinks'; currentCategory = 'all'; renderCategories(); renderItems(); updateActiveFilter(); });
    
    catNav.addEventListener('click', (e) => {
        const btn = e.target.closest('.category-btn');
        if (btn) {
            currentCategory = btn.dataset.category;
            renderItems();
            updateActiveCategory();
        }
    });

    closePanelBtn.addEventListener('click', hideDetail);
    panelBackdrop.addEventListener('click', hideDetail);

    // --- INITIALIZATION ---
    const init = () => {
        updateActiveFilter();
        renderCategories();
        renderItems();
        lucide.createIcons();
    };

    init();
});
