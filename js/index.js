(function (DOM, doc) {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */
  var app = (() => {
    return {
      init: function init() {
        this.company()
        this.initEvents()
      },

      initEvents: function initEvents() {
        DOM('[data-js="button"]').on('click', app().handleRegister, false)
      },

      handleRegister: function handleRegister(event) {
        event.preventDefault()

        var data = app().getValuesFromInputs()
        var $table = new DOM('[data-js="table"]').get()
        $table[0].appendChild(app().createNewColumn(data))
      },

      getValuesFromInputs: function getValuesFromInputs() {
        var $inputs = new DOM('[data-js="inputs"]')
        var data = $inputs.map((element) => element.value)
        return data
      },

      createNewColumn: function createNewColumn(data) {
        var $table = new DOM('[data-js="table"]')
        var $tr = document.createElement('tr')
        var $tdImage = document.createElement('td')
        var $carImage = document.createElement('img')
        var $carModel = document.createElement('td')
        var $carYear = document.createElement('td')
        var $carPlate = document.createElement('td')
        var $carColor = document.createElement('td')

        $carImage.src = data[0]
        $carModel.textContent = data[1]
        $carYear.textContent = data[2]
        $carPlate.textContent = data[3]
        $carColor.textContent = data[4]

        $tdImage.appendChild($carImage)
        $tr.appendChild($tdImage)
        $tr.appendChild($carModel)
        $tr.appendChild($carYear)
        $tr.appendChild($carPlate)
        $tr.appendChild($carColor)

        return $tr
      },

      company: function company() {
        var ajax = this.openConection()
      },

      openConection: function openConection() {
        var ajax = new XMLHttpRequest
        ajax.open("GET", 'company.json', true)
        ajax.send()

        ajax.addEventListener('readystatechange', this.handleCompanyResquest, false)
      },

      handleCompanyResquest: function handleCompanyResquest() {
        if (app().getCompanyData(this)) {
          app().showCompanyInfo(app().getCompanyData(this))
        }
      },

      showCompanyInfo: function showCompanyInfo(data) {
        var $companyName = new DOM('[data-js="company-name"]').get()
        var $companyPhone = DOM('[data-js="company-phone"]').get()

        $companyName[0].textContent = data.name
        $companyPhone[0].textContent = data.phone
      },

      getCompanyData: function getCompanyData(ajax) {
        var data
        try {
          data = JSON.parse(ajax.responseText)
        } catch (error) {
          data == null
        }
        return data
      }
    }
  })

  app().init()

})(window.DOM, document);