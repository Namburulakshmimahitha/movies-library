import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SearchBox from './SearchBox';
import MoviesList from './MoviesList';
import UsersMoviesLists from './UsersMoviesLists';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [userLists, setUserLists] = useState([]);

  // Function to add a new list
  const addList = (listName) => {
    if (listName && !userLists.some(list => list.name === listName)) {
      setUserLists([...userLists, { name: listName, movies: [] }]);
    }
  };

  // Function to add a movie to a list
  const addMovieToList = (listName, movie) => {
    setUserLists(userLists.map(list => {
      if (list.name === listName) {
        return { ...list, movies: [...list.movies, movie] };
      }
      return list;
    }));
  };


  const removeMovieFromList = (listName, movieId) => {
    setUserLists(userLists.map(list => {
      if (list.name === listName) {
        return { ...list, movies: list.movies.filter(movie => movie.imdbID !== movieId) };
      }
      return list;
    }));
  };

  const getMovieRequest = async (searchValue, filter) => {
    let url = `http://www.omdbapi.com/?s=${searchValue}&apikey=a0311d04`;
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
  };

  useEffect(() => {
    getMovieRequest(searchValue || 'Batman', filter); // Replace 'Batman' with a default term or logic to fetch all movies and series
  }, [searchValue, filter]);

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
      <UsersMoviesLists userLists={userLists}
        removeMovieFromList={removeMovieFromList}
        addList={addList} />
    </div>

  );
}
