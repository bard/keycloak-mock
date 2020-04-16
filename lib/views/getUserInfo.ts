import { ViewFn } from "../types";
import { MockInstance } from "../instance";

const getUserInfo: ViewFn = (instance, request) => {
  const { user } = request;
  if (!user) {
    return [403, "Access denied"];
  }

  const { profile } = user;

  return [
    200,
    {
      sub: profile.id,
      email_verified: profile.emailVerified,
      gender: (profile.attributes.gender || [])[0] || null,
      name: `${profile.firstName} ${profile.lastName}`,
      preferred_username: profile.username,
      given_name: profile.firstName,
      family_name: profile.lastName,
      email: profile.email,
    },
  ];
};

export default getUserInfo;
