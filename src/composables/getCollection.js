import { ref } from "@vue/reactivity";
import { projectFirestore } from "../firebase/config";

const getCollection = (collection) => {
  const documents = ref(null);
  const error = ref(null);

  let collectionRef = projectFirestore.collection(collection)
    .orderBy('createdAt');
  
  // real-time listener
  collectionRef.onSnapshot((snap) => {
    let results = [];
    snap.docs.forEach((doc) => {
      // timestamp not created until it reaches server, that's why need the doc.data().createdAt check
      doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
    })
    documents.value = results;
    error.value = null;
  }, (err) => {
    console.log(err.message);

    documents.value = null;
    error.value = 'Could not fetch data';
  });

  return { documents, error };
};

export default getCollection;