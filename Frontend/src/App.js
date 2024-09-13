import './App.css';
import Navbar from './Components/navbar';
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import SignUp from './Components/SignUp';
import Footer from './Components/Footer';
import PrivateComp from './Components/PrivateComp';
import Login from './Components/Login';
import AddProduct from './Components/AddProduct';
import ProductList from './Components/ProductList';
import UpdateProd from './Components/UpdateProd';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route element={<PrivateComp/>}>
            <Route path="/" element={<ProductList/>} />
            <Route path="/add-product" element={<AddProduct/>} />
            <Route path="/update/:id" element={<UpdateProd/>} />
            <Route path="/logout" element={<h1>Logout Component</h1>} />
            <Route path="/profile" element={<h1>Profile Component</h1>} />
          </Route>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
