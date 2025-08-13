  import { useState } from 'react';
  import Calendar from 'react-calendar';
  import 'react-calendar/dist/Calendar.css'; // Importa los estilos 

  const Calendario = ({ setFecha }) => {
    const [date, setDate] = useState(new Date()); // Estado para manejar la fecha seleccionada

    const handleDateChange = (newDate) => {
      setDate(newDate); // Actualiza el estado de la fecha interna
      setFecha(newDate); // Pasa la fecha seleccionada al componente principal (Registro)
    };


    return (
      <div className="calendar-container" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Calendar
          onChange={handleDateChange} // Llama a handleDateChange cuando el usuario selecciona una fecha
          value={date} // Usamos el estado 'date' como valor inicial 
        />
      </div>
    );
  };

  export default Calendario;