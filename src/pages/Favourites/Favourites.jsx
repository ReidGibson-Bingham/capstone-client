import FavouritesList from "./../../components/FavouritesList/FavouritesList";
import SearchHistory from "./../../components/SearchHistory/SearchHistory";
import './Favourites.scss';

const Favourites = () => {
    return (
        <>
            <main className="favourites-page">
                <FavouritesList></FavouritesList>
                <SearchHistory></SearchHistory>
            </main>
        </>
        
    )
}

export default Favourites;