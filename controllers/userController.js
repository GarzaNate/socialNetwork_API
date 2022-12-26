const { User, Thought } = require('../models');

module.exports = {
    // get all users
    getUsers(req, res) {
        User.find({})
    }
}