# desafio-backend-jr
Repositório criado para o desafio técnico de desenvolvedor backend júnior. O projeto contém a implementação de dois desafios:

## 1.Consulta de CEP: 
A partir de um CEP fornecido, retorna a cidade correspondente utilizando uma API externa.

## 2. Cálculo de rota e custo de entrega: 
Com base em duas cidades de origem e destino, retorna o custo do frete de acordo com as regiões envolvidas.

## 🧩 Desafios

### ✅ Parte 1 - Consulta de Cidade por Faixa de CEP

**Descrição**:  
Criar um programa que recebe um arquivo com faixas de CEPs e nomes de cidades, seguido de um CEP. O objetivo é identificar a qual cidade o CEP informado pertence.

📌 Lógica utilizada:
- Leitura e tratamento do arquivo com `fs`.
- Conversão das linhas em objetos contendo cidade, início e fim de faixa.
- Busca pela cidade que contém o CEP informado usando `Array.find`.

- ### ✅ Parte 2 - Menor Custo de Transporte

**Descrição**:  
Criar um programa que, a partir de faixas de CEPs e conexões entre cidades com valores de custo, calcule a menor rota de transporte entre dois CEPs.

📂 Exemplo de entrada:
- Faixas de CEPs por cidade
- Lista de conexões entre cidades com custo
- CEP de origem e destino

- 📌 Lógica utilizada:
- Leitura estruturada das seções do arquivo.
- Identificação das cidades associadas aos CEPs.
- Criei uma lógica própria para lidar com os caminhos, outra boa opção seria através de grafos.

  1. Clone este repositório
```bash
1 git clone https://github.com/seuusuario/desafio-backend.git
2 cd desafio-backend
3 npm install

Para executar os desafios
 # Parte 1
ts-node src/parte1.ts
# Parte 2
ts-node src/parte2.ts
