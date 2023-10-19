import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, updatePassword, sendEmailVerification, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
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
export const auth = getAuth();

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

export const update = async data => {
	try{
		await updateProfile(auth.currentUser, data);
		toast.success("Profile has been updated !");
		return true;
	} catch(error){
		toast.error(error.message);
	}
};

export const resetPassword = async password => {
  try {
    await updatePassword(auth.currentUser, password);
    toast.success("Password has been updated !");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

export const emailVerification = async () => {
	try{
		await sendEmailVerification(auth.currentUser);
		toast.success(
      `A verification email was sent to ${auth.currentUser.email}`
    );
	} catch(error){
		toast.error(error.message);
	}
};

onAuthStateChanged(auth, (user) => {
  if (user) {
		store.dispatch(loginHandle({
			displayName: user.displayName,
			email: user.email,
			emailVerified: user.emailVerified,
			photoURL: user.photoURL,
			uid: user.uid,
		}));
  } else {
		store.dispatch(logoutHandle());
  }
});

export default app;