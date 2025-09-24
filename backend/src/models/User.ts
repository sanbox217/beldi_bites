import mongoose, { Schema, Document } from 'mongoose';
import { User as IUser, Address } from '@/types';

const AddressSchema = new Schema<Address>({
  id: { type: String, required: true },
  label: { type: String, required: true },
  street: { type: String, required: true },
  neighborhood: { type: String, required: true },
  notes: { type: String }
}, { _id: false });

const UserSchema = new Schema<IUser & Document>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['cook', 'customer'], required: true },
  avatarUrl: { type: String },
  language: { type: String, enum: ['ar', 'fr'], default: 'ar' },
  addresses: [AddressSchema]
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc: any, ret: any) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
});

UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

export const User = mongoose.model<IUser & Document>('User', UserSchema);