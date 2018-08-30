require 'rspec'
require 'selenium-webdriver'
require 'capybara'
require 'capybara/rspec'
require 'rspec/wait'
require 'pry'
require 'json'

require_relative '../ruby/lib/base.rb'
require_relative '../ruby/lib/login.rb'

config_file = File.read('./test/homegrown/ruby/config/default.json')
CONFIG = JSON.parse(config_file, object_class: OpenStruct)



