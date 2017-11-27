// Raquib Talukder
// IP Development
// app.js

var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    request = require('request'),
    path = require('path'),
    app = express();

var admin_username = 'admin'
var admin_password = 'password'

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('views', path.join(__dirname + '/public/signup'));
app.set('view engine', 'ejs');

// index.html
app.get('/', function(req, res) {
    res.sendFile('index.html', {
        'root': __dirname + '/public/index'
    });
});

// signin.html
app.get('/signIn', function(req, res) {
    res.sendFile('signin.html', {
        'root': __dirname + '/public/signin'
    });
});

// signup.html
app.get('/signUp', function(req, res) {
    res.render('signup', {error:'', 'root':__dirname + '/public/signup'})
});

// registering first time user
app.post('/register', function(req, resp) {
    var _firstName = req.body.inputFirstName;
    var _lastName = req.body.inputLastName;
    var _username = req.body.inputUsername;
    var _password = req.body.inputPassword;

    var options = {
        url: 'http://172.17.0.2:5000/users/',
        method: 'POST',
        auth: {
            user: 'admin',
            password: 'password'
        },
        formData: {
            firstname: _firstName,
            lastname: _lastName,
            username: _username,
            password: _password
        }
    }

    request(options, function(err, res, body) {
        if (err) {
            return resp.render('signup', {
                error: err
            })
        }
        var result = JSON.parse(body)
        if (result._status == 'ERR') {
            if (result._error.code == '400') {
                return resp.render('signup', {
                    error: 'Username Already Exists!'
                })
            }
            return resp.render('signup', {
                error: result._issues.username
            })
        } else {
            console.log('User has been created');
            resp.redirect('/');
        }
    })
});

// hit app at http://localhost:3000
console.log("* Running on http://172.17.0.2:3000/ (Press CTRL+C to quit)")
app.listen(3000)
