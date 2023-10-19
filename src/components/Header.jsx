import { Outlet } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="bg-dark text-light p-5 text-center">
        <div className="container">
          <h1>Redux Blog</h1>
        </div>
      </div>
      <div className="container"><Outlet /></div>
    </>
  );
}
