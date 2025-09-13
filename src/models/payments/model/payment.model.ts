import mongoose, { Model } from "mongoose";
import IPaymentDocument from "../interfaces/IPayment";
import PaymentSchema from "../schema/payment.schema";

export const PaymentModel: Model<IPaymentDocument> = mongoose.model<IPaymentDocument>('Payments', PaymentSchema);