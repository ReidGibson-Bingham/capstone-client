import logo from './../../assets/logo/Screenshot 2024-01-07 at 11.46.34 PM.png'
import './Footer.scss';
import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Footer = () => {

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
            const y = centerY + Math.sin(angle + i * 3) * radius * 0.65 + 10;
            ctx.fillText('$', x, y);
        }

        angle += speed;
        requestId = requestAnimationFrame(renderMoneyCharacters);
        };

        renderMoneyCharacters();

        return () => cancelAnimationFrame(requestId);

    }, []);

    return (
        <header className="footer">

            <div className='footer__contact-container'>

                <ul className='footer__contact'>
                    <li>Email: Reidgibsonbingham@gmail.com</li>

                </ul>

                <section className="footer__logo-container">
                        <NavLink to="/home" className="link">
                            <img className="footer__logo" src={logo} alt='footer logo image'/>
                        </NavLink>
                </section>

            </div>
            
            {/* <section className="footer__pages">
                    <NavLink
                        to="/home"
                        className={`footer__pages-name ${isActiveHome('/') ? 'footer__pages-name--active' : ''}`}
                        onClick={() => handlePageClick('/')}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/favourites"
                        className={`footer__pages-name ${isActiveFavourites('/favourites') ? 'footer__pages-name--active' : ''}`}
                        onClick={() => handlePageClick('favourites')}
                    >
                        Favourites
                    </NavLink>

                    <NavLink
                        to="/login"
                    >

                        <div className='footer__logout-box'>
                            <p className='footer__logout-image'>
                                $
                            </p>
                        </div>

                    </NavLink>

                </section> */}

                <canvas ref={canvasRef} className="footer__canvas">
                    
                </canvas>

        </header>
    )
}

export default Footer;