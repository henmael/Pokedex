import axios from "axios";

export async function getSpecificPokemon(url: string){
    const response = await axios.get(url)
    return response;
}