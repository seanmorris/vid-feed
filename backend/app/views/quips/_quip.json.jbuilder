json.extract! quip, :id, :body, :user_id, :created_at, :updated_at
json.url quip_url(quip, format: :json)
