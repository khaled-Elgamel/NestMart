// import { BadRequestException, PipeTransform } from '@nestjs/common';
// import { isMongoId } from 'class-validator';

// export class ParseMongoIdPipe implements PipeTransform<string, string> {
//   transform(value: string) {
//     if (!isMongoId(value)) {
//       throw new BadRequestException(`${value} is not a valid MongoId`);
//     }
//     return value;

//     // const isValidMongId = /^[0-9a-fA-F]{24}$/.test(value);
//     // if (!isValidMongId) {
//     //   throw new BadRequestException(`${value} is not a valid MongoId`);
//     // }
//     // return value;
//   }
// }
