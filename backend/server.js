const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const rutaFondos = path.join(__dirname, 'fondos.json');

app.get('/', (req, res) => {
  res.send('Servidor backend funcionando 👍');
});

// Ruta GET para obtener todos los fondos
app.get('/fondos', (req, res) => {
  fs.readFile(rutaFondos, 'utf8', (err, data) => {
    if (err) {
      console.error('Error leyendo fondos.json:', err);
      return res.status(500).send({ error: 'Error leyendo fondos.json' });
    }
    try {
      const fondos = JSON.parse(data);
      res.json(fondos);
    } catch (parseErr) {
      console.error('Error parseando fondos.json:', parseErr);
      res.status(500).send({ error: 'Error parseando fondos.json' });
    }
  });
});

// Ruta POST para reemplazar todos los fondos
app.post('/fondos', (req, res) => {
  const nuevosFondos = req.body;

  fs.writeFile(rutaFondos, JSON.stringify(nuevosFondos, null, 2), (err) => {
    if (err) {
      console.error('Error guardando fondos.json:', err);
      return res.status(500).send({ error: 'Error guardando fondos.json' });
    }
    res.send({ status: 'OK', message: 'Fondos actualizados correctamente' });
  });
});

// Nueva ruta PUT para actualizar solo un fondo específico (por índice)
app.put('/fondos/:id', (req, res) => {
  const fondoId = parseInt(req.params.id, 10);
  const nuevoFondo = req.body;

  fs.readFile(rutaFondos, 'utf8', (err, data) => {
    if (err) {
      console.error('Error leyendo fondos.json:', err);
      return res.status(500).send({ error: 'Error leyendo fondos.json' });
    }

    try {
      const fondos = JSON.parse(data);
      if (fondoId < 0 || fondoId >= fondos.length) {
        return res.status(400).send({ error: 'ID de fondo inválido' });
      }

      fondos[fondoId] = nuevoFondo;

      fs.writeFile(rutaFondos, JSON.stringify(fondos, null, 2), (writeErr) => {
        if (writeErr) {
          console.error('Error escribiendo fondos.json:', writeErr);
          return res.status(500).send({ error: 'Error escribiendo fondos.json' });
        }

        res.send({ status: 'OK', message: `Fondo ${fondoId} actualizado correctamente` });
      });
    } catch (parseErr) {
      console.error('Error parseando fondos.json:', parseErr);
      res.status(500).send({ error: 'Error parseando fondos.json' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});



