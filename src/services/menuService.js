import { supabase } from '../lib/supabase';

// Imágenes locales para platos por defecto (fallback)
import rapeImg from '../assets/rape.png';
import nachosImg from '../assets/nachos.png';
import saladImg from '../assets/salad.png';
import lasagnaImg from '../assets/lasagna.png';
import pizzaImg from '../assets/pizza.png';
import tiramisuImg from '../assets/tiramisu.png';

// Mapeo de imágenes por defecto según el título del plato
const defaultImages = {
    'Rape al estilo Tavernetta': rapeImg,
    'Nachos Machos': nachosImg,
    'Ensalada Manolo': saladImg,
    'Presa 100% Cerdo Ibérico Bellota': lasagnaImg,
    'Entrecot de Vaca': lasagnaImg,
    'Lasaña Boloñesa': lasagnaImg,
    'Pizza Alejandro': pizzaImg,
    'Pizza 4 Quesos': pizzaImg,
    'Tarta de Queso al horno': tiramisuImg,
    'Brownie de Chocolate': tiramisuImg,
    'Tiramisù Classico': tiramisuImg
};

// Función auxiliar para asignar imagen por defecto si no hay imagen
const assignDefaultImage = (dish) => {
    if (!dish.img) {
        dish.img = defaultImages[dish.title] || pizzaImg;
    }
    // Mapear 'description' de DB a 'desc' para compatibilidad con el frontend
    if (dish.description && !dish.desc) {
        dish.desc = dish.description;
    }
    return dish;
};

export const menuService = {
    // Obtener todos los platos
    getAll: async () => {
        const { data, error } = await supabase
            .from('dishes')
            .select('*')
            .order('id', { ascending: true });

        if (error) {
            console.error('Error fetching dishes:', error);
            return [];
        }

        return data.map(assignDefaultImage);
    },

    // Añadir un nuevo plato
    add: async (dish) => {
        const { data, error } = await supabase
            .from('dishes')
            .insert([{
                title: dish.title,
                description: dish.desc,
                price: dish.price,
                img: dish.img || null
            }])
            .select()
            .single();

        if (error) {
            console.error('Error adding dish:', error);
            throw error;
        }

        return assignDefaultImage(data);
    },

    // Actualizar un plato existente
    update: async (id, updatedDish) => {
        const { data, error } = await supabase
            .from('dishes')
            .update({
                title: updatedDish.title,
                description: updatedDish.desc,
                price: updatedDish.price,
                img: updatedDish.img || null
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating dish:', error);
            throw error;
        }

        return assignDefaultImage(data);
    },

    // Eliminar un plato
    delete: async (id) => {
        const { error } = await supabase
            .from('dishes')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting dish:', error);
            throw error;
        }
    }
};
