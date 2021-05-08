document.querySelector('.get-joke').addEventListener('click', getJokes);

function getJokes(e) {
    const number = document.querySelector('input[type="number"]').value;
    //console.log(number);
    const xhr = new XMLHttpRequest();

    xhr.open("GET", `http://api.icndb.com/jokes/random/${number}`, true); //<--third parameter for ASYNC call

    xhr.onload = function () {
        //console.log(this.status);
        if (this.status === 200) {
            const response = JSON.parse(this.responseText);

            let output = '';

            if (response.type === 'success') {
                response.value.forEach(element => {
                    
                    output += `<li>${element.joke}</li>`;
                });
            } else {
                output += `<li>stuff went wrong</li>`
            }
            document.querySelector('.jokes').innerHTML = output;
        }
    }
    xhr.send();

    e.preventDefault();
}