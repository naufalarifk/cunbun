import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Types
type Task = {
  id: string;
  content: string;
};

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

// Task Card Component
function TaskCard({ task }: { task: Task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
    >
      <p className="text-sm text-gray-800">{task.content}</p>
    </div>
  );
}

// Droppable Column Component
function Column({ column, tasks }: { column: Column; tasks: Task[] }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const taskIds = tasks.map((task) => task.id);

  return (
    <div className="bg-gray-100 rounded-lg p-4 w-80 flex-shrink-0">
      <h3 className="font-semibold text-gray-700 mb-4">{column.title}</h3>
      <div ref={setNodeRef}>
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

// Main Board Component
export default function TrelloBoard() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: 'task-1', content: 'Design new landing page' },
        { id: 'task-2', content: 'Review pull requests' },
        { id: 'task-3', content: 'Update documentation' },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        { id: 'task-4', content: 'Implement authentication' },
        { id: 'task-5', content: 'Write unit tests' },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        { id: 'task-6', content: 'Setup project structure' },
        { id: 'task-7', content: 'Configure build pipeline' },
      ],
    },
  ]);

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const findColumn = (taskId: string): string | null => {
    const column = columns.find((col) =>
      col.tasks.some((task) => task.id === taskId)
    );
    return column ? column.id : null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find which column the active task is in
    const activeColumn = findColumn(activeId);

    // Check if we're over a column directly or over a task
    let overColumn = findColumn(overId);

    // If overId is a column id, use it directly
    if (columns.some((col) => col.id === overId)) {
      overColumn = overId;
    }

    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return;
    }

    // Move task to the new column
    setColumns((prevColumns) => {
      const activeCol = prevColumns.find((col) => col.id === activeColumn);
      const overCol = prevColumns.find((col) => col.id === overColumn);

      if (!activeCol || !overCol) return prevColumns;

      const activeTask = activeCol.tasks.find((task) => task.id === activeId);
      if (!activeTask) return prevColumns;

      return prevColumns.map((col) => {
        if (col.id === activeColumn) {
          return {
            ...col,
            tasks: col.tasks.filter((task) => task.id !== activeId),
          };
        }
        if (col.id === overColumn) {
          // If over a task, insert before it; otherwise add to end
          const overTaskIndex = col.tasks.findIndex(
            (task) => task.id === overId
          );
          const newTasks = [...col.tasks];

          if (overTaskIndex >= 0) {
            newTasks.splice(overTaskIndex, 0, activeTask);
          } else {
            newTasks.push(activeTask);
          }

          return { ...col, tasks: newTasks };
        }
        return col;
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);

    // If we're in the same column, reorder
    if (activeColumn && overColumn && activeColumn === overColumn) {
      setColumns((prevColumns) => {
        const column = prevColumns.find((col) => col.id === activeColumn);
        if (!column) return prevColumns;

        const oldIndex = column.tasks.findIndex((task) => task.id === activeId);
        const newIndex = column.tasks.findIndex((task) => task.id === overId);

        if (oldIndex === -1 || newIndex === -1) return prevColumns;

        return prevColumns.map((col) => {
          if (col.id === activeColumn) {
            return {
              ...col,
              tasks: arrayMove(col.tasks, oldIndex, newIndex),
            };
          }
          return col;
        });
      });
    }

    setActiveId(null);
  };

  const activeTask = activeId
    ? columns.flatMap((col) => col.tasks).find((task) => task.id === activeId)
    : null;

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Project Board</h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columns.map((column) => (
            <Column key={column.id} column={column} tasks={column.tasks} />
          ))}
        </div>
        <DragOverlay>
          {activeTask ? (
            <div className="bg-white p-3 rounded-lg shadow-lg border-2 border-blue-400 cursor-grabbing rotate-3">
              <p className="text-sm text-gray-800">{activeTask.content}</p>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
