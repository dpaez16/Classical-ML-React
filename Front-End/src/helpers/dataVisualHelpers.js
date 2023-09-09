export function properMinScaling(n) {
    return n >= 0 ? n * 0.9 : n * 1.1;
};

export function properMaxScaling(n) {
    return n >= 0 ? n * 1.1 : n * 0.9;
};