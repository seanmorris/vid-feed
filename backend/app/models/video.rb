class Video < ApplicationRecord
	paginates_per 10
  belongs_to :user
	has_one_attached :file
end
