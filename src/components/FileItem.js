import React, { useState } from 'react';

function FileItem({ item, onRename, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(item.name);

  const handleRename = () => {
    onRename(item.id, tempName);
    setEditing(false);
  };

  return (
    <div className="file-item">
      <div className={`icon ${item.type}`}>
        {item.type === 'folder' ? '📁' : '📄'}
      </div>
      {editing ? (
        <input
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          onBlur={handleRename}
          autoFocus
        />
      ) : (
        <p onDoubleClick={() => setEditing(true)}>{item.name}</p>
      )}
      <button className="delete" onClick={() => onDelete(item.id)}>❌</button>
    </div>
  );
}

export default FileItem;
