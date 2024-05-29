import React from 'react';

export default function MoviesList({ movies, addMovieToList, userLists, isUserList, listName, removeMovieFromList }) {
  const handleAddMovieToList = (movie, listName) => {
    addMovieToList(listName, movie);
  };

  const handleRemoveMovieFromList = (movieId) => {
    removeMovieFromList(listName, movieId);
  };

  return (
    <>
      {movies.map((movie, index) => (
        <div key={index} className='image-container d-flex justify-content-start m-3'>
          <img src={movie.Poster} alt={movie.Title}></img>
          <div>
            {isUserList ? (
              <button 
                onClick={() => handleRemoveMovieFromList(movie.imdbID)} 
                className='btn btn-danger mt-2'
              >
                Remove
              </button>
            ) : (
              userLists && userLists.length > 0 && (
                <select
                  onChange={(e) => handleAddMovieToList(movie, e.target.value)}
                  defaultValue=""
                  className='form-select mt-2'
                >
                  <option value="" disabled>Add to list</option>
                  {userLists.map((list, idx) => (
                    <option key={idx} value={list.name}>{list.name}</option>
                  ))}
                </select>
              )
            )}
          </div>
        </div>
      ))}
    </>
  );
}
