import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

export function PokeBallLoading(){
    return (
        <CatchingPokemonIcon fontSize='large' sx={{margin: 'auto', display: 'block', color: '#CC0000', animation: 'spin 1s linear infinite',
            "@keyframes spin": {
                "0%": {
                    transform: "rotate(360deg)",
                },
                "100%": {
                    transform: "rotate(0deg)"
                }
            }
        }}/>
    )
}