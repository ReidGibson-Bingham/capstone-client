import { useEffect, useState } from "react";
import Header from "./../../components/Header/Header";
import Search from "./../../components/Search/Search";
import Terminal from "././../../components/Terminal/Terminal";
import ResultList from "././../../components/ResultList/ResultList";
import Footer from "./../../components/Footer/Footer";
// import frame from './../../assets/border/png-transparent-corner-frame-divider-silver-filigree-wedding-invitations-formal-engagement-party.png'
import './Home.scss';
import { useLocation } from 'react-router-dom'


const Home = () => {

    const location = useLocation();

    console.log(location.state)

    const searchHistoryNavLinkData = location.state ? location.state.navLinkSearchData : null;
    
    const [searchTerm, setSearchTerm] = useState('');
    const [navigated, setNavigated] = useState(false);

    const handleSearchChange = (newValue) => {
        setSearchTerm(newValue);
    };

    useEffect(() => {

        if (searchHistoryNavLinkData) {
            handleSearchChange(searchHistoryNavLinkData);
            setNavigated(true);
        }

        console.log("location engaged");

    }, [location])

    return (
        <>
            <Header/>
            <main className="home">
                <span className="home__mobile--search">
                    <Search
                        // this prop is passing a value up
                        onChange={handleSearchChange}
                    />
                </span>
                <div className="home__tablet--search">
                    <Search
                        // this prop is passing a value up
                        onChange={handleSearchChange}
                        navLinkSearchData={searchHistoryNavLinkData}
                        navigated={navigated}
                    />
                    <Terminal/>
                </div>
                <ResultList
                    searchTerm={searchTerm}
                />
            </main>
            <Footer/>
        </>
        
    )
}

export default Home;