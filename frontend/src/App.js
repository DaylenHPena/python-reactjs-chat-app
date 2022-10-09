import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, Routes } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  return (
    <div className="App">
      <h1>My App</h1>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <PrivateRoute exact path="/" element={<HomePage />} ></PrivateRoute>
          <Routes>
            <Route path="/login" element={<LoginPage />} ></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
