import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Items } from '../items';
import { Item } from '../item';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from 'src/permissions/permissions.decorator';
import { PermissionsGuard } from 'src/permissions/permissions.guard';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get()
  @Permissions('read:items')
  async findAll(): Promise<Items> {
    console.log('reading items...');
    return this.itemsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get(':id')
  @Permissions('read:items')
  async find(@Param('id') id: number): Promise<Item> {
    return this.itemsService.find(id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Post()
  @Permissions('create:items')
  create(@Body('item') item: Item) {
    this.itemsService.create(item);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Put()
  @Permissions('update:items')
  update(@Body('item') item: Item) {
    this.itemsService.update(item);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Delete(':id')
  @Permissions('delete:items')
  delete(@Param('id') id: number) {
    this.itemsService.delete(id);
  }
}
