import React from 'react'
import './scroll.css';
import ModalVideo from 'react-modal-video';
import {ResizableBox} from 'react-resizable';

const VideoTutorialDialog = ({isOpen, toggleModal}) => {
    const opts = {
        height: '10',
        width: '20',
        playerVars: {
            autoplay: 1,
        },
    };

    const WIDTH = 400;
    const HEIGHT = 100;

    return (
        <ResizableBox width={WIDTH} height={HEIGHT}>
            <ModalVideo cy-data="data" channel='youtube' ratio='2000:10' isOpen={isOpen} opts={opts}
                        videoId='r49ID-R6TyY' onClose={toggleModal}/>
        </ResizableBox>
    )
};

export default VideoTutorialDialog;
