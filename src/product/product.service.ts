import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    return products;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Not product found ${id}`);
    }
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = await this.productModel.create(createProductDto);
    return newProduct;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException(`Not product found ${id}`);
    }
    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!deletedProduct) {
      throw new NotFoundException(`Not product found ${id}`);
    }
  }
}
