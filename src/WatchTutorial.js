import React, { useCallback, useState } from 'react'
import './scroll.css';
import ModalVideo from 'react-modal-video'

const WatchTutorial = ({isOpen, toggleModal}) => {

    const opts = {
        height: '10',
        width: '20',
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <ModalVideo channel='youtube' isOpen={isOpen} opts={opts}  videoId='C1-fRwmvzng' onClose={toggleModal} />
    )
};

export default WatchTutorial;