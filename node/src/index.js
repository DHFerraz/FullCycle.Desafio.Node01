const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000

const mysqlConfig = {
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

app.get('/', async (request, response) => {
    await insertPeople();

    const peoples = await getPeoples();

    let names;
    
    peoples.forEach(item => {
        names = `- ${item.name}<br />${(names ? names : '')}`
    });

    response.send(`<h1>Full Cycle Rocks!</h1>${names}`)
})

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})

async function insertPeople() {
    const connection = mysql.createConnection(mysqlConfig)

    const query = `INSERT INTO people (name) VALUES ('Diogo Ferraz ${Math.floor(Math.random() * 101)}')`

    connection.query(query)
    connection.end()
}

async function getPeoples() {
    const connection = mysql.createConnection(mysqlConfig)

    return new Promise((resolve, reject) => {
        connection.query(
          'SELECT * FROM people;',
          (err, results) => {
            if (err) reject(err);
            else {
                connection.end()
                resolve(results)
            };
          },
        );
    });
}