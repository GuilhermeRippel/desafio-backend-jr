"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function encontrarCidadePorCEP(caminhoArquivo) {
    //Regata e lê o arquivo  
    const conteudo = fs.readFileSync(caminhoArquivo, 'utf-8');
    //Basicamente organiza o arquivo em linhas
    const linhas = conteudo.split('\n').map(linha => linha.trim()).filter(Boolean);
    const faixas = [];
    let cepProcurado = null;
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
    const cidadeEncontrada = faixas.find(faixa => faixa.inicio <= cepProcurado && cepProcurado <= faixa.fim);
    if (cidadeEncontrada) {
        console.log(`A cidade à qual o CEP fornecido percente é: ${cidadeEncontrada.cidade}`);
    }
    else {
        console.log('CEP não pertence a nenhuma cidade.');
    }
}
// Caminho para o arquivo de entrada
const caminhoEntrada = path.join(__dirname, '..', 'src', 'exemplo.txt');
encontrarCidadePorCEP(caminhoEntrada);
