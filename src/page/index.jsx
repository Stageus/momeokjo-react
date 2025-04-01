import { Routes, Route } from "react-router-dom";
import Login from '../page/Login'
import SignUp from "../page/SignUp"
import FindId from "../page/FindId";
import Findpw from "../page/FindPw"
import ChangePw from "../page/ChangePw"
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