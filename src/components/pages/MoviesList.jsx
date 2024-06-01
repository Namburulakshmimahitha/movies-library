import { list } from 'firebase/storage';
import React, { useState, useEffect } from 'react';

export default function MoviesList({ movies, addMovieToList, userLists, isUserList, removeMovieFromList, isFavoritesPage, deleteList }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedListId, setSelectedListId] = useState('');
  const [movieToRemove, setMovieToRemove] = useState(null);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
 

  const handleAddButtonClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

 

  const handleDropdownChange = (e) => {
    setSelectedListId(e.target.value);
  };

  const handleSave = async () => {
    if (selectedListId) {
      await addMovieToList(selectedListId, selectedMovie);
    }
    setIsModalOpen(false);
  };

  const [listIdToRemoveFrom, setListIdToRemoveFrom] = useState(null);

  const handleRemoveButtonClick=(movie) => {
    
    // Find the list ID of the movie from the userLists
    const list = userLists.find(list => list.movies.some(m => m.imdbID === movie.imdbID));
    console.log(list)
    if (list) {
      setMovieToRemove(movie);
      setListIdToRemoveFrom(list.id);
      setIsRemoveModalOpen(true);
      // console.log(listIdToRemoveFrom)
    } else {
      console.error('List ID not found for the movie.');
    }
  };

  const handleConfirmRemove = async () => {
    if (movieToRemove && listIdToRemoveFrom) {
      await removeMovieFromList(listIdToRemoveFrom, movieToRemove.imdbID);
      setMovieToRemove(null);
      setListIdToRemoveFrom(null);
    }
  };

  

  return (
    <>
      {movies.map((movie, index) => (
        <div key={index} className='col-md-4 mb-3'>
          <div className='card'>
            <img src={movie.Poster} alt={movie.Title} className='card-img-top' />
            <div className='card-body'>
              {!isFavoritesPage && (
                <button
                  className='btn btn-success add-button'
                  onClick={() => handleAddButtonClick(movie)}
                >
                  +
                </button>
              )}
              {isUserList && (
                <button
                  onClick={() => handleRemoveButtonClick(movie)} // Assuming each movie has a listId property
                  className='btn btn-danger mt-2'
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {isModalOpen && selectedMovie && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add "{selectedMovie.Title}" to a list</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setIsModalOpen(false)}>
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                {userLists.length > 0 ? (
                  <div>
                    <select
                      onChange={handleDropdownChange}
                      defaultValue=""
                      className='form-select mt-2'
                    >
                      <option value="" disabled>Select a list</option>
                      {userLists.map((list, idx) => (
                        <option key={idx} value={list.id}>{list.name}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <p>No lists available. Please create a list first.</p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                {selectedListId && (
                  <button type="button" className="btn btn-primary" onClick={handleSave}>
                    Save
                  </button>
                )}
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setIsModalOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isRemoveModalOpen && movieToRemove && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Remove "{movieToRemove.Title}" from the list?</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setIsRemoveModalOpen(false)}>
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={handleConfirmRemove}>
                  Remove
                </button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setIsRemoveModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


    </>
  );
}
