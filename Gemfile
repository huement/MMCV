source 'https://rubygems.org'


## Middleman Core
###############################
gem 'middleman', '~> 4.3.0.rc.3'
gem 'middleman-syntax'
gem 'middleman-title'
gem 'middleman-build-reporter'

## Middleman Extensions
###############################
gem 'middleman-sprockets'
gem 'sprockets-es6', '~> 0.9.2'
gem 'middleman-autoprefixer'
gem "middleman-livereload", "~> 3.4"
gem 'middleman-webpacker'
gem 'middleman-minify-html'
gem 'middleman-svg'
gem 'middleman-s3_sync'
gem 'middleman-deploy', '~> 2.0.0.pre.alpha'
#gem 'middleman-pdfkit'
#gem "middleman-sitemap", :git => "https://github.com/matsu911/middleman-sitemap"

## Frameworks/Library
###############################
# Markdown parser
gem 'redcarpet', '~> 3.4.0'
#gem 'pdfkit', '~> 0.8.2'
gem 'maruku', '~> 0.7.2'
#gem 'wkhtmltopdf_binary_provider', '~> 0.12.0'


if /linux|bsd/ =~ RUBY_PLATFORM
    gem 'execjs'
    if /linux/ =~ RUBY_PLATFORM
        gem 'rb-inotify', '~> 0.9'
    end
end
