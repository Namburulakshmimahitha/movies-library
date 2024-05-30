import React from 'react';
import UsersMoviesLists from './UsersMoviesLists';

export default function Favourites({ userLists, removeMovieFromList, addList, addMovieToList, deleteList }) {
  return (
    <>
      <div>
        <h2>Favorites</h2>
        <UsersMoviesLists
          userLists={userLists}
          removeMovieFromList={removeMovieFromList}
          addList={addList}
          addMovieToList={addMovieToList}
          deleteList={deleteList} // Pass deleteList prop
          isFavoritesPage={true}
        />
      </div>
    </>
  );
}
