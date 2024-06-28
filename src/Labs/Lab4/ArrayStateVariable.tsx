import React, { useState } from "react";

export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };

  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <button onClick={addElement} style={{ backgroundColor: '#90ee90', color: 'black', padding: '5px 10px', border: 'none', borderRadius: '5px' }}>
        Add Element
      </button>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {array.map((item, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', margin: '10px 0', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', width: '25%' }}>
            <span style={{ flexGrow: 1 }}>{item}</span>
            <button
              onClick={() => deleteElement(index)}
              id="wd-delete-element-click"
              style={{ backgroundColor: '#ffcccb', color: 'black', padding: '5px 10px', border: 'none', borderRadius: '5px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}
