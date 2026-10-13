# Portfólio de projetos

## Sobre o projeto

Página estática que apresenta meus projetos de software, construída com HTML, CSS e JavaScript puro (ES modules). Não usa frameworks, dependências nem etapa de build.

Os cards são gerados a partir dos dados em `projects.js` e podem ser filtrados por categoria.

| Arquivo       | Função                                              |
| ------------- | --------------------------------------------------- |
| `index.html`  | Estrutura da página e botões de filtro              |
| `style.css`   | Estilos (tema escuro, grid e cards)                 |
| `projects.js` | Dados dos projetos (única fonte de dados da página) |
| `main.js`     | Cria os cards e aplica os filtros                   |
| `img/`        | Imagens dos projetos                                |

## Requisitos

- Um navegador moderno (versão atual do Chrome, Firefox, Edge ou Safari).
- Um servidor HTTP local, necessário para carregar os módulos JavaScript (`import`/`export`).

## Como executar localmente

Abrir o `index.html` diretamente (endereço começando com `file://`) não funciona: por restrições de origem e segurança, o navegador bloqueia módulos JavaScript carregados assim, e a página aparece sem nenhum card. Use um servidor local, com uma das opções abaixo.

**Live Server (VS Code)**: se a extensão já estiver instalada no editor, clique com o botão direito em `index.html` e escolha **Open with Live Server**. O navegador abre sozinho, normalmente em `http://127.0.0.1:5500`.

**`npx serve`**: exige Node.js e npm instalados. Na raiz do projeto, rode:

```bash
npx serve .
```

Se o pacote `serve` ainda não estiver no cache do npm, o `npx` pede confirmação e faz um download temporário dele.

**Python 3**: se você já tiver Python 3 instalado, esta opção não baixa nada:

```bash
python3 -m http.server 8000
```

Em qualquer opção, abra no navegador a URL exibida pelo servidor no terminal (por exemplo `http://localhost:3000` no `serve` ou `http://localhost:8000` no Python). Para encerrar o servidor, use `Ctrl+C` no terminal.

## Como adicionar um projeto

Todos os projetos ficam no array `projects`, em `projects.js`. Para adicionar um, inclua um novo objeto nesse array com os campos abaixo.

| Campo         | Tipo       | Obrigatório | Descrição                                                    |
| ------------- | ---------- | ----------- | ------------------------------------------------------------ |
| `title`       | `string`   | sim         | Nome do projeto                                              |
| `description` | `string`   | sim         | Uma ou duas frases sobre o problema que o projeto resolve    |
| `category`    | `string`   | sim         | `"Web"`, `"API"` ou `"CLI"`                                  |
| `stack`       | `string[]` | sim         | Tecnologias usadas; cada item vira uma tag no card           |
| `image`       | `string`   | sim         | Caminho da imagem (print ou GIF) dentro de `img/`            |
| `github`      | `string`   | sim         | Link do repositório                                          |
| `demo`        | `string`   | não         | Link da demonstração; sem ele, o botão Demo não aparece      |

Exemplo de estrutura. **Todos os valores abaixo são ilustrativos e precisam ser substituídos por dados reais:**

```js
{
  title: "Nome do projeto",
  description: "Qual problema o projeto resolve, em uma ou duas frases.",
  category: "API",
  stack: ["Java", "Spring Boot"],
  image: "img/nome-do-projeto.png",
  github: "https://github.com/usuario/nome-do-repositorio",
  demo: "https://endereco-da-demonstracao" // opcional: apague a linha se não houver demo
}
```

**Categoria**: o valor precisa ser idêntico (inclusive maiúsculas) ao `data-category` de um botão de filtro em `index.html`. Para criar uma categoria nova, adicione também um botão com esse `data-category`. Se não houver botão correspondente, o console do navegador mostra um aviso e o projeto só aparece no filtro `All`.

**Imagens**: coloque o arquivo na pasta `img/` e use um caminho relativo, sem barra no início (`img/meu-projeto.png`). Na Vercel os nomes diferenciam maiúsculas de minúsculas, então `Img/Projeto.PNG` e `img/projeto.png` são arquivos diferentes. Imagens em proporção 16:9 aparecem sem cortes; outras proporções são recortadas para preencher o espaço. Se a imagem não carregar, o card mostra "Imagem indisponível".

**Links**: o botão GitHub aparece em todos os cards. Enquanto o link estiver vazio, não começar com `http://` ou `https://`, ou contiver um trecho entre colchetes (como `[repositorio]`), ele aparece como "GitHub (link pendente)", sem destino. O botão Demo só aparece quando `demo` tiver um link válido nessas mesmas condições.

**Conferência**: depois de editar, recarregue a página pelo servidor local, teste os filtros, abra cada link GitHub e Demo para confirmar que o destino existe e verifique se o console do navegador (F12) não mostra erros ou avisos.

## Deploy na Vercel

1. Envie o repositório para o GitHub (`git push`), fora desta configuração local.
2. Na Vercel, clique em **Add New… > Project** e importe o repositório.
3. Em **Framework Preset**, selecione **Other**.
4. Deixe o **Build Command** vazio: o projeto não tem etapa de build.
5. Use a raiz do projeto como diretório de saída: deixe o **Output Directory** no padrão ou, se a interface pedir um valor, informe `.`.
6. Clique em **Deploy**. A Vercel publica o site e gera uma URL; cada novo push na branch `main` gera um novo deploy automaticamente.
