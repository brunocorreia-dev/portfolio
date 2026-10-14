// Única fonte de dados da página. Para adicionar um projeto, você só edita este arquivo.
//
// Campos:
//   title        string   nome do projeto
//   description  string   1 ou 2 frases: qual problema resolve
//   category     string   "Web" | "API" | "CLI" (tem que bater com o data-category dos botões)
//   stack        string[] tecnologias usadas
//   image        string   caminho do print/GIF dentro de /img
//   github       string   link do repositório
//   demo         string?  OPCIONAL: se não existir, o botão de Demo não aparece

export const projects = [

  {
    title: "DocGen",
    description: "DocGen: CLI em Java 21 que gera README e ARCHITECTURE com LLMs",
    category: "CLI",
    stack: ["Java", "LLM"],
    image: "docgen.png",
    github: "https://github.com/brunocorreia-dev/Docgen"
    // sem "demo" de propósito: serve para testar o caso do campo ausente
  }
];
