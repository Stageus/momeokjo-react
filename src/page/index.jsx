import { Routes, Route } from "react-router-dom";
import Login from "./Login"
import SignUp from "./SignUp"
import FindId from "./FindId";
import Findpw from "./FindPw"
import ChangePw from "./ChangePw"
import RestaurantCreate from './RestaurantCreate'
import Main from './Main'

const Page = () => {
    return (
        <Routes>
            <Route path="/find-id" element={<FindId />} />
            <Route path="/find-pw" element={<Findpw />} />
            <Route path="/change-pw" element={<ChangePw />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/restaurant-create" element={<RestaurantCreate />} />
            <Route path="/my-info" element={<Main />} />
            <Route path="/restaurant/:depth2restaurantidx" element={<Main />} />
            <Route path="/" element={<Main />} />
        </Routes>
    )
}

export default Page