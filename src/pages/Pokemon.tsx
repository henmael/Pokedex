import { useParams } from "react-router-dom";
import { useGetSpecificPokemonDesc, useGetSpecificPokemonSpecies } from "../hooks/fetchPokemon"
import { useEffect, useState } from "react";
import { PokeBallLoading } from "../utils/PokeBallLoading";
import { Box, Button, Card, CardMedia, Collapse, Container, Paper, Stack, Typography } from "@mui/material";
import { getSpecificType } from "../api/getSpecificTypePokemon";
import { firstLetterUpperCase } from "../utils/firstLetterUpperCase";

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

export type FlavorTextVersion = {
    flavor_text: string;
    version: string;
}

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
    const [pokemonEntry, setPokemonEntry] = useState<FlavorTextVersion[]>([]);
    useGetSpecificPokemonDesc(Number(pokemonId), setLoading, setPokemon);

    const [checked, setChecked] = useState(false);
    
    useGetSpecificPokemonSpecies(Number(pokemonId), setLoading, setPokemonEntry);

    let textButton = 'Display More'; 

    const [typeImageUrl, setTypeImageUrl] = useState<string[]>([]);

    const pokemonName = firstLetterUpperCase(pokemon?.name as string);

    const handleChange = () => {
        setChecked((prev) => !prev);
      };

    useEffect(() => {
        const fetchTypeImages = async () => {
            if (!pokemon?.types) return;
            const newTypeImages = await Promise.all(
                pokemon.types.map(async (type) => {
                        const data = await getSpecificType(type.type.name);
                        return data.data.sprites['generation-vi']['omega-ruby-alpha-sapphire'].name_icon;
                })
            );

            
            setTypeImageUrl((prev) => [...prev, ...newTypeImages]);
        };
    
        fetchTypeImages();
    }, [pokemon, setTypeImageUrl]);

    if (checked){
        textButton = 'Minimize';
    }

    if (loading){
        return (
            <Box display='flex' alignItems='center' justifyItems='center' height='100vh' margin={0}>
                <PokeBallLoading/>
            </Box>
        )
    }

    return (
        <Container>
            <Box display='flex-column' alignContent='center' textAlign='center' justifyItems='center' >
                <Typography variant="h4">{pokemonName}</Typography>
                <Card style={{backgroundColor: 'black', borderRadius: 30, marginTop: 30, width: '100%', marginLeft: 'auto', marginRight: 'auto'}}>
                    <CardMedia component='img' image={pokemon?.sprites.front_default}/>
                </Card>
                <Box display='flex' gap={2} mt={2} marginRight='auto' marginLeft='auto'>
                    {typeImageUrl.length > 2 ? (
                        ''
                    ) : typeImageUrl.map((image, index) => (
                        <CardMedia key={index} component='img' image={image}/>
                    ))}
                </Box>
                <Paper sx={{padding: 5, backgroundColor: 'black', borderRadius: 10, marginTop: 2}}>
                    <Collapse in={checked} collapsedSize={350}>
                        {pokemonEntry && pokemonEntry.map((entryText, index) => (
                                    <Stack key={index}>
                                        <Typography variant="h5" color="white">
                                        {firstLetterUpperCase(entryText.version)}
                                        </Typography>
                                        <Typography color="white" textAlign='left' marginBottom={2}>
                                            {entryText.flavor_text}
                                        </Typography>
                                    </Stack>
                                ))}
                        </Collapse>
                    <Button style={{color: '#CC0000'}} onClick={handleChange}>{textButton}</Button>
                </Paper>
            </Box>
        </Container>
    )
}