###
###     _______ _______                    ___ __
###    |   |   |   |   |.----.-----.-----.'  _|__|.-----.
###    |       |       ||  __|  _  |     |   _|  ||  _  |
###    |__|_|__|__|_|__||____|_____|__|__|__| |__||___  |
###                                               |_____|
###    --------------------------------------------------
###

require 'pathname'
require 'redcarpet'

###
### Page Layout Changes:
###
page "/*.xml", layout: false
page "/*.json", layout: false
page "/*.txt", layout: false

#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy (fake) files
# page "/this-page-has-no-template.html", :proxy => "/template-file.html" do
#   @which_fake_page = "Rendering a fake page with a variable"
# end

###
### Helpers
###
helpers do
  def page_title
    current_page.data.title
  end

  def markdown(text)
    Tilt['markdown'].new { text }.render
  end

  def image_url(source)
    asset_url(source)
  end

  def gravatar_url(email)
    hash = Digest::MD5.hexdigest email.downcase
    "https://www.gravatar.com/avatar/#{hash}?s=500&d=mm"
  end

  def display_date(date)
      if date.is_a?(Date)
          # Change this if you prefer another date format:
          # http://www.ruby-doc.org/stdlib-1.9.3/libdoc/date/rdoc/Date.html#method-i-strftime
          #date.strftime("%Y-%m")
          # Comment above and uncomment this if you want days displayed
          date.strftime("%Y-%m-%d")
      else
          date
      end
  end

  def display_age(birthday)
      now = Date.today
      bday = DateTime.parse(birthday)
      now.year - bday.year - (Date.new(now.year, bday.month, bday.day) > now ? 1 : 0)
  end
end

###
### Server Environment
###
configure :server do

  # Debug assets
  set :debug_assets, true

end

###
### Development Environment
###
configure :development do

  activate :autoprefixer do |prefix|
    prefix.browsers = "last 3 versions"
  end

  # Reload the browser automatically whenever files change
  activate :livereload, :no_swf => true

  activate :directory_indexes

  # Append a hash to asset urls (make sure to use the url helpers)
  # activate :asset_hash

  # Use relative URLs
  activate :relative_assets
  set :relative_links, true

  # Assets Pipeline Sets
  set :css_dir, 'style'
  set :js_dir, 'js'
  set :images_dir, 'images'
  set :fonts_dir, 'fonts'
end

###
### Build Environment
###
configure :build do

  activate :external_pipeline,
       name: :webpack,
       command: build? ?
       "BUILD_PRODUCTION=1 ./node_modules/webpack/bin/webpack.js --bail -p" :
       "BUILD_DEVELOPMENT=1 ./node_modules/webpack/bin/webpack.js --watch -d --progress --color",
       source: ".tmp/dist",
       latency: 1

  # For example, change the Compass output style for deployment
  activate :minify_css

  # Append a hash to asset urls (make sure to use the url helpers)
  # activate :asset_hash

  # Use relative URLs
  activate :relative_assets
  set :relative_links, true

  # Compress PNGs after build
  # First: gem install middleman-smusher
  # require "middleman-smusher"
  # activate :smusher

  activate :syntax, :line_numbers => true

  # Or use a different image path
  # set :http_path, "/Content/images/"

  # Assets Pipeline Sets
  set :css_dir, 'style'
  set :js_dir, 'js'
  set :images_dir, 'images'
  set :fonts_dir, 'fonts'
end


###
### Production Environment
###
configure :production do

  # Assets Pipeline Sets
  set :css_dir, 'style'
  set :js_dir, 'js'
  set :images_dir, 'images'
  set :fonts_dir, 'fonts'

  #
  # Middleman-deploy configuration
  #
  activate :deploy do |deploy|
    deploy.deploy_method = :git
    # remote is optional (default is "origin")
    # run `git remote -v` to see a list of possible remotes
    deploy.remote = "https://github.com/huement/MMCV"

    # branch is optional (default is "gh-pages")
    # run `git branch -a` to see a list of possible branches
    deploy.branch = "public"

    # strategy is optional (default is :force_push)
    deploy.strategy = :submodule
  end
end
