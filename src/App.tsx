import React from "react";
import "./App.css";
import { ProjectListScreen } from "./screens/project-list";
import { TsReactTest } from "try-use-array";
import { LoginSreen } from "screens/login";

function App() {
  return (
    <div className="App">
      {/* <ProjectListScreen />
      <TsReactTest /> */}
      <LoginSreen />
    </div>
  );
}

export default App;
