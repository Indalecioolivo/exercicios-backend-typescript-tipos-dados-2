import fs from "fs";

const lerArquivo = (): Usuario[] => {
  return JSON.parse(fs.readFileSync("../bd.json").toString());
};

const escreverArquivo = (dados: Usuario[]): void => {
  fs.writeFileSync("../bd.json", JSON.stringify(dados));
};

type Endereco = {
  cep: string;
  rua: string;
  complemento?: string;
  bairro: string;
  cidade: string;
};

type Usuario = {
  nome: string;
  email: string;
  cpf: string;
  profissao?: string;
  endereco?: Endereco | null;
};

const cadastrarUsuario = (usuario: Usuario) => {
  if (!usuario.endereco) {
    usuario.endereco = null;
  }
  const dados: Usuario[] = lerArquivo();
  dados.push(usuario);
  return escreverArquivo(dados);
};

const indalecio = {
  nome: "Indalecio",
  email: "indalecio@gmail.com",
  profissao: "Garoto de Programa",
  cpf: "11512599697",
  endereco: {
    cep: "11750000",
    rua: "Eduardo Alvares Machado, 1035",
    complemento: "",
    bairro: "Balneário Samburá",
    cidade: "Peruibe",
  },
};

const delcio = {
  nome: "Delcio",
  profissao: "Arquiteto de Computação em Nuvem",
  email: "delcio@gmail.com",
  cpf: "delciocpf",
};

const detalharUsuario = (cpf: string): Usuario[] => {
  const dados = lerArquivo();
  const usuario = dados.filter((usuario) => {
    return usuario.cpf === cpf;
  });
  return usuario;
};

const editarUsuario = (
  cpf: string,
  infos?: {
    nome?: string;
    email?: string;
    cpf?: string;
    profissao?: string;
    endereco?: Endereco | null;
  }
): Usuario => {
  let dados = lerArquivo();
  let usuario: Usuario | undefined = dados.find((user) => {
    return user.cpf === cpf;
  });
  if (infos) {
    usuario = { ...usuario!, ...infos };
    dados = dados.filter((user) => {
      return user.cpf != cpf;
    });
    dados.push(usuario);
  }
  escreverArquivo(dados);

  return usuario!;
};

const excluirUsuario = (cpf: string): Usuario => {
  const dados = lerArquivo();
  const excluido = dados.find((user) => {
    return user.cpf == cpf;
  });
  const newList = dados.filter((user) => {
    return user.cpf != cpf;
  });
  escreverArquivo(newList);

  return excluido!;
};

// cadastrarUsuario(indalecio);
// cadastrarUsuario(delcio);

// console.log(excluirUsuario("delciocpf"));

const filtroUsuario = (profissao: string): Usuario[] => {
  const dados = lerArquivo();
  const users = dados.filter((user) => {
    return user.profissao === profissao;
  });

  return users;
};

console.log(filtroUsuario("Arquiteto de Computação em Nuvem"));
