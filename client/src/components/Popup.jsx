import React, { useEffect, useState } from 'react';
import './Popup.css';

function Popup({ message, onClose }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        const progressTimer = setInterval(() => {
            setProgress(prevProgress => {
                const newProgress = prevProgress + 1;
                if (newProgress >= 100) {
                    clearInterval(progressTimer);
                }
                return newProgress;
            });
        }, 30);

        return () => {
            clearTimeout(timer);
            clearInterval(progressTimer);
        };
    }, [onClose]);

    return (
        <div className="popup">
            <div className="popupContent">
                <div className="progressBar" style={{ width: `${progress}%` }}></div>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default Popup;
