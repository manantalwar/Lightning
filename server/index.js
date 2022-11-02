import express from 'express';
import logger from 'morgan';
import axios from 'axios';

// needed?????????//

const port = 4000;
const app = express();
app.use(logger('dev'));
app.use(express.json());

/*
  template for an endpoint

  app.get('/name', async(req, res) => {
    try {
      const object1 = req.body;
      res.status(200).send(object1);
    } catch (err) {
      res.status(500).send(err);
    }
  });
*/

app.get('/test', async(req, res) => {
  try {
    const object1 = req.body;
    res.status(200).send("success");
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});