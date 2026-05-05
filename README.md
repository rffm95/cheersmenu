# Cheers Bar - Interactive Experience

Este é o repositório do novo menu digital e interativo para o Cheers Bar. O projeto foi construído com foco numa experiência de utilizador premium, design moderno e funcionalidades pensadas para aumentar as vendas.

## Features

-   **Filtros Rápidos:** Botões de "Tenho Fome" e "Só Quero Beber" para segmentar instantaneamente o menu.
-   **Navegação por Ícones:** Categorias visuais ao estilo "Instagram Stories" para uma navegação intuitiva.
-   **Destaques de "Populares":** Itens com maior margem ou mais vendidos têm um brilho especial para atrair a atenção do cliente.
-   **Painel de Detalhes:** Ao clicar num item, um painel lateral desliza para o ecrã com uma foto em ponto grande e descrição detalhada, incentivando a compra.
-   **Animações Suaves:** Todas as transições e interações são animadas com GSAP para uma sensação fluida e profissional.
-   **Totalmente Personalizável:** Para adicionar ou alterar itens, basta editar o array `menuItems` no ficheiro `script.js`.

## Como Adicionar as Suas Fotos

1.  Faça o upload das suas fotos para um serviço de alojamento de imagens (ex: [Imgur](https://imgur.com/upload) ou um repositório GitHub).
2.  Copie o link direto da imagem.
3.  Abra `script.js`.
4.  No array `menuItems`, encontre o produto que quer atualizar e cole o novo link no campo `img`.

## Tech Stack

-   HTML5
-   Tailwind CSS (para styling rápido e responsivo)
-   JavaScript (Vanilla)
-   GSAP (GreenSock Animation Platform) para animações de alta performance
-   Lucide Icons para ícones leves e modernos
