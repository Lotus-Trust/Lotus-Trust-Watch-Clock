import { useEffect, useState } from 'react';
import './app.css';

interface Fondo {
  nombre: string;
  gestor: string;
  retorno: string;
  perdidaMax: string;
  fechaDesde: string;
  fechaHasta: string;
  estadoSubscripcion: string;
  fechaSubscripcionDesde: string;
  fechaSubscripcionHasta: string;
  fundId: string;
  descripcionPeriodo: string;
}

const fondoVacio: Fondo = {
  nombre: '',
  gestor: '',
  retorno: '',
  perdidaMax: '',
  fechaDesde: '',
  fechaHasta: '',
  estadoSubscripcion: '',
  fechaSubscripcionDesde: '',
  fechaSubscripcionHasta: '',
  fundId: '',
  descripcionPeriodo: '',
};

export default function App() {
  const [fondos, setFondos] = useState<Fondo[]>(Array(12).fill({ ...fondoVacio }));
  const [indice, setIndice] = useState(0);
  const [modoEditor, setModoEditor] = useState<'react' | 'angular'>('react');

  // Cargar fondos desde backend
  useEffect(() => {
    fetch('http://localhost:3000/fondos')
      .then((res) => {
        if (!res.ok) throw new Error('Error en la respuesta del servidor');
        return res.json();
      })
      .then((data) => {
        setFondos(data);
        emitirFondoCambiado(data[0]);
        actualizarNumerosDOM(data[0]);
      })
      .catch((error) => console.error('Error al cargar fondos desde backend:', error));
  }, []);

  function emitirFondoCambiado(fondo: Fondo) {
    const event = new CustomEvent('fondoCambiado', { detail: fondo });
    window.dispatchEvent(event);
  }

  function actualizarNumerosDOM(fondo: Fondo) {
    const retornoElem = document.getElementById('retorno');
    const perdidaElem = document.getElementById('perdida-max');
    if (retornoElem) retornoElem.innerText = fondo.retorno ? fondo.retorno + '%' : '';
    if (perdidaElem) perdidaElem.innerText = fondo.perdidaMax ? fondo.perdidaMax + '%' : '';
  }

  useEffect(() => {
    if (fondos[indice]) {
      emitirFondoCambiado(fondos[indice]);
      actualizarNumerosDOM(fondos[indice]);
    }
  }, [indice, fondos]);

  const manejarCambio = (campo: keyof Fondo, valor: string) => {
    const nuevos = [...fondos];
    nuevos[indice] = { ...nuevos[indice], [campo]: valor };
    setFondos(nuevos);
    emitirFondoCambiado(nuevos[indice]);
    actualizarNumerosDOM(nuevos[indice]);
  };

  const guardarFondoActual = () => {
    const fondo = fondos[indice];

    fetch(`http://localhost:3000/fondos/${indice}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fondo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'OK') {
          alert(`Fondo ${indice + 1} actualizado correctamente`);
        } else {
          alert('Error al actualizar fondo');
        }
      })
      .catch(() => alert('Error al conectar con backend'));
  };

  const descargarJson = () => {
    const contenido = JSON.stringify(fondos, null, 2);
    const blob = new Blob([contenido], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = 'fondos.json';
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);
  };

  const fondoActual = fondos[indice] || fondoVacio;

  // Campos que deben ser input date
  const camposFecha = new Set([
    'fechaDesde',
    'fechaHasta',
    'fechaSubscripcionDesde',
    'fechaSubscripcionHasta',
  ]);

  return (
    <div className="editor-container">
      <div className="toggle-group" style={{ marginTop: 0, marginBottom: 20 }}>
        <input
          type="radio"
          id="react"
          name="modo"
          checked={modoEditor === 'react'}
          onChange={() => setModoEditor('react')}
        />
        <label htmlFor="react">React</label>

        <input
          type="radio"
          id="angular"
          name="modo"
          checked={modoEditor === 'angular'}
          onChange={() => setModoEditor('angular')}
          style={{ marginLeft: 12 }}
        />
        <label htmlFor="angular">Angular</label>
      </div>

      {modoEditor === 'react' ? (
        <>
          <h1 className="editor-title">Editor de Fondo {indice + 1}</h1>

          <div className="nav-buttons">
            <button onClick={() => setIndice((i) => (i > 0 ? i - 1 : fondos.length - 1))}>
              Anterior
            </button>
            <button
              onClick={() => setIndice((i) => (i < fondos.length - 1 ? i + 1 : 0))}
              className="btn-next"
            >
              Siguiente
            </button>
          </div>

          <form className="form-editor" onSubmit={(e) => e.preventDefault()}>
            {Object.entries(fondoVacio).map(([campo]) => (
              <div className="form-group" key={campo}>
                <label>{campo}:</label>
                <input
                  type={camposFecha.has(campo) ? 'date' : 'text'}
                  value={(fondoActual as any)[campo] || ''}
                  onChange={(e) => manejarCambio(campo as keyof Fondo, e.target.value)}
                />
              </div>
            ))}

            <button type="button" className="btn-update" onClick={guardarFondoActual}>
              Guardar fondo {indice + 1}
            </button>

            <button
              type="button"
              className="btn-download"
              onClick={descargarJson}
              style={{ marginLeft: '10px' }}
            >
              Descargar JSON
            </button>
          </form>
        </>
      ) : (
        <iframe
          src="http://localhost:4200"
          title="Editor Angular"
          style={{
            width: '100%',
            height: '80vh',
            border: '1px solid #ccc',
            borderRadius: 8,
          }}
        />
      )}
    </div>
  );
}














