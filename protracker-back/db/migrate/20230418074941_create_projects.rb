class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.string :project_name
      t.string :project_description
      t.string :github_link
      t.string :category
      t.references :user, null: false, foreign_key: true
      t.references :cohort, null: false, foreign_key: true

      t.timestamps
    end
  end
end
