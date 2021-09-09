import { PutViewFn } from "../types";

const putUser: PutViewFn = (instance, request, body) => {
  const { user: requestUser } = request;
  if (!requestUser) {
    return [403, "Access denied"];
  }

  const urlParts = request.path.split("/");
  const toUpdateUserID = urlParts[urlParts.length - 1];

  if (!toUpdateUserID) {
    return [400, "Bad request"];
  }

  const { username, email } = body;
  if (!username && !email) {
    return [400, "Bad request"];
  }

  try {
    instance.database.updateUserByID(toUpdateUserID, {
      username: body.username,
      email: body.email,
      enabled: body.enabled,
      totp: body.totp,
      emailVerified: body.emailVerified,
      firstName: body.firstName,
      lastName: body.lastName,
      attributes: body.attributes,
      credentials: body.credentials,
    });
  } catch (error) {
    throw error;
  }

  return [200, ""];
};

export default putUser;
