import React from "react";
import { Router, BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Home'
import About from './About'
import NotFound from "./NotFound";
import Menu from "./Menu";

function App(){
    return(
        <div>
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App