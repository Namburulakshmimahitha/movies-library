import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SearchBox from './SearchBox';
import MoviesList from './MoviesList';

export default function Home({ userLists , addMovieToList, removeMovieFromList}) {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListId, setSelectedListId] = useState('');

  

  const handleDropdownChange = (e) => {
    setSelectedListId(e.target.value);
  };

  const handleSave = async () => {
    if (selectedListId) {
      await addMovieToList(selectedListId, selectedMovie);
    }
    setIsModalOpen(false);
  };

  const getMovieRequest = async (searchValue, filter) => {
    let url = `http://www.omdbapi.com/?s=${searchValue}&apikey=a0311d04`;

    if (filter !== 'all') {
      url += `&type=${filter}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue || 'Batman', filter);
    // console.log(userLists);
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    getMovieRequest(searchValue || 'Batman', newFilter);
  };

  const handleAddToListClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
    console.log(isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
    console.log(selectedMovie)
  };

  return (
    <div>
      {
        userLists.map((list, idx) => (
          <option key={idx} value={list.id}>{list.name}</option>
        ))
      }
      <Navbar />
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        <div>
          <button onClick={() => handleFilterChange('all')} className='btn btn-primary'>All</button>
          <button onClick={() => handleFilterChange('movie')} className='btn btn-primary'>Movies</button>
          <button onClick={() => handleFilterChange('series')} className='btn btn-primary'>Series</button>
        </div>
      </div>
      <div className='row'>
        <MoviesList movies={movies} onAddToListClick={handleAddToListClick} userLists={userLists} addMovieToList={addMovieToList} removeMovieFromList={removeMovieFromList}   />
      </div>
      {isModalOpen && selectedMovie && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add "{selectedMovie.Title}" to a list</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
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
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
