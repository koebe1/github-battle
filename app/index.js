import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ThemeProvider } from "./context/theme";
import Nav from "./components/nav";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "./components/loading";

// dynamic imports for code splitting
const Popular = React.lazy(() => import("./components/popular"));
const Battle = React.lazy(() => import("./components/battle"));
const Results = React.lazy(() => import("./components/results"));

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    {
      theme === "dark" ? setTheme("light") : setTheme("dark");
    }
  };

  return (
    <Router>
      <ThemeProvider value={theme}>
        <div className={theme}>
          <div className="container">
            <Nav toggleTheme={toggleTheme} />

            <React.Suspense fallback={<div className="loader" />}>
              <Switch>
                <Route exact path="/" component={Popular} />
                <Route exact path="/battle" component={Battle} />
                <Route exact path="/battle/results" component={Results} />
                {/* Renders if no of the other paths matches  */}
                <Route render={() => <h1>404</h1>} />
              </Switch>
            </React.Suspense>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
