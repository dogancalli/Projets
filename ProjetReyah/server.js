let express = require('express')
let app =express()
let bodyParser = require('body-parser')
let session = require('express-session')
let Minio = require('minio')

var client = new Minio.Client({
    endPoint: 'play.min.io',
    port: 9000,
    useSSL: true,
    accessKey: 'Q3AM3UQ867SPQQA43P2F',
    secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
})



// Template
app.set('view engine', 'ejs')


// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

// Routes
app.get('/', (request, response) => {
    response.render('pages/index');
    response.sendFile(__dirname + 'pages/index');
})

app.get('/presignedUrl', (request, response) => {
    client.presignedPutObject('uploads', request.query.name, (err, url ,obj) => {
        if (err) throw err
        response.end(url)
        console.log(url+'\n'+request.query.name+'\n'+obj)
    })
})


require("./routes/documents.routes.js")(app);
app.listen(8000);