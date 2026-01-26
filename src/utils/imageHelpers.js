/**
 * Comprime y convierte una imagen a Base64 para almacenamiento ligero.
 * @param {File} file - El archivo de imagen seleccionado.
 * @returns {Promise<string>} - Promesa que resuelve con el string Base64 comprimido.
 */
export const compressImage = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800; // Reducir tamaño máximo para no saturar localStorage
                const scaleSize = MAX_WIDTH / img.width;
                const newWidth = (img.width > MAX_WIDTH) ? MAX_WIDTH : img.width;
                const newHeight = (img.width > MAX_WIDTH) ? (img.height * scaleSize) : img.height;

                canvas.width = newWidth;
                canvas.height = newHeight;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                // Comprimir a JPEG calidad 0.7
                const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
                resolve(compressedDataUrl);
            };
            img.onerror = (error) => reject(error);
        };
        reader.onerror = (error) => reject(error);
    });
};
