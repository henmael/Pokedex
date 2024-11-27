import { useEffect } from "react";
import { Pokemon } from "../pages/Home";
import { getPokemon } from "../api/getPokemon";
import { getSpecificPokemon } from "../api/getSpecificPokemon";
import { getSpecificPokemonSearch } from "../api/getSpecificPokemonSearch";
import { FlavorTextVersion, SpecificPokemon } from "../pages/Pokemon";
import { getSpecificPokemonSpecies } from "../api/getSpecificPokemonSpecies";

export function useGetAllPokemons(limit: number, offset: number, setPokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>, pokeTerm: string, 
                                setUrl: React.Dispatch<React.SetStateAction<string[]>> ){
    useEffect(() => {
        async function fetchTypes() {
            try {
                if (pokeTerm){
                    const data = await getSpecificPokemonSearch(pokeTerm);
                    setUrl([data.data.sprites.front_default])
                }else{
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

export function useGetSpecificPokemon(pokemon: Pokemon[],  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
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
//
export function useGetSpecificPokemonSpecies(pokemonId: number, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setPokemonEntry: React.Dispatch<React.SetStateAction<FlavorTextVersion[]>>){
    useEffect(() => {
        async function fetchPokemons(){
            setLoading(true);
            try {
                    const data = await getSpecificPokemonSpecies(pokemonId);

                    const englishText = data.data.flavor_text_entries.filter((lang: {language: {name: string}}) => lang.language.name === 'en');
                    const removeDuplicate = englishText.filter((data: {flavor_text: string}, index: number, self: any) => {
                        const normalizedFlavorText = data.flavor_text.trim().replace(/\s+/g, ' ');
                        return index === self.findIndex((t: {flavor_text: string}) => t.flavor_text.trim().replace(/\s+/g, ' ') === normalizedFlavorText)
                    }).map((data: {flavor_text: string, version: {name: string}}) => { return {version: data.version.name, flavor_text: data.flavor_text}});

                    if (removeDuplicate.length > 0)
                        setPokemonEntry((prev) => [...prev, ...removeDuplicate]);

            }catch(error){
                console.error('Error fetching types: ', error);
            }
            finally{
                setLoading(false);
            }
        }

        fetchPokemons();
    },[pokemonId, setLoading, setPokemonEntry])
}