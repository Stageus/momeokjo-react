import { Outlet } from "react-router-dom";

import Recommend from "./Recommend"

function Layout() {

  return (
    <>
      <Recommend />
      <Outlet />
    </>
  )
}

export default Layout