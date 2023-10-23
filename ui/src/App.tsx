import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./screens/Auth";
import Home from "./screens/Home";
import NotFound from "./screens/404NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
