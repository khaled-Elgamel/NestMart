import { SetMetadata } from '@nestjs/common';

export const ROLE_KEYS = 'role';
export const Role = (...roles: string[]) => SetMetadata(ROLE_KEYS, roles);
