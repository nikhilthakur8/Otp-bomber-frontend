import "./App.css";
import { Copyright } from "./component/Copyright";
import { Navbar } from "./component/NavBar/Navbar";
import { Outlet } from "react-router-dom";
function App() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#8EC5FC] to-[#E0C3FC]">
            <Navbar />
            <Outlet />
            <Copyright/>
        </div>
    );
}

export default App;
