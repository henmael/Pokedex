import { useEffect } from "react";
import { getSpecificType } from "../api/getSpecificTypePokemon";
import { Pokemon } from "../pages/Home";

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
                    const details = poke.map((item: { pokemon: { url: any; }; }) => ({
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
    }, [type]);
}