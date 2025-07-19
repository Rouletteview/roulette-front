export const decryptToken = (token: string) => {
    const bytes = CryptoJS.AES.decrypt(token, import.meta.env.VITE_ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}