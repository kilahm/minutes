export interface User {
  name: string;
  email: string;
  roles: Role[];
}

export enum Role {
  RESIDENT = 'resident',
  ADMIN = 'admin',
  CHILD = 'child',
}

export function isRole(subject: any): subject is Role {
  return subject === Role.RESIDENT ||
    subject === Role.ADMIN ||
    subject === Role.CHILD;
}

export function isUser(subject: any): subject is User {
  return typeof subject === 'object' &&
    typeof subject.name === 'string' &&
    typeof subject.email === 'string' &&
    subject.roles instanceof Array &&
    subject.roles.every(isRole);
}
