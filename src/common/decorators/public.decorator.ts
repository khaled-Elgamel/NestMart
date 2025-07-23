import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'IS_Public';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
