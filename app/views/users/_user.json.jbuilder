json.extract! user, :id, :name, :role_id, :created_at, :updated_at
json.url user_url(user, format: :json)
json.pic user.avatar.attached? ? (request.base_url + url_for(user.avatar)) : nil
