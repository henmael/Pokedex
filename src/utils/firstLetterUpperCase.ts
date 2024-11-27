export function firstLetterUpperCase(name: string){
    return String(name?.charAt(0).toUpperCase()+name?.slice(1));
}   