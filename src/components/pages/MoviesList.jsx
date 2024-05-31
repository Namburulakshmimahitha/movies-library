import React, { useState } from 'react';
import Modal from './Modal';

export default function MoviesList({ movies, addMovieToList, userLists, isUserList, listName, removeMovieFromList, isFavoritesPage }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleAddButtonClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
    // Inside your UsersMoviesLists component, right before the return statement
console.log('Current user lists:', userLists);
// This will show you the current state of user lists

// On your favorites page, where you render the lists
console.log('Favorites page lists:', userLists);
// This will confirm that the lists are being passed to the favorites page

// This will confirm that the function is being called with the correct values
       // Reset to default public state
  };

  return (
    <>
      {movies.map((movie, index) => (
        <div key={index} className='col-md-4 mb-3'>
          <div className='card'>
            <img src={movie.Poster} alt={movie.Title} className='card-img-top' />
            <div className='card-body'>
              {!isFavoritesPage && ( // Conditionally render the "+" icon
                <button
                  className='btn btn-success add-button'
                  onClick={() => handleAddButtonClick(movie)}
                >
                  +
                </button>
              )}
              {isUserList && (
                <button
                  onClick={() => removeMovieFromList(listName, movie.imdbID)}
                  className='btn btn-danger mt-2'
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {selectedMovie && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userLists={userLists}
          addMovieToList={addMovieToList}
          movie={selectedMovie}
        />
      )}
    </>
  );
}
