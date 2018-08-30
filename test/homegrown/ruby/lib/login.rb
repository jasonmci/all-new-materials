class Login < Base
  def to_frontend( username, password )
    @browser.find('input[name=username]').set username
    @browser.find('input[name=password]').set password
    @browser.find('.loginbtn').click
  end

  def to_admin_backend( username, password )
    @browser.find('input[name=email]').set username
    @browser.find('input[name=password]').set password
    @browser.find('.btn-primary').click
  end

  alias_method :to_supplier_backend, :to_admin_backend
end