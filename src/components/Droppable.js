// Droppable.js
import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export function Droppable(props) { // Named export
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
    border: '2px dashed gray',
    padding: '16px',
    minHeight: '200px',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
