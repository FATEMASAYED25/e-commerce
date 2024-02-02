import React, { useState, useEffect } from 'react';
import logo from './imges/exchange2.png';
import { useAddToHomescreenPrompt } from '../AddToHomeScreen';

const Header = () => {
  const [prompt, promptToInstall] = useAddToHomescreenPrompt();
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  useEffect(() => {
    isPWAInstalled();
  }, []);

  const isPWAInstalled = async () => {
    if ('getInstalledRelatedApps' in window.navigator) {
      const relatedApps = await navigator.getInstalledRelatedApps();
      let installed = false;
      relatedApps.forEach((app) => {
        if (app.url === 'https://yourwebsite.com/manifest.json') {
          installed = true;
        }
      });
      setIsAppInstalled(installed);
    }
  };

  const handleInstallButtonClick = () => {
    // Check if prompt is available before trying to install
    if (prompt) {
      // Trigger the installation prompt
      promptToInstall();
    } else {
      console.error('Installation prompt not available');
    }
  };

  return (
    <div>
      <nav>
        <div className="logo">
          <img src={logo} alt="SAI LOGO" />
        </div>
        {!isAppInstalled ? (
          <button id='download' onClick={handleInstallButtonClick}>Download</button>
        ) : (
          <div>Thanks for installing our app</div>
        )}
      </nav>
    </div>
  );
};

export default Header;
