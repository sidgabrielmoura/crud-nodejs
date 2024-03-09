import {sql} from './db.js'

// sql`DROP TABLE IF EXISTS adverts`.then(() => {
//     console.log('table deletada!')
// })

sql`
    CREATE TABLE adverts (
        id          TEXT PRIMARY KEY,
        title       TEXT,
        description TEXT,
        price       INTEGER
    )
`.then(() => {
    console.log('table created!')
})