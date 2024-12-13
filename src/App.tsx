import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import appRoutes from "./appRoutes";
import ToTop from "./components/ToTop/ToTop";

import Spinner from "./components/Spinner/Spinner";
import { useLoading } from "./context/LoadingContext";

function App() {
  const { isLoading } = useLoading();

  return (
    <div className="App" id="App">
      <Router>
        <ToTop />
        {isLoading && <Spinner />}

        <Header />
        <article>
          <main>
            <Routes>
              {appRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </main>
        </article>
        <Footer />
      </Router>
    </div>
  );
  return <></>;
}

export default App;
