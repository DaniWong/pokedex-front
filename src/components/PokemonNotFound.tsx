import React from 'react';
import { Result } from 'antd';

export const PokemonNotFound: React.FC = () => {
    return (
        <Result
            status="404"
            title="Pokemon not found"
            subTitle="Sorry, the pokemon you visited does not exist."
        />
    )
}