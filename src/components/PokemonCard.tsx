import React, {useEffect, useState} from 'react';
import { Card } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

const { Meta } = Card;

export interface PokemonCardProps {
    id: number;
    name: string;
    frontDefault: string;
    isFavorite: boolean;
    toogleFavorite(pokemonId: number, pokemonIsFavorite: boolean): any;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({id, name, frontDefault, isFavorite, toogleFavorite}) => {

    const heartFilled = <HeartFilled key="isFavorite" onClick={() => toogleFavorite(id, isFavorite)} />
    const heartOutlined = <HeartOutlined key="isNotFavorite" onClick={() => toogleFavorite(id, isFavorite)} />

    const [actions, setActions] = useState<Array<React.ReactNode>>([]);

    useEffect(() => {
        if(isFavorite){
            setActions([heartFilled])
        }else {
            setActions([heartOutlined])
        }
    }, [isFavorite])

    return (
        <Card
            style={{ width: 200 }}
            cover={<img alt={name} src={frontDefault} />}
            actions={actions}
        >
            <Meta title={name}/>
        </Card>
    )
};