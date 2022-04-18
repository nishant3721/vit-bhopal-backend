import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericResponse } from 'src/models/generic-response';
import { Revenue } from 'src/models/revenue';

@Injectable()
export class RevenueService {
  constructor(
    @InjectModel('revenues') private readonly revenueModel: Model<Revenue>,
  ) {}

  addRevenue(revenueData: Revenue): Promise<Revenue> {
    const revenueInfo = new this.revenueModel(revenueData);
    return revenueInfo.save();
  }

  getRevenueByUserId(userId: string): Promise<Revenue[]> {
    const query = { user_id: userId };
    return this.revenueModel.find(query).exec();
  }

  deleteRevenueById(id: string): Promise<GenericResponse> {
    const query = { _id: id };
    return this.revenueModel
      .deleteOne(query)
      .exec()
      .then(() => new GenericResponse({ message: 'Deleted successfully.' }));
  }

  updateRevenueById(revenue: Revenue): Promise<GenericResponse> {
    const query = { _id: revenue._id };
    return this.revenueModel
      .updateOne(query)
      .exec()
      .then(() => new GenericResponse({ message: 'Updated successfully.' }));
  }
}
