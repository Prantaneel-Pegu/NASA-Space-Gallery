import './styles/NavBar.css'
import NavPanel from "./NavPanel";
import ColorSchemeToggle from './ColorSchemeToggle'
import Header from './Header';
import { Link, NavLink } from 'react-router-dom';

function NavBar () {
    return (
        <>
            <div id="NavBarCompact" >
                <NavPanel />
                <ColorSchemeToggle />
                <Header />
            </div>

            <div id="NavBarLong">
                <header id="navbar-header">
                    <Link to='/' id='navbar-header-text'>
                        NASA SPACE GALLERY
                    </Link>       
                </header>

                <nav id="navbar-links">
                    <NavLink to="/" className="nav_item nav_link">Gallery </NavLink>
                    <NavLink to="/potd" className="nav_item nav_link">Picture of the Day </NavLink>
                    <NavLink to="/coordinate-imagery" className="nav_item nav_link">Coordinate Satellite Imagery </NavLink>
                    <NavLink to="/mars-gallery" className="nav_item nav_link">Mars Rover Photos </NavLink>
                    <NavLink to="/api-docs" className="nav_item nav_link">API </NavLink>                
                    <NavLink to="/about" className="nav_item nav_link">About </NavLink>
                </nav>

                <ColorSchemeToggle />
            </div>
        </>
    )
}

export default NavBar;