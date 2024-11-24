import axios from "axios";

export async function getSpecificPokemonSearch(pokeName: string){
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
    return response;
}