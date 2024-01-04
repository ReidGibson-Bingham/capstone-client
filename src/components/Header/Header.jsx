// import logo from "./../../assets/Logo/inStock-Logo_2x.png";
import './Header.scss';
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {

    const [activePage, setActivePage] = useState(null);
    const location = useLocation();

    const handlePageClick = (pageName) => {
        setActivePage(pageName);
    };

    const isActiveHome = () => {
        const isActive =
            location.pathname === "/";
        return isActive;
    };
    
    const isActiveFavourites = () => {
        const isActive =
            location.pathname === "/favourites";
        return isActive;
    };

    return (
        <header className="header">
            
                <section className="header__logo-container">
                    <NavLink to="/" className="link">
                        <img className="header__logo" src={""} alt='header logo image' />
                    </NavLink>
                </section>

                <section className="header__pages">
                    <NavLink
                        to="/"
                        className={`header__pages-name ${isActiveHome('/') ? 'header__pages-name--active' : ''}`}
                        onClick={() => handlePageClick('/')}
                    >
                        Warehouses
                    </NavLink>
                    <NavLink
                        to="/favourites"
                        className={`header__pages-name ${isActiveFavourites('/favourites') ? 'header__pages-name--active' : ''}`}
                        onClick={() => handlePageClick('favourites')}
                    >
                        Inventory
                    </NavLink>
                </section>
        </header>
    )
}

export default Header;