import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Asistencias from './components/Asistencias/Asistencias';
import AddAlumnos from './components/Alumnos/AddAlumnos';
import Registros from './components/Registros/ViewRegistros';
import "./style.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div className="container-fluid">
        </div>} />
        <Route path="/asistencia" element={<Asistencias />} />
        <Route path="/addAlumno" element={<AddAlumnos />} />
        <Route path="/registros" element={<Registros />} />
      </Routes>
    </Router>
  );
};

export default App;