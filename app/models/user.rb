class User < ApplicationRecord
  belongs_to :role, optional: true

  has_many :videos, dependent: :destroy

  before_save :assign_role

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

	validates_presence_of :name

	has_one_attached :avatar

  validate :correct_avatar_mime_type

  def assign_role
    self.role = Role.find_by name: 'Regular' if role.nil?
  end

  private

  def correct_avatar_mime_type
    if avatar.attached? && !avatar.content_type.in?(%w(image/png image/gif image/jpg image/jpeg image/webp))
      errors.add(:avatar, 'Must be an image file')
    end
  end

end
