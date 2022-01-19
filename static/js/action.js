const buttons = document.querySelectorAll("button")

for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].className != "effects") {
    buttons[i].addEventListener("click", () => {
        
        const warning = document.createElement("DIV")
        warning.innerText = "Action saved. To refresh, please reload the page."
        warning.classList.add("actions")
        document.body.appendChild(warning)
        const warnings = document.getElementsByClassName("actions")
        
        setTimeout(() => {
            for (let i = 0; i < warnings.length; i++) {
                warnings[0].parentNode.removeChild(warnings[0])
            }
        }, 2000)
    })
}
}