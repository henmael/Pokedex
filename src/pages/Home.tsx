import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { Box, Button, Container, Fade, IconButton, ImageList, Paper, useScrollTrigger } from '@mui/material';
import { useEffect, useState } from 'react';
import Forms from '../components/Forms';
import { useGetAllPokemons, useGetSpecificPokemon } from '../hooks/fetchPokemon';
import { useGetSpecificType } from '../hooks/fetchTypes';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PokeBallLoading } from '../utils/PokeBallLoading';
import SantaHat from '../assets/santahapixel.svg'
import { KeyboardArrowUp } from '@mui/icons-material';
import { dateDecember } from '../utils/dateDdecember';

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

    // const [scrollTarget, setScrollTarget] = useState();
    const scrollTrigger = useScrollTrigger({
        target:  window ? window : undefined,
        disableHysteresis: true,
        threshold: 100
    });

    
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

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
                <div id='back-to-top-anchor'/>
                <IconButton style={{ alignSelf: 'flex-start' }} onClick={handlePokeballOnClick}>
                    <CatchingPokemonIcon style={{ fontSize: '70px', color: '#CC0000' }}/>
                </IconButton>
                <Box display='flex' gap={2} marginBottom={5} borderRadius={10}>
                    <Forms  label={'Type'} setType={setType} type={type}/>
                </Box>
                        <ImageList> 
                            {url.map((poke, index) => (
                                <Paper key={index} square={false} sx={{height: 200, borderRadius: 3, marginBottom: 2, alignItems: 'center'}}>
                                    {loading ? <PokeBallLoading/> : 
                                        <div style={{position: 'relative', justifyItems: 'center', justifyContent: 'center',
                                            width: '100px',
                                            height: '200px'}}>
                                            <img 
                                            onClick={() => handleOnClickPokemonDesc(poke.split('/').pop()?.split('.')[0] as string)} 
                                            src={poke ? poke : ''} 
                                            style={{display: 'block', objectFit: 'contain', width: '150px', height: '200px', marginLeft: 10, marginRight: 10, alignItems: 'center', justifyItems: 'center'}}
                                            alt={'POKEMON ID: '+poke.split('/').pop()?.split('.')[0] as string}/>
                                            {dateDecember() === 11 ? (
                                                <img
                                                src={SantaHat} style={{position: 'absolute', height: '20%', width: '100%', top: '3%', marginLeft: 85, transform: 'translateX(-50%)'}}
                                            />
                                            ) : null}
                                        </div>
                                            
                                            }
                                </Paper>
                            ))}
                        </ImageList>
            <Fade in={scrollTrigger}>
                <Box
                    onClick={handleClick}
                    role="presentation"
                    sx={{ borderRadius: 100,position: 'fixed', bottom: 16, right: 16, backgroundColor: '#CC0000', width: 50, height: 50, justifyContent: 'center', alignContent: 'center', textAlign: 'center'}}
                >
                    <KeyboardArrowUp fontSize='large'/>
                </Box>
            </Fade>
            {type ? '' : 
            <Button onClick={handleOnClickMore} style={{color: 'white', backgroundColor: 'black', 
                margin: 'auto', textAlign: 'center', 
                borderRadius: 10, fontSize: 20, 
                }}>View More</Button>}
            </Container>
    )
} 