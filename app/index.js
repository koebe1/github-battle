import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Component
// Sate
// Lifecycle
// UI

// -> Violation of Seperation of Concerns??
// -> No!
class App extends React.Component {
  render() {
    return <div>Hello World!</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
