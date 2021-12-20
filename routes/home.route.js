import express from 'express';
import passport from 'passport';
import User from '../models/user.model.js';

const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.render('home');
    });

router.route('/login')
    .get((req, res) => {
        res.render('login');
    })
    .post(passport.authenticate('login', {
            failureRedirect: '/login',
            failureFlash: true
        }),
        async (req, res) => {
            res.locals.user = await User.findById(req.session.passport.user);
            res.redirect('/');
        }
    );

router.route('/login/facebook')
    .get(passport.authenticate('login-facebook', {
        scope: 'email',
        failureRedirect: '/login',
        failureFlash: true
    }), async (req, res) => {
        res.locals.user = await User.findById(req.session.passport.user);
        res.redirect('/')
    });

router.route('/login/google')
    .get(passport.authenticate('login-google', {
        scope: [
            'profile', 'email'
        ],
        failureRedirect: '/login',
        failureFlash: true
    }), async (req, res) => {
        res.locals.user = await User.findById(req.session.passport.user);
        res.redirect('/')
    })

router.route('/login/github')
    .get(passport.authenticate('login-github', {
        scope: ['user:email'],
        failureRedirect: '/login',
        failureFlash: true
    }), async (req, res) => {
        res.locals.user = await User.findById(req.session.passport.user);
        res.redirect('/')
    });


router.route('/logout')
    .get((req, res) => {
        req.logOut();
        req.session.user = null;
        res.redirect('/login');
    });


router.route('/signup')
    .get((req, res) => {
        res.render('signup');
    });


router.route('/register')
    .get((req, res) => {
        res.render('register');
    });


router.route('/about')
    .get((req, res) => {
        res.render('about');
    });


export default router;