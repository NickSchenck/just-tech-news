const router = require("express").Router();
const { User } = require("../../models");

//Get /api/users
router.get("/", (req, res) => {
    //access out User model and run .findAll() method, which acts like SELECT * FROM
    User.findAll({
        attributes: { exclude: ["password"] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Get api/users/1 findOne() acts like SELECT * FROM users WHERE id = 1 when chained with where:
router.get("/:id", (req, res) => {
    User.findOne({
        attributes: { exclude: ["password"] },
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Post /api/users create() has key/value pairs passed in and would look like
//INSERT INTO users
//(username, email, password)
//VALUES
//("Lernantino", "lernantino@gmail.com", "password1234");
router.post("/", (req, res) => {
    //expects {username: "", email: "", password: ""}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Put /api/users/1 update() creates and looks up data and would look like
//UPDATE users
//SET username = "Lernantino", email = "lernantino@gmail.com", password = "newPassword1234"
//WHERE id = 1;
router.put("/:id", (req, res) => {
    //expects {username: "", email: "", password: ""}
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: "No user found with this id" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Delete /api/users/1 destory() provides an identifier to determine where to delete data from
router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;