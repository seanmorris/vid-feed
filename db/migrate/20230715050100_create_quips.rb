class CreateQuips < ActiveRecord::Migration[7.0]
  def change
    create_table :quips do |t|
      t.text :body
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
