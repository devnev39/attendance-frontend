import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Manage from "./pages/Manage";

function App() {
  return (
    <Routes>
       <Route path="/" element={<Home />}/>
       <Route path="/recognize" element={<Home />} />
       <Route path="/register" element={<Register />} />
       <Route path="/manage" element={<Manage />} />
    </Routes>
  );
}

export default App;
