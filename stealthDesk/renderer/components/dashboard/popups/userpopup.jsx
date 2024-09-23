import React from 'react';

const Popup = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-white p-6 rounded shadow-lg" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-2 right-2" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Popup;