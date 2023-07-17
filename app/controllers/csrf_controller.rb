class CsrfController < ApplicationController
    def token
        render :json => { :token => form_authenticity_token }
    end

    def time
        render :json => { :time => Time.now.to_i }
    end
end
