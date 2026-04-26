import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Meals from "./pages/Meals";
import Progress from "./pages/Progress";
// import Settings from "./pages/Settings";
// import MyProvider from "./hooks/myProvider";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/progress" element={<Progress />} />
        {/* <Route path="/settings" element={<Settings />} /> */}
      </Routes>
    </>
  );
}

export default App;
