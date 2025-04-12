import * as fs from 'fs';
import * as path from 'path';

interface FaixaCEP {
  cidade: string;
  inicio: number;
  fim: number;
}

function encontrarCidadePorCEP(caminhoArquivo: string){
  //Regata e lê o arquivo  
  const conteudo = fs.readFileSync(caminhoArquivo, 'utf-8');
  //Basicamente organiza o arquivo em linhas
  const linhas = conteudo.split('\n').map(linha => linha.trim()).filter(Boolean);

  const faixas: FaixaCEP[] = [];
  let cepProcurado: number | null = null;

  //For utilizado para encontrar o '--' e transformar o CEP em Number
  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i];
    if (linha === '--') {
      cepProcurado = Number(linhas[i + 1]);
      // Esse break é importante para evitar que o push tente criar mais um objeto com valor inválido
      break;
    }

    //Basicamente separa as linhas com ',' e cria um objeto para acessar facilmente os valores
    const [cidade, inicioStr, fimStr] = linha.split(',');
    faixas.push({
      cidade,
      inicio: Number(inicioStr),
      fim: Number(fimStr),
    });
  }

  //Aqui ocorre uma validação se o for encontrou de fato o CEP a ser procurado
  if (cepProcurado === null) {
    console.error('CEP não encontrado para realizar busca');
    return;
  }

  //Neste trecho utilizei o find para criar a regra de que o CEP procurado precisa estar entre os dois CEPs de cada linha até que seja verdade
  const cidadeEncontrada = faixas.find(faixa =>
    faixa.inicio <= cepProcurado && cepProcurado <= faixa.fim
  );

  if (cidadeEncontrada) {
    console.log(`A cidade à qual o CEP fornecido percente é: ${cidadeEncontrada.cidade}`);
  } else {
    console.log('CEP não pertence a nenhuma cidade.');
  }
}

// Caminho para o arquivo de entrada
const caminhoEntrada = path.join(__dirname, '..', 'src', 'exemplo1.txt');
encontrarCidadePorCEP(caminhoEntrada);
