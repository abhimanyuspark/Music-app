import React, { Suspense, lazy } from "react";
const SideBar = lazy(() => import("../Layout/Side/SideBar"));
import { Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import MusicPlayer from "../components/Music/MusicPlayer";
import { useSelector } from "react-redux";

const Layout = () => {
  const { activeSong } = useSelector((state) => state.player);

  return (
    <div className="w-[100vw] h-[100vh]">
      <div className="grid sm:grid-cols-[250px_1fr]">
        <SideBar active={activeSong?.name} />
        <div
          className={`${
            activeSong?.name ? "h-[calc(100vh-70px)]" : "h-[100vh]"
          } overflow-auto bg-slate-900`}
        >
          <Suspense fallback={<Loader color="white" />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
      {activeSong?.name && <MusicPlayer />}
    </div>
  );
};

export default Layout;
