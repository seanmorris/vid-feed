class ApplicationController < ActionController::Base
    respond_to :html, :json

    before_action :configure_permitted_parameters, if: :devise_controller?
    after_action :set_csrf_cookie

    protected

    def configure_permitted_parameters
        devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :avatar])
        devise_parameter_sanitizer.permit(:account_update, keys: [:name, :password, :avatar])
    end

    protected
    def set_csrf_cookie
        headers["x-csrf-Token"] = form_authenticity_token
    end
end
