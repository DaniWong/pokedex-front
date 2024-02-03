import React, {useEffect, useState} from 'react';
import { Flex, Typography, Input, Skeleton, notification, Image } from 'antd';
import { PokemonNotFound } from '../components/PokemonNotFound';
import { PokemonCard, PokemonCardProps} from '../components/PokemonCard';
import { getPokemon, pokemonSetIsFavorite } from '../lib/services';

const { Search } = Input;
const { Title } = Typography;


const boxStyleSearch: React.CSSProperties = {
    width: '100%',
    height: 60,
};

const boxStyleContent: React.CSSProperties = {
    width: '100%',
    height: 400,
};

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const PokemonPage: React.FC = () => {

    const [pokemon, setPokemon] = useState<PokemonCardProps | null>(null)
    const [pokemonToSearch, setPokemonToSearch] = useState('pikachu')
    const [loading, setLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType, description: string) => {
        api[type]({
          message: type,
          description: description,
        });
      };

    const setIsFavorite = async (pokemonId: number, setIsFavorite: boolean) => {
        try {
            //setLoading(true)
            const response = await pokemonSetIsFavorite(pokemonId, setIsFavorite);
            const pokemon = {
                id: response?.data?.id,
                name: response?.data?.name,
                frontDefault: response?.data?.front_default,
                isFavorite: response?.data?.is_favorite,
                toogleFavorite: toogleFavorite
            }
            setPokemon(pokemon)
        } catch (error: any) {
            console.error('Response error', error)
            if(error?.response?.status == 403){
                openNotificationWithIcon('error', error?.response?.statusText)
            }
            setPokemon(null)
        } finally {
            //setLoading(false)
        }
    }

    const toogleFavorite = (pokemonId: number, pokemonIsFavorite: boolean) => {
        const isFavorite = !pokemonIsFavorite
        setIsFavorite(pokemonId, isFavorite)
    }

    const searchPokemon = async () => {
        try {
            setLoading(true)
            const response = await getPokemon(pokemonToSearch);
            const pokemon = {
                id: response?.data?.id,
                name: response?.data?.name,
                frontDefault: response?.data?.front_default,
                isFavorite: response?.data?.is_favorite,
                toogleFavorite: toogleFavorite
            }
            setPokemon(pokemon)
        } catch (error: any) {
            console.error('Response error', error?.response?.status)
            if(error?.response?.status == 403){
                openNotificationWithIcon('error', error?.response?.statusText)
            }
            setPokemon(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        pokemonToSearch && searchPokemon()
    }, [pokemonToSearch])

    const onSearch = (keyword: any) => {
        setPokemonToSearch(keyword)
    }

    return ( 
        <Flex gap="middle" align={'start'} vertical>
            {contextHolder}
            <Flex gap={15} style={boxStyleSearch} justify={'center'} align={'center'}>
                <Image 
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/769px-Pokebola-pokeball-png-0.png' 
                    width={40} 
                />
                <Title level={1}>Pokedex</Title>
            </Flex>
            <Flex style={boxStyleSearch} justify={'center'} align={'center'}>
                <Search 
                    placeholder="Pokemon search by name or number..." 
                    enterButton="Search" 
                    size="large"
                    onSearch={onSearch}
                    allowClear
                    loading={loading}
                    style={{width: 400}}
                />
            </Flex>
            <Flex style={boxStyleContent} justify={'center'} align={'center'}>
                {
                    !pokemon && !loading && (
                        <PokemonNotFound/>
                    )
                }

                {
                    pokemon && !loading && (
                        <PokemonCard {...pokemon} />
                    )
                }

                { loading && <Skeleton style={{width: 400}} /> }
            </Flex>

            <Flex style={boxStyleSearch} justify={'center'} align={'center'}>
                <Title level={5}>By Daniel Wong</Title>
            </Flex>

        </Flex>
    )
};
