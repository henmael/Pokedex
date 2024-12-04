import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { Box, Button, Container, IconButton, ImageList, Paper, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import Forms from '../components/Forms';
import { useGetAllPokemons, useGetSpecificPokemon } from '../hooks/fetchPokemon';
import { useGetSpecificType } from '../hooks/fetchTypes';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PokeBallLoading } from '../utils/PokeBallLoading';
import SantaHat from '../assets/santahapixel.svg'

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

    const queryType = searchParams.get('type') ?? '';
    
    const navigate = useNavigate();

    const offset = 0; 
    const [limit, setLimit] = useState(20);

    useGetSpecificPokemon( pokemon, setLoading, setUrl);

    useGetSpecificType(setLoading, queryType, setPokemon);

    useGetAllPokemons(limit, offset, setPokemon, setUrl, type);

    useEffect(() => {
        if (type){
            setSearchParams({type: type});
        }
    },[type, setSearchParams]);

    const handleOnClickMore = () => {
        setLimit(limit+20);
    }

    const handleOnClickPokemonDesc = (pokeId: string) => {
        navigate('/pokemon/'+pokeId);
    }  

    const handlePokeballOnClick = () => {
        setType(''); // Clear the type filter state
        setSearchParams({}); // Clear all query parameters
    }

    return (
            <Container style={{display: 'flex', flexDirection: 'column', justifyContent: 'stretch'}}>
                <IconButton style={{ alignSelf: 'flex-start' }} onClick={handlePokeballOnClick}>
                    <CatchingPokemonIcon style={{ fontSize: '70px', color: '#CC0000' }}/>
                </IconButton>
                <Box display='flex' gap={2} marginBottom={5} borderRadius={10}>
                    <Forms  label={'Type'} setType={setType} type={type}/>
                </Box>
                <Stack>
                    <ImageList> 
                        {url.map((poke, index) => (
                            <Paper key={index} square={false} sx={{height: 250, borderRadius: 3, marginBottom: 2, alignItems: 'center'}}>
                                {loading ? <PokeBallLoading/> : 
                                    <div style={{position: 'relative', margin: 'auto',
                                        width: '300px',
                                        height: '300px', }}>
                                        <img 
                                        onClick={() => handleOnClickPokemonDesc(poke.split('/').pop()?.split('.')[0] as string)} 
                                        src={poke ? poke : ''} 
                                        style={{display: 'block', objectFit: 'contain', width: '300px', height: '250px', alignContent: 'center', justifyContent: 'center'}}
                                        alt='pokemon'/>
                                        <img
                                            src={SantaHat} style={{position: 'absolute', height: '15%', top: '5px', left: '48%', transform: 'translateX(-50%)',
                                                width: '100%', zIndex: 1
                                            }}
                                        />
                                        
                                    </div>
                                        
                                        }
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