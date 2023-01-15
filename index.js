const express = require("express")
const app = express()
const path = require('path');
  
require("dotenv").config();
app.use(express.json({ limit: "50mb", extended: false}));

// Database config
const connection = require('./config/db')
connection.once('open', () => console.log('DB Connected'))
connection.on('error', () => console.log('Error'))

 //parse incoming request body in JSON format.
app.use('/s', require('./routes/redirect'))
app.use('/api/url', require('./routes/url'))

//serve static page
app.get('/', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '/index.html'));
    }
    catch (err) {
        console.error(err)
        res.status(500).json('Server Error | Checl log for more details')
    }
})

//Listen for incoming requests
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server started, listening PORT ${PORT}`))