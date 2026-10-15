# Clínica Vida Bella

Landing page em React + Vite, com rolagem nativa contínua, cards de resultados, identidade visual da clínica, fotografias e questionário de cuidados com encaminhamento ao WhatsApp.

## Desenvolvimento

```sh
npm ci
npm run dev
```

## Compilação

```sh
npm run build
npm run preview
```

## GitHub Pages

Repositório: https://github.com/pedroaugustoftw/ClinicaVidaBella

1. Em Settings > Pages, selecione GitHub Actions como origem.
2. Em Actions, execute o workflow Publicar site no GitHub Pages na branch main.
3. Após a publicação, acesse https://pedroaugustoftw.github.io/ClinicaVidaBella/

No plano gratuito, o GitHub Pages requer um repositório público. Repositórios privados precisam de um plano elegível. A mudança de visibilidade deve ser decidida pelo proprietário.

Em repositórios públicos, novos commits na main publicam automaticamente. O workflow configura VITE_BASE_PATH para /ClinicaVidaBella/; o helper src/assets.js resolve os caminhos das imagens nesse endereço.

Documentação: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site e https://vite.dev/guide/static-deploy.html#github-pages

## Organização

- src/: componentes, estilos e questionário.
- public/brand/: versões SVG da identidade visual.
- public/images/: imagens utilizadas no site.

O questionário não utiliza backend. As respostas compõem uma mensagem para o WhatsApp. Arquivos de trabalho, referências originais, prévias e logs locais ficam fora do repositório.
