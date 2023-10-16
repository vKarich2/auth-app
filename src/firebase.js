import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import store from "./store";
import { login as loginHandle, logout as logoutHandle } from './store/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB7sBLRDFpjJCq9bxTKAyUhbQjDjEpjjxQ",
  authDomain: "auth-app-c5d9e.firebaseapp.com",
  projectId: "auth-app-c5d9e",
  storageBucket: "auth-app-c5d9e.appspot.com",
  messagingSenderId: "740491734377",
  appId: "1:740491734377:web:9050e07273a2460aa8a1f8",
  measurementId: "G-HVCSE6K45Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const register = async(email, password) => {
	try{
		const { user } = await createUserWithEmailAndPassword(auth, email, password);
		return user;
	} catch(error){
		toast.error(error.message);
	}
};

export const login = async(email, password) => {
	try{
		const { user } = await signInWithEmailAndPassword(auth, email, password);
		return user;
	} catch(error){
		toast.error(error.message);
	}
};

export const logout = async () => {
  try {
    const a = await signOut(auth);
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
		store.dispatch(loginHandle(user));
  } else {
		store.dispatch(logoutHandle());
  }
});

export default app;