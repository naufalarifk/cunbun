import { Card, Badge } from '../../atoms';

interface Team {
  id: string;
  name: string;
  memberCount: number;
  role: 'owner' | 'member' | 'admin';
}

export function TeamCard({ team }: { team: Team }) {
  const roleColors = {
    owner: 'danger' as const,
    admin: 'warning' as const,
    member: 'primary' as const,
  };

  return (
    <Card>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">{team.name}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {team.memberCount} members
          </p>
        </div>
        <Badge variant={roleColors[team.role]}>{team.role}</Badge>
      </div>
    </Card>
  );
}
