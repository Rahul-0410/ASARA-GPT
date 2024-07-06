const express = require('express');
const connectDB = require('./mongodb');
connectDB();
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use('/', routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
