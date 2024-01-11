function say(message) {

    fetch(`./Server/api/${message}`)
        .then((response) => response.json())
        .then((data) => {

            console.log(data);

            if (data.code == 200) {
                console.log("LOGIN SUCCESFUL");
                window.open("spells.html", "_self")
            } else {
                console.log("LOGIN NOT SUCCESFUL");
                document.getElementById("error-div").innerHTML = `<h2>${data.message}</h2>`;
            }

        })
        .catch((error) => {
            console.log(error);
        })

}