import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RevenueController } from './revenue.controller';
import { RevenueService } from './revenue.service';
import { RevenueSchema } from './schemas/revenue.schma';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'revenues', schema: RevenueSchema }]),
  ],
  controllers: [RevenueController],
  providers: [RevenueService],
})
export class RevenueModule {}
