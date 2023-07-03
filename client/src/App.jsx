import "./App.css";
import Homepage from "./components/Homepage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import MyCvs from "./components/MyCvs";
import Layout from "./components/Layout";
function App() {
  return (
    <div className="appmain-container">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/templates" element={<MyCvs />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
