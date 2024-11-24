import { Search } from '@mui/icons-material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { Box, Button, Container, IconButton, ImageList, InputBase, Paper, Stack } from '@mui/material';
import { useState } from 'react';
import Forms from '../components/Forms';
import { useGetAllPokemons, useGetSpecificPokemon } from '../hooks/fetchPokemon';
import { useGetSpecificType } from '../hooks/fetchTypes';

export type Pokemon = {
    name: string;
    url: string;
}

export function Home(){
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [url, setUrl] = useState<string[]>([]);
    const [type1, setType1] = useState<string>('');
    const offset = 0; 
    const [limit, setLimit] = useState(20);
    const [loading, setLoading] = useState<boolean>(false);

    useGetSpecificType(setLoading, type1, setPokemon);

    useGetAllPokemons(limit, offset, setPokemon);

    useGetSpecificPokemon(pokemon, setLoading, setUrl);

    const handleOnClickMore = () => {
        setLimit(limit+20);
    }

    return (
            <Container style={{display: 'flex', flexDirection: 'column', justifyContent: 'stretch'}}>
                <IconButton style={{ alignSelf: 'flex-start' }}>
                    <CatchingPokemonIcon style={{ fontSize: '70px', color: '#CC0000' }}/>
                </IconButton>
                <Stack marginBottom={2} spacing={1} >
                    <Paper component='form' sx={{ display: 'flex', alignItems: 'center', width: '100%'}}>
                            <InputBase
                            sx={{ ml: 1, flex: 1, height: 25}}
                            placeholder="Search Pokemon - not implemented"
                        />
                        <IconButton type='submit' style={{marginRight: 10}}>
                            <Search sx={{color: 'black'}}/>
                        </IconButton>
                    </Paper>
                </Stack>
                <Box display='flex' gap={2} marginBottom={5} borderRadius={10}>
                    <Forms  label={'Type'} setType={setType1} type={type1}/>
                </Box>
                <Stack>
                    <ImageList>
                         
                        {url.map((poke, index) => (
                            <Paper key={index} square={false} sx={{height: 250, borderRadius: 3, marginBottom: 2, alignContent: 'center'}}>
                                {loading ? <CatchingPokemonIcon fontSize='large' sx={{margin: 'auto', display: 'block', color: '#CC0000', animation: 'spin 1s linear infinite',
                                    "@keyframes spin": {
                                        "0%": {
                                            transform: "rotate(360deg)",
                                        },
                                        "100%": {
                                            transform: "rotate(0deg)"
                                        }
                                    }
                                }}/> : <img src={poke ? poke : ''} style={{display: 'block', margin: 'auto', width: '150px', height: '150px'}}/>}
                            </Paper>
                        ))}
                    </ImageList>    
                </Stack>
               {type1 ? '' : 
               <Button onClick={handleOnClickMore} style={{color: 'white', backgroundColor: 'black', 
                margin: 'auto', textAlign: 'center', 
                borderRadius: 10, fontSize: 20, 
                }}>View More</Button>}
            </Container>
    )
} 