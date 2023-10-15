import React, { useEffect, useState } from 'react';
import "./popup.css"

// function takes 3 props
function Popup({ onClose, title, content }) {
    const [opacity, setOpacity] = useState(1);

    //Run side functions - DOM updates
    useEffect(() => {
        //Timer that triggers a fade away after 1 second
        const timer = setTimeout(() => {
            setOpacity(0);
            setTimeout(onClose, 1000);  //When fading away - then close
        }, 2000);

        return () => clearTimeout(timer); // cleanup timer on component unmount
    }, [onClose]);

    return (
        <div className="popup-overlay" style={{ backgroundColor: `rgba(0,0,0,${opacity * 0.5})` }}>
        <div className="popup-content " style={{ opacity: opacity, transition: 'opacity 1s' }}>
            <button className="popup-close-btn" onClick={onClose}>Close</button>
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    </div>
    );
}

export default Popup;
