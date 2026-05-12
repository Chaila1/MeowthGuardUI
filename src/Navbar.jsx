import { useNavigate, Link } from "react-router-dom";

function Navbar() {
    const navi = useNavigate();
    const user = localStorage.getItem('MeowthGuardUser');

    const handleLogout = () => {
        localStorage.clear();
        navi('/login');
    };

    if (!user) return null;

    return (
        <nav className="navbar">
            <div className="navLinks">
                <Link to="/dashboard" className="navLink">Dashboard</Link>
                <Link to="/library" className="navLink">Card Library</Link>
            </div>
            <button onClick={handleLogout} className="navLogout">Logout</button>
        </nav>
    );
}

export default Navbar;