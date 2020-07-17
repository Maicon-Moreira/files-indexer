import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Result from "./result";

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

function App() {
  const [searchText, setSearchText] = useState("maicon");
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(-1);
  const [timeElapsed, setTimeElapsed] = useState(-1);
  const [path, setPath] = useState([]);
  const [mode, setMode] = useState("entries");
  const [totalSize, setTotalSize] = useState(0);

  async function handleSearchButton(e) {
    const initialTime = new Date();
    const response = await api.post("search", {
      path,
      searchText,
    });
    setTimeElapsed(((new Date() - initialTime) / 1000).toFixed(2));

    response.data.sort((a, b) => b.size - a.size);
    setMode("search");
    setTotalResults(response.data.length);
    setResults(response.data);
  }

  useEffect(() => {
    if (mode === "entries") {
      async function getEntries() {
        const initialTime = new Date();
        const response = await api.post("entries", {
          path,
        });
        setTimeElapsed(((new Date() - initialTime) / 1000).toFixed(2));

        response.data.sort((a, b) => b.size - a.size);
        let totalSize = 0;
        for (const result of response.data) totalSize += result.size;
        setTotalSize(totalSize);
        setTotalResults(response.data.length);
        setResults(response.data);
      }
      getEntries();
    }
  }, [path, mode]);

  function handleReturnButton() {
    if (mode === "search") {
      setMode("entries");
    } else {
      const newPath = path.map((a) => a);
      newPath.pop();
      setPath(newPath);
    }
  }

  function enterFolder(path) {
    setPath(path);
    setMode("entries");
  }

  return (
    <div className="main-page">
      <header>
        <h1>Deep Search</h1>
        <div className="search-bar">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={handleSearchButton}>Pesquisar</button>
        </div>
      </header>
      <nav>
        <div className="top">
          <button className="return" onClick={handleReturnButton}>
            Voltar
          </button>
          <h5>
            {totalResults >= 0 &&
              `${totalResults} resultados em ${timeElapsed} segundos.`}
          </h5>
        </div>
        <div className="container">
          {results.slice(0, 300).map((result) => (
            <Result
              data={result}
              enterFolder={enterFolder}
              totalSize={totalSize}
            ></Result>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default App;
