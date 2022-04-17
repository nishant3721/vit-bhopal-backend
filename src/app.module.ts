/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { RevenueController } from './modules/revenue/revenue.controller';
import { RevenueService } from './modules/revenue/revenue.service';
import { RevenueModule } from './modules/revenue/revenue.module';

// laod env
require('dotenv').config({ path: require('find-config')('.env') });
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    RevenueModule,
  ],
  controllers: [RevenueController],
  providers: [RevenueService],
})
export class AppModule {}
