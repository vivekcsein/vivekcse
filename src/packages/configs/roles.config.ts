export const UserRoles = {
  USER: "USER",
  ADMIN: "ADMIN",
  MODERATOR: "MODERATOR",
} as const;

export const UserRolesValues = Object.values(UserRoles);

export type UserRole = keyof typeof UserRoles;
