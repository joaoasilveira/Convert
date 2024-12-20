//Cotação das moedas no dia.
const USD = 6.10
const EUR = 6.33
const GBP = 7.64

//Obtendo os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

//Manipulando o input para receber apenas números.
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex, "")
})

//Capturando o evento de submit do formulário.
form.onsubmit = (event) => {
  event.preventDefault()

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$")
      break
    case "EUR":
      convertCurrency(amount.value, EUR, "€")
      break
    case "GBP":
      convertCurrency(amount.value, GBP, "£")
  }
}

//Função para converter a moeda.
function convertCurrency(amount, price, symbol){
  try {
    //Exibe a cotação da moeda selecionada.
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

    //Calcula o total.
    let total = amount * price

    //Verifica se o resultado não é um número.
    if(isNaN(total)) {
      return alert("Por favor, digite o valor corretamente.")
    }

    //Formatar o valor total.
    total = formatCurrencyBRL(total).replace("R$", "")

    //Exibe o resultado total.
    result.textContent = `${total} Reais`

    //Aplica a classe que exibe o footer com o resultado.
    footer.classList.add("show-result")
  } catch (error) {
    console.log(error)
    //Remove a classe que exibe o footer, ocultando-o da tela.
    footer.classList.remove("show-result")
    alert("Não foi possível converter.")
  }
}

//Formata a moeda em Real Brasileiro.
function formatCurrencyBRL (value) {
  //Converte para número para utilizar o toLocaleString para formatar no padrão BRL (R$ 00,00).
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL", 
  })
}