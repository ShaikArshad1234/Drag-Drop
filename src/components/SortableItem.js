import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import './SortableItem.css'; 

const SortableItem = ({ id, controlType }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });

  const [fields, setFields] = useState([
    { labelText: 'Enter Your Name', inputValue: '' },
    { labelText: 'Age', inputValue: '' }
  ]);
  
  const [isChecked, setIsChecked] = useState(true);

  const [fieldHeader, setFieldHeader] = useState('Field');
  const [valueHeader, setValueHeader] = useState('Value');
  
  const [checkboxLabel, setCheckboxLabel] = useState('Is Working?');

  const handleFieldChange = (index, type, value) => {
    const newFields = [...fields];
    if (type === 'label') {
      newFields[index].labelText = value;
    } else if (type === 'input') {
      newFields[index].inputValue = value;
    }
    setFields(newFields);
  };

  const renderControl = () => {
    switch (controlType) {
      case 'label':
      case 'input':
        return fields.map((field, index) => (
          <div key={index} className="sortable-item-field">
            <input
              type="text"
              value={field.labelText}
              onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
              placeholder="Edit Label"
              className="sortable-item-input"
            />
            <input
              type="text"
              value={field.inputValue}
              onChange={(e) => handleFieldChange(index, 'input', e.target.value)}
              placeholder="Enter Value"
              className="sortable-item-input"
            />
          </div>
        ));
      case 'checkbox':
        return (
          <div className="sortable-item-checkbox">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <input
              type="text"
              value={checkboxLabel}
              onChange={(e) => setCheckboxLabel(e.target.value)}
              placeholder="Checkbox Label"
              className="sortable-item-input"
            />
          </div>
        );
      case 'button':
        return (
          <button className="sortable-item-button" onClick={() => alert(`Submitted with: ${fields.map(f => f.inputValue).join(', ')}`)}>
            Save
          </button>
        );
      case 'table':
        return (
          <table className="sortable-item-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="text"
                    value={fieldHeader}
                    onChange={(e) => setFieldHeader(e.target.value)}
                    placeholder="Field Header"
                    className="sortable-item-input"
                  />
                </th>
                <th>
                  <input
                    type="text"
                    value={valueHeader}
                    onChange={(e) => setValueHeader(e.target.value)}
                    placeholder="Value Header"
                    className="sortable-item-input"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={index}>
                  <td>{field.labelText}</td>
                  <td>{field.inputValue}</td>
                </tr>
              ))}
              <tr>
                <td>{fieldHeader === 'Checked' ? 'Checked' : 'Check'}</td>
                <td>{isChecked ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>
        );
      default:
        return <div>Unknown Control</div>;
    }
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
      }}
      className="sortable-item"
    >
      {renderControl()}
    </div>
  );
};

export default SortableItem;
