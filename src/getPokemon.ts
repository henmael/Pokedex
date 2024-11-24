import axios from "axios";

export async function getPokemon(limit: number, offset: number){
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
    return response;
}