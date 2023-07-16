json.extract! quip, :id, :body, :user_id, :created_at, :updated_at
json.url quip_url(quip, format: :json)
json.author_id quip.user ? quip.user.id : nil
json.author_name quip.user ? quip.user.name : nil
json.author_avatar quip.video.user.avatar.attached? ? (request.base_url + url_for(quip.video.user.avatar)) : nil
json.author_url quip.user ? user_url(quip.user, format: :json) : nil
json.video_id quip.video ? quip.video.id : nil
json.video_url quip.video ? video_url(quip.video, format: :json) : nil
