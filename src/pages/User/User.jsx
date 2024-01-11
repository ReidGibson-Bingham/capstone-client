import UserTerminal from "./../../components/UserTerminal/UserTerminal"
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import './User.scss'

const User = () => {

    return (
        <>
            <Header/>
            <main className="user">
                <UserTerminal/>
            </main>
            <Footer/>
        </>
    )
}

export default User;