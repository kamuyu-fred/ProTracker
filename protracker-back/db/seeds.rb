# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# moringa = User.create(username: "Moringa Admin", email: 'Admin.moringa@gmail.com', password: "protrackerwebsite", admin: true)

stellar_project = Achievement.create!(name: "Stellar Project", description: "One of your projects has been liked more than five times")
work_horse = Achievement.create!(name: "Work Horse", description: "You have created ten projects.")
prolific_creator = Achievement.create!(name: "Prolific Creator", description: "You have created five projects.")
team_player = Achievement.create!(name: "Team Player", description: "You have been added to five groups")