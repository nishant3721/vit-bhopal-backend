import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GenericResponse } from 'src/models/generic-response';
import { Revenue } from 'src/models/revenue';
import { RevenueService } from './revenue.service';

@Controller('revenue')
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) {}

  @Post('/addRevenue')
  addRevenue(@Body() revenueData: Revenue): Promise<Revenue> {
    return this.revenueService.addRevenue(revenueData);
  }

  @Get('/getRevenueByUserId')
  getRevenueByUserId(@Body('userId') userId: string): Promise<Revenue[]> {
    return this.revenueService.getRevenueByUserId(userId);
  }

  @Get('/deleteRevenueById')
  deleteRevenueByUserId(@Query('id') id: string): Promise<GenericResponse> {
    return this.revenueService.deleteRevenueById(id);
  }

  @Post('/updateRevenueById')
  updateRevenueByUserId(@Body() revenue: Revenue): Promise<GenericResponse> {
    return this.revenueService.updateRevenueById(revenue);
  }
}
