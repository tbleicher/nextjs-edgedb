import { rest } from 'msw';

import Home from '../../src/pages/index';
import { Profile } from '../../src/types/user';
import { mockServer } from '../helpers/mockServer';
import { render, screen, waitFor } from '../helpers/test-utils';

describe("Home", () => {
  it("renders a login prompt when the user is not logged in", async () => {
    mockServer.use(
      rest.get("/api/profile", (req, res, ctx) => {
        return res(
          ctx.json({
            profile: null,
          })
        );
      })
    );

    render(<Home />);

    const title = await screen.findByText("Log in");

    expect(title).toBeInTheDocument();
  });

  it("renders a heading", async () => {
    render(<Home />);

    const heading = await screen.findByText("Welcome to Next.js!", {
      selector: "h1",
    });

    expect(heading).toBeInTheDocument();
  });
});
