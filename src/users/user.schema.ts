import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema()
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: 'user', enum: ['user', 'admin'] })
  role: string;
}

const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.pre(/^find/, function (this: Query<any, any>) {
//   this.select(' -__v ');
// });

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export { UserSchema };
export type UserDocument = HydratedDocument<User>;
