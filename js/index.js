(function (DOM, doc) {
  'use strict';
  /*
  Já temos as funcionalidades de adicionar e remover um carro. Agora, vamos persistir esses dados, 
  salvando-os temporariamente na memória de um servidor.
  
  Nesse diretório do `challenge-32` tem uma pasta `server`. É um servidor simples, em NodeJS, para 
  que possamos utilizar para salvar as informações dos nossos carros.
  
  Para utilizá-lo, você vai precisar fazer o seguinte:
  
  - Via terminal, acesse o diretório `server`;
  - execute o comando `npm install` para instalar as dependências;
  - execute `node app.js` para iniciar o servidor.
  
  Ele irá ser executado na porta 3000, que pode ser acessada via browser no endereço: 
  `http://localhost:3000`
  
  O seu projeto não precisa estar rodando junto com o servidor. Ele pode estar em outra porta.
  As mudanças que você irá precisar fazer no seu projeto são:
  
  - Para listar os carros cadastrados ao carregar o seu projeto, faça um request GET no endereço
  `http://localhost:3000/car`
  - Para cadastrar um novo carro, faça um POST no endereço `http://localhost:3000/car`, enviando
  os seguintes campos:
    - `image` com a URL da imagem do carro;
    - `brandModel`, com a marca e modelo do carro;
    - `year`, com o ano do carro;
    - `plate`, com a placa do carro;
    - `color`, com a cor do carro.
  
  Após enviar o POST, faça um GET no `server` e atualize a tabela para mostrar o novo carro cadastrado.
  
  Crie uma branch `challenge-32` no seu projeto, envie um pull request lá e cole nesse arquivo a URL
  do pull request.
  */
  var app = (() => {
    return {
      init: function init() {
        this.company()
        this.getCarsData()
        this.initEvents()
      },

      initEvents: function initEvents() {
        DOM('[data-js="button"]').on('click', app().handleRegister, false)
      },

      handleRegister: function handleRegister(event) {
        event.preventDefault()

        var data = app().getValuesFromInputs()
        var ajaxPost = new XMLHttpRequest()

        ajaxPost.open('POST', 'http://localhost:3000/car')
        ajaxPost.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        ajaxPost.send(`image=${data[0]}&brandModel=${data[1]}&year=${data[2]}&plate=${data[3]}&color=${data[4]}`)
        app().clearTable()
      },

      clearTable: function clearTable() {
        var $table = new DOM('tr')
        console.log($table)
        $table.forEach((element) => {
          element.parentNode.removeChild(element)
        });
        app().getCarsData()
      },

      getValuesFromInputs: function getValuesFromInputs() {
        var $inputs = new DOM('[data-js="inputs"]')
        var data = $inputs.map((element) => element.value)
        return data
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
      },

      getCarsData: function getCarsData() {
        var ajax = new XMLHttpRequest()
        var data = []
        ajax.open('GET', 'http://localhost:3000/car')
        ajax.send()
        ajax.onreadystatechange = () => {
          if (ajax.readyState === 4) {
            data = JSON.parse(ajax.responseText)

            data.forEach(app().addNewRow);
          }
        }
      },

      addNewRow: function addNewRow() {
        var $table = new DOM('[data-js="table"]').get()
        $table[0].appendChild(app().createNewRow(arguments[0]))
      },

      createNewRow: function createNewRow(data) {
        var $tr = document.createElement('tr')
        var $tdImage = document.createElement('td')
        var $carImage = document.createElement('img')
        var $carModel = document.createElement('td')
        var $carYear = document.createElement('td')
        var $carPlate = document.createElement('td')
        var $carColor = document.createElement('td')
        var $carRemove = document.createElement('td')
        var $removeCar = document.createElement('button')

        $carImage.src = data.image
        $carModel.textContent = data.brandModel
        $carYear.textContent = data.year
        $carPlate.textContent = data.plate
        $carColor.textContent = data.color

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

        $tr.className = 'car'

        return $tr
      },


      removeCar: function removeCar() {
        if (this.parentNode) {
          this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)
        }
      }
    }
  })

  app().init()

})(window.DOM, document);