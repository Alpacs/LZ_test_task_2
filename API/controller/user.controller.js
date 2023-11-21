const db = require('../db')
const func = require('./func')
const { jsPDF } = require("jspdf");
require('jspdf-autotable');

class FpController {
    async deleteUsers(req, res) {
        await db.query('TRUNCATE TABLE queue CASCADE');
        res.json('Ok')
    }
    async addPerson (req,res) {
        const {name, surname} = req.body;
        let id_queue, response = null;
        let date_added = await fetch('https://worldtimeapi.org/api/ip')
            .then(result=> {
                return result.json()
            })
        try {
           id_queue = await func.generateID("queue", 'id_queue')
        } catch (err) {
            console.log(err)
        }
        console.log(date_added.datetime)

        try {
            response = db.query('INSERT INTO queue (id_queue, name, surname, date_added) values($1, $2, $3, $4) RETURNING*', [id_queue, name, surname, date_added.datetime])
            .then(result => {
                console.log(result.rows)
            })
        } catch (err) {
            console.log(err)
        }
        
        res.json(response)
    }
    async getPDF (req, res) {
        const DOC = new jsPDF()

        const users = await db.query('SELECT * FROM queue ORDER BY date_added')

        const columns = ['Place', "Name", 'Surname']
        let rows = []
        for(let i = 0; i<users.rowCount; i++) {
            rows.push([`${users.rows[i].name}`, `${users.rows[i].surname}`, `${String(users.rows[i].date_added).slice(4,24)}`])
        }
        
        DOC.autoTable(columns, rows,{startY: 25})
        DOC.text("Queue", 14, 15);
        DOC.save('dataModel.pdf');

        res.json(rows)
    }
}

module.exports = new FpController()