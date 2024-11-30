import { FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { getType } from "../getType";
import { useSearchParams } from "react-router-dom";

interface FormsProps{
    label: string;
    setType: React.Dispatch<React.SetStateAction<string>>;
    type: string;
}

type PokemonType = {
    name: string;
    url: string;
}

export default function Forms({label, setType, type}: FormsProps){
    const [localtType, setLocalType] = useState<PokemonType[]>([]);
    // const [_, setSearchParams] = useSearchParams();

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
    }, [setLocalType]);

    return (
        <FormControl fullWidth style={{backgroundColor: '#CC0000', borderRadius: 10}}>
        <InputLabel style={{color: 'white'}}>{label}</InputLabel>
        <Select
            value={type}
            label={label}
            style={{color: 'white'}}
            onChange={(e: SelectChangeEvent) => {
                setType(e.target.value as string)
                // setSearchParams({type: e.target.value as string})
            }}
        >
            {localtType.map((type, index) => (
                <MenuItem key={index} value={type.name}>{type.name}</MenuItem>
            ))}
        </Select>
    </FormControl>
    )
}