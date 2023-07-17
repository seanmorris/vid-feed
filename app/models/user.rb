class User < ApplicationRecord
  belongs_to :role, optional: true

  has_many :videos, dependent: :destroy

  before_save :assign_role

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

	validates_presence_of :name

	has_one_attached :avatar

  def assign_role
    self.role = Role.find_by name: 'Regular' if role.nil?
  end

end
