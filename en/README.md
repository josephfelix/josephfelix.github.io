# :rocket: Portfólio [josephfelix.dev](https://josephfelix.dev)
Seja bem vindo ao repositório do meu portfólio, onde apresento meus projetos e escrevo sobre mim.

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![HitCount](http://hits.dwyl.com/josephfelix/josephfelix.github.io.svg)](http://hits.dwyl.com/josephfelix/josephfelix.github.io.svg) [![GitHub version](https://badge.fury.io/gh/josephfelix%2Fjosephfelix.github.io.svg)](https://badge.fury.io/gh/josephfelix%2Fjosephfelix.github.io) ![Gem Version](https://img.shields.io/gem/v/jekyll.svg) [![Powered by Jekyll](https://camo.githubusercontent.com/ccbbb10ab4fd9de0790a00d834ef090b3dcb7070/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f706f77657265645f62792d4a656b796c6c2d7265642e737667)](https://jekyllrb.com)

## Antes de começar
Para rodar o build desse projeto é necessário ter o GNU Make instalado, ele já vem por padrão em ambientes Linux, caso você esteja clonando este repositório de um Windows, é necessário a instalação do [mingw](http://www.mingw.org/) e do [docker toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/).

### Pré-requisitos
O que você precisa para rodar esse projeto local?
As versões abaixo são apenas a fim de comparação, pois esse projeto pode rodar em outras versões desses programas, coloquei na tabela abaixo pois são as versões que usei para o desenvolvimento desse projeto.

| Aplicação       | Versão   |
| --------------- | -------- |
| docker          | 19.03.1  |
| docker-compose  | 1.25.3   |
| npm             | 6.9.0    |
| node            | v12.6.0  |

### Instalando
Para instalar esse projeto local, é necessário ter o git instalado, primeiro passo é clonando o repositório:
```
git clone https://github.com/josephfelix/josephfelix.github.io.git
```

Após clonar, entre na pasta do projeto
```
cd josephfelix.github.io
```

Ao entrar na pasta do projeto, execute a instrução install do Makefile com o seguinte comando

```
make install
```

### Executando
Para executar este projeto no seu local, você precisa executar o comando abaixo

```
make run
```

> :bulb: Caso o browser não abra automaticamente a aplicação, acesse através da seguinte url: http://127.0.0.1:4000/

### Build sem executar
Para buildar a pasta dos estáticos sem executar, você pode utilizar o comando abaixo

```
make build
```

### Deploy
Para subir para algum ambiente do GitHub Pages, execute o comando abaixo, ele já irá fazer o build do Jekyll no modo produção com o compress html ativado:

```
make deploy
```

## Licença
Este software está sob a licença Apache 2.0, portanto:

- O código-fonte não precisa ser necessariamente público quando a distribuição do software é feita.
- Modificações podem ser lançadas sob qualquer licença.
- Mudanças feitas no código-fonte precisam ser documentadas.
- Oferece a mesma proteção de uso de patente da GPLv3
- Proíbe explicitamente o uso de nomes de marcas registradas encontrados no projeto.