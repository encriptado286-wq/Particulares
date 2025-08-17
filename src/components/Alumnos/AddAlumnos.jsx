import React, { useState, useEffect } from "react";
import "./StyleAlumns.css";

const API_URL = import.meta.env.VITE_API_URL;

const AddAlumnos = () => {
  const [nombre, setNombre] = useState("");
  const [grado, setGrado] = useState("");
  const [telefono, setTelefono] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [mostrarTabla, setMostrarTabla] = useState(false);
  const [cargando, setCargando] = useState(true); // Estado de carga

  // Cargar alumnos desde la API backend
  useEffect(() => {
    const cargarAlumnos = async () => {
      setCargando(true);
      try {
        const res = await fetch(`${API_URL}/alumnos`);
        if (!res.ok) throw new Error("Error al cargar alumnos");
        const data = await res.json();
        setAlumnos(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setCargando(false);
      }
    };
    cargarAlumnos();
  }, []); // se ejecuta solo al montar el componente

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
          <form onSubmit={handleSubmit} className="form-alumnos">
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              type="text"
              placeholder="Grado"
              value={grado}
              onChange={(e) => setGrado(e.target.value)}
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
            <button type="submit" className="btn btnAdd">
              Guardar Alumno
            </button>
            <button
              type="button"
              className="btn btnShow"
              onClick={() => setMostrarTabla(true)}
            >
              Ver Alumnos
            </button>
          </form>
        ) : cargando ? (
          <div className="text-center mt-5">
            <h2>Cargando alumnos... ⏳</h2>
          </div>
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