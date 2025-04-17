import React, { useState, useEffect, useCallback } from 'react';
import './Toast.css';

const Toast = ({ message, type, onClose }) => {
  const [isLeaving, setIsLeaving] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleClose = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      setVisible(false);
      onClose();
    }, 300); // Match this with CSS animation duration
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 8000);

    return () => clearTimeout(timer);
  }, [handleClose]);

  if (!visible) return null;

  return (
    <div className={`toast toast-${type} ${isLeaving ? 'toast-exit' : ''}`}>
      <div className="toast-message">{message}</div>
      <button className="toast-close" onClick={handleClose}>×</button>
    </div>
  );
};

export default Toast;