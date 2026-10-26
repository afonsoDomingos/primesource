import mongoose from 'mongoose';

const pillarSchema = new mongoose.Schema({
  numero: { type: String, required: true },
  pilar: { type: String, required: true },
  beneficio: { type: String, required: true },
  oferta: { type: String, required: true },
  ordem: { type: Number, default: 0 }
}, { collection: 'pillars' });

export const Pillar = mongoose.models.Pillar || mongoose.model('Pillar', pillarSchema);
export default Pillar;
