import { useParams } from "react-router-dom";
import { useGetSpecificPokemonDesc } from "../hooks/fetchPokemon"
import { useEffect, useState } from "react";
import { PokeBallLoading } from "../utils/PokeBallLoading";
import { Box, Card, CardMedia, Container, Paper, TextField, Typography } from "@mui/material";
import { Title } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { getSpecificType } from "../api/getSpecificTypePokemon";
import { useGetSpecificType } from "../hooks/fetchTypes";

export type SpecificPokemon = {
    id: number;
    name: string; // Assuming 'name' is Bulbasaur
    base_experience: number;
    height: number; // Height in decimeters
    weight?: number; // Weight can be optional
    sprites: Sprites;
    types: TypeDetail[];
    // abilities: Ability[];
    // cries: Cry;
    // forms: Form[];
    // game_indices: GameIndex[];
    // held_items?: HeldItem[]; // Optional, as it's currently empty
    // moves: Move[];
};

type Sprites = {
    front_default: string;
}

type TypeDetail = {
    slot: number; // The slot number (1 or 2 for dual types)
    type: {
        name: string; // e.g., "grass", "poison"
        url: string; // URL for more information on the type
    };
};

export function SecondPage(){

    const {pokemonId} = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [pokemon, setPokemon] = useState<SpecificPokemon>();
    useGetSpecificPokemonDesc(Number(pokemonId), setLoading, setPokemon);

    const [typeImageUrl, setTypeImageUrl] = useState<string[]>([]);

    useEffect(() => {
        const fetchTypeImages = async () => {
            if (!pokemon?.types) return;
            const newTypeImages = await Promise.all(
                pokemon.types.map(async (type) => {
                        const data = await getSpecificType(type.type.name);
                        return data.data.sprites['generation-iii'].emerald.name_icon;
                })
            );
            setTypeImageUrl((prev) => [...prev, ...newTypeImages]);
        };
    
        fetchTypeImages();
    }, [pokemon, setTypeImageUrl]);

    if (loading){
        return (
            <Box display='flex' alignItems='center' justifyItems='center' height='100vh' margin={0}>
                <PokeBallLoading/>
            </Box>
        )
    }

    return (
        <Container>
            <Box alignItems='center' textAlign='center'>
                <Typography variant="h4">{pokemon?.name}</Typography>
                <Card style={{backgroundColor: 'black', borderRadius: 30, marginTop: 30}}>
                    <CardMedia component='img' image={pokemon?.sprites.front_default}/>
                </Card>
                {typeImageUrl.map((image, index) => (
                    <CardMedia key={index} component='img' image={image}/>
                ))}
                
            </Box>
        </Container>
    )
}