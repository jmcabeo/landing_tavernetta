-- =============================================
-- MIGRACIÓN: Crear tabla de platos (dishes)
-- Ejecuta este script en Supabase SQL Editor
-- =============================================

-- Crear tabla de platos
CREATE TABLE IF NOT EXISTS public.dishes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    price TEXT NOT NULL,
    img TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE public.dishes ENABLE ROW LEVEL SECURITY;

-- Política: Permitir lectura pública (menú visible para todos)
CREATE POLICY "Allow public read access" ON public.dishes
    FOR SELECT USING (true);

-- Política: Permitir insertar (para el admin)
CREATE POLICY "Allow insert" ON public.dishes
    FOR INSERT WITH CHECK (true);

-- Política: Permitir actualizar (para el admin)
CREATE POLICY "Allow update" ON public.dishes
    FOR UPDATE USING (true);

-- Política: Permitir eliminar (para el admin)
CREATE POLICY "Allow delete" ON public.dishes
    FOR DELETE USING (true);

-- Insertar platos iniciales de ejemplo
INSERT INTO public.dishes (title, description, price, img) VALUES
    ('Rape al estilo Tavernetta', 'Pescado, Apio, Molusco, Crustáceo, Soja. Una especialidad de la casa.', '22,50 €', NULL),
    ('Nachos Machos', 'Nachos, queso cheddar, chile con carne, salsa ranchera, guacamole y jalapeños.', '12,50 €', NULL),
    ('Ensalada Manolo', 'Pimiento asado, pollo marinado, atún, huevos cocidos, cebolla morada, aceitunas negras, aguacate.', '15 €', NULL),
    ('Presa 100% Cerdo Ibérico Bellota', 'Carne de primera calidad a la plancha.', '22,50 €', NULL),
    ('Entrecot de Vaca', 'Sabroso corte de vaca seleccionado.', '26,50 €', NULL),
    ('Lasaña Boloñesa', 'Gluten, Lácteos, Huevo. Nuestra receta clásica.', '16,50 €', NULL),
    ('Pizza Alejandro', 'Tomate, Mozzarella, Carne picada, Bacon, Salsa barbacoa.', '10 €', NULL),
    ('Pizza 4 Quesos', 'Tomate, Mozzarella, Gorgonzola, Parmesano, Cheddar.', '9,50 €', NULL),
    ('Tarta de Queso al horno', 'Casera y cremosa.', '5,50 €', NULL),
    ('Brownie de Chocolate', 'Templado con Helado.', '5,50 €', NULL),
    ('Tiramisù Classico', 'Un clásico italiano imperdible.', '7 €', NULL);
