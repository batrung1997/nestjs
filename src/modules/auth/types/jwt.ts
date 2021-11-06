import { ROLES } from 'src/modules/users/types/user';

export interface AccessTokenJwtData {
  uid: string;
  // refresh token id
  tokenId: string;
  username?: string;
  phone?: string;
  role?: ROLES;
}
