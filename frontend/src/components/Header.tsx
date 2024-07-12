import './styles/Header.css';
import { Link } from 'react-router-dom';

function Header () {
    return (
        <header id="Header">
            <h1>
                <Link to="/" id="heading-text">NASA Space Gallery</Link>
            </h1>
            <hr />
        </header>
    )
}

export default Header;