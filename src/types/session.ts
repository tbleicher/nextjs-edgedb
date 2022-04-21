export type SessionUser = {
  id: string;
  username: string;
};

// update session type with SessionUser object
declare module "iron-session" {
  interface IronSessionData {
    user?: SessionUser;
  }
}
