// // import express application
const express = require("express");
// import body-parser module
const bodyParser = require("body-parser");
// import bcrypt module
const bcrypt = require("bcrypt");
// import multer module
const multer = require("multer");
// import path module
const path = require("path");
// import jwt module
const jwt = require('jsonwebtoken');
// import express-session module
const session = require('express-session');

// import module mongoose
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/educatDB');
// create express application
const app = express();
// configuration de l'application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join('backend/images')));
app.use('/files', express.static(path.join('backend/files')));
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'application/pdf': 'pdf',
}

// configuration multer
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        let uploadPath = 'backend/images'; // Dossier par défaut pour les images

        if (req.body.role == 'teacher') {
            uploadPath = 'backend/files'; // Dossier spécifique pour les enseignants
        }


        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const ifname = name + '-' + Date.now() + '-crococoder-' + '.' + extension;
        cb(null, ifname);
    }
});


// configuration multer
const coursConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        let uploadPath = 'backend/images'; // Dossier par défaut pour les images



        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const ifname = name + '-' + Date.now() + '-crococoder-' + '.' + extension;
        cb(null, ifname);
    }
});

// configuration session storage
const secretKey = 'your-secret-key';
app.use(session({
    secret: secretKey,
}));
// Security configuration concernant business logic
app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader(

        "Access-Control-Allow-Headers",

        "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"

    );

    res.setHeader(

        "Access-Control-Allow-Methods",

        "GET, POST, DELETE, PATCH, PUT"

    );

    next();

});
// models importation 
const User = require("./models/user");
const Cours = require("./models/cour");
const Note = require("./models/note")


// Business Logic: login user
app.post("/users/login", (req, res) => {
    console.log("here into BL :login", req.body);
    let result;
    User.findOne({ $or: [{ email: req.body.email }, { tel: req.body.tel }] }).then((doc) => {
        console.log("here finded User by email or tel", doc);
        if (!doc) {
            res.json({ msg: "please check your email or tel" })
        } else {
            result = doc
            bcrypt.compare(req.body.pwd, doc.pwd).then((pwdCompare) => {
                console.log("here pwdCompare", pwdCompare);
                if (pwdCompare) {
                    // If the user is valid, generate a JWT token
                    const token = jwt.sign({
                        firstName: result.firstName,
                        lastName: result.lastName,
                        id: result._id,
                        role: result.role,
                        status: result.status
                    },
                        secretKey, { expiresIn: '1h' });
                    res.json({
                        msg: "welcome",
                        token: token
                    })
                } else {
                    res.json({ msg: "please check your pwd" })
                }
            })

        }
    })

});
// business Logic: signup users
app.post("/users/subscription", multer({ storage: storageConfig }).fields([
    { name: 'img', maxCount: 1 }, { name: 'file', maxCount: 1 }]), (req, res) => {
        console.log("here into BL : sign up", req.body);
        User.findOne({ email: req.body.email }).then((doc) => {
            if (doc) {
                res.json({ msg: "oops, Email Exist" })
            } else {
                bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
                    console.log("here crypted pwd", cryptedPwd);
                    req.body.pwd = cryptedPwd;

                    if (req.body.role == "student") {
                        req.body.img = `http://localhost:3000/images/${req.files['img'][0].filename}`
                        const user = new User({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            pwd: req.body.pwd,
                            tel: req.body.tel,
                            img: req.body.img,
                            adresse: req.body.adresse,
                            role: req.body.role,
                        });
                        user.save((err, doc) => {
                            if (err) {
                                res.json({ msg: " Failed" });
                            } else {
                                res.json({ msg: " Added with successs" });
                            }
                        });

                    } else if (req.body.role == "teacher") {
                        req.body.file = `http://localhost:3000/files/${req.files['file'][0].filename}`;
                        const user = new User({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            pwd: req.body.pwd,
                            tel: req.body.tel,
                            file: req.body.file,
                            adresse: req.body.adresse,
                            status: req.body.status,
                            role: req.body.role,
                            speciality: req.body.speciality
                        });
                        user.save((err, doc) => {
                            if (err) {
                                res.json({ msg: " Failed" });
                            } else {
                                res.json({ msg: " Added with successs" });
                            }
                        });
                    }

                    else if (req.body.role == "parent") {
                        User.findOne({ tel: req.body.telEnfant, role: "student" }).then((doc) => {
                            if (!doc) {
                                res.json({ msg: " Please Verif your tel Child" });
                            }
                            else {
                                const user = new User({
                                    firstName: req.body.firstName,
                                    lastName: req.body.lastName,
                                    email: req.body.email,
                                    pwd: req.body.pwd,
                                    tel: req.body.tel,
                                    adr: req.body.adr,
                                    role: req.body.role,
                                    telEnfant: req.body.telEnfant,

                                });
                                user.save((err, doc) => {
                                    if (err) {
                                        res.json({ msg: " Failed" });
                                    } else {
                                        res.json({ msg: " Added with successs" });
                                    }
                                });
                            }
                        });

                    } else if (req.body.role == "admin") {

                        const user = new User({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            pwd: req.body.pwd,
                            tel: req.body.tel,
                            adresse: req.body.adresse,
                            role: req.body.role,
                        });
                        user.save((err, doc) => {
                            if (err) {
                                res.json({ msg: " Failed" });
                            } else {
                                res.json({ msg: " Added with successs" });
                            }
                        });
                    }



                });
            }
        })
    });

