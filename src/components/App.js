import React from "react";
import Markdown from "./Markdown";

export default function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a className="navbar-brand" href="#">
          Markdown Viewer
        </a>
      </nav>
      <main role="main">
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-3">View and download markdown</h1>
            <p>Enter markdown on the left side of the page and press submit to see it displayed on the right side in HTML</p>
          </div>
        </div>
        <div className="container">
          <Markdown />
        </div>
      </main>
    </div>
  );
}
