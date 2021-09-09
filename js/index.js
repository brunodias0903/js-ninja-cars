(function (DOM, doc) {
  'use strict';

  /*
  agora vamos criar a funcionalidade de "remover" um carro. Adicione uma nova
  coluna na tabela, com um botão de remover.

  Ao clicar nesse botão, a linha da tabela deve ser removida.

  Faça um pull request no seu repositório, na branch `challenge-31`, e cole
  o link do pull request no `console.log` abaixo.

  Faça um pull request, também com a branch `challenge-31`, mas no repositório
  do curso, para colar o link do pull request do seu repo.
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
        var $tr = document.createElement('tr')
        var $tdImage = document.createElement('td')
        var $carImage = document.createElement('img')
        var $carModel = document.createElement('td')
        var $carYear = document.createElement('td')
        var $carPlate = document.createElement('td')
        var $carColor = document.createElement('td')
        var $carRemove = document.createElement('td')
        var $removeCar = document.createElement('button')

        $carImage.src = data[0]
        $carModel.textContent = data[1]
        $carYear.textContent = data[2]
        $carPlate.textContent = data[3]
        $carColor.textContent = data[4]

        $removeCar.setAttribute("data-js", "remove")
        $removeCar.textContent = 'X'
        $removeCar.addEventListener('click', app().removeCar)

        $tdImage.appendChild($carImage)
        $carRemove.appendChild($removeCar)
        $tr.appendChild($tdImage)
        $tr.appendChild($carModel)
        $tr.appendChild($carYear)
        $tr.appendChild($carPlate)
        $tr.appendChild($carColor)
        $tr.appendChild($carRemove)

        return $tr
      },

      removeCar: function removeCar() {
        if(this.parentNode) {
          this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)
        }
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