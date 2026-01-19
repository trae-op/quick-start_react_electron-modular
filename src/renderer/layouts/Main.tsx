import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="main-layout">
      <main className="main-layout__content">
        <Outlet />
      </main>
    </div>
  );
};
