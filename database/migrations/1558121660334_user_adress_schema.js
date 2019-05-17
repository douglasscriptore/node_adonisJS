'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserAdressSchema extends Schema {
  up () {
    this.create('user_adresses', table => {
      table.increments()
      table.string('street').notNullable()
      table.integer('number').notNullable()
      table.string('district')
      table.string('city').notNullable()
      table.string('state').notNullable()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_adresses')
  }
}

module.exports = UserAdressSchema
