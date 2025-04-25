import "./css/App.css";
import Favorites from "./pages/Favorites";
// import the home component
import Home from "./pages/Home";
// import the routes to implement the /home, /favorites, etc..
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
// import the navbar component
import NavBar from "./components/NavBar";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          {/* the below route is used to implement the /home */}
          <Route path="/" element={<Home />} />
          {/* the below route is used to implement the /favorites */}
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
