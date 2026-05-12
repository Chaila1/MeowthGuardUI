import { useEffect, useState } from "react";

function Library(){
    const [scans, setScans] = useState([]);
    const [load, setLoad] = useState(true);
    const token = localStorage.getItem('MeowthGuardToken') 

    useEffect(() => {
        fetch('http://localhost:3000/poke_scans', {
            headers: {'Authorization': `Bearer ${token}`}
        })
        .then(res => res.json())
        .then(data => {
            setScans(data);
            setLoad(false);
        });
    }, [token]);

    const deleteScan = async (id) => {
        await fetch(`http://localhost:3000/poke_scans/${id}`, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${token}`}
        });
        setScans(scans.filter(s => s.id !== id));
    };

    return (
        <div className="mainContent">
            <h2 className="resultsTitle">Card Library</h2>
            {load ? (
                <p className="subtitle">Loading you library...</p>
            ) : scans.length === 0 ?(
                <div className="emptyState">You Haven't uploaded a scan yet</div> 
            ) : (
                scans.map(scan =>(
                    <div key={scan.id} className={`libraryItem ${scan.prediction === 'real' ? 'realBorder' : 'fakeBorder'}`}>
                        <button onClick={() => deleteScan(scan.id)} className="deleteBtn">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                        <h3 className="dataLabel">Card Overview</h3>
                        <p className="dataValue mb-2">{scan.cardName || "Generations Card Series Card"}</p>
                        <p className={`font-black uppercase ${scan.prediction === 'real' ? 'greenTxt' : 'redTxt'}`}>
                            {scan.prediction} — {scan.confidenceScore}% Confidence
                        </p>
                        <p className="reasoningTxt">{scan.reasoning}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default Library;