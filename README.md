# PrimeSource Procurement and Services — Website Corporativo Oficial & Backend API

Website corporativo moderno, responsivo e funcional integrado a base de dados **MongoDB Atlas** para a empresa **PrimeSource Procurement and Services**, Moçambique.

---

## 🏢 Identidade e Contactos Oficiais

- **Empresa:** PrimeSource Procurement and Services
- **País de Actuação:** Moçambique (Atendimento Nacional)
- **Website Oficial:** [https://www.primesourceps.co.mz/](https://www.primesourceps.co.mz/)
- **Email:** [info@primesourceps.co.mz](mailto:info@primesourceps.co.mz)
- **Contactos Telefónicos:**
  - `+258 84 331 8434`
  - `+258 84 700 8172`

---

## 🗄️ Integração com MongoDB Atlas

A base de dados oficial está configurada no cluster MongoDB Atlas (`cluster0.oe0akin.mongodb.net`) sob a base de dados **`primesourcedb`**.

### Colecções no MongoDB (`primesourcedb`):
1. **`company`**:
   - Informações institucionais da PrimeSource, missão, visão, valores, objecto legal e capacidade em redes eléctricas e transformadores.
2. **`services`**:
   - As 9 áreas de actuação completas com descrições técnicas e listas de produtos/serviços extraídas do portfólio oficial.
3. **`pillars`**:
   - Os 4 pilares: Qualidade, Compromisso, Competência e Soluções Integradas.
4. **`sectors`**:
   - Os sectores industriais (Redes Eléctricas, Mineração, Automação, Perímetros, Redes).
5. **`pedidos_orcamento` (Quotes)**:
   - Colecção que armazena em tempo real todos os pedidos de cotação (RFQ) submetidos através do website corporativo, incluindo nome, empresa, contacto telefónico, email, área técnica, lista de equipamentos, descrição e carimbo temporal.

---

## 🚀 API RESTful (Porta 5050)

O servidor backend Express disponibiliza os seguintes endpoints:

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/health` | Estado do servidor e verificação da ligação MongoDB |
| `GET` | `/api/company` | Dados institucionais oficiais da PrimeSource |
| `GET` | `/api/services` | Lista das 9 áreas de actuação e fornecimento |
| `GET` | `/api/services/:identifier` | Consulta de serviço por slug ou número |
| `GET` | `/api/pillars` | Os 4 pilares institucionais |
| `GET` | `/api/sectors` | Sectores industriais atendidos |
| `POST` | `/api/quotes` | Grava um novo pedido de cotação no MongoDB Atlas |
| `GET` | `/api/quotes` | Consulta os pedidos de cotação registados |

---

## 🚀 Deploy no Vercel (Passo a Passo)

O projecto está pré-configurado com [`vercel.json`](./vercel.json) e funções Serverless em [`api/index.js`](./api/index.js) para servir tanto o frontend estático optimizado como a API conectada ao MongoDB Atlas.

### Como fazer o deploy:
1. Aceda a [https://vercel.com/](https://vercel.com/) e inicie sessão com a sua conta GitHub.
2. Clique em **"Add New..."** &rarr; **"Project"**.
3. Seleccione o repositório **`afonsoDomingos/primesource`**.
4. O Vercel detectará automaticamente as configurações de build a partir de `vercel.json`:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Na secção **Environment Variables** (Variáveis de Ambiente), adicione a variável:
   - **Nome:** `MONGODB_URI`
   - **Valor:** `mongodb+srv://karinganastudio23:VIbemongodb@cluster0.oe0akin.mongodb.net/primesourcedb?retryWrites=true&w=majority`
6. Clique em **"Deploy"**.

Em menos de 1 minuto o website e todos os endpoints de pedidos de cotação estarão online com HTTPS gratuito e CDN global!

---

## 🛠️ Comandos de Execução Local

```bash
# 1. Instalar dependências
npm install

# 2. Povoar / Actualizar a base de dados MongoDB com os dados do portfólio
npm run seed

# 3. Iniciar o servidor backend API (Express + MongoDB) na porta 5050
npm run server

# 4. Iniciar o servidor de desenvolvimento frontend (Vite com proxy automático /api)
npm run dev

# 5. Compilar o frontend para produção (pasta /dist)
npm run build
```

---

## 🔐 Configuração de Ambiente (.env)

Crie ou edite o ficheiro `.env` na raiz do projecto com a seguinte estrutura:

```env
MONGODB_URI=mongodb+srv://karinganastudio23:VIbemongodb@cluster0.oe0akin.mongodb.net/primesourcedb?retryWrites=true&w=majority
PORT=5050
NODE_ENV=development
```
