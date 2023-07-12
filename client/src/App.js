import './App.css';
import Home from './screens/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Register} from './screens/Register'
import { Landing } from './screens/Landing';
import { Error } from './components/Error';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';
function App() {
  return (
    <CartProvider>  
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/myOrder' element={<MyOrder/>}/>
          <Route path='/*' element={<Error/>}/>
        </Routes>
      </Router>
    </div>
    </CartProvider>
  );
}



export default App;
