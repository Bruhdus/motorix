import { useAuth } from "../firebase/AuthContext";

const Home = () => {
    const { currentUser } = useAuth();

    return (
        <div>
            <h1>Home</h1>
            <p>{currentUser?.email}</p>
            <p>{currentUser?.displayName}</p>
        </div>
    )

};

export default Home;