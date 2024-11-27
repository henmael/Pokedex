import axios from "axios";

export async function getSpecificPokemonSpecies(id: number){
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    return response;
}