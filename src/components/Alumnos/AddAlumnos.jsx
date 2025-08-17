import React, { useState, useEffect } from "react";
import "./StyleAlumns.css";

const API_URL = import.meta.env.VITE_API_URL;

const AddAlumnos = () => {
  const [nombre, setNombre] = useState("");
  const [grado, setGrado] = useState("");
  const [telefono, setTelefono] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [mostrarTabla, setMostrarTabla] = useState(false);


  // Cargar alumnos desde la API backend
  useEffect(() => {
    const cargarAlumnos = async () => {
      try {
        const res = await fetch(`${API_URL}/alumnos`);
        if (!res.ok) throw new Error("Error al cargar alumnos");
        const data = await res.json();
        setAlumnos(data);
      } catch (error) {
        alert(error.message);
      }
    };
    cargarAlumnos();
  }, [API_URL]);

  // Enviar nuevo alumno al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !grado || !telefono) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/alumnos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, grado, telefono }),
      });

      if (!res.ok) throw new Error("Error al guardar el alumno");

      const nuevoAlumno = await res.json();
      setAlumnos((prev) => [...prev, nuevoAlumno]);

      setNombre("");
      setGrado("");
      setTelefono("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="alumnos">
      <h1 className="text-center">Agregar Alumno</h1>
      <div className="content">
        {!mostrarTabla ? (
          <form onSubmit={handleSubmit} className="form-container">
            <div>
              <label htmlFor="nombre" className="form-label">
                Nombre y Apellido
              </label>
              <input
                type="text"
                id="nombre"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre del alumno"
              />
            </div>
            <div className="mb-3 mt-1">
              <label htmlFor="grado" className="form-label">
                Grado
              </label>
              <input
                type="text"
                id="grado"
                className="form-control"
                value={grado}
                onChange={(e) => setGrado(e.target.value)}
                placeholder="Grado del alumno"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="telefono" className="form-label">
                Teléfono
              </label>
              <input
                type="text"
                id="telefono"
                className="form-control"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Teléfono del alumno"
              />
            </div>
            <div className="button-container">
              <button type="submit" className="btn btnAdd">
                Agregar Alumno
              </button>
              <button
                type="button"
                className="btn btnViewTable ms-2"
                onClick={() => setMostrarTabla(true)}
              >
                Ver Tabla
              </button>
            </div>
          </form>
        ) : (
          <div>
            <button
              type="button"
              className="btn btnAdd"
              onClick={() => setMostrarTabla(false)}
            >
              Volver al Formulario
            </button>
            <div className="tabla-alumnos">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Grado</th>
                    <th>Teléfono</th>
                  </tr>
                </thead>
                <tbody>
                  {alumnos.map((alumno) => (
                    <tr key={alumno.id}>
                      <td>{alumno.nombre}</td>
                      <td>{alumno.grado}</td>
                      <td>{alumno.telefono}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="pAlumnos">Total de Alumnos: {alumnos.length}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AddAlumnos;