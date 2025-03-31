import { Routes, Route } from "react-router-dom";
import Login from '../page/ui/Auth/Login'
import SignUp from "../page/ui/Auth/SignUp"
import FindId from "../page/ui/Auth/FindId/index.jsx";
import Findpw from "../page/ui/Auth/FindPw/index.jsx"
import ChangePw from "../page/ui/Auth/ChangePw/index.jsx";
import Register from './Register'
import Main from './Main'

const Page = () => {
    return (
        <Routes>
            <Route path="/find-id" element={<FindId />} />
            <Route path="/find-pw" element={<Findpw />} />
            <Route path="/change-pw" element={<ChangePw />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/register" element={<Register />} />
            <Route path="/:depth2restaurantidx" element={<Main />} />
            <Route path="/" element={<Main />} />
        </Routes>
    )
}

export default Page