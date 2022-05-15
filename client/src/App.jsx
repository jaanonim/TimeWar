import { default as React } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";

const GamePage = React.lazy(() => import("./pages/GamePage/index.js"));
const MainPage = React.lazy(() => import("./pages/MainPage/index.js"));
const JoinPage = React.lazy(() => import("./pages/JoinPage/index.js"));

function App() {
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
