// Datos extraídos de la carta real proporcionada
const initialDishes = [
    // --- DESTACADOS / ESPECIALIDADES ---
    {
        id: 1,
        title: 'Rape al estilo Tavernetta',
        desc: 'Pescado, Apio, Molusco, Crustáceo, Soja. Una especialidad de la casa.',
        price: '22,50 €',
        img: '/src/assets/rape.png',
        category: 'Pescados'
    },
    {
        id: 2,
        title: 'Nachos Machos',
        desc: 'Nachos, queso cheddar, chile con carne, salsa ranchera, guacamole y jalapeños.',
        price: '12,50 €',
        img: '/src/assets/nachos.png',
        category: 'Entrantes'
    },
    {
        id: 3,
        title: 'Ensalada Manolo',
        desc: 'Pimiento asado, pollo marinado, atún, huevos cocidos, cebolla morada, aceitunas negras, aguacate.',
        price: '15 €',
        img: '/src/assets/salad.png',
        category: 'Ensaladas'
    },

    // --- CARNES ---
    {
        id: 4,
        title: 'Presa 100% Cerdo Ibérico Bellota',
        desc: 'Carne de primera calidad a la plancha.',
        price: '22,50 €',
        img: '/src/assets/lasagna.png', // Placeholder por ahora
        category: 'Carnes'
    },
    {
        id: 5,
        title: 'Entrecot de Vaca',
        desc: 'Sabroso corte de vaca seleccionado.',
        price: '26,50 €',
        img: '/src/assets/lasagna.png', // Placeholder
        category: 'Carnes'
    },

    // --- PASTAS Y PIZZAS ---
    {
        id: 6,
        title: 'Lasaña Boloñesa',
        desc: 'Gluten, Lácteos, Huevo. Nuestra receta clásica.',
        price: '16,50 €', // Actualizado precio según carta (implícito en rango similar) o mantenido si no visible
        img: '/src/assets/lasagna.png',
        category: 'Pasta'
    },
    {
        id: 7,
        title: 'Pizza Alejandro',
        desc: 'Tomate, Mozzarella, Carne picada, Bacon, Salsa barbacoa.',
        price: '10 €', // Precio estimado base pizzas
        img: '/src/assets/pizza.png',
        category: 'Pizza'
    },
    {
        id: 8,
        title: 'Pizza 4 Quesos',
        desc: 'Tomate, Mozzarella, Gorgonzola, Parmesano, Cheddar.',
        price: '9,50 €',
        img: '/src/assets/pizza.png',
        category: 'Pizza'
    },

    // --- POSTRES ---
    {
        id: 9,
        title: 'Tarta de Queso al horno',
        desc: 'Casera y cremosa.',
        price: '5,50 €',
        img: '/src/assets/tiramisu.png', // Placeholder
        category: 'Postres'
    },
    {
        id: 10,
        title: 'Brownie de Chocolate',
        desc: 'Templado con Helado.',
        price: '5,50 €',
        img: '/src/assets/tiramisu.png', // Placeholder
        category: 'Postres'
    },
    {
        id: 11,
        title: 'Tiramisù Classico',
        desc: 'Un clásico italiano imperdible.',
        price: '7 €', // Mantenido o ajustado
        img: '/src/assets/tiramisu.png',
        category: 'Postres'
    }
];

const STORAGE_KEY = 'tavernetta_menu_data_v3'; // Nueva version para limpiar datos viejos

export const menuService = {
    getAll: () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDishes));
            return initialDishes;
        }
        return JSON.parse(stored);
    },

    add: (dish) => {
        const dishes = menuService.getAll();
        const newDish = { ...dish, id: Date.now() };
        const updated = [...dishes, newDish];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return newDish;
    },

    update: (id, updatedDish) => {
        const dishes = menuService.getAll();
        const updated = dishes.map(d => d.id === id ? { ...d, ...updatedDish } : d);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updatedDish;
    },

    delete: (id) => {
        const dishes = menuService.getAll();
        const updated = dishes.filter(d => d.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    },

    reset: () => {
        localStorage.removeItem(STORAGE_KEY);
        return menuService.getAll();
    }
};
