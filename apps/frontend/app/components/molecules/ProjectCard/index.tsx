import { Card, Badge } from '../../atoms';

interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'archived' | 'planning';
}

export function ProjectCard({ project }: { project: Project }) {
  const statusColors = {
    active: 'success' as const,
    planning: 'warning' as const,
    archived: 'danger' as const,
  };

  return (
    <Card>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{project.name}</h3>
          {project.description && (
            <p className="text-sm text-gray-600 mt-1">{project.description}</p>
          )}
        </div>
        <Badge variant={statusColors[project.status]}>{project.status}</Badge>
      </div>
    </Card>
  );
}
