import React from 'react'
import './scroll.css';
import ModalVideo from 'react-modal-video';
import {ResizableBox} from 'react-resizable';

const WatchTutorial = ({isOpen, toggleModal}) => {
    // const ResizableBox = require('react-resizable').ResizableBox;

    const opts = {
        height: '10',
        width: '20',
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <ResizableBox width={400} height={100}>
            <ModalVideo cy-data="data" channel='youtube' ratio='2000:10' isOpen={isOpen} opts={opts}
                        videoId='MOLMpy1SfWQ' onClose={toggleModal}/>
        </ResizableBox>
    )
};

export default WatchTutorial;