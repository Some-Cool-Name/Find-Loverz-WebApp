

export const saveToStorage = (key, toBeSaved) => {
    const toBeSaved_serialized = JSON.stringify(toBeSaved);
    localStorage.setItem(key, toBeSaved_serialized);
}

export const getFromStorage = (key) => {
    const result = JSON.parse(localStorage.getItem(key));
    return result;
}

export const deleteFromStorage = (key) => {
    localStorage.removeItem(key);
}