class ChangeStartDateColumnInCohorts < ActiveRecord::Migration[7.0]
  def change
    change_column :cohorts, :end_date , :timestamp, using: 'end_date::timestamp without time zone'
  end
end
