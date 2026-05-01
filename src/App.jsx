import { useState } from 'react'
import './App.css'

function App() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
      setResult(null)
      setError(null)
    }
  }

  const handleScan = async () => {
    if (!file) return
    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch('http://localhost:3000/pokeScanner', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to scan the card")
      }
      setResult(data.poke_scan)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="appContainer">

      <div className="header">
        <h1 className="mainTitle">Meowth <span className="highlightText">Guard</span></h1>
        <p className="subtitle">Your AI-Powered Card Authenticator to ward of potential scams</p>
      </div>

      <div className="mainContent">
        <div className="uploadBox">
          {preview ? (
            <div className="previewContainer">
              <img src={preview} alt="Card Preview" className="previewImage" />
              <button onClick={() => { setFile(null); setPreview(null); setResult(null); }} className="resetBtn">Pick a different image</button>
            </div>
          ) : (
            <div className="uploadPrompt">
              <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>

              <h3 className="uploadTitle">Click here to upload your image for verification</h3>
              <label className="selectBtn">Upload Image<input type="file" className="hidden" accept="image/*" onChange={handleFileChange} /> </label>
            </div>
          )}
        </div>

        {file && !result && (
          <button onClick={handleScan} disabled={loading} className={`scanBtn ${loading ? 'disableScanBtn' : 'activeScanBtn'}`}>
            {loading ? 'MeowthGuard is analysing your card...' : 'Run Authentication Scan'}
          </button>
        )}

        {error && (
          <div className="errorBox">
            <p className="font-bold">The Scan Failed</p>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="resultsCard">
            <h2 className="resultsTitle">Here are your Scans Results</h2>

            <div className="resultsGrid">
              <div className="dataBox">
                <p className="dataLabel">Authenticity Score</p>
                <p className={`dataValue ${result.prediction === 'Real' ? 'greenTxt' : 'redTxt'}`}>{result.prediction}</p>
              </div>
            </div>

            <div className="dataBox">
              <div className="confidence">
                <p className="dataLabel">Confidence Score</p>
                <p className="font-bold">{result.confidenceScore}%</p>
              </div>

              <div className="trackProgress">
                <div className="fillProgress" style={{ width: `${result.confidenceScore}%` }}></div>
              </div>

              <p className="reasoningTxt">"{result.reasoning}"</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App