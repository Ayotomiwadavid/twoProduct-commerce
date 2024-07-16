import { Route, Routes } from "react-router-dom";
import "./App.css";
import Shop from "./Pages/Shop";
import Productdetails from "./Pages/Productdetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Shop />} />
      <Route path="/product-details:id" element={<Productdetails />} />
      <Route path="*" element={<h1>OOPS! <br>The Page you're looking for doen't exist</br></h1>} />
    </Routes>
  );
}

export default App;
