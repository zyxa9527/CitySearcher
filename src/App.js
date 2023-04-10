import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component//Navbar";
import SearchBar from "./component/SearchBar";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <h1>人口數、戶數按戶別及性別統計</h1>
      <div className="taiwan">TAIWAN</div>
      <Router>
        <Routes>
          <Route
            path="/:yearPath/:countyPath/:districtPath"
            element={<SearchBar />}
          />
          <Route path="/" element={<SearchBar />} />
        </Routes>
      </Router>
    </div>
  );
}
