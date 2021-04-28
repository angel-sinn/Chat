import { ref } from "@vue/reactivity";
import { projectFirestore } from "../firebase/config";

const useCollection = (collection) => {
  // declare error inside useCollection
  const error = ref(null);

  const addDoc = async (doc) => {
    error.value = null;

    try {
      await projectFirestore.collection(collection).add(doc)
      
    } catch (err) {
      error.value = 'Could not send the message';
      console.log(err.message);
    }
  }

  return { error, addDoc }
}

export default useCollection;