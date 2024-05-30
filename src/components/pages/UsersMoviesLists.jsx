import React from 'react';
import MoviesList from './MoviesList';

export default function UsersMoviesLists({ userLists, removeMovieFromList, addList, addMovieToList, deleteList, isFavoritesPage }) {
  return (
    <>
      <div className='row'>
        {/* Render user's movie lists that have at least one movie */}
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
        <input
          type="text"
          placeholder="New List Name"
          id="new-list-name"
          className="form-control mt-4"
        />
        <button
          onClick={() => {
            const listName = document.getElementById('new-list-name').value;
            addList(listName);
            document.getElementById('new-list-name').value = '';
          }}
          className='btn btn-primary mt-2'
        >
          Add List
        </button>
      </div>
    </>
  );
}
