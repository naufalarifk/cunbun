import { useState } from 'react';
import { DndContext, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';

import { Draggable, Droppable } from '../components';

export default function MultipleDraggableItems() {
  const containers = ['A', 'B', 'C', 'D'];
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);

  const draggableMarkup = <Draggable id="draggable">Drag Me</Draggable>;

  function handleDragEnd(event: DragEndEvent) {
    const { over } = event;
    setParent(over ? over.id : null);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}
      {containers.map((id) => (
        <Droppable key={id}>
          {parent === id ? draggableMarkup : 'Drop Here'}
        </Droppable>
      ))}
    </DndContext>
  );
}
