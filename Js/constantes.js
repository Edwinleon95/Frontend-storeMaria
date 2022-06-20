export const URL_BACKEND = "https://storemaria01.herokuapp.com/clientes/";

export function sortAZ(a,b) {
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    return 0;
}

export function sortZA(a,b){
    if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
    return 0;
}