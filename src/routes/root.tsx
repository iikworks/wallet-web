import {Outlet} from "react-router-dom";
import Sidebar from "../components/sidebar.tsx";
import Alert from "../components/alert.tsx";

export default function Root() {
  return (
    <div className="flex h-screen">
      <Alert />
      <Sidebar />
      <main className="flex-1 py-2 px-2 sm:py-6 sm:px-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}