export default function MysqlService() {
    const mysql = require('mysql2');


    const sampleData = mysql.createConnection({
        host: 'localhost',
        user: 'progate',
        password: 'password',
        database: 'list_app'
    });

    sampleData.query(
        'SELECT * FROM list',
        (e: any, results: any) => {
        try{
            console.log(results)
        } catch(e) {
            console.log('error', e)
        }
        }
    )

}
