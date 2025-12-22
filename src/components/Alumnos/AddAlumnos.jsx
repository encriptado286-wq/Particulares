import { useState, useEffect, useRef } from "react";
import "./StyleAlumns.css";

const API_URL = import.meta.env.VITE_API_URL;

const AddAlumnos = () => {
  const [nombre, setNombre] = useState("");
  const [grado, setGrado] = useState("");
  const [telefono, setTelefono] = useState("");
  const [foto, setFoto] = useState(null);
  const [alumnos, setAlumnos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [mostrarTabla, setMostrarTabla] = useState(false);

  const fileInputRef = useRef(null); // referencia al input oculto

  // Cargar alumnos
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
  }, []);

  // Manejo drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setFoto(file);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFoto(file);
  };

  // agregar alumno
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !grado) {
      setMensaje("Por favor, completa los campos con *.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/alumnos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // enviamos JSON
        body: JSON.stringify({ nombre, grado, telefono }), // no enviamos foto
      });

      if (!res.ok) throw new Error("Error al guardar el alumno");

      const nuevoAlumno = await res.json();
      setAlumnos((prev) => [...prev, nuevoAlumno]);
      setNombre("");
      setGrado("");
      setTelefono("");
      setMensaje("¡Alumno agregado exitosamente!");
      setTimeout(() => setMensaje(""), 5000);
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
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingresar Nombre y Apellido*"
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={grado}
                onChange={(e) => setGrado(e.target.value)}
                placeholder="Ingresar Grado*"
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Ingresar Teléfono"
              />
            </div>

          
            <div
              className="drop-zone mb-3"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current.click()} // disparar input oculto
            >
              {foto ? (
                <img
                  src={URL.createObjectURL(foto)}
                  alt="Vista previa"
                  style={{ maxHeight: "150px", objectFit: "cover" }}
                />
              ) : (
                <p>Arrastra una foto aquí o haz clic para seleccionar un archivo.</p>
              )}

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>

            {mensaje && <div className="alert alert-success mt-2">{mensaje}</div>}

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
          <div className="tabla-alumnos">
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Grado</th>
                  <th>Teléfono</th>
                  <th>Foto</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.map((alumno) => (
                  <tr key={alumno.id}>
                    <td>{alumno.nombre}</td>
                    <td>{alumno.grado}</td>
                    <td>{alumno.telefono}</td>
                    <td>
                      {alumno.foto && (
                        <img
                          src={`${API_URL}${alumno.foto}`}
                          alt="foto"
                          width="60"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-end">
              <p className="pAlumnos text-start">
                Total de Alumnos: {alumnos.length}
              </p>
              <button
                type="button"
                className="btn btnAdd"
                onClick={() => setMostrarTabla(false)}
              >
                Volver al Formulario
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AddAlumnos;