class CreateCohorts < ActiveRecord::Migration[7.0]
  def change
    create_table :cohorts do |t|
      t.string :name
      t.string :start_date
      t.string :end_date
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
