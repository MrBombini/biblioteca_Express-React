import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Book from "./components/Book";

function Home() {
  return <h1 className="text-2xl font-bold">Bienvenido a la Biblioteca</h1>;
}

function NotFound() {
  return <h1 className="text-2xl font-bold text-red-500">Página no encontrada</h1>;
}

function App() {
  return (
    <Router>
      <div>
        <nav className="bg-gray-800 text-white p-4">
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:underline">Inicio</a>
            </li>
            <li>
              <a href="/books" className="hover:underline">Libros</a>
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Book />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
