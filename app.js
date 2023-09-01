const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const app = express();

const adminRoutes = require('./routes/admin');
var cors = require('cors');


app.use(cors())
app.use(bodyParser.json({ extended: false }));


app.use('/shop', adminRoutes);


sequelize.sync().then((response) => {
    app.listen(3000);
}).catch(err => console.log(err))

