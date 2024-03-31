import {Navigate, Route, Routes} from "react-router-dom";
import {AuthMiddleware} from "./middleware";
import {Login, Registration} from "./pages/Auth";
import {Home} from "./pages/Home";
import {User} from "./pages/User";
import {Navbar} from "./components/Navbar";
import {PersistLogin} from "./components/PersistLogin";

const App = () => {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path='/' element={<PersistLogin/>}>
                    <Route index={true} element={<Home/>}></Route>
                    <Route path='/auth'>
                        <Route path='login' element={<Login/>}></Route>
                        <Route path='registration' element={<Registration/>}></Route>
                    </Route>
                    <Route path='user' element={<AuthMiddleware/>}>
                        <Route index={true} element={<User/>}></Route>
                    </Route>
                </Route>
                <Route path='*' element={<Navigate to='/'/>}></Route>
            </Routes>
        </>
    )
};

export default App;
