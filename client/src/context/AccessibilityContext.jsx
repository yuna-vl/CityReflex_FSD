import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext(null);

export const AccessibilityProvider = ({ children }) => {
  // Font Size: 'small', 'normal', 'large'
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('civicreflex_font_size') || 'normal';
  });

  // High Contrast: boolean
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('civicreflex_high_contrast') === 'true';
  });

  // Language: 'en', 'hi', 'ta', 'te', 'bn', 'mr'
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('civicreflex_language') || 'en';
  });

  // Apply font size attribute to html root
  useEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSize);
    localStorage.setItem('civicreflex_font_size', fontSize);
  }, [fontSize]);

  // Apply high contrast class to html root
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('civicreflex_high_contrast', String(highContrast));
  }, [highContrast]);

  // Persist language selection
  useEffect(() => {
    localStorage.setItem('civicreflex_language', language);
  }, [language]);

  const handleSetFontSize = (size) => {
    if (['small', 'normal', 'large'].includes(size)) {
      setFontSize(size);
    }
  };

  const toggleHighContrast = () => {
    setHighContrast((prev) => !prev);
  };

  const changeLanguage = (langCode) => {
    setLanguage(langCode);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize: handleSetFontSize,
        highContrast,
        toggleHighContrast,
        language,
        changeLanguage
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

