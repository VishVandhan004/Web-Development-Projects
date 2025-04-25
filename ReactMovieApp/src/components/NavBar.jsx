import { Link } from "react-router-dom";
import "../css/Navbar.css"
// this component is used to create the navigation bar of the application
// it contains the links to the home and favorites page
// it is used to navigate between the pages of the application
function NavBar() {
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/">Movie App</Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/favorites" className="nav-link">Favorites</Link>
        </div>
    </nav>
}

export default NavBar