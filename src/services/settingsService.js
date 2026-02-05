import { supabase } from '../lib/supabase';

export const settingsService = {
    // Obtener un setting por su key
    get: async (key) => {
        const { data, error } = await supabase
            .from('site_settings')
            .select('value')
            .eq('key', key)
            .single();

        if (error) {
            console.error(`Error fetching setting ${key}:`, error);
            return null;
        }

        return data?.value;
    },

    // Actualizar un setting
    update: async (key, value) => {
        const { data, error } = await supabase
            .from('site_settings')
            .upsert({
                key,
                value,
                updated_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) {
            console.error(`Error updating setting ${key}:`, error);
            throw error;
        }

        return data;
    },

    // Métodos específicos para promoción San Valentín
    getValentinePromo: async () => {
        const value = await settingsService.get('valentine_promo');
        return value?.active ?? false;
    },

    setValentinePromo: async (active) => {
        return await settingsService.update('valentine_promo', { active });
    }
};
