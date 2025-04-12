import * as fs from 'fs'
import * as path from 'path'

interface FaixaCEP {
    cidade: string
    inicio: number
    fim: number
}

interface CidadeValor {
    cidade1: string
    cidade2: string
    valor: number
}

// Caminho para o arquivo de entrada
const caminhoEntrada = path.join(__dirname, '..', 'src', 'exemplo2.txt')

// Essa função lê o arquivo e identifica as cidades de origem e destino com base nos CEPs (Basicamente o que fiz no primeiro desafio)
function encontrarCidades(caminhoArquivo: string) {
    const conteudo = fs.readFileSync(caminhoArquivo, 'utf-8')
    const linhas = conteudo.split('\n').map(l => l.trim()).filter(Boolean)
  
    let cepsProcurados: number[] = []
    const faixa: FaixaCEP[] = []

    //Funcionamento igual ao primeiro desafio, onde identifico o bloco que preciso transformar em um array de objetos para achar as cidades
    for (let i = 0; i < linhas.length; i++) {
      const linha = linhas[i]
      if (linha === '--') {
        for (let j = i + 1; j < linhas.length; j++) {
          if (linhas[j] === '--') {
            const linhaFinal = linhas[j + 1]
            if (linhaFinal) {
              cepsProcurados = linhaFinal
                .split(',')
                .map(num => Number(num.trim()))
                .filter(n => !isNaN(n))
            }
            break
          }
        }
        break
      }

      //Pequena verificação para saber se os CEPs são congruentes à ideia do algoritmo
      if(cepsProcurados.length > 2){
        console.log('Mais de um destino informado')
        return
      }

      //Aqui transformo o array faixa em um objeto de arrays
      const [cidade, inicioStr, fimStr] = linha.split(',')
      faixa.push({
        cidade,
        inicio: Number(inicioStr),
        fim: Number(fimStr)
      })
    }

    //Utilizo find duas vezes alterando apenas o indice consultado para acahr as cidades que devo procurar
    const cidadeInicial = faixa.find(faixa => faixa.inicio <= cepsProcurados[0] && cepsProcurados[0] <= faixa.fim)
    const cidadeFinal = faixa.find(faixa => faixa.inicio <= cepsProcurados[1] && cepsProcurados[1] <= faixa.fim)

    //Apenas garanto que não vieram vazias as cidades e retorno isso na função
    if(cidadeInicial != undefined && cidadeFinal != undefined){
        return [cidadeInicial.cidade, cidadeFinal.cidade]
    }
  }
  

  //Função para organizar a lista de viagens e seus valores
  function organizarTransportes(caminhoArquivo: string){
    const cidade = fs.readFileSync(caminhoArquivo, 'utf-8')
    const cidades = cidade.split('\n').map(c => c.trim()).filter(Boolean)

    const transportes: CidadeValor[] = []

    //Aqui basicamente sigo o mesmo padrão das outras funções percorrendo o array e separando ele em um objeto além de tipar seus dados
    for(let i = 0; i < cidades.length; i++){
      if(cidades[i] === '--'){
        for(let j = i + 1; j < cidades.length; j++){
          if(cidades[j] === '--'){
            break
          }
          const [cidade1, cidade2, valorStr] = cidades[j].split(',')
          transportes.push({
            cidade1,
            cidade2,
            valor: parseFloat(valorStr)
          })
        }
      }
    }
    return transportes
  }


  function encontrarMenorPreco(cidadesDestino: string[], viagensPossiveis: CidadeValor[]) {
    const cidadeInicial = cidadesDestino[0];
    const cidadeFinal = cidadesDestino[1];
  
    let menorPreco = Infinity;
    let melhorCaminho: string[] = [];
  
    function buscar(cidadeAtual: string, caminho: string[], precoTotal: number, visitadas: Set<string>) {
      if (cidadeAtual === cidadeFinal) {
        if (precoTotal < menorPreco) {
          menorPreco = precoTotal;
          melhorCaminho = [...caminho];
        }
        return;
      }
      
      // Testa todas as rotas possíveis a partir da cidade atual
      for (const viagem of viagensPossiveis) {
        if (viagem.cidade1 === cidadeAtual && !visitadas.has(viagem.cidade2)) {
          visitadas.add(viagem.cidade2);
          buscar(viagem.cidade2, [...caminho, viagem.cidade2], precoTotal + viagem.valor, visitadas);
          visitadas.delete(viagem.cidade2);
        } else if (viagem.cidade2 === cidadeAtual && !visitadas.has(viagem.cidade1)) {
          visitadas.add(viagem.cidade1);
          buscar(viagem.cidade1, [...caminho, viagem.cidade1], precoTotal + viagem.valor, visitadas);
          visitadas.delete(viagem.cidade1);
        }
      }
    }

    // Começa a busca com a cidade inicial
    buscar(cidadeInicial, [cidadeInicial], 0, new Set([cidadeInicial]));


  // Mostra o melhor caminho e o valor, se encontrado no console
    if (melhorCaminho.length > 0) {
      console.log("Melhor caminho encontrado:", melhorCaminho);
      console.log("Menor preço:", menorPreco);
    } else {
      console.log("Nenhum caminho encontrado.");
    }
  }
  
    

// Aqui só junto tudo e executo
function TestandoTudo(){
  const cidadesDestino = encontrarCidades(caminhoEntrada)
  const viagensPossiveis = organizarTransportes(caminhoEntrada)
  if(cidadesDestino && viagensPossiveis){
  encontrarMenorPreco(cidadesDestino, viagensPossiveis)
  }
}
TestandoTudo()



