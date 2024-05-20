import { Outlet } from "react-router-dom";
import Header from "./Header";


const LayOut = () => {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
};

export default LayOut;
