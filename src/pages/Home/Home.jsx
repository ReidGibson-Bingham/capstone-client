import { useEffect, useState } from "react";
import Search from "../../components/Search/Search";
import ResultList from "./../../components/ResultList/ResultList";
import './Home.scss';

const Home = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (newValue) => {
        setSearchTerm(newValue);
    };

    useEffect(() => {
        console.log("the searchTerm from the Search component to the Home Page is: ", searchTerm)
    }, [searchTerm])

    return (
        <>
            <main className="home">
                <span className="home__mobile--search">
                    <Search
                        onChange={handleChange}
                    />
                </span>
                <div className="home__tablet--search">
                    <Search
                        onChange={handleChange}
                    />
                    <Search/>
                </div>
                <ResultList
                    searchTerm={searchTerm}
                />
            </main>
        </>
        
    )
}

export default Home;