source 'https://rubygems.org'

## Middleman Core
###############################
gem 'middleman', '~> 4.2'

gem 'middleman-syntax'
gem 'middleman-title'

## Middleman Extensions
###############################
gem 'middleman-sprockets'
gem 'sprockets-es6', '~> 0.9.2'
#gem 'babel-transpiler'
gem 'middleman-autoprefixer', '~> 3.0'
gem "middleman-livereload", "~> 3.4"
gem 'middleman-webpacker'
gem 'middleman-minify-html'
gem 'middleman-svg'
#gem 'middleman-s3_sync'
#gem 'middleman-deploy', '~> 1.0'
gem 'middleman-blog'
#gem "middleman-imageoptim", '~> 0.3.0'
gem 'middleman-imageoptim', :git => 'https://github.com/alexsanderson/middleman-imageoptim', :branch => 'master'
#gem 'middleman-deploy', '~> 1.0'

#gem 'middleman-build-reporter'

gem 'tzinfo-data', platforms: [:mswin, :mingw, :jruby, :x64_mingw]
gem 'wdm', '~> 0.1', platforms: [:mswin, :mingw, :x64_mingw]

#gem 'middleman-pdfkit'
#gem "middleman-sitemap", :git => "https://github.com/matsu911/middleman-sitemap"

## Frameworks/Library
###############################
# Markdown parser
gem 'redcarpet', '~> 3.4.0'
#gem 'pdfkit', '~> 0.8.2'
gem 'maruku', '~> 0.7.2'
#gem 'wkhtmltopdf_binary_provider', '~> 0.12.0'
gem 'haml', '~> 5.0'

if /linux|bsd/ =~ RUBY_PLATFORM
    gem 'execjs'
    if /linux/ =~ RUBY_PLATFORM
        gem 'rb-inotify', '~> 0.9'
    end
end
