import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info") => {
    const id = Date.now();
    
    // Prevent duplicate toasts
    if (toasts.some(t => t.message === message && t.type === type)) {
      return;
    }

    console.log("Toast added:", message, "- will show for 10 seconds");
    setToasts([...toasts, { id, message, type }]);
    
    // Increase timeout to 10 seconds for more visibility
    const timeoutId = setTimeout(() => {
      console.log("Removing toast:", message);
      removeToast(id);
    }, 10000); // 10-second timeout
    
    return timeoutId;
  };

  const removeToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast toast-${toast.type}`}
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              padding: "15px 25px",
              borderRadius: "4px",
              color: "white",
              zIndex: 1100,
              fontSize: "16px",
              fontWeight: "bold",
              backgroundColor:
                toast.type === "success"
                  ? "#28a745" // Green for success
                  : toast.type === "error"
                  ? "#dc3545" // Red for error
                  : "#17a2b8", // Blue for info
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              animation: "fadeIn 0.3s ease-in-out",
              minWidth: "250px",
              maxWidth: "400px"
            }}
          >
            {toast.message}
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                marginLeft: "16px",
                cursor: "pointer",
                fontSize: "20px"
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      {/* Add CSS for animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </ToastContext.Provider>
  );
};
