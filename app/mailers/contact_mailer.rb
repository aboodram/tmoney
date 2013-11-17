class ContactMailer < ActionMailer::Base
  default from: "tay.allred@gmail.com"

  def forward_email(params)

  	mail(			 to: 'tay.allred@gmail.com',
  			  subject: 'params.message'
  			)
  end

  def response_email(params)
  	@viewer = params[:name]
  	@viewer_email = params[:email]

  	mail(	   	to: 'tay.allred@gmail.com', #@viewer_email,
  			 subject: 'Thanks for contacting me. I\' respond to your email in 24 hrs.')
  end

end
