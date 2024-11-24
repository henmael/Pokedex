import { useMemo } from "react";
import { Pokemon } from "../pages/Home";
import { getPokemon } from "../api/getPokemon";
import { getSpecificPokemon } from "../api/getSpecificPokemon";
import { getSpecificPokemonSearch } from "../api/getSpecificPokemonSearch";

export function useGetAllPokemons(pokeTerm: string, limit: number, offset: number, setPokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>){
    useMemo(() => {
        async function fetchTypes() {
            try {
                if (!pokeTerm){
                    const data = await getPokemon(limit, offset);
                    setPokemon(data.data.results);
                }
   
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        }
        fetchTypes();
    }, [limit, offset, setPokemon, pokeTerm]);
}

export function useGetSpecificPokemon(pokemon: Pokemon[], setLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                        setUrl: React.Dispatch<React.SetStateAction<string[]>>){
    useMemo(() => {
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
    },[setUrl, pokemon, setLoading])
}

export function useGetSpecificPokemonSearch(pokeTerm: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>, 
                                            setUrl:React.Dispatch<React.SetStateAction<string[]>>){
    useMemo(() => {
        async function fetchPokemons(){
            setLoading(true);
            try {
                if (pokeTerm){
                    const data = await getSpecificPokemonSearch(pokeTerm);
                    setUrl([data.data.sprites.front_default])
                }

            }catch(error){
                console.error('Error fetching types: ', error);
            }
            finally{
                setLoading(false);
            }
        }

        fetchPokemons();
    },[setUrl, pokeTerm, setLoading])
}