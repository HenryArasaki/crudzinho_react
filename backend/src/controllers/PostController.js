const { response } = require('express')
const knex = require('../database')

module.exports = {
    async index(req, res, next) {
        try {
            const results = await knex("posts")

            return res.json(results)
        }
        catch (error) {
            next(error)
        }
    },
    async create(req, res, next) {

        try {
            const { title } = req.body
            const { user_id } = req.params

            await knex("posts").insert({
                title,
                user_id
            })

            return res.status(201).send()
        }
        catch (error) {
            next(error)
        }

    },
    async show(req, res, next) {
        try {
            const { id } = req.params

            const post = await knex("posts").where({ id }).first()

            return res.json(post)
        }
        catch(error){
            next(error)
        }
    }

}