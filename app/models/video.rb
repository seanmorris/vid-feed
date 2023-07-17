class Video < ApplicationRecord
	paginates_per 12
  belongs_to :user
	has_one_attached :file
	has_many :quips, dependent: :destroy
	validates_presence_of :file

  validate :correct_file_mime_type

  private

  def correct_file_mime_type
    if file.attached? && !file.content_type.in?(%w(video/mp4 video/avi video/webm video/mpeg video/mpeg video/3gpp video/wmv))
      errors.add(:file, 'Must be a video file')
    end
  end
end
