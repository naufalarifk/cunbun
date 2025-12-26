import {
  BoardsList,
  ProjectsList,
  TeamsList,
  SettingsPanel,
} from '../../organisms';

export function HomeTemplate() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to Your Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your projects, teams, and tasks all in one place
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <BoardsList />
            <ProjectsList />
            <TeamsList />
          </div>

          {/* Right Sidebar */}
          <div>
            <SettingsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
