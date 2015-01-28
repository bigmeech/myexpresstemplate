var express = require('express');
var router = express.Router();
var rek = require("rekuire");
var _ = require("lodash");

//DB Object
var DB = rek('database');

/*
 *
 * Route Definitions
 * -----------------------------------------
 * Show - Get request to /user/show/<userId>
 * Edit - Put request to /user/edit/<userId>
 * Create - post request to /user/create
 * delete - delete request to /user/remove/<userId>
 *
 * Todo:Need to find a way to make this CRUD more centralised, so i dont have to reinvewnt this wheel for every route/controller
 *
 * */

//CRUD Routes
router.get('/user/show/', showUsers);
router.get('/user/show/:id', showUsers);
router.put('/user/edit/:id', editUsers);
router.post('/user/create', createUsers);
router.delete('/user/remove/', deleteUsers);
router.delete('/user/remove/:id', deleteUsers);

/*
 *
 * Route functions
 * Do Model Operations inside the below callbacks, this is because outside these callbacks,
 * the database still hasnt gotten any information regarding registered models
 *
 * */
function showUsers(req, res) {
    //get input from client
};

/*
 *
 * Edit user Operation - Edits using skipping all unique indexes
 * @req - Received Client Request
 * @res - Unsent Server Response
 *
 * */

function deleteUsers(req, res) {
    //get input from client

}

/*
 *
 * Edit user Operation - Edits using skipping all unique indexes
 * @req - Client Request
 * @res - Server Response
 *
 * */
function editUsers(req, res) {
    //get input from client
}


/*
 *
 * Create user Operation - Creates new User
 * @req - Client Request
 * @res - Server Response
 *
 * */

function createUsers(req, res) {

}


module.exports = router;