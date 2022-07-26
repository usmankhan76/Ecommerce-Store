import {Route,Routes} from "react-router-dom"
import Home from './pages/home';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Header from "./components/nav/Header";
function App() {
  return (
    <>
    <Header/>
    <Routes>
     <Route path='/' element={<Home/>}  />;
     <Route path='login' element={<Login/>} />;
     <Route path='register' element={<Register/>} />;
      
    
    </Routes>
    </>
  );
}

export default App;
