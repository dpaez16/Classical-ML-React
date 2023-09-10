export function validNumber(str) {
    const trimmed = str.trim();
    return trimmed.length > 0 && isFinite(trimmed);
};

export function isNonNegativeNumber(str) {
    return validNumber(str) && Number(str) >= 0;
}