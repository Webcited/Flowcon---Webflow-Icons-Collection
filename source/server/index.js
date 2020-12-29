const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const process = require('process');

const app = express();

const APIKEY = process.env.ICONFINDERAPIKEY;

const api = axios.create({
  baseURL: 'https://api.iconfinder.com/v4/',
  headers: {
    Authorization: `Bearer ${APIKEY}`,
  },
});

async function getIcon(iconId) {
  try {
    const ret = await api.get(`icons/${iconId}`);
    return ret;
  } catch (e) {
    console.log({
      status: e.response.status,
      statusText: e.response.statusText,
      message: e.response.data.message,
    });
    return e;
  }
}

async function search(q, count = 15) {
  try {
    const ret = await api.get('icons/search', {
      params: {q, premium: false, vector: true, count},
    });
    return ret;
  } catch (e) {
    console.log({
      status: e.response.status,
      statusText: e.response.statusText,
      message: e.response.data.message,
    });
    return e;
  }
}

async function getDownloadLink(iconobj) {
  try {
    const {formats} = iconobj.vector_sizes[0];
    const downloadLink = formats.find((f) => f.format === 'svg').download_url;
    const icon = await axios.get(downloadLink, {
      headers: {Authorization: `Bearer ${APIKEY}`},
    });
    return icon.data;
  } catch (e) {
    console.log({
      status: e.response.status,
      statusText: e.response.statusText,
      message: e.response.data.message,
    });
    return e;
  }
}

app.use(morgan('combined'));

app.get('/icon/:iconId', async (req, res) => {
  const {iconId} = req.params;
  const ret = await getIcon(iconId);
  if (ret && ret.status === 200) {
    const icon = await getDownloadLink(ret.data);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(icon);
  } else res.status(500).send();
});

app.get('/search', async (req, res) => {
  const {q, count} = req.query;
  const ret = await search(q);
  if (ret && ret.status === 200) res.send(ret.data);
  else res.status(500).send();
});

app.listen(process.env.PORT || 4000);
