/**
 * Genera un hash SHA-256 de la contraseña para no guardarla en texto plano.
 * @param {string} password - Contraseña en texto plano.
 * @returns {Promise<string>} - Hash hexadecimal.
 */
export const hashPassword = async (password) => {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

/**
 * Verifica si una contraseña coincide con el hash almacenado.
 * @param {string} inputPassword - Contraseña ingresada.
 * @param {string} storedHash - Hash almacenado.
 * @returns {Promise<boolean>}
 */
export const verifyPassword = async (inputPassword, storedHash) => {
    const inputHash = await hashPassword(inputPassword);
    return inputHash === storedHash;
};
