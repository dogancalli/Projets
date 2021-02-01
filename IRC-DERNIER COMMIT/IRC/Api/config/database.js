let mysql = require('mysql');

let connection = mysql.createConnection({
    
    host : 'localhost',
    
    user : 'root',
    
    password : '',
    
    database : 'irc'

});

connection.connect((err)=>{
    if(!err){
        console.log('connecter à la base de données');
    }
    else{
        console.log('connection échouée');
    }
});

module.exports = connection;