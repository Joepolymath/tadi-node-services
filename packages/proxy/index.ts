import { createProxyMiddleware } from 'http-proxy-middleware';
import express, { Application } from 'express';
import { Routes } from './consts';
import logger from './configs/logger.config';
import { PROXY_PORT } from '../shared/configs/env.config';

const app: Application = express();

const usersMiddleware = createProxyMiddleware({
  target: Routes.USER_SERVICE,
  changeOrigin: true,
  onProxyReq: function (ProxyReq, req, res) {
    logger.info(`Request headers: ${JSON.stringify(ProxyReq.getHeaders())}`);
  },
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Headers'] = '*';
    console.log(`Response headers: ${JSON.stringify(proxyRes.headers)}`);
  },
});

const notificationMiddleware = createProxyMiddleware({
  target: Routes.NOTIFICATION_SERVICE,
  changeOrigin: true,
  onProxyReq: function (ProxyReq, req, res) {
    logger.info(`Request headers: ${JSON.stringify(ProxyReq.getHeaders())}`);
  },
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Headers'] = '*';
    console.log(`Response headers: ${JSON.stringify(proxyRes.headers)}`);
  },
});

app.use('/api/v1/users', usersMiddleware);
app.use('/api/v1/notifications', notificationMiddleware);

app.listen(PROXY_PORT, () => {
  logger.info(`Proxy Started at :${PROXY_PORT}`);
});
