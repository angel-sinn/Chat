import { ref } from "@vue/reactivity";
import { projectAuth } from "../firebase/config";

// currentUser is a property
const user = ref(projectAuth.currentUser);

// _user param will be null if no user
projectAuth.onAuthStateChanged((_user) => {
  // console.log('User state change. Current user is: ', _user);
  user.value = _user;
});

const getUser = () => {
  return { user }
};

export default getUser;