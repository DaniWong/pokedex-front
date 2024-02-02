import axios from 'axios';


const backend_base_url = 'http://localhost:8000' 
const authToken = 'c67ddcef-e978-48d8-a35b-1de909e30873'
const headers = {
    'Content-Type': 'application/json',
    'Authorization': authToken
}

export const getPokemon = (pokemonName: string) => {
    const url = `${backend_base_url}/pokedex/pokemon/${pokemonName}`
    return axios.get(url, {
        headers: headers
    })
}


export const pokemonSetIsFavorite = (pokemonId: number, isFavorite: boolean) => {
    const url = `${backend_base_url}/pokedex/pokemon/${pokemonId}/`
    return axios.patch(url, {is_favorite: isFavorite}, {
        headers: headers
      })
}