import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

export function signInWithGoogle(auth) {
  const provider = new GoogleAuthProvider()
  signInWithRedirect(auth, provider)
    .then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // const user = result.user;
    }).catch((error) => {
      const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.customData.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(errorCode)
    });
}