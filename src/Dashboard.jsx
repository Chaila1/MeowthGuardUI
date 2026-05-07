import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navi = useNavigate();
    const user = localStorage.getItem('MeowthGuardUser');

    return (
        <div className="mainContent">
            <div className="resultsCard">
                <h2 className="resultsTitle">Welcome, {user}</h2>
                <div className="resultsGrid">
                    <div className="dataBox">
                        <p className="dataLabel">Security Status</p>
                        <p className="dataValue greenTxt">Active</p>
                    </div>
                    <div className="dataBox">
                        <p className="dataLabel">Database</p>
                        <p className="dataValue">Generations</p>
                    </div>
                </div>
                <p className="reasoningTxt mb-6">Click here to access the AI scanner</p>
                <button onClick={() => navi('/scanner')} className="scanBtn activeScanBtn">Card Authenticator</button>
            </div>
        </div>
    );
}

export default Dashboard;