class Base
  def initialize(url)
    @browser = Capybara::Session.new(:selenium)
    @browser.visit url
  end 
end