class VideosController < ApplicationController
  before_action :set_video, only: %i[ show update destroy ]

  # GET /videos
  # GET /videos.json
  def index
    @videos = Video.order(id: :desc).page params[:page]
  end

  # GET /videos/1
  # GET /videos/1.json
  def show
  end

  # POST /videos
  # POST /videos.json
  def create
    if ! current_user
      render json: { status: :unprocessable_entity }
      return
    end

    @video = Video.new(video_params)
    @video.user_id = current_user.id

    if @video.save
      render :show, status: :created, location: @video
    else
      render json: @video.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /videos/1
  # PATCH/PUT /videos/1.json
  def update
    if @video.update(video_params)
      render :show, status: :ok, location: @video
    else
      render json: @video.errors, status: :unprocessable_entity
    end
  end

  # DELETE /videos/1
  # DELETE /videos/1.json
  def destroy
    @video.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_video
      @video = Video.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def video_params
      params.require(:video).permit(:url, :description, :user_id)
    end
end
