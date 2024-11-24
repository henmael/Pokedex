import { useParams } from "react-router-dom";
import { useGetSpecificPokemonDesc } from "../hooks/fetchPokemon"
import { useState } from "react";
import { PokeBallLoading } from "../utils/PokeBallLoading";
import { Box } from "@mui/material";

export type SpecificPokemon = {
    id: number;
    name: string; // Assuming 'name' is Bulbasaur
    base_experience: number;
    height: number; // Height in decimeters
    weight?: number; // Weight can be optional
    // abilities: Ability[];
    // cries: Cry;
    // forms: Form[];
    // game_indices: GameIndex[];
    // held_items?: HeldItem[]; // Optional, as it's currently empty
    // moves: Move[];
};

export function SecondPage(){

    const {pokemonId} = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [pokemon, setPokemon] = useState<SpecificPokemon>();
    useGetSpecificPokemonDesc(Number(pokemonId), setLoading, setPokemon);

    if (loading){
        return (
            <Box display='flex' alignItems='center' justifyItems='center' height='100vh' margin={0}>
                <PokeBallLoading/>
            </Box>
        )
    }

    return (
        <>
            <p>Pokemon Description {pokemon?.name}</p>
        </>
    )
}