import Search from "../../components/Search/Search";
import ResultList from "./../../components/ResultList/ResultList";
import './Home.scss';

const Home = () => {
    return (
        <>
            <main className="home">
                <Search/>
                <ResultList/>
            </main>
        </>
        
    )
}

export default Home;