import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [logId, setLogId] = useState('');
    const [pass, setPass] = useState('');
    const [err, setErr] = useState(null);
    const [attWarn, setAttWarn] = useState(null);
    const [load, setLoad] = useState(false);

    const navi = useNavigate();

    const handleLog = async (e) => {
        e.preventDefault();
        setLoad(true);
        setErr(null);
        setAttWarn(null);

        try {
            const respon = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ login: logId, password: pass }),
            });

            const data = await respon.json();

            if (!respon.ok) {
                if (data.attemptsLeft !== undefined) {
                    setAttWarn(`Your remaining attempts: ${data.attemptsLeft}`);
                }
                throw new Error(data.error || "Incorrect entered fields");
            }

            if (data.token) {
                localStorage.setItem('MeowthGuardToken', data.token);
                localStorage.setItem('MeowthGuardUser', data.username);

                navi('/dashboard');
            } else {
                throw new Error("Login successful, but no token was found");
            }
        } catch (err) {
            setErr(err.message || "Couldn't connect to da server");
        } finally {
            setLoad(false);
        }
    };

    return (
        <div className="mainContent">
            <div className="uploadBox">
                <h2 className="resultsTitle">Login Page</h2>
                <form onSubmit={handleLog}>
                    <input className="inputField" type="text" placeholder="Please enter your username or email" value={logId} onChange={(e) => setLogId(e.target.value)} required />
                    <input className="inputField" type="password" placeholder="Please enter your password" value={pass} onChange={(e) => setPass(e.target.value)} required />
                    <button type="submit" disabled={load} className={`scanBtn ${load ? 'disableScanBtn' : 'activeScanBtn'}`}>
                        {load ? 'Authenticating...' : 'Submit'}
                    </button>
                </form>

                {err && <div className="errorBox"><p>{err}</p>{attWarn && <p className="text-sm mt-1 font-semibold">{attWarn}</p>}</div>}
                <span className="switchLink" onClick={() => navi('/register')}>
                    Don't Already have an account, Click here
                </span>
            </div>
        </div>
    );
}

export default Login