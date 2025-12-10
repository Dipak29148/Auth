import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timeoutsRef = useRef({});

  const addToast = (message, type = "info") => {
    const id = Date.now() + Math.random(); // Ensure unique ID
    
    // Prevent duplicate toasts
    setToasts(prevToasts => {
      if (prevToasts.some(t => t.message === message && t.type === type)) {
        return prevToasts;
      }
      return [...prevToasts, { id, message, type }];
    });
    
    // Much longer durations for better visibility
    // Errors: 20 seconds, Success: 12 seconds, Info: 8 seconds
    const duration = type === "error" ? 20000 : type === "success" ? 12000 : 8000;
    
    // Clear any existing timeout for this toast (shouldn't happen, but safety)
    if (timeoutsRef.current[id]) {
      clearTimeout(timeoutsRef.current[id]);
    }
    
    // Set timeout to remove toast
    timeoutsRef.current[id] = setTimeout(() => {
      removeToast(id);
      delete timeoutsRef.current[id];
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prevToasts => {
      const filtered = prevToasts.filter((toast) => toast.id !== id);
      // Clear timeout if toast is manually removed
      if (timeoutsRef.current[id]) {
        clearTimeout(timeoutsRef.current[id]);
        delete timeoutsRef.current[id];
      }
      return filtered;
    });
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    const timeouts = timeoutsRef.current;
    return () => {
      Object.values(timeouts).forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            className={`toast toast-${toast.type}`}
            style={{
              position: "fixed",
              bottom: `${20 + index * 90}px`, // Stack toasts vertically with more spacing
              right: "20px",
              padding: "20px 28px",
              borderRadius: "12px",
              color: "white",
              zIndex: 9999,
              fontSize: "18px",
              fontWeight: "600",
              backgroundColor:
                toast.type === "success"
                  ? "#28a745" // Green for success
                  : toast.type === "error"
                  ? "#dc3545" // Red for error
                  : "#17a2b8", // Blue for info
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
              animation: "fadeInSlide 0.4s ease-out",
              minWidth: "320px",
              maxWidth: "450px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              border: `2px solid ${toast.type === "success" ? "#1e7e34" : toast.type === "error" ? "#c82333" : "#138496"}`,
              backdropFilter: "blur(10px)",
              letterSpacing: "0.3px"
            }}
          >
            <span style={{ flex: 1 }}>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "24px",
                lineHeight: "1",
                padding: "4px 8px",
                borderRadius: "4px",
                fontWeight: "bold",
                minWidth: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s"
              }}
              onMouseEnter={(e) => e.target.style.background = "rgba(255, 255, 255, 0.3)"}
              onMouseLeave={(e) => e.target.style.background = "rgba(255, 255, 255, 0.2)"}
              aria-label="Close toast"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      {/* Add CSS for animations */}
      <style>
        {`
          @keyframes fadeInSlide {
            from { 
              opacity: 0; 
              transform: translateX(100px) translateY(0);
            }
            to { 
              opacity: 1; 
              transform: translateX(0) translateY(0);
            }
          }
          .toast {
            transition: transform 0.3s ease-out, opacity 0.3s ease-out;
          }
        `}
      </style>
    </ToastContext.Provider>
  );
};
