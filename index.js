// Import packages
const express = require("express"); // importez frameworkuri
const morgan = require("morgan"); // optional probabil pt loguri
const bodyParser = require("body-parser"); // parseaza body il face sa fie json
// daca il scot nu as mai putea face body parser
const cors = require("cors"); // daca lasam gol il putea accesa oricine
//
const uuid = require("uuid");

const fs = require("fs");

// Aplicatia
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

// Create
app.post("/restaurant", (req, res) => {
    const rezervari = readJSONFile();
    let newRezervare = {
        id: uuid.v4.apply(),
        nume: req.body.nume,
        data1: req.body.data1,
        telefon: req.body.telefon
    }
    // adaugam noua rezervare in lista noastra
    rezervari.push(newRezervare);
    writeJSONFile(rezervari);
    // trimit raspuns catre frontend ca totul a fost in regula
    res.status(200).send(newRezervare); // trimitem noua rezervare care sa aiba setat atributul de id
    // status 200 inseamna success
});


function getRezervareById (id) {
    const rezervari = readJSONFile();
    let rezervare = null;
    rezervari.forEach(dog => {
        if(dog.id === id) {
            rezervare = dog;
        }
    })
    return rezervare;
}

// Read One
app.get("/restaurant/:id", (req, res) => {
    let id = req.params.id; // luam id-ul pe care il cautam pentru rezervare
    let rezervare = getRezervareById(id)
    if(rezervare === null) { // se uita pe tipul de date ===
        res.status(404).send("Nu exista rezervarea!");
    } else {
        res.status(200).send(rezervare);
    }
});

// Read All
app.get("/restaurant", (req, res) => {
    const rezervari = readJSONFile();
    if (rezervari!= undefined && rezervari.length !=0){
        res.status(200).send(rezervari);
    }
    else {
        res.status(404).send("Nu exista rezervari!");
    }
});

function updateRezervare (id, rezervare) {
    const rezervari = readJSONFile();
    let update = null;
    for(let i = 0; i < rezervari.length; i++) {
        if(rezervari[i].id === id) {
            if(rezervare.nume) {
                rezervari[i].name = rezervare.nume;
            }

            if(rezervare.data1) {
                rezervari[i].img = rezervare.data1;
            }

            if(rezervare.telefon) {
                rezervari[i].img = rezervare.telefon;
            }
            update = rezervari[i];
            break;
        }
    }
    writeJSONFile(rezervari);
    return update;
}

// Update
app.put("/restaurant/:id", (req, res) => {
    let id = req.params.id; // id-ul rezervarii pe care vreau sa o actualizez
    let exista = false; // daca exista rezervarea
    let update = req.body;
    const rezervari = readJSONFile();
    for(let i = 0; i < rezervari.length; i++) { // iteram prin toate rezervarile si o cautam dupa id
        if(rezervari[i].id === id) { // am gasit rezervarea pe care vrem sa o actualizam
            // ca sa actualizam cate un camp, nu toate folosim if la fiecare informatie a rezervarii
            if(update.nume) {
                rezervari[i].nume = update.nume; // actualizam numele persoanei
            }

            if(update.data1) {
                rezervari[i].data1 = update.data1; // actualizam data rezervarii persoanei
            }

            if(update.telefon) {
                rezervari[i].telefon =  update.telefon; // actualizam telefonul persoanei
            }
            exista = true;
            break; // opresc iteratiile pentru ca am gasit rezervarea
        }
    }

    if(exista === true) { // daca am gasit o rezervare si am actualizat-o
        // suntem obligati sa rescriem fisierul db.json
        writeJSONFile(rezervari);
        res.status(200).send("Rezervarea s-a actualizat!");
    }
    else { // daca nu am gasit rezervarea
        res.status(404).send("Nu exista rezervarea!");
        // conventia 404 este pentru Not Found!
    }
});

// Delete
app.delete("/restaurant/:id", (req, res) => {
    const rezervari = readJSONFile();
    let id = req.params.id; // id-ul rezervarii pe care vreau sa o stergem
    let exista = false; // daca exista rezervarea
    for(let i = 0; i < rezervari.length; i++) { // iteram prin toate rezervarile si o cautam dupa id
        if(rezervari[i].id === id) {
            exista = true;
            rezervari.splice(i, 1); // sterg rezervarea de pe pozitia i
            // splice  sterge de la indexul i atatea elemente cate indica al doilea argument
            break;
        }
    }

    if(exista === true) {
        writeJSONFile(rezervari);
        res.status(200).send("Rezervarea a fost stersa!");
    } else {
        res.status(404).send("Nu exista rezervarea!");
    }
});

// Functia de citire din fisierul db.json
function readJSONFile() {
    return JSON.parse(fs.readFileSync("db.json"))["restaurant"];
}

// Functia de scriere in fisierul db.json
function writeJSONFile(content) {
    fs.writeFileSync(
        "db.json",
        JSON.stringify({ "restaurant": content }, null, 4),
        "utf8",
        err => {
            if (err) {
                console.log(err);
            }
        }
    );
}

// Pornim server-ul
app.listen("3000", () =>
    console.log("Server started at: http://localhost:3000")
);