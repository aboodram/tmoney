class HomeController < ApplicationController
  def index
  	@popupPhotos = Dir.glob('app/assets/images/popup/*');

  end

end
