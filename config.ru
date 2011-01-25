require 'rubygems'
require 'bundler'

Bundler.require

require './app'
use Rack::Static, :urls => %w(/css /images /javascripts), :root => "public"
run App

