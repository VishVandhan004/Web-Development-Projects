const populate = async (value, currency) => {
    let myStr = ""
    url = "https://api.currencyapi.com/v3/latest?apikey=cur_live_6l55ck7TAi9u0CP6rdkTsQggGrV4ZVq91vsP0TLK&base_currency=" + currency;
    let response = await fetch(url)
    let rJson = await response.json()
    for (let key in Object.keys(rJson["data"])){
        myStr += `<tr>
                        <td> ${key}</td>
                        <td>${rJson["data"][key]["code"]}</td>
                        <td>${rJson["data"][key]["value"]* value}</td>
        </tr>
    `
    }
    const tablebody = document.querySelector("tbody");
    tablebody.innerHTML = myStr;
}

const btn = document.querySelector('btn');
btn.addEventListener("click", (e) => {
    e.preventDefault()
    console.log("button is clicked");
    const value = parseInt(document.querySelector("input[name='quantity']").value);
    const currency = document.querySelector("select[name='currency']").value
    populate(value, currency)
})