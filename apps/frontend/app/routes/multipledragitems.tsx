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
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { DragType, Column } from '../types/components';
import { SortableColumn } from '../components/atoms/SortableColumn';

// Sortable Column Component

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
  const [activeType, setActiveType] = useState<DragType | null>(null);

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
    setActiveType(event.active.data.current?.type || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    const activeType = active.data.current?.type;

    // Handle column reordering
    if (activeType === 'column') {
      const activeIndex = columns.findIndex((col) => col.id === activeId);
      const overIndex = columns.findIndex((col) => col.id === overId);

      if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
        setColumns((cols) => arrayMove(cols, activeIndex, overIndex));
      }
      return;
    }

    // Handle task dragging
    if (activeType === 'task') {
      const activeColumn = findColumn(activeId);
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
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      setActiveType(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;
    const activeType = active.data.current?.type;

    // Handle task reordering within same column
    if (activeType === 'task') {
      const activeColumn = findColumn(activeId);
      const overColumn = findColumn(overId);

      if (activeColumn && overColumn && activeColumn === overColumn) {
        setColumns((prevColumns) => {
          const column = prevColumns.find((col) => col.id === activeColumn);
          if (!column) return prevColumns;

          const oldIndex = column.tasks.findIndex(
            (task) => task.id === activeId
          );
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
    }

    setActiveId(null);
    setActiveType(null);
  };

  const activeTask =
    activeId && activeType === 'task'
      ? columns.flatMap((col) => col.tasks).find((task) => task.id === activeId)
      : null;

  const activeColumn =
    activeId && activeType === 'column'
      ? columns.find((col) => col.id === activeId)
      : null;

  const columnIds = columns.map((col) => col.id);

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Project Board</h1>
      <p className="text-sm text-gray-600 mb-4">
        Tip: Drag column headers to rearrange columns, drag tasks to move them
      </p>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={columnIds}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex gap-6 overflow-x-auto pb-4">
            {columns.map((column) => (
              <SortableColumn
                key={column.id}
                column={column}
                tasks={column.tasks}
              />
            ))}
          </div>
        </SortableContext>
        <DragOverlay>
          {activeTask ? (
            <div className="bg-white p-3 rounded-lg shadow-lg border-2 border-blue-400 cursor-grabbing rotate-3">
              <p className="text-sm text-gray-800">{activeTask.content}</p>
            </div>
          ) : activeColumn ? (
            <div className="bg-gray-100 rounded-lg p-4 w-80 shadow-lg border-2 border-blue-400 cursor-grabbing rotate-3 opacity-90">
              <h3 className="font-semibold text-gray-700 mb-4">
                {activeColumn.title}
              </h3>
              <div className="space-y-2 min-h-[200px]">
                {activeColumn.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white p-3 rounded-lg shadow-sm border border-gray-200"
                  >
                    <p className="text-sm text-gray-800">{task.content}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
