import axios from "axios";

export async function getType(){
    const response = await axios.get(`https://pokeapi.co/api/v2/type/`)
    return response;
}