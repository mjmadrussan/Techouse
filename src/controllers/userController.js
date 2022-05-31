const bcryptjs = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const db = require("../../db/models")

const controller = {
    // método (GET) para renderizar la vista de Login
    login: (req, res) => {
        return res.render("users/login", {
            siteTitle: "Login",
            user: req.session.userLogged
        });
    },

    // método (GET) para renderizar la vista de SignUp
    register: (req, res) => {
        return res.render("users/signup", {
            siteTitle: "Signup",
            user: req.session.userLogged
        });
    },

    // método (POST) para procesar la creación de un nuevo usuario
    createMethod: async (req, res) => {
        const created = req.body;
        created.id_category = Number(created.id_category)
        created.password = bcryptjs.hashSync(req.body.password, 10)
        
        let errors = validationResult(req);
        
        let userEmailSearch = await db.Client.findOne({
            where: {
                email: req.body.email,
            }
        });
        if (userEmailSearch) {
			return res.render('users/signup', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body,
                siteTitle: "Signup"
			});
		}

        if (errors.isEmpty()) {
            created.profile_image = req.file.filename
            db.Client.create(created)
                .then( async () => {
                    let user = await db.Client.findOne({
                        where: {
                            email: created.email,
                        }
                    });
                    req.session.userLogged = user;
                    return res.render('users/profile', {
                        user: user,
                        siteTitle: "Perfil"
                    });
                })
                .catch((error) => res.send(error))  
        } else {
            console.log(errors);
            
            return res.render('users/signup', { 
                errors: errors.mapped(), 
                old: req.body, 
                siteTitle: "Signup" 
            });
        }
    },

    // método (POST) para procesar el logueo de un usuario
    loginMethod: (req, res) => {
        let errors = validationResult(req);
        
        if (errors.isEmpty()) {
            db.Client.findOne({ where: {
                    email: req.body.email
                } 
            })
                .then((userLogCheck) => {
                    if (userLogCheck) {
                        let isOkThePassword = bcryptjs.compareSync(req.body.password, userLogCheck.password);
                        
                        if (isOkThePassword) {
                            delete userLogCheck.password;
                            req.session.userLogged = userLogCheck;
                            if (req.body.remember_user) {
                                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                            }

                            res.redirect(req.session.persistedUrl || '/profile');
                            return delete req.session.persistedUrl;
                        }

                        return res.render('users/login', {
                            errors: {
                                password: {
                                    msg: 'La contraseña es invalida'
                                }
                            }, 
                            siteTitle: "Login",
                            user: req.session.userLogged
                        });
                    }
                    
                    return res.render('users/login', {
                        errors: {
                            email: {
                                msg: 'El usuario es inválido'
                            }
                        }, siteTitle: "Login",
                        user: req.session.userLogged
                    });
                })
                .catch((error) => {
                    return res.send(error)
                });
        }
        else {
            console.log(errors);
            return res.render('users/login', {
                errors: errors.mapped(),
                old: req.body,
                siteTitle: "Login",
                user: req.session.userLogged 
            });
        }
    },

    // método (GET) para renderizar la vista de profile
    profile: (req, res) => {
        const user = req.session.userLogged;
        
        return res.render('users/profile', {
            user,
            siteTitle: "Perfil",
            user: req.session.userLogged
        });
    },

    // método (GET) para renderizar la vista de edición de usuario
    edit: (req, res) => {
        let idUser = req.params.id;
        db.Client.findByPk(idUser)
            .then(UserToEdit => {
                if (UserToEdit != null) {
                    if (idUser == req.session.userLogged.id)
                        return res.render("users/edit", { UserToEdit, siteTitle: "Edición del usuario", user: req.session.userLogged });
                    else
                        return res.send("No pude editar este usuario");
                }
                else
                    return res.send("Este usuario no existe en la base de datos");
            })
            .catch(error => res.send(error))
    },

    // método (POST) para procesar la edición de un usuario
    update: (req, res) => {
        const update = req.body
        
        db.Client.update(
            {
                first_name: update.first_name,
                last_name: update.last_name,
                profile_image: req.file ? req.file.filename : req.body.oldImagen,
            },
            {
                where: { id: req.params.id }
            }
        ).then(() => {
            res.redirect('/profile');
        })
            .catch(error => res.send(error))
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
}

module.exports = controller;