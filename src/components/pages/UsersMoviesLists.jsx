import React, { useState } from 'react';
import MoviesList from './MoviesList';
import AddListModal from './AddListModal';

export default function UsersMoviesLists({ userLists, removeMovieFromList, addList, addMovieToList, deleteList, isFavoritesPage }) {
  const [showModal, setShowModal] = useState(false);
  const [visibilityFilter, setVisibilityFilter] = useState('public'); // 'public' or 'private'
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [listIdToDelete, setListIdToDelete] = useState(null);

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

  const handleDeleteButtonClick = (listId) => {
    setListIdToDelete(listId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteList = async () => {
    try {
      await deleteList(listIdToDelete);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  const getShareableLink = (listId) => {
    return `${window.location.origin}/list/${listId}`;
  };

  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link)
      .then(() => alert('Link copied to clipboard!'))
      .catch(err => console.error('Could not copy text: ', err));
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
                  onClick={() => handleDeleteButtonClick(list.id)}
                  className='btn btn-danger'
                >
                  Delete
                </button>
                {list.isPublic && ( // Only display the Copy Link button for public lists
                  <button
                    onClick={() => copyToClipboard(getShareableLink(list.id))}
                    className='btn btn-info ml-2'
                  >
                    Copy Link
                  </button>
                )}
              </div>
              <MoviesList
                movies={list.movies}
                isUserList={true}
                listName={list.name}
                removeMovieFromList={removeMovieFromList}
                addMovieToList={addMovieToList}
                isFavoritesPage={isFavoritesPage}
                userLists={userLists}
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

      {isDeleteModalOpen && listIdToDelete && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete "{listIdToDelete}" list?</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setIsDeleteModalOpen(false)}>
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={handleDeleteList}>
                  Remove
                </button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setIsDeleteModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
