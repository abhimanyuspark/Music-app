import React, { Suspense, lazy, useEffect } from "react";
import "./App.css";

const Layout = lazy(() => import("./Layout/Layout"));
import Loader from "./components/Loader";
import { Route, Routes } from "react-router-dom";
import { Home, PageNotFound, Contact } from "./pages/export";
import { useDispatch } from "react-redux";
import { getNewSongs } from "./Redux/services/spotifyApi";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNewSongs());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
