import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [load, setLoad] = useState(false);
    const [err, setErr] = useState(null);
    const navi = useNavigate();

    const handRegi = async (e) => {
        e.preventDefault();
        setLoad(true);
        setErr(null);

        try {
            const respon = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: formData }),
            });

            if (!respon.ok) throw new Error("Registration failed. Email or username migth already be in use");
            navi('/login');
        } catch (err) {
            setErr(err.message);
        } finally {
            setLoad(false);
        }
    };

    return (
        <div className="mainContent">
            <div className="uploadBox">
                <h2 className="resultsTitle">Registration Page</h2>
                <form onSubmit={handRegi}>
                    <input className="inputField" type="text" placeholder="Username" onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
                    <input className="inputField" type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    <input className="inputField" type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                    <button type="submit" disabled={load} className={`scanBtn ${load ? 'disableScanBtn' : 'activeScanBtn'}`}>
                        {load ? 'Creating Account...' : 'Register'}
                    </button>
                </form>
                {err && <div className="errorBox">{err}</div>}
                <span className="switchLink" onClick={() => navi('/login')}>Already have an account?</span>
            </div>
        </div>
    )


}

export default Register