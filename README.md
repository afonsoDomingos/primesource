# PrimeSource Procurement and Services — Website Corporativo Oficial

Website corporativo moderno, responsivo e de elevado padrão visual desenvolvido para a **PrimeSource Procurement and Services**, empresa moçambicana especializada em procurement, fornecimento de equipamentos industriais, materiais eléctricos, automação, instrumentação, conectividade e sistemas de segurança.

---

## 🏢 Identidade e Contactos Oficiais

- **Empresa:** PrimeSource Procurement and Services
- **País de Actuação:** Moçambique (Atendimento Nacional)
- **Website Oficial:** [https://www.primesource.co.mz/](https://www.primesource.co.mz/)
- **Email:** [info@primesource.co.mz](mailto:info@primesource.co.mz)
- **Contactos Telefónicos:**
  - `+258 84 331 8434`
  - `+258 84 700 8172`

---

## 📁 Estrutura de Páginas

1. **Início (`index.html`)**:
   - Barra superior com canais directos (Moçambique, Telefones, Email e WhatsApp).
   - Cabeçalho fixo com o logótipo oficial de alta resolução e menu responsivo.
   - Hero Section com fotografia industrial real e badge institucional.
   - Barra de 4 indicadores técnicos (Procurement Global, Redes Eléctricas, Automação & PLCs, Serviços Técnicos).
   - Apresentação Institucional detalhada ("Soluções que impulsionam operações").
   - Grelha das 9 áreas de negócio com fotografias reais e cartões interactivos.
   - Os 4 Pilares da PrimeSource (Qualidade, Compromisso, Competência, Soluções Integradas).
   - Compromisso Corporativo e Parceria ("O sucesso constrói-se em parceria").
   - Chamada para Acção (CTA) e Rodapé completo.

2. **Sobre Nós (`sobre.html`)**:
   - Perfil Institucional detalhado.
   - Objecto Principal completo da empresa com enquadramento comercial.
   - Missão, Visão e Valores com cartões de prestígio.
   - Compromisso com os Clientes e garantia operacional.

3. **Serviços e Áreas de Actuação (`servicos.html`)**:
   - Barra de salto rápido (Jump Nav) entre as 9 áreas.
   - Apresentação técnica exaustiva de cada uma das 9 áreas:
     1. Procurement e fornecimento de bens e equipamentos
     2. Comércio de material industrial
     3. Comércio de material eléctrico
     4. Automação e instrumentação industrial
     5. Sistemas de segurança electrónica
     6. Sistemas de protecção e segurança perimetral
     7. Equipamentos de comunicação e conectividade
     8. Comércio externo
     9. Serviços técnicos especializados
   - Botões "Solicitar Orçamento" que auto-seleccionam a respectiva área no formulário.

4. **Sectores e Equipamentos (`sectores.html`)**:
   - Visão estruturada dos sectores industriais e linhas de equipamento atendidas (Redes Eléctricas, Mineração, Automação, Perímetros, Redes).

5. **Contactos e Pedidos de Orçamento (`contactos.html`)**:
   - Cartões de contacto com botões de chamada directa (`tel:`), email (`mailto:`) e WhatsApp para ambos os números.
   - Formulário de cotação completo: Nome, Empresa, Email, Telefone, Área técnica, Descrição da necessidade, Equipamentos, Quantidade e Anexo de ficheiros (BOQ, Caderno de Encargos).
   - Protecção anti-spam honeypot.
   - Modal de confirmação inteligente com envio directo para WhatsApp, Email e download de resumo em formato texto (`.txt`).

6. **Página 404 (`404.html`)**:
   - Design corporativo com retorno guiado para a navegação principal.

7. **Política de Privacidade (`politica-privacidade.html`)**:
   - Termos de confidencialidade e protecção de dados comerciais e técnicos.

---

## 🛠️ Tecnologias & Arquitectura

- **Motor de Bundling:** [Vite](https://vitejs.dev/) para compilação ultrarrápida.
- **Estrutura:** HTML5 Semântico, WCAG 2.1 Acessibilidade, Meta Tags OpenGraph e Schema.org JSON-LD.
- **Estilo:** CSS Moderno Puro (Vanilla CSS com Design Tokens, Glassmorphism, CSS Grid e Flexbox, tipografia responsiva).
- **Fontes:** Google Fonts (`Plus Jakarta Sans` e `Outfit`).
- **SEO:** `sitemap.xml`, `robots.txt`, hierarquia semântica H1-H3, tags canónicas e Open Graph.

---

## 🚀 Comandos de Desenvolvimento e Produção

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento local
npm run dev

# Compilar para produção (cria pasta /dist)
npm run build

# Testar o pacote de produção compilado
npm run preview
```

---

## 🌐 Publicação em Produção

Para publicar no domínio oficial [https://www.primesource.co.mz/](https://www.primesource.co.mz/):
1. Execute `npm run build`.
2. Carregue o conteúdo gerado dentro da pasta `dist/` para a raiz do seu servidor web (ex: `public_html/` no cPanel, Nginx ou Apache).
3. Para integração automatizada de email no formulário:
   - Configure as credenciais SMTP no servidor ou aponte o endpoint `fetch()` em `src/scripts/main.js` para a API / webhook de sua preferência (ex: Resend, Formspree, Sendgrid ou script PHP Mailer local).
