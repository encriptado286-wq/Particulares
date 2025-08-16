
import './StyleComp.css';
import { useLocation, Link } from 'react-router-dom';
import bee from '../img/bee.gif'; 

const Navbar = () => {
  const location = useLocation(); // obtener la ruta actual

  // Barra especial para la página Home
  const isHome = location.pathname === '/';
  if (isHome) {
    return (
      <div className='fondoDelDiv'>
        <div className='divFondoNav d-flex align-items-center'>
          <img src={bee} alt="Bee" className="bee-image rounded-circle" />
          <h1 className='h1Home text-center'>
            Sistema de Registración en Asistencias y Alumnos
          </h1>

          <nav className="navBar-home">
            <Link to="/asistencias" className="nav-item btnAsist" data-tooltip="Añadir Asistencia">
              <i className="bi bi-journal-check"></i>
            </Link>

            <Link to="/addAlumnos" className="nav-item btnAlumn" data-tooltip="Agregar Alumno">
              <i className="bi bi-person-fill-add"></i>
            </Link>

            <Link to="/registros" className="nav-item btnRegs" data-tooltip="Ver Registros">
              <i className="bi bi-bookmark-check-fill"></i>
            </Link>
          </nav>
        </div>
      </div>
    );
  }

  // Barra de navegación normal para otras vistas
  let navbarClass = 'custom-navbar'; // clase por defecto

  if (location.pathname === '/asistencias') {
    navbarClass = 'custom-navbar purple-bg';
  } else if (location.pathname === '/addAlumnos') {
    navbarClass = 'custom-navbar amarelo-bg';
  } else if (location.pathname === '/registros') {
    navbarClass = 'custom-navbar blue-bg'; // puedes definir el color que quieras
  }

  return (
    <nav className={`navbar navbar-dark navbar-expand fixed-bottom justify-content-around ${navbarClass}`}>
      <Link to="/" className="nav-link text-light text-center">
        <i className="bi bi-house-door"></i>
        <div>Inicio</div>
      </Link>

      <Link to="/asistencias" className="nav-link text-light text-center">
        <i className="bi bi-journal-check"></i>
        <div>+ Asistencias</div>
      </Link>

      <Link to="/addAlumnos" className="nav-link text-light text-center">
        <i className="bi bi-person-fill-add"></i>
        <div>+ Alumno</div>
      </Link>

      <Link to="/registros" className="nav-link text-light text-center">
        <i className="bi bi-bookmark-check-fill"></i>
        <div>Registros</div>
      </Link>
    </nav>
  );
};

export default Navbar;