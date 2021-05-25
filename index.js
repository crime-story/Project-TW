// Import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
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
    res.status(200).send(newRezervare);
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
    let id = req.params.id;
    let rezervare = getRezervareById(id)
    if(rezervare === null) {
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
    let id = req.params.id;
    let exista = false;
    let update = req.body;
    const rezervari = readJSONFile();
    for(let i = 0; i < rezervari.length; i++) {
        if(rezervari[i].id === id) {
            if(update.nume) {
                rezervari[i].nume = update.nume;
            }

            if(update.data1) {
                rezervari[i].data1 = update.data1;
            }

            if(update.telefon) {
                rezervari[i].telefon =  update.telefon;
            }
            exista = true;
            break;
        }
    }

    if(exista === true) {
        writeJSONFile(rezervari);
        res.status(200).send("Updatat!");
    }
    else {
        res.status(404).send("Nu exista rezervarea!");
    }
});

// Delete
app.delete("/restaurant/:id", (req, res) => {
    const rezervari = readJSONFile();
    let id = req.params.id;
    let exista = false;
    for(let i = 0; i < rezervari.length; i++) {
        if(rezervari[i].id == id) {
            exista = true;
            rezervari.splice(i, 1);
            break;
        }
    }

    if(exista === true) {
        writeJSONFile(rezervari);
        res.status(200).send("Restaurant sters!");
    } else {
        res.status(404).send("Nu exista!");
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