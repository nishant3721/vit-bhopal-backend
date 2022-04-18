/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { RevenueModule } from './modules/revenue/revenue.module';

// laod env
require('dotenv').config({ path: require('find-config')('.env') });
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    RevenueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
