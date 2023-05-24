import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from './pages/Home';
import Transfer from './pages/Transfer';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/f/:id' element={<Transfer />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;