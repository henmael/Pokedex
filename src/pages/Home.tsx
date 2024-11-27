import { Search } from '@mui/icons-material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { Box, Button, Container, IconButton, ImageList, InputBase, Paper, Stack } from '@mui/material';
import { useState } from 'react';
import Forms from '../components/Forms';
import { useGetAllPokemons, useGetSpecificPokemon } from '../hooks/fetchPokemon';
import { useGetSpecificType } from '../hooks/fetchTypes';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PokeBallLoading } from '../utils/PokeBallLoading';

export type Pokemon = {
    name: string;
    url: string;
}

export function Home(){
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [url, setUrl] = useState<string[]>([]);
    const [type, setType] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get('query') ?? '';
    
    const navigate = useNavigate();

    const offset = 0; 
    const [limit, setLimit] = useState(20);

    const [change, setChange] = useState<string>('');
    const [click, setClick] = useState<string>('');

    useGetSpecificPokemon( pokemon, setLoading, setUrl);

    useGetSpecificType(setLoading, type, setPokemon);

    useGetAllPokemons(limit, offset, setPokemon, query, setUrl);

    const handleOnClickMore = () => {
        setLimit(limit+20);
    }

    const handleOnClickSearch = () => {
        setSearchParams({query: change});
        navigate(`/?query=${encodeURIComponent(change)}`)
    }

    const handleOnClickPokemonDesc = (pokeId: string) => {
        navigate('/pokemon/'+pokeId);
    }


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        setChange(e.target.value);
    }   

    return (
            <Container style={{display: 'flex', flexDirection: 'column', justifyContent: 'stretch'}}>
                <IconButton style={{ alignSelf: 'flex-start' }}>
                    <CatchingPokemonIcon style={{ fontSize: '70px', color: '#CC0000' }}/>
                </IconButton>
                <Stack marginBottom={2} spacing={1} >
                    <Paper component='form' 
                            sx={{ display: 'flex', alignItems: 'center', width: '100%'}}
                            onSubmit={(e) => {
                                e.preventDefault(); // Prevent page reload
                                handleOnClickSearch(); // Trigger search logic
                              }} >
                        <InputBase
                            onChange={e => {
                                handleInputChange(e);
                            }}
                            sx={{ ml: 1, flex: 1, height: 25}}
                            placeholder="Search Pokemon"
                            type='text'
                            value={change}
                        />
                        <IconButton onClick={handleOnClickSearch} style={{marginRight: 10}}>
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
                                {loading ? <PokeBallLoading/> : <img onClick={() => handleOnClickPokemonDesc(poke.split('/').pop()?.split('.')[0] as string)} src={poke ? poke : ''} style={{display: 'block', margin: 'auto', width: '150px', height: '150px'}}/>}
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