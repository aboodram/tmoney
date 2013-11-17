require 'test_helper'

class ContactMailerTest < ActionMailer::TestCase
  # test "the truth" do
  #   assert true
  # end

  tests ContactMailer
  test 'response_email' do
  	email = UserMailer.what_name_goes_here('tay.allred@gmail.com', Time.now).deliver
  	assert !ActionMailer::Base.deliveries.empty?

  	# Test email content
  	assert_equal ['tay.allred@gmail.com'], email.from
  	assert_equal ['tay.allred@gmail.com'], email.to
  	assert_equal ['Thanks for contacting me. I\' respond to your email in 24 hrs.'], email.subject
  	assert_equal read_ficture('response_mailer').join, email.body.to_s
  end

  
end
