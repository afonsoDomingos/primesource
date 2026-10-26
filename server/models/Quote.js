import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  nome_completo: { type: String, required: true },
  empresa: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true },
  area_interesse: { type: String, required: true },
  descricao_necessidade: { type: String, required: true },
  lista_equipamentos: { type: String },
  quantidade: { type: String },
  ficheiro_anexo_nome: { type: String },
  status: {
    type: String,
    enum: ['pendente', 'em_analise', 'respondido', 'concluido'],
    default: 'pendente'
  },
  ip_origem: { type: String },
  notas_internas: { type: String },
  criado_em: { type: Date, default: Date.now }
}, { collection: 'pedidos_orcamento' });

export const Quote = mongoose.models.Quote || mongoose.model('Quote', quoteSchema);
export default Quote;
