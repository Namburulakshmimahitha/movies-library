import React from 'react';
import MoviesList from './MoviesList';

export default function UsersMoviesLists({ userLists, removeMovieFromList, addList }) {
  return (
    <>
      <div className='row'>
        {/* Render user's movie lists */}
        {userLists.map((list, index) => (
          <div key={index}>
            <h3>{list.name}</h3>
            <MoviesList 
              movies={list.movies} 
              isUserList={true} 
              listName={list.name} 
              removeMovieFromList={removeMovieFromList} 
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
