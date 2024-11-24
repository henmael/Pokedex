import { useEffect } from "react";
import { Pokemon } from "../pages/Home";
import { getPokemon } from "../api/getPokemon";
import { getSpecificPokemon } from "../api/getSpecificPokemon";

export function useGetAllPokemons(limit: number, offset: number, setPokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>){
    useEffect(() => {
        async function fetchTypes() {
            try {
                const data = await getPokemon(limit, offset);
                setPokemon(data.data.results);
                
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        }
        fetchTypes();
    }, [limit, offset]);
}

export function useGetSpecificPokemon(pokemon: Pokemon[], setLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                        setUrl: React.Dispatch<React.SetStateAction<string[]>>){
    useEffect(() => {
        async function fetchPokemons(){
            setLoading(true);
            try {
                const newUrls = await Promise.all(
                    pokemon.map(async (poke) => {
                        const data = await getSpecificPokemon(poke.url);
                        return data.data.sprites.front_default;
                    })
                );
                setUrl(newUrls);
            }catch(error){
                console.error('Error fetching types: ', error);
            }
            finally{
                setLoading(false);
            }
        }

        fetchPokemons();
    },[pokemon])
}