import Main from './Main'
import Login from './Login'
import { Routes, Route} from "react-router-dom"


function Page() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default Page
 