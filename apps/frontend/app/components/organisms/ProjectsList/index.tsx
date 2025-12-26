import { useState, useEffect } from 'react';
import { ProjectCard } from '../../molecules';
import { Button } from '../../atoms';

interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'archived' | 'planning';
}

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch projects from API
    // For now, using mock data
    setProjects([
      {
        id: '1',
        name: 'Mobile App',
        description: 'iOS and Android application',
        status: 'active',
      },
      {
        id: '2',
        name: 'Dashboard',
        description: 'Analytics dashboard',
        status: 'active',
      },
      {
        id: '3',
        name: 'Documentation Site',
        description: 'API documentation',
        status: 'planning',
      },
    ]);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading projects...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <Button variant="primary" size="md">
          + New Project
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
