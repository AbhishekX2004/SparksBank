import React, { useState, useEffect } from 'react';
import './Typewriter.css';

const Typewriter = ({ name }) => {
    const [text, setText] = useState('');
    const [letterIndex, setLetterIndex] = useState(0);
    const typingSpeed = 120;

    useEffect(() => {
        const typingInterval = setInterval(() => {
            if (letterIndex < name.length) {
                setText((prevText) => prevText + name.charAt(letterIndex));
                setLetterIndex((prevIndex) => prevIndex + 1);
            } else {
                clearInterval(typingInterval);
            }
        }, typingSpeed);

        return () => clearInterval(typingInterval);
    }, [letterIndex, name]);

    return <p className="typewriter-container">{text}</p>;
};

export default Typewriter;
