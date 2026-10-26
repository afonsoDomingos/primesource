import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import Company from './models/Company.js';
import Service from './models/Service.js';
import Pillar from './models/Pillar.js';
import Sector from './models/Sector.js';
import Quote from './models/Quote.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serverless-ready MongoDB connection middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('[MongoDB] Middleware de ligação falhou:', error.message);
    res.status(500).json({ error: 'Erro ao ligar à base de dados MongoDB Atlas.' });
  }
});

/* ==========================================================================
   API ROUTES
   ========================================================================== */

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'PrimeSource Procurement API',
    database: 'MongoDB primesourcedb'
  });
});

// 1. Obter Dados Institucionais da Empresa
app.get('/api/company', async (req, res) => {
  try {
    const company = await Company.findOne();
    if (!company) {
      return res.status(404).json({ error: 'Dados da empresa não encontrados.' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar dados institucionais.', details: error.message });
  }
});

// 2. Obter as 9 Áreas de Actuação e Serviços
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find({ activo: true }).sort({ ordem: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar serviços.', details: error.message });
  }
});

// 3. Obter Serviço Específico por Slug ou Número
app.get('/api/services/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    const service = await Service.findOne({
      $or: [{ slug: identifier }, { numero: identifier }]
    });
    if (!service) {
      return res.status(404).json({ error: 'Serviço não encontrado.' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar serviço.', details: error.message });
  }
});

// 4. Obter Pilares
app.get('/api/pillars', async (req, res) => {
  try {
    const pillars = await Pillar.find().sort({ ordem: 1 });
    res.json(pillars);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar pilares.', details: error.message });
  }
});

// 5. Obter Sectores e Equipamentos
app.get('/api/sectors', async (req, res) => {
  try {
    const sectors = await Sector.find().sort({ ordem: 1 });
    res.json(sectors);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar sectores.', details: error.message });
  }
});

// 6. Submeter Pedido de Cotação (RFQ) -> Armazena no MongoDB
app.post('/api/quotes', async (req, res) => {
  try {
    const {
      nome,
      empresa,
      email,
      telefone,
      area,
      descricao,
      equipamentos,
      quantidade,
      ficheiro_nome,
      website_url_check
    } = req.body;

    // Protecção anti-spam honeypot
    if (website_url_check && website_url_check.trim() !== '') {
      return res.status(400).json({ error: 'Submissão inválida detectada.' });
    }

    if (!nome || !empresa || !email || !telefone || !area || !descricao) {
      return res.status(400).json({
        error: 'Todos os campos obrigatórios (*) devem ser preenchidos.'
      });
    }

    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

    const novoPedido = await Quote.create({
      nome_completo: nome.trim(),
      empresa: empresa.trim(),
      email: email.trim(),
      telefone: telefone.trim(),
      area_interesse: area.trim(),
      descricao_necessidade: descricao.trim(),
      lista_equipamentos: equipamentos ? equipamentos.trim() : '',
      quantidade: quantidade ? quantidade.trim() : '',
      ficheiro_anexo_nome: ficheiro_nome || '',
      status: 'pendente',
      ip_origem: String(clientIp)
    });

    console.log(`[Quote] Novo pedido de cotação registado no MongoDB! ID: ${novoPedido._id} - ${empresa} (${area})`);

    res.status(201).json({
      success: true,
      message: 'Pedido de cotação gravado com sucesso no MongoDB.',
      quoteId: novoPedido._id,
      timestamp: novoPedido.criado_em
    });
  } catch (error) {
    console.error('[Quote] Erro ao gravar pedido de cotação:', error);
    res.status(500).json({
      error: 'Erro no servidor ao registar o pedido de cotação.',
      details: error.message
    });
  }
});

// 7. Listar Pedidos de Cotação
app.get('/api/quotes', async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ criado_em: -1 }).limit(100);
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar pedidos de cotação.', details: error.message });
  }
});

// Start Server locally if not running as serverless function (Vercel)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 [Server] PrimeSource API operacional na porta ${PORT}`);
    console.log(`📍 Endpoints disponíveis:`);
    console.log(`   - GET  http://localhost:${PORT}/api/health`);
    console.log(`   - GET  http://localhost:${PORT}/api/company`);
    console.log(`   - GET  http://localhost:${PORT}/api/services`);
    console.log(`   - GET  http://localhost:${PORT}/api/pillars`);
    console.log(`   - GET  http://localhost:${PORT}/api/sectors`);
    console.log(`   - POST http://localhost:${PORT}/api/quotes`);
    console.log(`   - GET  http://localhost:${PORT}/api/quotes`);
  });
}

export default app;
