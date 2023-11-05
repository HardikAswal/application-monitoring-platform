import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import HTTPLogger from "./HttpLogger";

type Features =
  | "HTTP Logs"
  | "Event Logs"
  | "API Monitoring"
  | "Error Logs"
  | "Profiler";

export default function Home() {
  const navigate = useNavigate();

  const [user, setUser] = React.useState<{
    name: string;
    email: string;
    photoURL: string;
    idToken: string;
  } | null>(null);

  const [view, setView] = useState<Features>("HTTP Logs");

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
      {/* Home
      <button onClick={handleClick}>Logout</button> */}

      <Header
        logout={handleClick}
        view={view}
        handleView={(view: Features) => setView(view)}
      />

      <br />
      <br />

      {view === "HTTP Logs" && <HTTPLogger />}
    </div>
  );
}
