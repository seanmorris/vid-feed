# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
r1 = Role.create({ name: 'Regular', description: 'Can view and create videos. Can update and destroy own videos.' })
r2 = Role.create({ name: 'Admin',   description: 'Can perform any CRUD operation on any resource' })

u1 = User.create({ name: 'normie_a', email: 'sally@example.com', password: 'aaaaaaaa', password_confirmation: 'aaaaaaaa', role_id: r1.id })
u2 = User.create({ name: 'normie_b', email: 'sue@example.com',   password: 'aaaaaaaa', password_confirmation: 'aaaaaaaa', role_id: r1.id })

u3 = User.create({ name: 'admin_a', email: 'kev@example.com',  password: 'aaaaaaaa', password_confirmation: 'aaaaaaaa', role_id: r2.id })
u4 = User.create({ name: 'admin_b', email: 'jack@example.com', password: 'aaaaaaaa', password_confirmation: 'aaaaaaaa', role_id: r2.id })