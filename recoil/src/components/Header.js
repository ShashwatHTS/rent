import { Link } from "react-router-dom";
import { useAuthState } from "../atoms";
import { Navigate, useNavigate } from "react-router";

function Header({ url }) {

    const [authState, setAuthState] = useAuthState()
    const navigate = useNavigate()

    const logout = async () => {
        console.log("first")
        const response = await fetch("http://localhost:3000/users/logout", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })

        console.log("second",response)
        if (response.status === 200) {
            localStorage.removeItem("token")
            setAuthState({ loggedIn: false, token: "" })
            navigate("/")
        }
    }

    return <div className="Header">
        <Link to="/"><div className="Header_link">Home</div></Link>
        <Link to="/signup"><div className="Header_link">Signup</div></Link>
        <Link to="/login"><div className="Header_link">Login</div></Link>
        <button><div className="Header_link" onClick={logout}>Logout</div></button>
    </div>;
}

export default Header;
