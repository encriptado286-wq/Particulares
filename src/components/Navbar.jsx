import './StyleComp.css';
import { useLocation } from 'react-router-dom';
import bee from '../img/bee.gif'; 

const Navbar = () => {
  const location = useLocation(); // obtener ubicación actual

  // Barra para vista Home
const isHome = location.pathname === '/';

if (isHome) {
  return (
    <div className='fondoDelDiv'>
    <div className='divFondoNav d-flex align-items-center'>
  <img src={bee} alt="Bee" className="bee-image rounded-circle" />
    <h1 className='h1Home text-center'>Sistema de Registración en Asistencias y Alumnos</h1>
  
    <nav className="navBar-home">
      <a href="/asistencia" className="nav-item btnAsist" data-tooltip="Añadir Asistencia">
        <i className="bi bi-journal-check"></i>
      </a>
  
      <a href="/addAlumno" className="nav-item btnAlumn" data-tooltip="Agregar Alumno">
        <i className="bi bi-person-fill-add"></i>
      </a>
  
      <a href="/registros" className="nav-item btnRegs" data-tooltip="Ver Registros">
        <i className="bi bi-bookmark-check-fill"></i>
      </a>
    </nav>
  </div>
  </div>
  );
}

  // Barra de navegación normal para otras vistas
  // Definir la clase("color") para la barra de navegación según la ruta
  let navbarClass = 'custom-navbar'; // Clase por defecto
  
  // Cambiar el color de fondo dependiendo de la ruta actual
  if (location.pathname === '/') {
    navbarClass = 'custom-navbar default-bg'; //Fondo blanco en la página de inicio
  } else if (location.pathname === '/asistencia') {
    navbarClass = 'custom-navbar purple-bg'; //Fondo purpura en la página de asistencia
  } else if (location.pathname === '/addAlumno') {
    navbarClass = 'custom-navbar amarelo-bg'; //Fondo amarillo normal en la página de configuración
  } 
  return (
    <nav className={`navbar navbar-dark navbar-expand fixed-bottom justify-content-around ${navbarClass}`}>
      <a href="/" className="nav-link text-light text-center">
        <i className="bi bi-house-door"></i>
        <div>Inicio</div>
      </a>
      <a href="/asistencia" className="nav-link text-light text-center">
        <i className="bi bi-journal-check"></i>
        <div>+ Asistencias</div>
      </a>
      <a href="/addAlumno" className="nav-link text-light text-center">
        <i className="bi bi-person-fill-add"></i>
        <div>+ Alumno</div>
      </a>
      <a href="/registros" className="nav-link text-light text-center">
        <i className="bi bi-bookmark-check-fill"></i>
        <div>Registros</div>
      </a>
    </nav>
  );
};

export default Navbar;