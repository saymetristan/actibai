const express = require('express');
const path = require('path');
const app = express();

// Sirve los archivos estáticos de la carpeta 'public'
app.use(express.static(path.join(__dirname, '../public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});