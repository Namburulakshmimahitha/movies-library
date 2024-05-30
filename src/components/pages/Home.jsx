import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SearchBox from './SearchBox';
import MoviesList from './MoviesList';

export default function Home({ userLists, addMovieToList }) {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState('all');
  
  const getMovieRequest = async (searchValue, filter) => {
    let url = `http://www.omdbapi.com/?s=${searchValue}&apikey=a0311d04`;

    if (filter === 'all') {
      const moviesResponse = await fetch(url + '&type=movie');
      const moviesJson = await moviesResponse.json();

      const seriesResponse = await fetch(url + '&type=series');
      const seriesJson = await seriesResponse.json();

      const allResults = [
        ...(moviesJson.Search || []),
        ...(seriesJson.Search || []),
      ];

      setMovies(allResults);
    } else {
      if (filter !== 'all') {
        url += `&type=${filter}`;
      }

      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.Search) {
        setMovies(responseJson.Search);
      } else {
        setMovies([]);
      }
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue || 'Batman', filter); // Replace 'Batman' with a default term or logic to fetch all movies and series
  }, [searchValue, filter]);

  useEffect(() => {
    if (!searchValue) {
      getMovieRequest('Batman', 'all'); // Initial fetch for all movies and series
    }
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    getMovieRequest(searchValue || 'Batman', newFilter); // Replace 'Batman' with a default term or logic to fetch all movies and series
  };

  return (
    <div>
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
        <MoviesList movies={movies} addMovieToList={addMovieToList} userLists={userLists} />
      </div>
      {/* <UsersMoviesLists
        userLists={userLists}
        removeMovieFromList={removeMovieFromList}
        addList={addList}
      /> */}
    </div>
  );
}
