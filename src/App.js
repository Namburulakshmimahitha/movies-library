
import './App.css';
import { AuthContextProvider } from './components/context/AuthContext';
import Home from './components/pages/Home';
import Log from './components/pages/Log';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Protected from './components/pages/Protected';


function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Log />} />
          <Route path="/main" element={
            <Protected>
              <Home />
            </Protected>} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
