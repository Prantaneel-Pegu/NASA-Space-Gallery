import './styles/NavPanel.css';
import { NavLink } from 'react-router-dom';
import { NavCloseIcon, NavOpenIcon } from './SvgIcons';

function NavPanel () {

    function navToggle (): void {
        const navPanel = document.getElementById('NavPanel');
        const navOpen = document.getElementById('nav-open');
        const navClose = document.getElementById('nav-close');

        // Checking for null values is reqd. since these objects will be passed to functions not accepting null.
        if (navOpen === null || navClose === null) {
            throw new Error('navOpen or navClose is null.')
        }         
        
        if (getComputedStyle(navOpen).display === 'none' && navClose) {
            navOpen.style.display = 'block'
            navClose.style.display = 'none';
        } else if (getComputedStyle(navOpen).display === 'block' && navClose) {
            navOpen.style.display = 'none';
            navClose.style.display = 'block';
        } 
        
        if (navPanel?.classList.contains('hide_nav')) {
            navPanel.classList.remove('hide_nav')
            navPanel.classList.add('show_nav')
        } else if (navPanel?.classList.contains('show_nav')){
            navPanel?.classList.remove('show_nav')
            navPanel?.classList.add('hide_nav')
        } else {
            throw new Error("Can't find 'hide_nav' or 'show_nav' in NavPanel's classList.")
        }
    }

    function NavlinkClick () {
        navToggle(); 
        window.scrollTo(0,0);
    }

    return (
        <>
            <nav id="NavPanel" className="hide_nav">
                <div id="nav-open" onClick={navToggle}>
                    <NavOpenIcon classNames='nav-menu-open-icon'/>
                </div>
                <div id="nav-close" onClick={navToggle}>
                    <NavCloseIcon classNames='nav-menu-close-icon'/>
                </div>
                
                <h2 id="nav-heading">References and Links</h2>
                <hr className="nav-divider" />
            
                <ul id="nav-list">
                    <NavLink to="/" className="nav_item nav_link" onClick={NavlinkClick}>Gallery </NavLink>
                    <NavLink to="/potd" className="nav_item nav_link" onClick={NavlinkClick}>Picture of the Day </NavLink>
                    <NavLink to="/coordinate-imagery" className="nav_item nav_link" onClick={NavlinkClick}>Coordinate Satellite Imagery </NavLink>
                    <NavLink to="/mars-gallery" className="nav_item nav_link" onClick={NavlinkClick}>Mars Rover Photos </NavLink>
                    <NavLink to="/api-docs" className="nav_item nav_link" onClick={NavlinkClick}>API </NavLink>                
                    <NavLink to="/about" className="nav_item nav_link" onClick={NavlinkClick}>About </NavLink>
                </ul>
            </nav>  
        </>

    )
}

export default NavPanel;