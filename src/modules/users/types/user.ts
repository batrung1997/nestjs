import { registerEnumType } from '@nestjs/graphql';

export enum ROLES {
  'SUPER_ADMIN' = 'SUPER_ADMIN',
  'ADMIN' = 'ADMIN',
  'CTV' = 'CTV',
}

registerEnumType(ROLES, {
  name: 'ROLES',
});
