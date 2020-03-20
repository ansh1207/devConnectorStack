const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

//@route   POST api/users
//@desc    Register User
//@access  Public
router.post('/', [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Minimum password length is 6').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        });
    }

    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        // See if user exists
        if (user) {
            res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        //Get users Gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            name,
            email,
            password,
            avatar
        });

        //Encrypt the Password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        //Return jsonwebtoken
        jwt.sign(payload, config.get('jwtSecret'),
            { expiresIn: 360000 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error: ' + error.message);
    }
}
);

module.exports = router