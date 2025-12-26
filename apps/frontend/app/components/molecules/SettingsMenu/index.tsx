import { Button } from '../../atoms';

interface SettingsMenuProps {
  onProfile?: () => void;
  onPreferences?: () => void;
  onLogout?: () => void;
}

export function SettingsMenu({
  onProfile,
  onPreferences,
  onLogout,
}: SettingsMenuProps) {
  return (
    <div className="space-y-2">
      <Button
        variant="secondary"
        size="md"
        className="w-full justify-start"
        onClick={onProfile}
      >
        Profile Settings
      </Button>
      <Button
        variant="secondary"
        size="md"
        className="w-full justify-start"
        onClick={onPreferences}
      >
        Preferences
      </Button>
      <Button
        variant="danger"
        size="md"
        className="w-full justify-start"
        onClick={onLogout}
      >
        Logout
      </Button>
    </div>
  );
}
