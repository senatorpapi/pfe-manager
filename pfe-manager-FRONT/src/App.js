import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login, Register } from './pages/login';
import { Home } from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home/>} />
      <Route path='/register' element={<Register/>} />
    </Routes>
  );
}

export default App;
