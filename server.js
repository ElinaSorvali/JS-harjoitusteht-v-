const path = require('path'); 
const express = require('express');
const fs = require('fs').promises;
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

const publicPath = path.join(__dirname, './public');


app.get('/api/getpin', async (req, res) => {
  try {
    const savedPin = await fs.readFile('./pin.txt', 'utf-8');
    res.send(savedPin);
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Express-palvelin lähettää staattiset tiedostot public-kansiosta
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

io.on('connection', (socket) => {
  // Kun palvelin vastaanottaa viestin, se emitoi sen kaikille clienteille välittömästi
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
