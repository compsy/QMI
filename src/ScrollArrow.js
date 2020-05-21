import React, {useState} from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';
import './scroll.css';
import WatchTutorial from "./WatchTutorial";
import HelpIcon from "@material-ui/icons/Help";

const useModal = () => {
    const [isOpen, setOpen] = useState(false);
    return [isOpen, () => setOpen(!isOpen)];

}

const ScrollArrow = () => {


    const [isOpen, onOpenModal] = useModal()
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false)
        }
    };

    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    window.addEventListener('scroll', checkScrollTop);

    return (
        <div>
            <FaArrowCircleUp className="scrollTop" onClick={scrollTop}
                             style={{height: 40, display: showScroll ? 'flex' : 'none'}}/>
            <HelpIcon data-cy="openTutorial" onClick={onOpenModal} style={{height: 80}}/>
            <WatchTutorial data-cy="maybe" isOpen={isOpen} toggleModal={onOpenModal}/>


        </div>

    );
};

export default ScrollArrow;