import mongoose from 'mongoose';

const sectorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  equipamentos: [{ type: String }],
  imagem: { type: String },
  ordem: { type: Number, default: 0 }
}, { collection: 'sectors' });

export const Sector = mongoose.models.Sector || mongoose.model('Sector', sectorSchema);
export default Sector;
