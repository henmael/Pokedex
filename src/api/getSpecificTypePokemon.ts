import axios from "axios";

export async function getSpecificTypePokemon(type: string){
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`)
    return response;
}