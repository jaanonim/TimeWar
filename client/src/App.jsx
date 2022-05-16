import { default as React } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import test from "./pages/Taaaa/test";

/*
import GamePage from "./pages/GamePage";
import JoinPage from "./pages/JoinPage";
import MainPage from "./pages/MainPage";

const GamePage = React.lazy(() => import("./pages/GamePage"));
const MainPage = React.lazy(() => import("./pages/MainPage"));
const JoinPage = React.lazy(() => import("./pages/JoinPage"));
*/

function App() {
  console.log(test);
  return <></>;
  return (
    <Routes>
      <Route
        path="/"
        element={
          <React.Suspense fallback={<Loading />}>
            <MainPage />
          </React.Suspense>
        }
      />
      <Route
        path="/game"
        element={
          <React.Suspense fallback={<Loading />}>
            <GamePage />
          </React.Suspense>
        }
      />
      <Route
        path="/join"
        element={
          <React.Suspense fallback={<Loading />}>
            <JoinPage />
          </React.Suspense>
        }
      />
    </Routes>
  );
}

export default App;
