import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from "react-bootstrap/Accordion";
import "./StyleRegistro.css";
const API_URL = import.meta.env.VITE_API_URL;

const ViewRegistros = () => {
  const [alumnos, setAlumnos] = useState([]);

  const cambiarEstadoPago = async (alumnoId, registroId, pagoActual) => {
    const nuevoPago = pagoActual === true ? false : true;

    setAlumnos(prevAlumnos =>
      prevAlumnos.map(alumno => {
        if (alumno.id === alumnoId) {
          const nuevosRegistros = alumno.registros.map(registro => {
            if (registro.id === registroId) {
              return { ...registro, pago: nuevoPago };
            }
            return registro;
          });
          return { ...alumno, registros: nuevosRegistros };
        }
        return alumno;
      })
    );

    try {
      await fetch(`${API_URL}/registros/${registroId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alumnoId,
          fecha: new Date().toISOString().split("T")[0], // o mantener la original si querés
          pago: nuevoPago
        })
      });
    } catch (error) {
      console.error("Error al actualizar pago:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [alumnosRes, registrosRes] = await Promise.all([
          fetch(`${API_URL}/alumnos`),
          fetch(`${API_URL}/registros`)
        ]);

        const alumnosData = await alumnosRes.json();
        const registrosData = await registrosRes.json();

        const alumnosConRegistros = alumnosData.map(alumno => {
          const registrosDelAlumno = registrosData.filter(
            registro => registro.alumnoid === alumno.id
          );
          return { ...alumno, registros: registrosDelAlumno };
        });

        setAlumnos(alumnosConRegistros);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="viewRegistros">
      <h1 className="text-center">Listado de Registros</h1>

      <Accordion>
        {alumnos.map(alumno => (
          <Accordion.Item eventKey={alumno.id.toString()} key={alumno.id}>
            <Accordion.Header>
              <h2>{alumno.nombre}</h2>
            </Accordion.Header>
            <Accordion.Body>
              <h5>Datos Alumno:</h5>
              <div className="d-flex justify-content-start">
                <p className="mx-5">
                  <strong>Grado:</strong> {alumno.grado}
                </p>
                <p>
                  <strong>Teléfono:</strong> {alumno.telefono}
                </p>
              </div>
              <hr />

              <h5>Registros:</h5>
              {alumno.registros && alumno.registros.length > 0 ? (
                <ul>
                  {alumno.registros
                    .slice()
                    .sort((a, b) => {
                      const fechaA = new Date(a.fecha);
                      const fechaB = new Date(b.fecha);
                      if (isNaN(fechaA.getTime()) || isNaN(fechaB.getTime())) {
                        console.error("Fecha no válida", a.fecha, b.fecha);
                        return 0;
                      }
                      return fechaB - fechaA;
                    })
                    .map(registro => (
                      <li key={registro.id}>
                        <div className="d-block">
                          <p>{registro.fecha.split('T')[0]}</p>
                          <p
                            className={
                              registro.pago === true ? "pago-true" : "pago-false"
                            }
                          >
                            {registro.pago === true ? "Pago" : "No Pago"}
                          </p>
                        </div>

                        <strong>Confirmar Pago</strong>
                        <div className="form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={registro.pago === true}
                            onChange={() =>
                              cambiarEstadoPago(alumno.id, registro.id, registro.pago)
                            }
                          />
                        </div>
                        <hr />
                      </li>
                    ))}
                </ul>
              ) : (
                <p>No hay registros disponibles.</p>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </section>
  );
};

export default ViewRegistros;