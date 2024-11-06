const express = require("express");
const morgan = require("morgan");
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'site'));

app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
})