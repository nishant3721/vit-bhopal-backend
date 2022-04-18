// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoose = require('mongoose');

export const RevenueSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId },
    nicheName: { type: String },
    date: { type: String },
    amount: { type: Number },
  },
  { timestamps: true },
);
