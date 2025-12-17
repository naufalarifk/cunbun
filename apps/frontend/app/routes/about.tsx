import { Draggable } from '../components';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Droppable } from '../components/atoms/Droppable';
import { useState } from 'react';

export default function AboutComponent() {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = <Draggable>Drag Me</Draggable>;

  function handleDragEnd(event: DragEndEvent) {
    console.log('event', typeof event);
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }
  }

  return (
    <div>
      <h1>About!!!</h1>
      <DndContext onDragEnd={handleDragEnd}>
        {!isDropped ? draggableMarkup : null}
        <Droppable>{isDropped ? draggableMarkup : 'Drop Here'}</Droppable>
      </DndContext>
    </div>
  );
}
