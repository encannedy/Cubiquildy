const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

// express middleware
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));

// The below points our server to a series of "route" files.
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function() {
console.log('App listening on PORT:'  + PORT);
});

