import Header from "../../components/Header/Header";
import FavouritesList from "./../../components/FavouritesList/FavouritesList";
import SearchHistory from "./../../components/SearchHistory/SearchHistory";
import './Favourites.scss';

const Favourites = () => {
    return (
        <>
            <Header/>
            <main className="favourites-page">
                <FavouritesList></FavouritesList>
                <SearchHistory></SearchHistory>
            </main>
        </>
        
    )
}

export default Favourites;