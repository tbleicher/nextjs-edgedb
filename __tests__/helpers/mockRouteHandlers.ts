// src/mocks/handlers.js
import { rest } from 'msw';

import { Profile } from '../../src/types/user';

const PROFILE: Omit<Profile, "userName"> = {
  imageUrl: "",
  firstName: "Ada",
  lastName: "Admin",
  userId: "user-id-ada",
};

export const handlers = [
  rest.get("/api/profile", (req, res, ctx) => {
    return res(
      ctx.json({
        profile: PROFILE,
      })
    );
  }),
];
