-- =============================================
-- MIGRACIÓN: Crear tabla site_settings
-- Ejecuta este script en Supabase SQL Editor
-- =============================================

-- Crear tabla de configuración del sitio
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Política: Permitir lectura pública
CREATE POLICY "Allow public read" ON public.site_settings
    FOR SELECT USING (true);

-- Política: Permitir insertar
CREATE POLICY "Allow insert" ON public.site_settings
    FOR INSERT WITH CHECK (true);

-- Política: Permitir actualizar
CREATE POLICY "Allow update" ON public.site_settings
    FOR UPDATE USING (true);

-- Insertar configuración inicial de promoción San Valentín
INSERT INTO public.site_settings (key, value) VALUES 
    ('valentine_promo', '{"active": true}')
ON CONFLICT (key) DO NOTHING;
