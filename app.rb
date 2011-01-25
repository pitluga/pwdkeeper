class App < Sinatra::Base
  set :public, 'public'
  set :static, true

  helpers do
    def javascript_tag(script_file)
      %{<script src="/javascripts/#{script_file}.js"></script>}
    end
  end

  get '/login' do
    haml :login
  end

  post '/login' do

  end

  get "/" do
    haml :index
  end
end
