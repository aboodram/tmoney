class HomeController < ApplicationController
  def index
  	@popupPhotos = Dir.glob('app/assets/images/popup/*');

  end

  def contact_mailer

		ContactMailer.forward_email(params).deliver
  	ContactMailer.response_email(params).deliver
  	# render layout: 'email_sent'
  	redirect_to(root_path, :notice => 'Message was successfully sent.')
	end

end