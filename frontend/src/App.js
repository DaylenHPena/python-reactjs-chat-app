import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, Routes } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { ConnectionProvider } from './context/ConnectionContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={
              <><ConnectionProvider><PrivateRoute />{<HomePage />}</ConnectionProvider></>} ></Route>
            <Route path="/login" element={<LoginPage />} ></Route>
            <Route path="/registration" element={<RegistrationPage />} ></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
