import React from "react";
import { Router, BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Home'
import About from './About'
import NotFound from "./NotFound";
import Menu from "./Menu";
import AutoresCRUD from "./AutoresCRUD";
import AutoresFORM from "./AutoresFORM";
import LibrosCRUD from "./LibrosCRUD";
import LibrosFORM from "./LibrosFORM";

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
                    <Route path="/autores/delete/:id" element={<AutoresFORM del={true} />} />
                    <Route path="/libros" element={<LibrosCRUD />} />
                    <Route path="/libros/new" element={<LibrosFORM />} />
                    <Route path="/libros/edit/:id" element={<LibrosFORM />} />
                    <Route path="/libros/delete/:id" element={<LibrosFORM del={true} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App