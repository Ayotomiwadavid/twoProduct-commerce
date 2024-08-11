import { Route, Routes } from "react-router-dom";
import "./App.css";
import Shop from "./Pages/Shop";
import Productdetails from "./Pages/Productdetails";
import Thankyou from "./Pages/Thankyou";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/productDetails/:id" element={<Productdetails />} />
        <Route path="/thank-you" element={<Thankyou />} />
        <Route path="*" element={<h1>OOPS! <b>The Page you're looking for doen't exist</b></h1>} />
      </Routes>
    </>
  );
}

export default App;
