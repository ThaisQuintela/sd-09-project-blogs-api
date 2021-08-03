const express = require('express');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middleware/error');
const User = require('./controllers/User');
const Login = require('./controllers/Login');
const validateJWT = require('./auth/validateJWT');

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.use(express.json());

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/User', User.registerUser);

app.post('/login', Login.userLogin);

app.get('/user', validateJWT, User.getAllUsers);

app.get('/user/:id', validateJWT, User.getUserById);

app.use(errorMiddleware);
