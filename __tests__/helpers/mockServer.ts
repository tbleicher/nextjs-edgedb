import { setupServer } from 'msw/node';

import { handlers } from './mockRouteHandlers';

// This configures a request mocking server with the given request handlers.
export const mockServer = setupServer(...handlers);
