import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [user, setUser] = React.useState<{
    name: string;
    email: string;
    photoURL: string;
    idToken: string;
  } | null>(null);

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
    }
  }, [user]);

  const handleClick = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      Home
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}
