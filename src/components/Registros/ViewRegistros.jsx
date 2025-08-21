
import { useEffect, useState } from "react";
import { Spinner, Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StyleRegistro.css";

const API_URL = import.meta.env.VITE_API_URL;

const ViewRegistros = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cambiarEstadoPago = async (alumno_id, registroId, pagoActual) => {
    const nuevoPago = !pagoActual;

    setAlumnos(prevAlumnos =>
      prevAlumnos.map(alumno => {
        if (alumno.id === alumno_id) {
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

    // Actualizar en el backend
    try {
      await fetch(`${API_URL}/registros/${registroId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alumno_id,
          fecha: new Date().toISOString().split("T")[0],
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
            registro => registro.alumno_id === alumno.id
          );
          return { ...alumno, registros: registrosDelAlumno };
        });

        setAlumnos(alumnosConRegistros);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="viewRegistros">
      <h1 className="text-center">Listado de Registros</h1>
      {cargando  ? (
        <div className="d-flex justify-content-center align-items-center">
          <h3 style={{ color: "white" }} className="me-3">Cargando Registros</h3>
          <Spinner animation="border" role="status" variant="primary">
            <p className="text-center">⏱</p>
          </Spinner>
        </div>
      ) : alumnos.length === 0 ? (
      <h3 className="text-center" style={{ color: "white" }}>
        No hay registros para mostrar
      </h3>
      ) : (
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
                      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                      .map(registro => (
                        <li key={registro.id}>
                          <div className="d-block">
                            <p>{registro.fecha.split("T")[0]}</p>
                            <p className={registro.pago ? "pago-true" : "pago-false"}>
                              {registro.pago ? "Pago" : "No Pago"}
                            </p>
                          </div>

                          {!registro.pago && (
                            <>
                              <strong>Confirmar Pago</strong>
                              <div className="form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={registro.pago}
                                  onChange={() =>
                                    cambiarEstadoPago(alumno.id, registro.id, registro.pago)
                                  }
                                />
                              </div>
                            </>
                          )}
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
      )}
    </section>
  );
};

export default ViewRegistros; 