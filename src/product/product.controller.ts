import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Role } from 'src/common/decorators/role.decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Role('admin')
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Public()
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id', ParseMongoIdPipe) id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Role('admin')
  @Patch(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Role('admin')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseMongoIdPipe) id: string): Promise<void> {
    return this.productService.delete(id);
  }
}
