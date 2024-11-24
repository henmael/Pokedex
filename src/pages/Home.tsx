import { Search } from '@mui/icons-material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { Box, Button, CircularProgress, Container, FormControl, IconButton, ImageList, InputBase, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { getType } from '../getType';
import { getPokemon } from '../getPokemon';
import { getSpecificPokemon } from '../getSpecificPokemon';
import { getSpecificTypePokemon } from '../getSpecificTypePokemon';

interface FormsProps{
    label: string;
    setType: React.Dispatch<React.SetStateAction<string>>;
    type: string;
}

type Pokemon = {
    name: string;
    url: string;
}

type PokemonType = {
    name: string;
    url: string;
}

function Forms({label, setType, type}: FormsProps){
    const [localtType, setLocalType] = useState<PokemonType[]>([]);

    useEffect(() => {
        async function fetchTypes() {
            try {
                const data = await getType();
                setLocalType(data.data.results);
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        }
        fetchTypes();
    }, []);

    return (
        <FormControl fullWidth style={{backgroundColor: '#CC0000', borderRadius: 10}}>
        <InputLabel style={{color: 'white'}}>{label}</InputLabel>
        <Select
            value={type}
            label={label}
            style={{color: 'white'}}
            onChange={(e: SelectChangeEvent) => setType(e.target.value as string)}
        >
            {localtType.map((type, index) => (
                <MenuItem key={index} value={type.name}>{type.name}</MenuItem>
            ))}
        </Select>
    </FormControl>
    )
}

export function Home(){
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [url, setUrl] = useState<string[]>([]);
    const [type1, setType1] = useState<string>('');
    const offset = 0; 
    const [limit, setLimit] = useState(20);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchTypes() {
            setLoading(true);
            try {
                const data = await getSpecificTypePokemon(type1);
                if (data.data.pokemon){
                    const poke = data.data.pokemon;
                    const details = poke.map((item: { pokemon: { url: any; }; }) => ({
                        name: item.pokemon.url,
                        url: item.pokemon.url
                    }))
                    if (type1)
                        setPokemon(details);
                }
            } catch (error) {
                console.error('Error fetching types:', error);
            }finally{
                setLoading(false);
            }
        }
        fetchTypes();
    }, [type1]);


    useEffect(() => {
        async function fetchTypes() {
            try {
                const data = await getPokemon(limit, offset);
                setPokemon(data.data.results);
                
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        }
        fetchTypes();
    }, [limit, offset]);

    useEffect(() => {
        async function fetchTypes() {
            try {
                const data = await getPokemon(limit, offset);
                setPokemon(data.data.results);
                
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        }
        fetchTypes();
    }, [limit, offset]);

    useEffect(() => {
        async function fetchPokemons(){
            setLoading(true);
            try {
                const newUrls = await Promise.all(
                    pokemon.map(async (poke) => {
                        const data = await getSpecificPokemon(poke.url);
                        return data.data.sprites.front_default;
                    })
                );
                setUrl(newUrls);
            }catch(error){
                console.error('Error fetching types: ', error);
            }
            finally{
                setLoading(false);
            }
        }

        fetchPokemons();
    },[pokemon])

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
                    <Forms  label={'Type 1'} setType={setType1} type={type1}/>
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
               {pokemon.length > 20 ?  '' : 
               <Button onClick={handleOnClickMore} style={{color: 'white', backgroundColor: 'black', 
                margin: 'auto', textAlign: 'center', 
                borderRadius: 10, fontSize: 20, 
                }}>View More</Button>}
            </Container>
    )
} 