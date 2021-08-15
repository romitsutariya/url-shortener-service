const express = require("express")
const app = express()
  
require("dotenv").config();
app.use(express.json({ limit: "50mb", extended: false}));

// Database config
const connection = require('./config/db')
connection.once('open', () => console.log('DB Connected'))
connection.on('error', () => console.log('Error'))

 //parse incoming request body in JSON format.
app.use('/', require('./routes/redirect'))
app.use('/api/url', require('./routes/url'))

//Listen for incoming requests
const PORT = process.env.PORT || 6000
app.listen(PORT, console.log(`server started, listening PORT ${PORT}`))