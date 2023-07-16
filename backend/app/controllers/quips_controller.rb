class QuipsController < ApplicationController
  before_action :set_quip, only: %i[ show update destroy ]

  # GET /quips
  # GET /quips.json
  def index
    @quips = Quip.all
  end

	def byVideo
		@quips = Quip.where(:video_id => params[:video_id])
	end

  # GET /quips/1
  # GET /quips/1.json
  def show
  end

  # POST /quips
  # POST /quips.json
  def create
    @quip = Quip.new(quip_params)

    @quip = Quip.new(quip_params)
    @quip.user_id = current_user.id

    if @quip.save
      render :show, status: :created, location: @quip
    else
      render json: @quip.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /quips/1
  # PATCH/PUT /quips/1.json
  def update
    if @quip.update(quip_params)
      render :show, status: :ok, location: @quip
    else
      render json: @quip.errors, status: :unprocessable_entity
    end
  end

  # DELETE /quips/1
  # DELETE /quips/1.json
  def destroy
    @quip.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_quip
      @quip = Quip.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def quip_params
      params.require(:quip).permit(:body, :video_id)
    end
end
