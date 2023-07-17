class Video < ApplicationRecord
	paginates_per 12
  belongs_to :user
	has_one_attached :file
	has_many :quips, dependent: :destroy
	validates_presence_of :file
end
