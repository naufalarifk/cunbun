import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { DragType, Task, Column } from '../../../types/components';
import { TaskCard } from '../TaskCard';

export function SortableColumn({
  column,
  tasks,
}: {
  column: Column;
  tasks: Task[];
}) {
  const {
    attributes,
    listeners,
    setNodeRef: setSortableNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'column' as DragType,
      column,
    },
  });

  const { setNodeRef: setDroppableNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: 'column' as DragType,
      column,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const taskIds = tasks.map((task) => task.id);

  return (
    <div
      ref={setSortableNodeRef}
      style={style}
      className="bg-gray-100 rounded-lg p-4 w-80 flex-shrink-0"
    >
      <div
        {...attributes}
        {...listeners}
        className="font-semibold text-gray-700 mb-4 cursor-grab active:cursor-grabbing hover:bg-gray-200 p-2 rounded -mx-2 -mt-2"
      >
        {column.title}
      </div>
      <div ref={setDroppableNodeRef}>
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          <div className="space-y-2 min-h-[200px]">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
