import { Search } from '@mui/icons-material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { Box, Button, Container, IconButton, ImageList, InputBase, Paper, Stack } from '@mui/material';
import { useState } from 'react';
import Forms from '../components/Forms';
import { useGetAllPokemons, useGetSpecificPokemon, useGetSpecificPokemonSearch } from '../hooks/fetchPokemon';
import { useGetSpecificType } from '../hooks/fetchTypes';

export type Pokemon = {
    name: string;
    url: string;
}

export function Home(){
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [url, setUrl] = useState<string[]>([]);
    const [type, setType] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const [search, setSearch] = useState<string>('');
    const [searchSpecificPokemon, setSearchSpecificPokemon] = useState<string>(sessionStorage.getItem('pokemon') ?? '');

    sessionStorage.setItem('pokemon', searchSpecificPokemon);

    useGetSpecificPokemonSearch(searchSpecificPokemon, setLoading, setUrl);

    const offset = 0; 
    const [limit, setLimit] = useState(20);

    useGetSpecificType(setLoading, type, setPokemon);

    useGetSpecificPokemon(pokemon, setLoading, setUrl);

    useGetAllPokemons(searchSpecificPokemon, limit, offset, setPokemon);

    const handleOnClickMore = () => {
        setLimit(limit+20);
    }

    const handleOnSearch = (pokemonTerm: string) => {
        setSearch(pokemonTerm);
    }

    const handleOnClickSearch = () => {
        setSearchSpecificPokemon(search);
    }

    console.log(url)

    return (
            <Container style={{display: 'flex', flexDirection: 'column', justifyContent: 'stretch'}}>
                <IconButton style={{ alignSelf: 'flex-start' }}>
                    <CatchingPokemonIcon style={{ fontSize: '70px', color: '#CC0000' }}/>
                </IconButton>
                <Stack marginBottom={2} spacing={1} >
                    <Paper component='form' 
                            sx={{ display: 'flex', alignItems: 'center', width: '100%'}}>
                        <InputBase
                            onChange={e => handleOnSearch(e.target.value)}
                            sx={{ ml: 1, flex: 1, height: 25}}
                            placeholder="Search Pokemon"
                        />
                        <IconButton onClick={handleOnClickSearch} type='submit' style={{marginRight: 10}}>
                            <Search sx={{color: 'black'}}/>
                        </IconButton>
                    </Paper>
                </Stack>
                <Box display='flex' gap={2} marginBottom={5} borderRadius={10}>
                    <Forms  label={'Type'} setType={setType} type={type}/>
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
               {type ? '' : 
               <Button onClick={handleOnClickMore} style={{color: 'white', backgroundColor: 'black', 
                margin: 'auto', textAlign: 'center', 
                borderRadius: 10, fontSize: 20, 
                }}>View More</Button>}
            </Container>
    )
} 