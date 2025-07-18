import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { auth } from "./firebase";

export const register = async (email: string, password: string, name: string) => {
  // Cria o usuário
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Atualiza o displayName no Auth
  await updateProfile(user, { displayName: name });

  // Salva dados no Firestore
  const db = getFirestore();
  await setDoc(doc(db, "users", user.uid), {
    nome: name,
    email: email,
    createdAt: new Date(),
  });

  return userCredential;
};

export const login = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
}; 