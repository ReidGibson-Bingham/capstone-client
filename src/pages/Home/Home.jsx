import { useEffect, useState } from "react";
import Search from "../../components/Search/Search";
import ResultList from "./../../components/ResultList/ResultList";
import './Home.scss';

const Home = () => {

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        console.log("the searchTerm is: ", searchTerm)
    }, [setSearchTerm])

    return (
        <>
            <main className="home">
                <span className="home__mobile--search">
                    <Search
                        setSearchTerm={setSearchTerm}
                    />
                </span>
                <div className="home__tablet--search">
                    <Search
                        setSearchTerm={setSearchTerm}
                    />
                    <Search/>
                </div>
                <ResultList/>
            </main>
        </>
        
    )
}

export default Home;