import './App.css';
import React, { useState, useEffect } from 'react';
import { AuthContextProvider } from './components/context/AuthContext';
import Home from './components/pages/Home';
import Log from './components/pages/Log';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Protected from './components/pages/Protected';
import Favourites from './components/pages/Favourites';

function App() {
  const [userLists, setUserLists] = useState(() => {
    const savedLists = localStorage.getItem('userLists');
    return savedLists ? JSON.parse(savedLists) : [];
  });

  const saveUserListsToLocalStorage = (lists) => {
    localStorage.setItem('userLists', JSON.stringify(lists));
  };

  const addList = (listName, isPublic) => {
    if (listName && !userLists.some(list => list.name === listName)) {
      const updatedLists = [...userLists, { name: listName, movies: [], isPublic: isPublic }];
      setUserLists(updatedLists);
      saveUserListsToLocalStorage(updatedLists);
    }
  };


  const addMovieToList = (listName, movie) => {
    const updatedLists = userLists.map(list => {
      if (list.name === listName) {
        return { ...list, movies: [...list.movies, movie] };
      }
      return list;
    });
    setUserLists(updatedLists);
    saveUserListsToLocalStorage(updatedLists);
  };

  const removeMovieFromList = (listName, movieId) => {
    const updatedLists = userLists.map(list => {
      if (list.name === listName) {
        return { ...list, movies: list.movies.filter(movie => movie.imdbID !== movieId) };
      }
      return list;
    });
    setUserLists(updatedLists);
    saveUserListsToLocalStorage(updatedLists);
  };

  const deleteList = (listName) => {
    const updatedLists = userLists.filter(list => list.name !== listName);
    setUserLists(updatedLists);
    saveUserListsToLocalStorage(updatedLists);
  };

  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Log />} />
          <Route path="/main" element={
            <Protected>
              <Home userLists={userLists}
                addMovieToList={addMovieToList}
              />
            </Protected>} />
          <Route path="/favorites" element={
            <Protected>
              <Favourites userLists={userLists}
                addList={addList}
                removeMovieFromList={removeMovieFromList}
                deleteList={deleteList} // Pass deleteList prop
              />
            </Protected>
          } />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
