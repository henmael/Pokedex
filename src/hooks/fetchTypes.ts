import { useEffect, useMemo } from "react";
import { getSpecificType } from "../api/getSpecificTypePokemon";
import { Pokemon } from "../pages/Home";

export function useGetSpecificType(setLoading: React.Dispatch<React.SetStateAction<boolean>>, 
                            type: string, 
                            setPokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>){
    useMemo(() => {
        async function fetchTypes() {
            setLoading(true);
            try {
                const data = await getSpecificType(type);
                if (data.data.pokemon){
                    const poke = data.data.pokemon;
                    const details = poke.map((item: { pokemon: { url: {name: string, url: string}; }; }) => ({
                        name: item.pokemon.url,
                        url: item.pokemon.url
                    }))
                    if (type)
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