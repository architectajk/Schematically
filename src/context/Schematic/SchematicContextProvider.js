import React,{ createContext, useState} from "react";

const SchematicContext = createContext();

const SchematicContextProvider = ({ children }) => {
    const [mode, setMode] = useState('dark');
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
      setAlert({
        msg: message,
        type: type,
      });
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    };
  
    const toggleMode = () => {
      if (mode === 'dark') {
        setMode('light');
        document.body.style.backgroundColor = '#eef1f6';
        showAlert('Light mode has been enabled', 'success');
      } else {
        setMode('dark');
        document.body.style.backgroundColor = '#1f1f1f';
        showAlert('Dark mode has been enabled', 'success');
      }
    };

    const contextValue = {
      mode,
      alert,
      showAlert,
      toggleMode,
    };
  
    return (
    <SchematicContext.Provider value={contextValue}>
              {children}
      </SchematicContext.Provider>
      );
  };
  

export {SchematicContext,SchematicContextProvider};