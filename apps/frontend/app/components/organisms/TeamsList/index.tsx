import { useState, useEffect } from 'react';
import { TeamCard } from '../../molecules';
import { Button } from '../../atoms';

interface Team {
  id: string;
  name: string;
  memberCount: number;
  role: 'owner' | 'member' | 'admin';
}

export function TeamsList() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch teams from API
    // For now, using mock data
    setTeams([
      {
        id: '1',
        name: 'Frontend Team',
        memberCount: 5,
        role: 'owner',
      },
      {
        id: '2',
        name: 'Backend Team',
        memberCount: 4,
        role: 'admin',
      },
      {
        id: '3',
        name: 'Design Team',
        memberCount: 3,
        role: 'member',
      },
    ]);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading teams...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Teams</h2>
        <Button variant="primary" size="md">
          + New Team
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
}
