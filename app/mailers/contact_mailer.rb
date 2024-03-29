class ContactMailer < ActionMailer::Base
  default from: "tay.allred@gmail.com"

  def forward_email(params)
  	@message = params[:message]
  	@from 	 = params[:email]

  	mail(			 to: 'tay.allred@gmail.com',
  			  subject: "Message from #{ params[:name] } #{ @from }",
	   			template_name: 'forward_email'
  			)
  end

  def response_email(params)
  	@viewer = params[:name]
  	@viewer_email = params[:email]

  	mail(	   	to: 't.allred@hotmail.com', #@viewer_email,
  			 subject: 'I\'ve recieved your message!')
  end

end
