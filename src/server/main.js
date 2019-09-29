import express from 'express';
import middleware from './middleware';
import path from 'path';

const app = express();

app.use('/dist', express.static(path.join(__dirname, '..', 'client')));

app.get('/*', middleware);

const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});