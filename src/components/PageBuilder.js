import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { database, ref, set, get } from './firebase';
import Draggable from './Draggable';
import { Droppable } from './Droppable';
import SortableItem from './SortableItem';
import './PageBuilder.css';

const PageBuilder = () => {
  const [layout, setLayout] = useState([]);
  const [layoutName, setLayoutName] = useState('');

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over) {
      setLayout((prevLayout) => [
        ...prevLayout, 
        { id: active.id, type: active.id, label: 'Enter Your Name' }
      ]);
    }
  };

  const saveLayout = async () => {
    if (layoutName.trim() === '') {
      alert('Please enter a layout name.');
      return;
    }
    await set(ref(database, `layouts/${layoutName}`), { layout });
    alert('Layout saved!');
  };

  const loadLayout = async () => {
    if (layoutName.trim() === '') {
      alert('Please enter a layout name.');
      return;
    }
    const snapshot = await get(ref(database, `layouts/${layoutName}`));
    if (snapshot.exists()) {
      setLayout(snapshot.val().layout || []);
    } else {
      alert('No layout found!');
    }
  };

  const publishLayout = () => {
    const layoutHtml = layout.map((item) => `<div>${item.label}</div>`).join('');
    const blob = new Blob([layoutHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const handleRename = (id, newName) => {
    const updatedLayout = layout.map(item =>
      item.id === id ? { ...item, label: newName } : item
    );
    setLayout(updatedLayout);
  };

  return (
    <div className="container">
      <div className="header">
        <input
          type="text"
          value={layoutName}
          onChange={(e) => setLayoutName(e.target.value)}
          placeholder="Enter Layout Name"
        />
        <button onClick={saveLayout}>Save Layout</button>
        <button onClick={loadLayout}>Load Layout</button>
        <button onClick={publishLayout}>Publish</button>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="dnd-container">
          <div className="sidebar">
            <Draggable id="label" type="label" className="draggable-item">Label</Draggable>
            <Draggable id="input" type="input" className="draggable-item">Input Box</Draggable>
            <Draggable id="checkbox" type="checkbox" className="draggable-item">Check Box</Draggable>
            <Draggable id="button" type="button" className="draggable-item">Button</Draggable>
            <Draggable id="table" type="table" className="draggable-item">Table</Draggable>
          </div>
          <Droppable id="canvas" className="canvas">
            {layout.map((item) => (
              <SortableItem
                key={item.id}
                id={item.id}
                controlType={item.type}
                className="sortable-item"
              >
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => handleRename(item.id, e.target.value)}
                />
              </SortableItem>
            ))}
          </Droppable>
        </div>
      </DndContext>
    </div>
  );
};

export default PageBuilder;
