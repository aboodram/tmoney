require 'test_helper'

class JsControllerTest < ActionController::TestCase
  test "should get company_vivint" do
    get :company_vivint
    assert_response :success
  end

  test "should get company_moneydesktop" do
    get :company_moneydesktop
    assert_response :success
  end

  test "should get company_orangesoda" do
    get :company_orangesoda
    assert_response :success
  end

  test "should get company_bluemarketing" do
    get :company_bluemarketing
    assert_response :success
  end

  test "should get company_universityofutah" do
    get :company_universityofutah
    assert_response :success
  end

end
