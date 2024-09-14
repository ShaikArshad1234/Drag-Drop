// Draggable.js
import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

function Draggable({ id, type, children, className, style }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(children);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleCheckboxChange = () => {
    setContent(content === 'checked' ? 'unchecked' : 'checked');
  };

  const mergedStyle = {
    transform: CSS.Translate.toString(transform),
    transition: 'transform 0.2s ease',
    cursor: 'grab',
    opacity: isDragging ? 0.8 : 1,
    border: '1px solid #ddd',
    padding: '8px 16px',
    margin: '4px 0',
    backgroundColor: isDragging ? '#f0f0f0' : '#fff',
    boxShadow: isDragging ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
    borderRadius: '4px',
    ...style,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={mergedStyle}
      className={className}
      onDoubleClick={handleDoubleClick}
      role="button"
      aria-grabbed={isDragging}
      tabIndex={0}
    >
      {isEditing ? (
        type === 'input' ? (
          <input type="text" value={content} onChange={handleChange} onBlur={handleBlur} autoFocus />
        ) : type === 'checkbox' ? (
          <input
            type="checkbox"
            checked={content === 'checked'}
            onChange={handleCheckboxChange}
            onBlur={handleBlur}
            autoFocus
          />
        ) : type === 'button' ? (
          <button onBlur={handleBlur}>{content}</button>
        ) : type === 'table' ? (
          <table>
            <tbody>
              <tr>
                <td contentEditable="true" onBlur={handleBlur}>
                  {content}
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <input type="text" value={content} onChange={handleChange} onBlur={handleBlur} autoFocus />
        )
      ) : (
        <span>{content}</span>
      )}
    </div>
  );
}

export default Draggable; 
