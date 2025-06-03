import { getAuth, User as FirebaseUser } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { app, db } from "@/services/firebase/firebase";
import { doc } from "firebase/firestore";
import { User as UserType } from "@/services/firebase/types";

export type User = FirebaseUser & UserType;

const auth = getAuth(app);

export function useUser() {
  const [user, authLoading, authError] = useAuthState(auth);

  const userDocRef = user ? doc(db, "Users", user.uid) : null;
  const [fireUser, fireLoading, fireError] = useDocumentData(userDocRef!);

  const combinedUser = {
    ...(user as User),
    ...(fireUser as Partial<User>),
  };

  return {
    user: combinedUser as User,
    loading: authLoading || fireLoading,
    error: authError || fireError,
  };
}
