require "test_helper"

class QuipsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @quip = quips(:one)
  end

  test "should get index" do
    get quips_url, as: :json
    assert_response :success
  end

  test "should create quip" do
    assert_difference("Quip.count") do
      post quips_url, params: { quip: { body: @quip.body, user_id: @quip.user_id } }, as: :json
    end

    assert_response :created
  end

  test "should show quip" do
    get quip_url(@quip), as: :json
    assert_response :success
  end

  test "should update quip" do
    patch quip_url(@quip), params: { quip: { body: @quip.body, user_id: @quip.user_id } }, as: :json
    assert_response :success
  end

  test "should destroy quip" do
    assert_difference("Quip.count", -1) do
      delete quip_url(@quip), as: :json
    end

    assert_response :no_content
  end
end
