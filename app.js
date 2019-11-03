const express = require('express');
const app = express();
const cors = require('cors');
const port = 3030;
const bodyParser = require('body-parser');


const userRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const likesRouter = require('./routes/likes');


app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRouter);
app.use('/posts', postsRouter);
app.use('/likes', likesRouter);

app.listen(port, () => {
	console.log('I am the app, and i await async your command');
})
