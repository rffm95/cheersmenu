// Filtered Menu Data (Items with > 1 sales)
const menuData = {
    "Packs": [
        { name: "Régua 5 Finos Sagres", price: "6.50", desc: "A clássica para partilhar (20cl)" },
        { name: "Régua 5 Finos Heineken", price: "7.50", desc: "Para os amantes de Heineken (25cl)" },
        { name: "Pack 6 Canecas Sagres", price: "12.50", desc: "40cl cada" },
        { name: "Pack 6 Canecas Heineken", price: "15.00", desc: "50cl cada" },
        { name: "Pack 6 Gins Maracujá", price: "35.00", desc: "Gin, maracujá, lima, açúcar" },
        { name: "Pack 6 Shots da Casa", price: "10.00", desc: "Vodka, puré de fruta" }
    ],
    "Cocktails": [
        { name: "Gin Maracujá", price: "7.00", desc: "Best Seller da casa" },
        { name: "Mojito", price: "7.00", desc: "Rum, hortelã, lima, soda" },
        { name: "Caipirinha", price: "7.00", desc: "Cachaça, lima, açúcar" },
        { name: "Moscow Mule", price: "8.00", desc: "Vodka, lima, ginger beer" },
        { name: "Espresso Martini", price: "7.00", desc: "Vodka, licor café, café espresso" },
        { name: "Pornstar Martini", price: "7.00", desc: "Vodka, baunilha, maracujá" },
        { name: "Maçã Dourada", price: "7.00", desc: "Jack Apple & Somersby" },
        { name: "Negroni", price: "7.00", desc: "Gin, Campari, Vermute Rosso" },
        { name: "Aperol Spritz", price: "7.00", desc: "Aperol, espumante, soda" }
    ],
    "Cervejas": [
        { name: "Fino Sagres", price: "1.50", desc: "Draft Beer" },
        { name: "Heineken", price: "1.80", desc: "Draft Beer" },
        { name: "Caneca Sagres", price: "2.50", desc: "40cl" },
        { name: "Heineken 50cl", price: "3.50", desc: "Cerveja de pressão" },
        { name: "Guinness", price: "4.50", desc: "Preta" },
        { name: "Somersby", price: "3.00", desc: "Cider" },
        { name: "Desperados", price: "3.50", desc: "Tequila flavored beer" }
    ],
    "Comida": [
        { name: "Tosta Mista", price: "4.50", desc: "Queijo e Fiambre" },
        { name: "Batatas Fritas", price: "3.50", desc: "Porção Grande" },
        { name: "Nuggets", price: "5.00", desc: "Com molho especial" },
        { name: "Chicken Wings", price: "6.00", desc: "Asinhas picantes" },
        { name: "4 Mini Pizzas", price: "5.00", desc: "Seleção variada" }
    ],
    "Gins & Whiskys": [
        { name: "Adamus", price: "10.00", desc: "Premium Portuguese Gin" },
        { name: "Nordés", price: "9.00", desc: "Gin Galego" },
        { name: "Hendricks", price: "11.00", desc: "Cucumber & Rose" },
        { name: "Jameson", price: "6.00", desc: "Irish Whiskey" },
        { name: "Jack Daniel's", price: "7.00", desc: "Tennessee Whiskey" },
        { name: "Macallan 12", price: "15.00", desc: "Single Malt" }
    ]
};

const nav = document.getElementById('catNav');
const container = document.getElementById('menuContainer');
const searchInput = document.getElementById('searchInput');

function renderMenu(filter = "") {
    container.innerHTML = "";
    nav.innerHTML = "";

    Object.keys(menuData).forEach(cat => {
        const sectionItems = menuData[cat].filter(item => 
            item.name.toLowerCase().includes(filter.toLowerCase())
        );

        if (sectionItems.length > 0) {
            // Render Nav
            const catLink = document.createElement('a');
            catLink.href = `#${cat}`;
            catLink.innerText = cat;
            catLink.className = "hover:text-amber-500 transition-colors";
            nav.appendChild(catLink);

            // Render Section
            const section = document.createElement('section');
            section.id = cat;
            section.innerHTML = `
                <h3 class="gold-text uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                    <span class="h-[1px] w-8 bg-amber-500/30"></span> ${cat}
                </h3>
                <div class="grid gap-4">
                    ${sectionItems.map(item => `
                        <div class="glass p-4 rounded-2xl flex justify-between items-center item-card">
                            <div class="flex-1">
                                <h4 class="font-semibold text-white">${item.name}</h4>
                                <p class="text-xs opacity-50 font-light mt-1">${item.desc}</p>
                            </div>
                            <div class="text-right ml-4">
                                <span class="gold-text font-semibold">${item.price}€</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            container.appendChild(section);
        }
    });
    lucide.createIcons();
}

searchInput.addEventListener('input', (e) => renderMenu(e.target.value));

function feelingLucky() {
    const allItems = Object.values(menuData).flat();
    const random = allItems[Math.floor(Math.random() * allItems.length)];
    document.getElementById('luckyResult').innerText = random.name;
    document.getElementById('luckyModal').classList.remove('hidden');
}

function closeLucky() {
    document.getElementById('luckyModal').classList.add('hidden');
}

// Init
renderMenu();
