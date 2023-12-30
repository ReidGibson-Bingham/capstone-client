// import logo from "./../../assets/Logo/inStock-Logo_2x.png";
import './Header.scss';
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {

    const [activePage, setActivePage] = useState(null);
    // const location = useLocation();

    const handlePageClick = (pageName) => {
        setActivePage(pageName);
    };

    const isActiveWarehouse = () => {
        const isActive =
            location.pathname === "/warehouses" ||
            location.pathname.startsWith("/warehouse/") ||
            location.pathname.startsWith("/editWarehouse/") ||
            location.pathname.startsWith("/addNewWarehouse") ||
            location.pathname === "/";
        return isActive;
    };
    
    const isActiveInventories = () => {
        const isActive =
            location.pathname === "/inventory" ||
            location.pathname.startsWith("/inventory/") ||
            location.pathname.startsWith("/editInventory/") ||
            location.pathname === "/addInventory";
        return isActive;
    };

    return (
        <header className="header">
            
                <section className="header__logo-container">
                    {/* <NavLink to="/" className="link"> */}
                        <img className="header__logo" src={""} alt='header logo image' />
                    {/* </NavLink> */}
                </section>

                <section className="header__pages">
                    {/* <NavLink
                        to="/"
                        className={`header__pages-name ${isActiveWarehouse('/warehouses') ? 'header__pages-name--active' : ''}`}
                        onClick={() => handlePageClick('Warehouses')}
                    > */}
                        Warehouses
                    {/* </NavLink>
                    <NavLink
                        to="/inventory"
                        className={`header__pages-name ${isActiveInventories('/inventory') ? 'header__pages-name--active' : ''}`}
                        onClick={() => handlePageClick('Inventories')}
                    > */}
                        Inventory
                    {/* </NavLink> */}
                </section>
        </header>
    )
}

export default Header;