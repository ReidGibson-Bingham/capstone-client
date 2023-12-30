import Search from "../../components/Search/Search";
import ResultList from "./../../components/ResultList/ResultList";
import './Home.scss';

const Home = () => {
    return (
        <>
            <main className="home">
                <span className="home__mobile--search">
                    <Search/>
                </span>
                <div className="home__tablet--search">
                    <Search/>
                    <Search/>
                </div>
                <ResultList/>
            </main>
        </>
        
    )
}

export default Home;