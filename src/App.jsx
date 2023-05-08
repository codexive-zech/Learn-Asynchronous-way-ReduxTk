import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SingleMovie from "./page/SingleMovie";
import Home from "./page/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path=":id" element={<SingleMovie />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
