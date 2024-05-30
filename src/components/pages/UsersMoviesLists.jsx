import React, { useState } from 'react';
import MoviesList from './MoviesList';
import AddListModal from './AddListModal';

export default function UsersMoviesLists({ userLists, removeMovieFromList, addList, addMovieToList, deleteList, isFavoritesPage }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className='row'>
        {userLists.filter(list => list.movies.length > 0).map((list, index) => (
          <div key={index} className="col-12 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <h3>{list.name}</h3>
              <button 
                onClick={() => deleteList(list.name)} 
                className='btn btn-danger'
              >
                Delete
              </button>
            </div>
            <MoviesList 
              movies={list.movies} 
              isUserList={true} 
              listName={list.name} 
              removeMovieFromList={removeMovieFromList} 
              addMovieToList={addMovieToList}
              isFavoritesPage={isFavoritesPage}
            />
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={openModal}
          className='btn btn-primary mt-2'
        >
          +
        </button>
      </div>

      <AddListModal
        isOpen={showModal}
        onClose={closeModal}
        addList={addList}
      />
    </>
  );
}
