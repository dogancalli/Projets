import React from 'react';

import './InfoBar.css';

const InfoBar = ({channel}) => {

    return (
        <div>
            <h1>{channel}</h1>
        </div>
    )
}

export default InfoBar;