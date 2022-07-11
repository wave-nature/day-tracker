import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import "./App.css";
import Compare from "./pages/Compare";
import Rakesh from "./pages/Rakesh";
import Vivek from "./pages/Vivek";

const USERS = [
  {
    id: "1",
    username: "vivek",
    password: "vivek",
    sheetId: "1qQkAaigk4Eq1bXQRBzA_coNRX4SkOIwwwFwWhj-k9j8",
  },
  {
    id: "2",
    username: "rakesh",
    password: "rakesh",
    sheetId: "131F4NCe7oJU9h7Evr8RJwgX62hjt6gzYpVJGwP9--N0",
  },
];

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [vivek, setVivek] = useState({ rows: [], cols: [] });
  const [rakesh, setRakesh] = useState({ rows: [], cols: [] });
  const [page, setPage] = useState("");

  const sheetUrl = (id) => {
    const base = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?`;
    const sheetName = "user-data";
    const query = encodeURIComponent("Select *");
    const url = `${base}&sheet=${sheetName}&tq=${query}`;

    return url;
  };

  useEffect(() => {
    if (!loggedIn) return;
    const vivekUrl = sheetUrl(USERS[0].sheetId);
    const rakeshUrl = sheetUrl(USERS[1].sheetId);
    const sheetData = async () => {
      const dataVivek = await fetchSheetData(vivekUrl);
      const dataRakesh = await fetchSheetData(rakeshUrl);
      setVivek({ rows: dataVivek.rows, cols: dataVivek.cols });
      setRakesh({ rows: dataRakesh.rows, cols: dataRakesh.cols });
    };
    sheetData();
  }, [loggedIn]);
  // console.log(data);

  const fetchSheetData = async (url) => {
    try {
      const res = await fetch(url);
      const rep = await res.text();
      const jsonData = await JSON.parse(rep.substring(47).slice(0, -2));
      return jsonData.table;
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    name === "username" ? setUsername(value) : setPassword(value);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    const user = USERS.find(
      (user) => user.username === username && user.password === password
    );
    if (!user) {
      setLoggedIn(false);
      return;
    }
    setLoggedIn(true);
    setUser(user);
    setPage(user.username);
  };

  return (
    <>
      {!loggedIn ? (
        <div className="container">
          <form className="login" onSubmit={loginHandler}>
            <div className="form-group">
              <label>username</label>
              <input
                className="form-control"
                type="text"
                name="username"
                placeholder="username"
                value={username}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <label>password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>
            <button className="btn">Login</button>
          </form>
        </div>
      ) : (
        <div>
          <header>
            <nav>
              <ul>
                <li>
                  <p
                    className={`${page === "rakesh" ? "active" : ""}`}
                    onClick={(e) => setPage("rakesh")}
                  >
                    Rakesh
                  </p>
                </li>
                <li>
                  <p
                    className={`${page === "vivek" ? "active" : ""}`}
                    onClick={(e) => setPage("vivek")}
                  >
                    Vivek
                  </p>
                </li>
                <li>
                  <p
                    className={`${page === "compare" ? "active" : ""}`}
                    onClick={(e) => setPage("compare")}
                  >
                    Compare
                  </p>
                </li>
              </ul>
            </nav>
          </header>

          <main className="main">
            {page === "rakesh" && (
              <Rakesh cols={rakesh.cols} rows={rakesh.rows} />
            )}
            {page === "vivek" && <Vivek cols={vivek.cols} rows={vivek.rows} />}
            {page === "compare" && (
              <Compare rakeshRows={rakesh.rows} vivekRows={vivek.rows} />
            )}
          </main>
        </div>
      )}
    </>
  );
};

export default App;
