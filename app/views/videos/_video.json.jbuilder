json.extract! video, :id, :url, :description, :resource, :user_id, :created_at, :updated_at
json.url video_url(video, format: :json)
json.author name: video.user.name, id: video.user.id
json.file video.file.attached? ? (request.base_url + url_for(video.file)) : nil
json.avatar video.user.avatar.attached? ? (request.base_url + url_for(video.user.avatar)) : nil
