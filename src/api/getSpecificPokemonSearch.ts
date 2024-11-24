import axios from "axios";

export async function getSpecificPokemonSearch(pokeName: string | number){
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
    return response;
}