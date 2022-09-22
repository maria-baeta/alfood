import { Outlet } from "react-router-dom"
import { Banner, Footer, NavBar } from "../../componentes"

export const Clients = () => {
  return (
    <>
      <NavBar />
      <Banner />
      <Outlet />
      <Footer />
    </>
  )
}