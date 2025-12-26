import { useState } from 'react';
import { SettingsMenu } from '../../molecules';
import { Card } from '../../atoms';

export function SettingsPanel() {
  const [showMenu, setShowMenu] = useState(false);

  const handleProfile = () => {
    // TODO: Navigate to profile settings
    console.log('Profile settings');
  };

  const handlePreferences = () => {
    // TODO: Navigate to preferences
    console.log('Preferences');
  };

  const handleLogout = () => {
    // TODO: Handle logout
    console.log('Logout');
  };

  return (
    <Card className="max-w-xs">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
      <SettingsMenu
        onProfile={handleProfile}
        onPreferences={handlePreferences}
        onLogout={handleLogout}
      />
    </Card>
  );
}
