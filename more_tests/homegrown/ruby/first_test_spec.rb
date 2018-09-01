require_relative './spec_helper.rb'

feature 'first test' do
  before(:all) do
  end
  scenario "does cool things" do
    Login.new( CONFIG.fe_url ).to_frontend( CONFIG.fe_username, CONFIG.fe_password )
  end
end