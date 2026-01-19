import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <main className="main-layout">
      <Outlet />
    </main>
  );
};
