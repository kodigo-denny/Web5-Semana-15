import React from "react";
import { Router, BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Home'
import About from './About'
import NotFound from "./NotFound";
import Menu from "./Menu";
import AutoresCRUD from "./AutoresCRUD";
import AutoresFORM from "./AutoresFORM";

function App(){
    return(
        <div>
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/autores" element={<AutoresCRUD />} />
                    <Route path="/autores/new" element={<AutoresFORM />} />
                    <Route path="/autores/edit/:id" element={<AutoresFORM />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App