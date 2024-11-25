import { useEffect } from "react";
import { getSpecificType } from "../api/getSpecificTypePokemon";
import { Pokemon } from "../pages/Home";

type PokemonSpecificType = {
    id: number,
    name: string,
    pokemon: PokemonSpecifcTypeDetail
}

type PokemonSpecifcTypeDetail = {
    slot: number; // The slot number (1 or 2 for dual types)
    name: string; 
    url: string; // URL for more information on the type
};

export function useGetSpecificType(setLoading: React.Dispatch<React.SetStateAction<boolean>>, 
                            type: string, 
                            setPokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>){
    useEffect(() => {
        async function fetchTypes() {
            setLoading(true);
            try {
                const data = await getSpecificType(type);
                if (data.data.pokemon){
                    const poke = data.data.pokemon;
                    const details = poke.map((pokemon: PokemonSpecificType) => ({
                        name: pokemon.pokemon.name,
                        url: pokemon.pokemon.url
                    }))
                    setPokemon(details);
                }
            } catch (error) {
                console.error('Error fetching types:', error);
            }finally{
                setLoading(false);
            }
        }
        fetchTypes();
    }, [type, setLoading, setPokemon]);
}