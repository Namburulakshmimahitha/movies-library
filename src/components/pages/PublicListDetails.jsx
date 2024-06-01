// PublicListDetails.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MoviesList from './MoviesList';
import { db } from '../../firebase'; // Ensure you have the correct path to your firebase config
import { doc, getDoc } from 'firebase/firestore';

export default function PublicListDetails() {
  const { listId } = useParams();
  const [listDetails, setListDetails] = useState(null);

  useEffect(() => {
    const fetchListDetails = async () => {
      const docRef = doc(db, 'publicLists', listId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListDetails({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log('No such document or the list is not public!');
      }
    };

    fetchListDetails();
  }, [listId]);

  if (!listDetails) {
    return <p>List not found or it is not public.</p>;
  }

  return (
    <div>
      <h2>{listDetails.name}</h2>
      <MoviesList movies={listDetails.movies} />
    </div>
  );
}
