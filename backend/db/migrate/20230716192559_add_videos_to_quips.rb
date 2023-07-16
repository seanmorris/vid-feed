class AddVideosToQuips < ActiveRecord::Migration[7.0]
  def change
    add_reference :quips, :video, null: false, foreign_key: true
  end
end
