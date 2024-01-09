import logo from './../../assets/logo/Screenshot 2024-01-07 at 11.46.34 PM.png'
import './Header.scss';
import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {

    const [activePage, setActivePage] = useState(null);
    const location = useLocation();

    const handlePageClick = (pageName) => {
        setActivePage(pageName);
    };

    const isActiveHome = () => {
        const isActive =
            location.pathname === "/home";
        return isActive;
    };
    
    const isActiveFavourites = () => {
        const isActive =
            location.pathname === "/favourites";
        return isActive;
    };

    const isActiveUser = () => {
        const isActive = 
            location.pathname === "/user";
        return isActive;
    }

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let angle = 0;
        let requestId;

        const renderMoneyCharacters = () => {
        const fontSize = 30;
        const radius = 100;
        const speed = 0.02;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.fillStyle = 'green';
        ctx.clearRect(0, 0, canvas.width * 2, canvas.height);
        ctx.font = `${fontSize}px Arial`;

        for (let i = 0; i < 360; i += 10) {
            const x = centerX + Math.cos(angle + i) * radius - 8;
            const y = centerY + Math.sin(angle + i * 1) * radius * 0.65 + 10;
            ctx.fillText('$', x, y);
        }

        angle += speed;
        requestId = requestAnimationFrame(renderMoneyCharacters);
        };

        renderMoneyCharacters();

        return () => cancelAnimationFrame(requestId);

    }, []);

    return (
        <header className="header">
            
                

                <canvas ref={canvasRef} className="header__canvas">
                    
                </canvas>

                <section className="header__logo-container">
                        <NavLink to="/home" className="link">
                            <img className="header__logo" src={logo} alt='header logo image'/>
                        </NavLink>
                    </section>

                <section className="header__pages">
                    <NavLink
                        to="/home"
                        className={`header__pages-name-home ${isActiveHome('/') ? 'header__pages-name-home--active' : ''}`}
                        onClick={() => handlePageClick('/')}
                    >
                        $Home
                    </NavLink>
                    <NavLink
                        to="/favourites"
                        className={`header__pages-name-favourites ${isActiveFavourites('/favourites') ? 'header__pages-name-favourites--active' : ''}`}
                        onClick={() => handlePageClick('favourites')}
                    >
                        $Favourites
                    </NavLink>

                    <NavLink
                        to="/user"
                        className={`header__pages-name-user ${isActiveUser('/user') ? 'header__pages-name-user--active' : ''}`}
                        onClick={() => handlePageClick('user')}
                    >
                        
                        $User                            
                    </NavLink>

                </section>
        </header>
    )
}

export default Header;