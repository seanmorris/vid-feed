Rails.application.routes.draw do

  devise_for :users
  # scope '/admin' do
  #   resources :users
  # end

  get "/users/current", to: "users#current"
	get "/quips/by-video", to: "quips#byVideo"

	resources :quips
  resources :videos
  resources :users
  resources :roles
  resources :comments


  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # Defines the root path route ("/")
  root "videos#index"

  get "/csrf", to: "csrf#token"
  post "/csrf/time", to: "csrf#time"


end