//Business Logic: get all users
app.get("/users", (req, res) => {
    console.log("here into BL: Get All Users");

    User.find().then((docs) => {
        res.json({ users: docs });
    })
});
// Business Logic : Get User By Id

app.get("/users/:id", (req, res) => {
    console.log("here to BL: get User By Id");
    User.findById(req.params.id).then((doc) => {
        res.json({ user: doc })
    })

});
//Business Logic: Edite  user
app.put("/users", (req, res) => {
    console.log("here into BL : edit User");
    let newUser = req.body;

    User.updateOne({ _id: req.body._id }, newUser).then((updateResponse) => {
        console.log("here response after update", updateResponse);
        if (updateResponse.nModified == 1) {
            res.json({ isUpdated: true });
        } else {
            res.json({ isUpdated: false });
        }
    })
});

// Business Logic : Delete User
app.delete("/users/:id", (req, res) => {
    console.log("here into BL: delete user");
    let userId = req.params.id
    User.deleteOne({ _id: userId }).then((deleteResponse) => {
        console.log("here response after delete", deleteResponse);

        if (deleteResponse.deletedCount == 1) {
            res.json({ msg: "delete user with success" })
        } else {
            res.json({ msg: "Error" })
        }
    })
})

// business logic : get All cours
app.get("/cours", (req, res) => {
    console.log("here to business logic : get All cours");

    Cours.find().populate("teacher").populate("students").then((docs) => {
        res.json({ cours: docs });
    })
})
// business logic : get cour By Id
app.get("/cours/:id", (req, res) => {
    console.log("here into BL: get cour by Id ");
    Cours.findById(req.params.id).then((doc) => {
        res.json({ cour: doc })
    })
})
// business logic : Add Cours
app.post("/cours", multer({ storage: coursConfig }).single("img"), (req, res) => {
    console.log("here to business logic:add cour", req.body);

    req.body.img = `http://localhost:3000/images/${req.file.filename}`
    const cour = new Cours({
        nameCour: req.body.nameCour,
        description: req.body.description,
        dure: req.body.dure,
        teacher: req.body.teacher,
        avatar: req.body.img,

    })
    cour.save((err, doc) => {
        if (err) {
            res.json({ msg: "ERROR" })
        } else {

            res.json({ msg: "added with success" })
        }
    })


})

// business logic : edit cours
app.put("/cours", (req, res) => {
    console.log("here to business logic : edit Cour");
    let newCour = req.body;

    Cours.updateOne({ _id: req.body._id }, newCour).then((updateResponse) => {
        if (updateResponse.nModified == 1) {
            res.json({ isUpdated: true })
        } else {
            res.json({ isUpdated: false })
        }
    })
})
// business logic : delete cours
app.delete("/cours/:id", (req, res) => {
    console.log("here into BL :Delete cour");
    let courId = req.params.id
    Cours.deleteOne({ _id: courId }).then((deleteResponse) => {
        if (deleteResponse.deletedCount == 1) {
            res.json({ msg: "delete with success" })
        } else {
            res.json({ msg: "Error" })
        }
    })
})
// Business Logic : details cours
app.get("/cours/details/:courId", (req, res) => {
    const courId = req.params.courId;

    Cours.findById({ _id: courId })
        .populate('students', 'firstName lastName').then((doc) => {

            res.json({ cour: doc })

        })
});

// Business logic: affecte student dans un cours
app.post("/users/affecteStudent", (req, res) => {
    console.log("here INTO TO BL", req.body);
    const { studentId, courId } = req.body;

    User.findOne({ _id: studentId, role: 'student' }).then((student) => {
        console.log("here ", student);


        if (!student) {
            res.json({ msg: "Student Not Founded" });
        }
        Cours.findOne({ _id: courId }).then((cour) => {
            console.log("here into BL", cour);
            if (!cour) {
                return res.json({ msg: "cour not founded" })
            }

            // Ajoutez l'étudiant au cours
            cour.students.push(studentId);
            cour.save((err, doc) => {
                if (err) {
                    res.json({ msg: "failed" })
                } else {
                    student.save()
                    res.json({ msg: "Added with success" });
                }


            })
        })
    })

})
// business logic: Add Note
app.post("/notes", (req, res) => {
    console.log("here into BL ", req.body);
    const idCour = req.body.idCour
    const idStudent = req.body.idStudent
    User.findOne({ _id: idStudent }).then((student) => {
        console.log("here into BL", student);
        if (!student) {
            return res.json({ msg: "student not founded" })
        }

        Cours.findOne({ _id: idCour }).then((cour) => {
            console.log("here into BL", cour);
            if (!cour) {
                return res.json({ msg: "cour not founded" })
            }
            const note = new Note({
                note: req.body.note,
                evaluation: req.body.evaluation,
                cour: cour._id,
                student: student._id,

            })
            note.save((err, doc) => {
                if (err) {
                    res.json({ msg: "failed" })
                } else {
                    student.note = doc._id
                    student.save();
                    res.json({ msg: "added with success" })
                }

            })
        })
    })
})

// make app importable from another files
module.exports = app;