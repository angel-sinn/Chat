import { watchEffect } from "vue";
import { ref } from "@vue/reactivity";
import { projectFirestore } from "../firebase/config";

const getCollection = (collection) => {
  const documents = ref(null);
  const error = ref(null);

  let collectionRef = projectFirestore.collection(collection)
    .orderBy('createdAt');
  
  // real-time listener
  const unsub = collectionRef.onSnapshot((snap) => {
    let results = [];
    snap.docs.forEach((doc) => {
      // timestamp not created until it reaches server, that's why need the doc.data().createdAt check
      doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
    })

    // update values
    documents.value = results;
    error.value = null;
  }, (err) => {
    console.log(err.message);
    documents.value - null;
    error.value = 'Could not fetch data';
  });

  // onInvalidate will run when component unmounts. Can unsubscribe from real-time listeners
  watchEffect((onInvalidate) => {
    // unsub from prev collection when watcher is stopped (component unmounted)
    onInvalidate(() => unsub())
  });

  return { documents, error };
};

export default getCollection;