const   express     = require('express'),
        bodyParser  = require('body-parser'),
        app         = express(),
        path        = require('path'),
        cors        = require('cors'),
        MongoClient = require('mongodb').MongoClient,
        ObjectId    = require('mongodb').ObjectId,
        rateLimit   = require("express-rate-limit");

require('dotenv').config();

const corsOptions = {
    origin: "https://krok-en.onrender.com",
};

MongoClient.connect(process.env.MONGODB_URI)
.then(client => {
    console.log('Connected sucessfully to DB');

    app.use(express.static(path.resolve(__dirname, '../client/build')));
    app.use(cors(corsOptions));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    const   db                  = client.db('rest-users'),
            usersCollection     = db.collection('users'),
            postsCollection     = db.collection('rest_posts'),
            PORT                = process.env.PORT || 3002;

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    });

    app.post('/signin', (req, res) => {
        usersCollection.findOne({
            name: req.body.username, 
            password: req.body.password
        })
        .then(result => {
            if (result) {
                res.send(result);
            } else {
                res.sendStatus(404);
            }
        })
    });

    app.post('/signup', (req, res) => {
        usersCollection.findOne({
            name: req.body.username, 
        })
        .then(result => {
            if (result) {
                res.sendStatus(403);
            } else {
                usersCollection.insertOne({
                    business_name: req.body.business_name,
                    type_business: req.body.type_business,
                    name: req.body.username,
                    password: req.body.password,
                    who: req.body.who,
                    bonus: req.body.bonus
                }).then(resp => {
                    res.send(resp);
                })
            }
        })
    });

    app.get('/me/:id', (req, res) => {
        let id = new ObjectId(req.params.id);
        usersCollection.findOne({
            _id: id
        })
        .then(result => {
            if (result) {
                res.send(result);
            } else {
                res.sendStatus(404);
            }
        })
    });

    app.get('/posts/:business_name', (req, res) => {
        postsCollection.find({
            business_name : req.params.business_name,
            deleted : false,
            status : "active"
        }).toArray()
        .then(result => {
            if (result) {
                res.send(result);
            } else {
                res.sendStatus(404);
            }
        })
    });

    app.get('/users', (req, res) => {
        usersCollection.find({
            who : "visitor"
        }).toArray()
        .then(result => {
            if (result) {
                res.send(result);
            } else {
                res.sendStatus(404);
            }
        })
    });

    app.post('/offer', (req, res) => {
        postsCollection.findOne({
            condition: req.body.condition,
            required_bonuses: req.body.required_bonuses,
            gift: req.body.gift,
            deleted : false
        })
        .then(result => {
            if (result) {
                res.sendStatus(403);
            } else {
                postsCollection.insertOne({
                    business_name: req.body.business_name,
                    condition: req.body.condition,
                    required_bonuses: req.body.required_bonuses,
                    gift: req.body.gift,
                    deleted : false,
                    status : "active"
                }).then((resp) => {
                    res.send(resp);
                })
            }
        })
    });

    app.delete('/posts', (req, res) => {      
        let id = new ObjectId(req.body.id);
        postsCollection.updateOne(
            {
                _id: id,
                deleted: false,
                status : "active"
            },
            {
                $set: {deleted: true}
            }
        )
        .then(result => {
            if (result) {
                res.send(result);
            } else {
                res.sendStatus(404)
            }
        })
    });

    app.get('/oldPosts/:business_name', (req, res) => {
        postsCollection.find({
            business_name : req.params.business_name,
            deleted : true,
            status : "active"
        }).toArray()
        .then(result => {
            if (result) {
                res.send(result);
            } else {
                res.sendStatus(404);
            }
        })
    });

    app.delete('/forever', (req, res) => {
        let id = new ObjectId(req.body.id);
        postsCollection.updateOne(
            {
                _id: id,
                deleted: true,
                status : "active"
            },
            {$set: {status: "inactive"}}
        )
        .then(result => {
            if (result) {
                res.send(result);
            } else {
                res.sendStatus(400);
            }
        })
    });

    app.post('/returnPost', (req, res) => {
        let id = new ObjectId(req.body.id);
        postsCollection.updateOne(
            {
                _id: id,
                deleted: true
            },
            {$set: {deleted: false}}
        )
        .then(result => {
            if (result) {
                res.send(result);
            } else {
                res.sendStatus(404)
            }
        })
    });

    app.post('/spendbonus', (req, res) => {
        let id = new ObjectId(req.body.id);
        let amount = req.body.bonus;
        usersCollection.find(
            { _id: id }
        )
        .toArray()
        .then(result => {
            if (result[0].bonus >= amount) {
                usersCollection.updateOne(
                    { _id: id },
                    { $inc: {bonus: -amount} }
                )
                .then(
                    res.send(result)
                )
            } else {
                res.sendStatus(400)
            }
        })
    });

    app.use(
        rateLimit({
        //   windowMs: 12 * 60 * 60 * 1000,
          windowMs: 5 * 60 * 1000,
          max: 1,
          headers: true
        })
    );

    app.post('/getbonus', (req, res) => {
        let id = new ObjectId(req.body.id);
        usersCollection.updateOne(
            {
                _id: id
            },
            {$inc: {bonus: 1}}
        )
        .then(result => {
            if (result) {
                res.send(result);
            } else {
                res.sendStatus(400)
            }
        })
    });

    app.listen(PORT, function() {
        console.log(`Listening on port ${PORT}`);
    });
})
.catch(error => console.log(error));