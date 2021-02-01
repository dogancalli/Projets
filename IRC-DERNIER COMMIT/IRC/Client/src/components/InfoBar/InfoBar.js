import React from 'react';

import './InfoBar.css';

const InfoBar = ({channel}) => {

    return (
        <div className="infoBar">
            <h1 className="channelTitle">{channel}</h1>
        </div>

    )
}

export default InfoBar;
