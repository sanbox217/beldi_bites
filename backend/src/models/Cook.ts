import mongoose, { Schema, Document } from 'mongoose';
import { Cook as ICook } from '@/types';

const CookSchema = new Schema<ICook & Document>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  displayName: { type: String, required: true, trim: true },
  bio: { type: String, trim: true },
  neighborhood: { type: String, required: true },
  delivery: {
    enabled: { type: Boolean, default: true },
    pickupEnabled: { type: Boolean, default: true }
  },
  coverUrl: { type: String }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

CookSchema.index({ userId: 1 });
CookSchema.index({ neighborhood: 1 });

export const Cook = mongoose.model<ICook & Document>('Cook', CookSchema);