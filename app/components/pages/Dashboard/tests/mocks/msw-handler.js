import { rest } from 'msw';
import { setupServer } from 'msw/node';

import endpoints from '../../../../../config/endpoints';

import * as apiResponse from './apiResponse';

export const server = setupServer(
  rest.options('*', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.set('access-control-allow-origin', '*'),
      ctx.set('Access-Control-Allow-Headers', 'x-cap-org'),
      ctx.set('Access-Control-Allow-Headers', 'x-cap-remote-user'),
      ctx.set('Access-Control-Allow-Headers', 'x-cap-api-data-context-org-id'),
      ctx.set('Access-Control-Allow-Headers', 'x-cap-api-auth-org-id'),
      ctx.set('Access-Control-Allow-Headers', 'authorization'),
      ctx.set('Access-Control-Allow-Headers', 'x-cap-ct'),
      ctx.set('Access-Control-Allow-Headers', 'x-cap-vulcan-app-id'),
    ),
  ),
  rest.get(`${endpoints.vulcan_endpoint}/authenticate`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(apiResponse.authUserResponse)),
  ),
  rest.get(`${endpoints.vulcan_endpoint}/translations/:locale`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(apiResponse.i18nApiResponse)),
  ),
  rest.get(
    `${endpoints.arya_endpoint}/translations/supportedLocales`,
    (req, res, ctx) =>
      res(ctx.status(200), ctx.json(apiResponse.supportedLocalesResponse)),
  ),
);
