import React, { useEffect } from "react";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import CTA from "../components/CTA";

export default function Auth() {
  const navigate = useNavigate();

  const [user, setUser] = React.useState<{
    name: string;
    email: string;
    photoURL: string;
    idToken: string;
  } | null>(null);

  // Sign in method
  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then(async (userCredentials) => {
        const name = userCredentials.user.displayName;
        const email = userCredentials.user.email;
        const photoURL = userCredentials.user.photoURL;
        const idToken = await userCredentials.user.getIdToken();

        if (name && email && photoURL && idToken) {
          localStorage.setItem("name", JSON.stringify(name));
          localStorage.setItem("email", JSON.stringify(email));
          localStorage.setItem("photoURL", JSON.stringify(photoURL));
          localStorage.setItem("idToken", JSON.stringify(idToken));

          setUser({
            name,
            email,
            photoURL,
            idToken,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // try fetching user details from localStorage
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const photoURL = localStorage.getItem("photoURL");
    const idToken = localStorage.getItem("idToken");

    if (name && email && photoURL && idToken) {
      setUser({
        name,
        email,
        photoURL,
        idToken,
      });

      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <div>
      <Hero signInWithGoogle={handleClick} />
      <CTA signInWithGoogle={handleClick} />
      <Footer />
    </div>
  );
}
