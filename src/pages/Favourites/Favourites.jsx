import Header from "./../../components/Header/Header";
import FavouritesList from "./../../components/FavouritesList/FavouritesList";
import SearchHistory from "./../../components/SearchHistory/SearchHistory";
import Footer from "./../../components/Footer/Footer";
import './Favourites.scss';

const Favourites = () => {

    return (
        <>
            <Header/>
            <main className="favourites-page">
                <FavouritesList></FavouritesList>
                <SearchHistory></SearchHistory>
            </main>
            <Footer/>
        </>
        
    )
}

export default Favourites;