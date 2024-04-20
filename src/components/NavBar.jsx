import { useAuth } from "../firebase/AuthContext";
import { primaryButton, navBarText } from '../style/AppStyle';


const NavBar = () => {
    const { currentUser, signout } = useAuth()

    const handleSignout = async () => {
        signout()
    }

    return (
        <ul className="nav p-2 shadow">
            <li className="nav-item">
                <a style={navBarText} className="nav-link" href="/">Home</a>
            </li>
            {currentUser && (
                <>
                    <li className="nav-item">
                        <a style={navBarText} className="nav-link" href="/postflat">Post Flat</a>
                    </li>
                    <li className="nav-item">
                        <a style={navBarText} className="nav-link" href="/profile">Profile</a>
                    </li>
                </>

            )}
            {!currentUser && (
                <div className='nav ms-auto'>
                    <li className="nav-item">
                        <a style={navBarText} className="nav-link" href="/signin">Sign In</a>
                    </li>
                    <li className="nav-item">
                        <a style={navBarText} className="nav-link" href="/signup">Sign Up</a>
                    </li>
                </div>
            )}
            {currentUser && (
                <div className='nav ms-auto'>
                    <li className="nav-item">
                        <button style={primaryButton} className="btn" onClick={handleSignout}>Sign Out</button>
                    </li>
                </div>
            )}
        </ul>
    )

};
export default NavBar;