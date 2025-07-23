import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Product {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
export type ProductDocument = HydratedDocument<Product>;
