import './styles/NoRouteMatches.css';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NoRouteMatches () {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/error");
    }, [navigate])

    return (
        <div id="router-error">
            <p id="router-error-code">
                404
            </p>
            <hr id="router-error-divider" />
            <h1 id="router-error-heading">
                Oops!
            </h1>
            <p id="router-error-desc">
                This page doesn't exist.
                <br />
                <br />
                But don't worry. Here's a cool picture of <Link to={"/gallery/PIA04921"}>Andromeda</Link>.
            </p>
        </div>
    );
}

export default NoRouteMatches;