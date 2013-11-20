#SENDMAIL or 
ActionMailer::Base.smtp_settings = {
  :address              => 'smtp.gmail.com',
  :port                 =>  587,
  :domain               => 'taylorallred.com',
  :user_name            => 'tay.allred@gmail.com',
  :password             => 'S!lv#rshad)w',
  :authentication       => 'plain',
  :enable_starttls_auto =>  true
}

ActionMailer::Base.default_url_options[:host] = "localhost:3000"
#Mail.register_interceptor(DevelopmentMailInterceptor) if Rails.env.development?

# config.action_mailer.default_url_options = {
#     :host => 'smtp.gmail.com'
# }