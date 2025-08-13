import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, remove, push, update } from "firebase/database"; // Eliminé `push` porque no lo usamos directamente aquí

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCu2ZY0wLyMGmkzPTxlA-U8DgXw67OiRMI",
  authDomain: "databasealumnos-cefe9.firebaseapp.com",
  databaseURL: "https://databasealumnos-cefe9-default-rtdb.firebaseio.com",
  projectId: "databasealumnos-cefe9",
  storageBucket: "databasealumnos-cefe9.firebasestorage.app",
  messagingSenderId: "261737605709",
  appId: "1:261737605709:web:f01008482de91339a24a04",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Clase Alumno
class Alumno {
  constructor(id, nombre, grado, telefono) {
    this.id = id;
    this.nombre = nombre;
    this.grado = grado;
    this.telefono = telefono;
  }

  // Crear un alumno desde datos de Firebase
  static fromFirebase(id, data) {
    return new Alumno(id, data.nombre, data.grado, data.telefono);
  }

  // Guardar el alumno en Firebase
  async saveToFirebase() {
    const alumnosRef = ref(database, 'alumnos'); // Referencia a la colección de alumnos
    const nuevoAlumnoRef = push(alumnosRef); // Genera una clave única
    await set(nuevoAlumnoRef, {
      nombre: this.nombre,
      grado: this.grado,
      telefono: this.telefono,
    });
    console.log("Alumno guardado: ", nuevoAlumnoRef.key); // Muestra la clave única generada
  }

  // Eliminar un alumno en Firebase
  static async deleteFromFirebase(id) {
    const alumnoRef = ref(database, `alumnos/${id}`);
    await remove(alumnoRef);
    console.log("Alumno eliminado:", id);
  }

  // Obtener todos los alumnos como instancias de la clase
  static async getAll() {
    const dbRef = ref(database, "alumnos");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map((id) => Alumno.fromFirebase(id, data[id]));
    }
    return [];
  }
}

class Registro {
  constructor(id, alumnoId, fecha, pago ) {
    this.id = id;
    this.alumnoId = alumnoId;  
    this.fecha = fecha;    
    this.pago = pago;    
  }

  // Crear un registro desde los datos de Firebase
  static fromFirebase(id, data) {
    return new Registro(
      id, 
      data.alumnoId,
      data.fecha,
      data.pago
    );
  }

  // Guardar el registro en Firebase
  async saveToFirebase() {
    const registrosRef = ref(database, 'registros'); // Referencia a la colección de registros
    const nuevoRegistroRef = push(registrosRef); // Genera una clave única automáticamente
    await set(nuevoRegistroRef, {
      alumnoId: this.alumnoId,
      fecha: this.fecha,
      pago: this.pago,
    });
    console.log("Registro guardado con ID: ", nuevoRegistroRef.key); // Muestra la clave única generada
  }

// Método para actualizar el estado de pago en Firebase
static async updatePago(registroId, nuevoPago) {
  const registroRef = ref(database, `registros/${registroId}`); // Referencia al registro específico
  await update(registroRef, {
    pago: nuevoPago,
  });
  console.log(`Estado de pago del registro con ID ${registroId} actualizado a: ${nuevoPago}`);
}

  
  // Eliminar un registro en Firebase
  static async deleteFromFirebase(id) {
    const registroRef = ref(database, `registros/${id}`);
    await remove(registroRef);
    console.log("Registro eliminado:", id);
  }

  // Obtener todos los registros como instancias de la clase
  static async getAll() {
    const dbRef = ref(database, "registros");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map((id) => Registro.fromFirebase(id, data[id]));
    }
    return [];
  }

// Obtener registros por alumnoId (ahora usamos el alumnoId para la búsqueda)
static async getByAlumnoId(alumnoId) {
  const dbRef = ref(database, "registros");
  const snapshot = await get(dbRef);
  if (snapshot.exists()) {
    const data = snapshot.val();
    const registros = Object.keys(data)
      .map((id) => Registro.fromFirebase(id, data[id]))
      .filter((registro) => registro.alumnoId === alumnoId);  // Filtrar por alumnoId
    return registros;
  }
  console.log("No se encontraron registros");
  return [];
}


  }

// Exportar las clases para usarlas en otros archivos
export { Alumno, Registro };