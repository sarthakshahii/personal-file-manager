import React, { useState, useEffect } from 'react';
import FileItem from './FileItem';

function FileManager() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('files');
    return saved ? JSON.parse(saved) : [];
  });

  const [newName, setNewName] = useState('');
  const [type, setType] = useState('file');

  useEffect(() => {
    localStorage.setItem('files', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (newName.trim()) {
      const newItem = {
        id: Date.now(),
        name: newName,
        type: type,
      };
      setItems([...items, newItem]);
      setNewName('');
    }
  };

  const renameItem = (id, newName) => {
    setItems(items.map((item) => (item.id === id ? { ...item, name: newName } : item)));
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="form">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New name"
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="file">File</option>
          <option value="folder">Folder</option>
        </select>
        <button onClick={addItem}>Add</button>
      </div>

      <div className="file-grid">
        {items.map((item) => (
          <FileItem
            key={item.id}
            item={item}
            onRename={renameItem}
            onDelete={deleteItem}
          />
        ))}
      </div>
    </>
  );
}

export default FileManager;
