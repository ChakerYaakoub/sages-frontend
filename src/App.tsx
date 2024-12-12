import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import appRoutes from "./appRoutes";
import ToTop from "./components/ToTop/ToTop";

function App() {
  return (
    <div className="App" id="App">
      <Router>
        <ToTop />
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
