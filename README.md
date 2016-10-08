# Aplicativo Cupom Mateus

##Aplicativo Cupom Client (Ionic)

Este projeto tem como objetivo, a partir da utilização dos módulos do Node.js Ionic + Cordova, criar um aplicativo mobile, utilizando a linguagens de marcação HTML, de folhas de estilo CSS e de programação javascrpit, utilizando a biblioteca angular, cadastrar um cupom fiscal informando seu COO, CNPJ, Data e Valor Total, seja manualmente, a partir de um QR Code ou a partir de uma foto, enviar este cupom cadastrado a uma API que armazenará este cupom. Foram utilizados no desenvolvimento desta aplicação:

    • JDK 1.8_101;

    • Android SDK 24.4.1;

    • Node.JS 4.5.0;

    • NPM 2.15.9;

    • Cordova 6.3.1;

    • Cordova-plugin-camera;

    • http://Api.ocr.space/;

    • Ionic 2.0.0;

    • Atom 1.12.0.

Para o desenvolvimento desta aplicação foi utilizado o Ionic e o Cordova para criar o ambiente da aplicação e dentro da pasta www foram criados:

  •	HTML:

    •  index – arquivo que faz a importação de todos os arquivos e bibliotecas a serem utilizados na aplicação,
	     também é o local onde será inserido os templates desta aplicação;

    •  tabs – insere uma guia que possibilita a navegação entre os templates;

    •  tab-home – template inicial da aplicação (quando esta é aberta será este template que irá aparecer),
       dá informações ao usuário sobre utilização da desta;

    •  tab-cupom – template usado para o cadastro manual do cupom fiscal, usuário deve preencher COO, Data,
       CNPJ e valor;       

    •  tab-photo – template usado para possibilitar o usuario a fotografar o cupom fiscal e assim, usando uma
       API de OCR, retirar da imagem os dados necessários para o cadastro do cupom (Não Implementado
       Completamente);       


  •	Javascript:

    •	app – cria o módulo da aplicação angular, injeta o módulo ionic e passa configurações do cordova para a
	    aplicação;

    • routeConfig – gerencia as rotas/estados da aplicação, informando seus endereços, os arquivos usados e os
      controllers de tais rotas;

    •	configValue – guarda os valores das Url's a serem utilizadas para se comunicar com as API's;

    •	cupomService – cria as funções para se comunicar com a API servidora desta aplicação utilizando uma Url
      armazenada em configValue;

    •	ocrService – cria as funções para se comunicar com a API de OCR utilizando uma Url armazenada em
     configValue (Não Implementado Completamente);

    •	cupomCtrl – controller utilizado para gerenciar as operações envolvendo o cadastramento manual do
      cupom fiscal;

    • uiCnpjDirective – cria uma diretiva que possibilita apenas a digitação de um cnpj formatado dentro de
      um "input" HTML (99.999.999/9999-99), retornando uma string com apenas números;

    • uiCooDirective – cria uma diretiva que possibilita apenas a digitação de um coo formatado dentro de
      um "input" HTML (999999), retornando uma string com apenas números;

    • uiDateDirective – cria uma diretiva que possibilita apenas a digitação de uma data formatada dentro de
      um "input" HTML (DD/MM/AAAA), retornando um objeto do tipo data;

    • uiMoneyDirective – cria uma diretiva que possibilita apenas a digitação de um valor em dinheiro dentro
      de um "input" HTML (R$ 9,99), retornando um número decimal;

    • uiFocusDirective – cria uma diretiva que dá foco a um elemento HTML que possui um 'name' com mesmo valor
      da variavel focus.
