import { useState, useEffect } from 'react';
import { BoardCard } from '../../molecules';
import { Button } from '../../atoms';

interface Board {
  id: string;
  name: string;
  projectId: string;
  columnCount: number;
  taskCount: number;
}

export function BoardsList() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch boards from API
    // For now, using mock data
    setBoards([
      {
        id: '1',
        name: 'Development Sprint',
        projectId: '1',
        columnCount: 4,
        taskCount: 12,
      },
      {
        id: '2',
        name: 'Design Review',
        projectId: '1',
        columnCount: 3,
        taskCount: 8,
      },
      {
        id: '3',
        name: 'Bug Fixes',
        projectId: '2',
        columnCount: 2,
        taskCount: 5,
      },
    ]);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading boards...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Boards</h2>
        <Button variant="primary" size="md">
          + New Board
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {boards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
}
