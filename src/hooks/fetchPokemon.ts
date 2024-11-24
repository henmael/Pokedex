import { useEffect } from "react";
import { Pokemon } from "../pages/Home";
import { getPokemon } from "../api/getPokemon";
import { getSpecificPokemon } from "../api/getSpecificPokemon";
import { getSpecificPokemonSearch } from "../api/getSpecificPokemonSearch";
import { SpecificPokemon } from "../pages/Pokemon";

export function useGetAllPokemons(pokeTerm: string, limit: number, offset: number, setPokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>){
    useEffect(() => {
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
    },[setUrl, pokemon, setLoading])
}

export function useGetSpecificPokemonSearch(pokeTerm: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>, 
                                            setUrl:React.Dispatch<React.SetStateAction<string[]>>){
    useEffect(() => {
        async function fetchPokemons(){
            setLoading(true);
            try {
                if (pokeTerm && pokeTerm !== ''){
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

        if (pokeTerm){
            fetchPokemons();
        }
    },[setUrl, pokeTerm, setLoading])
}

export function useGetSpecificPokemonDesc(pokemonId: number, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setPokemon: React.Dispatch<React.SetStateAction<SpecificPokemon | undefined>>){
    useEffect(() => {
        async function fetchPokemons(){
            setLoading(true);
            try {
                    const data = await getSpecificPokemonSearch(pokemonId);
                    setPokemon(data.data);

            }catch(error){
                console.error('Error fetching types: ', error);
            }
            finally{
                setLoading(false);
            }
        }

        fetchPokemons();
    },[setPokemon, pokemonId, setLoading])
}