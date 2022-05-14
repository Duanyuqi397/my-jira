import React from "react";
import { ProjectList } from "pages/project-list";
import { Login } from "pages/login";
import "./App.css";

function App() {
  // const { user } = useAuth();
  return (
    <div className="App">
      {/* <ProjectList /> */}
      <Login />
    </div>
  );
}

export default App;
