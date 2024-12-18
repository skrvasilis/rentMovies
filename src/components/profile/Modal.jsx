import React, { useEffect } from 'react';
import "./profile.scss"
const Modal = ({ isVisible, onClose, children }) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.className === 'modal-overlay') {
        onClose();
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};





export default Modal;
