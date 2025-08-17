/*import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Calendario from "../Calendario";
import "./StyleAsist.css";
const API_URL = import.meta.env.VITE_API_URL;


const Asistencias = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [selectAlumno, setSelectAlumno] = useState("-1");
  const [fecha, setFecha] = useState("");
  const [pago, setPago] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");

  const convertirFecha = (fecha) => {
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

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
  }, [API_URL]);

  // Registrar asistencia
const handleRegistro = async () => {
  if (selectAlumno === "-1" || !fecha) {
    alert("Por favor, seleccione un alumno y una fecha válida.");
    return;
  }

  const fechaFormateada = new Date(fecha).toISOString().split("T")[0];

  try {
    const res = await fetch(`${API_URL}/registros`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        alumno_id: selectAlumno,
        fecha: fechaFormateada,
        pago: pago,
      }),
    });

    if (!res.ok) throw new Error("Error al registrar asistencia");

    setSelectAlumno("-1");
    setFecha("");
    setPago(false);
    setMensajeExito("¡Registro exitoso!");
    setTimeout(() => setMensajeExito(""), 5000);
  } catch (error) {
    alert(error.message);
  }
};

  return (
    <section className="d-flex flex-column align-items-center asistencias">
      <h1 className="text-center">Añadir Asistencia</h1>

      <Form className="formAsist">
        <Form.Group controlId="selectAlumno" className="mb-3 d-flex justify-content-center">
          <Form.Control
            as="select"
            value={selectAlumno}
            onChange={(e) => setSelectAlumno(e.target.value)}
          >
            <option value="-1">Seleccione Alumn@</option>
            {alumnos.map((alumno) => (
              <option key={alumno.id} value={alumno.id}>
                {alumno.nombre}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <div className="d-flex justify-content-center calendar-container">
          <Form.Group controlId="fecha">
            <Calendario setFecha={setFecha} fechaSeleccionada={fecha} />
          </Form.Group>
        </div>

        <div className="d-flex justify-content-start">
          <p className="mt-2 pAsist">Seleccione Pago</p>
          <Form.Group controlId="pago">
            <Form.Check
              className="mx-3 mt-2 checkBox"
              type="checkbox"
              checked={pago}
              onChange={(e) => setPago(e.target.checked)}
            />
          </Form.Group>
        </div>

        <div className="d-flex justify-content-center">
          <Button className="btnRegistro btn" onClick={handleRegistro}>
            Registrar
          </Button>
        </div>
      </Form>

      {mensajeExito && <div className="alert alert-success mt-2">{mensajeExito}</div>}
    </section>
  );
};

export default Asistencias;*/

import { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import Calendario from "../Calendario";
import "./StyleAsist.css";
const API_URL = import.meta.env.VITE_API_URL;

const Asistencias = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [selectAlumno, setSelectAlumno] = useState("-1");
  const [fecha, setFecha] = useState("");
  const [pago, setPago] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [cargando, setCargando] = useState(true); // Nuevo estado de carga

  // Cargar alumnos
  useEffect(() => {
    const cargarAlumnos = async () => {
      setCargando(true); // Inicia la carga
      try {
        const res = await fetch(`${API_URL}/alumnos`);
        if (!res.ok) throw new Error("Error al cargar alumnos");
        const data = await res.json();
        setAlumnos(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setCargando(false); // Finaliza la carga
      }
    };
    cargarAlumnos();
  }, [API_URL]);

  // Registrar asistencia
  const handleRegistro = async () => {
    if (selectAlumno === "-1" || !fecha) {
      alert("Por favor, seleccione un alumno y una fecha válida.");
      return;
    }

    const fechaFormateada = new Date(fecha).toISOString().split("T")[0];

    try {
      const res = await fetch(`${API_URL}/registros`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alumno_id: selectAlumno,
          fecha: fechaFormateada,
          pago: pago,
        }),
      });

      if (!res.ok) throw new Error("Error al registrar asistencia");

      setSelectAlumno("-1");
      setFecha("");
      setPago(false);
      setMensajeExito("¡Registro exitoso!");
      setTimeout(() => setMensajeExito(""), 5000);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="d-flex flex-column align-items-center asistencias">
      <h1 className="text-center">Añadir Asistencia</h1>

      <Form className="formAsist">
        <Form.Group controlId="selectAlumno" className="mb-3 d-flex justify-content-center">
          **{cargando ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando alumnos...</span>
              </Spinner>
            </div>
          ) : (
            <Form.Control
              as="select"
              value={selectAlumno}
              onChange={(e) => setSelectAlumno(e.target.value)}
            >
              <option value="-1">Seleccione Alumn@</option>
              {alumnos.map((alumno) => (
                <option key={alumno.id} value={alumno.id}>
                  {alumno.nombre}
                </option>
              ))}
            </Form.Control>
          )}**
        </Form.Group>

        <div className="d-flex justify-content-center calendar-container">
          <Form.Group controlId="fecha">
            <Calendario setFecha={setFecha} fechaSeleccionada={fecha} />
          </Form.Group>
        </div>

        <div className="d-flex justify-content-start">
          <p className="mt-2 pAsist">Seleccione Pago</p>
          <Form.Group controlId="pago">
            <Form.Check
              className="mx-3 mt-2 checkBox"
              type="checkbox"
              checked={pago}
              onChange={(e) => setPago(e.target.checked)}
            />
          </Form.Group>
        </div>

        <div className="d-flex justify-content-center">
          <Button className="btnRegistro btn" onClick={handleRegistro}>
            Registrar
          </Button>
        </div>
      </Form>

      {mensajeExito && <div className="alert alert-success mt-2">{mensajeExito}</div>}
    </section>
  );
};

export default Asistencias;