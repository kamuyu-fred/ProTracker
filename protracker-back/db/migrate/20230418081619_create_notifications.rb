class CreateNotifications < ActiveRecord::Migration[7.0]
  def change
    create_table :notifications do |t|
      t.integer :actor_id
      t.integer :receiver_id
      t.string :message
      t.string :notification_type
      t.boolean :read

      t.timestamps
    end
  end
end
