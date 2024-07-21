import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import ProductDetails from "./pages/ProductDetails";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <BrowserRouter >
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
