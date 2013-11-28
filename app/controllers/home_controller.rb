class HomeController < ApplicationController
  def index
  	@popupPhotos = Dir.glob('app/assets/images/popup/*');

  end

  def contact_mailer
	  ContactMailer.response_email(params).deliver
	  ContactMailer.forward_email(params).deliver
  	# render layout: 'email_sent'
  	# redirect_to('#contact', :notice => 'Message was successfully sent.')
	end

# private

# 	def sendForwardEmail
# 		ContactMailer.forward_email(params).deliver
# 	end

# 	def sendResponseEmail
#   	ContactMailer.response_email(params).deliver
# 	end

end