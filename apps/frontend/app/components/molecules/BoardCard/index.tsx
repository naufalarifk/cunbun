interface Board {
  id: string;
  name: string;
  projectId: string;
  columnCount: number;
  taskCount: number;
}

import { Card } from '../../atoms';

export function BoardCard({ board }: { board: Board }) {
  return (
    <Card>
      <h3 className="font-semibold text-gray-900">{board.name}</h3>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-gray-600">Columns</p>
          <p className="text-lg font-semibold text-gray-900">
            {board.columnCount}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Tasks</p>
          <p className="text-lg font-semibold text-gray-900">
            {board.taskCount}
          </p>
        </div>
      </div>
    </Card>
  );
}
