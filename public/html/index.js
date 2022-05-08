

const mainDiv = document.querySelector("#root")
const input = document.createElement("input")
input.type = 'text'
const button = document.createElement("button")
button.innerHTML = 'Submit'


button.addEventListener("click" , () => {
    fetch('https://crypto-currency-node.herokuapp.com/', {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({value: input.value})
    })
})
mainDiv.appendChild(input)
mainDiv.appendChild(button)