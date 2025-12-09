# [D] CHECKLIST DE EXECUÇÃO (ALEX) - FASE FINAL 🚀

Alex, o protótipo da Home está de pé e estruturalmente sólido. O código está limpo, rápido e responsivo. Mas agora precisamos transformar esse "esqueleto" em um corpo vivo que imprime dinheiro.

O site atual está com **placeholders**. Para faturar, precisamos de **realidade**. Siga este checklist à risca para o Go-Live.

---

### 1. INTEGRAÇÃO VISUAL (O que já temos vs. O que falta)
As imagens que geramos são boas bases, mas precisam ser aplicadas estrategicamente no código.

*   [ ] **Background Hero (O Clima):**
    *   **Ação:** Confirmar se a imagem `RO2W2-atlas_ai_hero_background_index_0.jpeg` está dando leitura correta no texto.
    *   **Ajuste:** Se o texto branco sumir, aumente a opacidade do `bg-gradient-to-b` no CSS da Hero Section para garantir contraste.
*   **App Mockup (A Tangibilização):**
    *   **Crítico:** A imagem `HPB68-app_interface_placeholder_index_1.jpeg` é um placeholder genérico.
    *   **Ação:** Substitua por um **print real** ou um mockup de alta fidelidade da interface final do Atlas. O cliente precisa ler os textos da tela (ex: "Plano de Hoje", "Macros"). Se ele não lê, ele acha que é fake.
*   **Seção "Para Quem É" (Identificação):**
    *   **Ação:** A imagem `WZY5L-diverse_people_training_images_index_3.jpeg` (colagem de pessoas) funciona bem para mostrar diversidade. Mantenha o filtro P&B/Escuro para não quebrar a estética "Dark Mode" do site.
*   **Seção Resultados (O Pote de Ouro):**
    *   **Ação:** A imagem `9ZEMV-provas_fitness_transformation_index_2.jpeg` é tecnicamente boa, mas tem "cara de banco de imagem".
    *   **Troca Obrigatória:** Substitua por fotos suas ou de beta-testers reais. Foto de "celular no espelho" converte mais que foto de estúdio porque passa **verdade**.

---

### 2. PROVA SOCIAL & AUTORIDADE (Matando Objeções)
Ninguém compra promessa, compram certeza.

*   [ ] **Substituir Placeholders de Texto:**
    *   Onde está *"Lucas M. - Treino há 5 anos..."*, quero um depoimento real. Se não tiver textão, use print de WhatsApp (borrando o sobrenome).
    *   **Dica:** Print de conversa espontânea ("Cara, minha calça tá caindo!") vale 10x mais que texto formatado no site.
*   [ ] **Vídeo VSL (O Vendedor 24h):**
    *   Não precisa ser cinema. Grave um vídeo de 60-90 segundos com seu celular, boa luz, áudio limpo.
    *   **Roteiro Rápido:** "Promessa Forte (Shape em 90 dias)" -> "Por que você falha (Dietas burras)" -> "Mostra o App na tela (A solução)" -> "Chamada pra Ação (Garantia)".
    *   Insira esse vídeo logo abaixo do botão do Hero ou flutuando na seção "Como Funciona".

---

### 3. SETUP TÉCNICO (A Infraestrutura)
Sem isso, o site não existe para o Google nem para o banco.

*   [ ] **Domínio e Hospedagem:**
    *   Compre o domínio (ex: `atlasai.com.br` ou `.app`).
    *   Hospedagem: Recomendo **Vercel** ou **Netlify** para esse código (é HTML/JS estático, roda voando e de graça/barato). Se usar WordPress, garanta um servidor rápido (Hostinger/Cloudways).
*   [ ] **SSL (Cadeado de Segurança):**
    *   Obrigatório. O Chrome bloqueia site "Não Seguro". A maioria das hospedagens dá isso de graça hoje (Let's Encrypt).
*   [ ] **Integração de Pagamentos (O Caixa):**
    *   Crie os produtos no **Stripe**, **Kiwify** ou **Hotmart**:
        *   *Plano Mensal:* R$ 49,90
        *   *Plano Trimestral:* R$ 129,90 (Ancoragem)
        *   *Plano Anual:* R$ 497,00 (Foco na venda aqui)
    *   **Ação:** Pegue os links de checkout (URL) de cada plano e cole nos `href="#"` dos botões da tabela de preços no HTML.
*   [ ] **Analytics & Tracking:**
    *   Instale o **Pixel do Meta** (Facebook Ads) e a tag do **Google Analytics 4**. Sem isso, você queima dinheiro em tráfego pago.

---

### 4. TESTE DE GUERRA (Mobile First)
90% do seu tráfego virá do Instagram pelo celular.

*   [ ] **Teste no iPhone e Android:**
    *   Abra o site no celular. O botão "Começar Agora" está fácil de clicar com o dedão?
    *   As fontes estão legíveis ou ficaram minúsculas?
    *   As imagens carregam rápido no 4G? (Use ferramentas como *TinyPNG* para comprimir todas as imagens antes de subir).
*   [ ] **Fluxo de Compra:**
    *   Clique em comprar e veja se o checkout abre rápido. Cada segundo de demora no checkout dropa a conversão em 20%.

---

**Resumo da Ópera:** O código está pronto. O design está 80%. Agora é com você: **bote fotos reais, conecte o botão de pagamento e vamos pro tráfego.**
