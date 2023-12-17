import React,{ createContext, useState} from "react";
import darkModeImage from '../..//assets/codioful-formerly-gradienta-n2XqPm7Bqhk-unsplash.jpg';
import lightModeImage from '../../assets/light_codioful-formerly-gradienta-n2XqPm7Bqhk-unsplash.jpg'

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
        document.body.style.backgroundImage = `url(${lightModeImage})`;
        showAlert('Light mode has been enabled', 'success');
      } else {
        setMode('dark');
        document.body.style.backgroundImage = `url(${darkModeImage})`;
        showAlert('Dark mode has been enabled', 'success');
      }
    };
    
    const contextValue = {
      mode,
      alert,
      showAlert,
      toggleMode,
    };
  
    return <SchematicContext.Provider value={contextValue}>{children}</SchematicContext.Provider>;
  };
  

export {SchematicContext,SchematicContextProvider};