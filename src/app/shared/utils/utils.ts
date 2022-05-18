export function _clean(object): any {
    const cleaned = {};
    const keys = Object.keys(object);
    keys.forEach(key => {
        if (object[key] !== undefined && object[key] !== null && object[key] !== '') {
            cleaned[key] = object[key];
        }
    });
    return cleaned;
}