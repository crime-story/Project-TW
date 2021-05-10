//let form = document.getElementById('Rezervari'); 
//form.addEventListener('submit', (event) => { console.log(event); });

let rezervari = [];

function myFunction() {
    var x = document.getElementById("nume");
    var y = document.getElementById("data");
    var z = document.getElementById("telefon");

    rezervari.push([x.value, y.value , z.value]);

    let div = document.getElementById("Text");
    div.innerText = " ";

    for (let i = 0; i < rezervari.length; i++) {
        let div = document.getElementById("Text");
        let rezervare = document.createElement("rezervare");
        rezervare.innerText = rezervari[i] + " " + "\n";
        // console.log(rezervare);
        var deleteButton = document.createElement("eliminaRezervare");


        div.appendChild(rezervare);

        const temp = ` 
                <tr id=' + x +'>
                    <td>{.nume}</td>
                    <td>{planta.plantat}</td>
                    <td>{planta.cules}</td>
                    <td>
                        <button class="deleteButton">Delete</button>
                    </td>
                </tr>`




    }
    // let div = document.getElementById("Text");
    // div.appendChild(rezervari);
    return false;
    // var text = "Input OK";

    // //Get the value of input field with id="numb"
    // x = document.getElementById("numb").value;

    // // If x is Not a Number, or x is less than one, or x is grather than 10 then
    // if (isNaN(x) || x < 1 || x > 10) {
    //     text = "Not valid";
    // }
    // document.getElementById("demo").innerHTML = text;
}

container.innerHTML = `<table id="tabelPlante">
        <tr>
            <th>Nume</th>
            <th>Plantare</th>
            <th>Culegere</th>
            <th>creion.jpg</th>
        </tr>
    </table>`;



listaPlante.forEach(planta => {
    const temp = ` 
                <tr id=' + x +'>
                    <td>${planta.nume}</td>
                    <td>${planta.plantat}</td>
                    <td>${planta.cules}</td>
                    <td>
                        <button class="deleteButton">Delete</button>
                    </td>
                </tr>`

    container.insertAdjacentHTML('beforeend', temp);
});

// function PozaUrmatoare() {
//     if (PozeIndex < poze.length - 1) {
//         PozeIndex += 1;
//     }
//     else
//         PozeIndex = 0;
//     PozeContainer.removeChild(img);
//     img.src = poze[PozeIndex];
//     PozeContainer.appendChild(img);
// }

// window.addEventListener("keydown", function (e) {
//     if (e.key == "ArrowLeft")
//     {
//         PozaAnterioara();
//     }
//     else if(e.key == "ArrowRight")
//     {
//         PozaUrmatoare();
//     }
// })


