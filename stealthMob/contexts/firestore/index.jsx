import { collection, query, where, getDocs } from 'firebase/firestore';

const checkUsernameAvailability = async (username) => {
  const usersRef = collection(firestore, 'users');
  const q = query(usersRef, where('username', '==', username));
  const querySnapshot = await getDocs(q);

  return querySnapshot.empty; // If the querySnapshot is empty, the username is available
};
