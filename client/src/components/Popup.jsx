import React, { useEffect } from 'react';
import './Popup.css';

function Popup({ message, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="popup">
            <div className="popupContent">
                <p>{message}</p>
            </div>
        </div>
    );
}

export default Popup;