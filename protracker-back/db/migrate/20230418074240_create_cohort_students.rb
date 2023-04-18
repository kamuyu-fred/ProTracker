class CreateCohortStudents < ActiveRecord::Migration[7.0]
  def change
    create_table :cohort_students do |t|
      t.string :name
      t.datetime :start_date
      t.datetime :end_date
      t.references :cohort, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
