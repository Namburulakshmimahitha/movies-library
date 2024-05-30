import React, { useState } from 'react';

export default function AddListModal({ isOpen, onClose, userLists, addMovieToList, movie }) {
    const [selectedListName, setSelectedListName] = useState('');
  const [newListName, setNewListName] = useState('');

  const handleDropdownChange = (e) => {
    setSelectedListName(e.target.value);
  };

  const handleSave = () => {
    if (selectedListName) {
      addMovieToList(selectedListName, movie);
    } else if (newListName) {
      addMovieToList(newListName, movie);
      setNewListName('');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add "{movie.Title}" to a list</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {userLists && userLists.length > 0 ? (
              <div>
                <select
                  onChange={handleDropdownChange}
                  defaultValue=""
                  className='form-select mt-2'
                >
                  <option value="" disabled>Select a list</option>
                  {userLists.map((list, idx) => (
                    <option key={idx} value={list.name}>{list.name}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="New List Name"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  className="form-control mt-4"
                />
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}