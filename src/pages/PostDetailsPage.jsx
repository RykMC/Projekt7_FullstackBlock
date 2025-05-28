import { Outlet } from "react-router-dom";
import Navbar from "../components";

function MainLayout() {
  return (
    <>
      <Navbar>Navbar</Navbar>
      <Outlet>Outlet</Outlet>
      <Footer>Footer</Footer>
    </>
  );
}
export default MainLayout;
