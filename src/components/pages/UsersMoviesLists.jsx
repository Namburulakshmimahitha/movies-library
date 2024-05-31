import React, { useState } from 'react';
import MoviesList from './MoviesList';
import AddListModal from './AddListModal';

export default function UsersMoviesLists({ userLists, removeMovieFromList, addList, addMovieToList, deleteList, isFavoritesPage }) {
  const [showModal, setShowModal] = useState(false);
  const [visibilityFilter, setVisibilityFilter] = useState('public'); // 'public' or 'private'

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleVisibility = (filter) => {
    setVisibilityFilter(filter);
    // Log the filtered lists to the console
    const filteredLists = userLists.filter(list => list.isPublic === (filter === 'public'));
    console.log(`${filter} lists:`, filteredLists);
  };
  

  return (
    <>
      <div className='row'>
        <div className="col-12 mb-3">
          <button onClick={() => toggleVisibility('public')} className={`btn ${visibilityFilter === 'public' ? 'btn-primary' : 'btn-secondary'}`}>
            Public Lists
          </button>
          <button onClick={() => toggleVisibility('private')} className={`btn ${visibilityFilter === 'private' ? 'btn-primary' : 'btn-secondary'} ml-2`}>
            Private Lists
          </button>
        </div>
        {userLists
          .filter(list => list.movies.length > 0 && list.isPublic === (visibilityFilter === 'public'))
          .map((list, index) => (
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
