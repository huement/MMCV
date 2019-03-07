```bash
              ▄▄▄  ▄▄▄  ▄▄▄  ▄▄▄     ▄▄▄▄   ▄▄    ▄▄
              ███  ███  ███  ███   ██▀▀▀▀█  ▀██  ██▀
              ████████  ████████  ██▀        ██  ██
              ██ ██ ██  ██ ██ ██  ██         ██  ██
              ██ ▀▀ ██  ██ ▀▀ ██  ██▄         ████
              ██    ██  ██    ██   ██▄▄▄▄█    ████
              ▀▀    ▀▀  ▀▀    ▀▀     ▀▀▀▀     ▀▀▀▀
```

# Middle Man Curriculum Vitae

[![Build Status](https://travis-ci.org/reefab/ResumeMan.svg?branch=master)](https://travis-ci.org/reefab/ResumeMan)

MMCV is an HTML resume builder (with optional PDF version) made in Ruby with [Middleman v4](http://middlemanapp.com/).

It has the following features:

 * Separation between content and data, all your resume information is an YAML file.
 * Uses your Gravatar picture.
 * Fork this project for maintaining multiple versions of your resume in sync.
 * Markdown for formatting of the longer paragraphs.
 * You can preview your changes with the included Middleman server (with livereload).
 * Automatic PDF generation using [wkhtmltopdf](http://wkhtmltopdf.org).
 * Turnkey deployment to a `http://yourusername.github.com/resume` page with no configuration necessary. 

## Template

A split column layout built with Avalanche.scss Grid framework.

The main build script can be altered by modifying `source/style/styles.css.scss`.

Alternate the theme colors and fonts by modifying `source/style/_theme.scss`.

The majority of the styles and options are contained in `source/style/_resume.scss`.

## Preview

See the result: [MMCV Example](http://huement.github.com/MMCV/).

## In practice

Fork this project and name it `resume` for example. 
Follow the installation instructions below.

To create/update your resume, you will just need to edit the [`data/resume.yml`](https://github.com/reefab/ResumeMan/blob/master/data/resume.yml) file.
All keys with a `desc: |` header can be Markdown formatted.

Here is what it looks like:

```json
{
	"headers": {
		"profile": "Profile",
		"skills": "Technical Focus",
		"portfolio": "Portfolio",
		"techs": "Technical",
		"jobs": "Work History",
		"education": "Education",
		"links": "Links",
		"download": "Download PDF",
		"age": "Level",
		"projects": "Open Source Projects",
		"interests": "Interests",
		"references": "References"
	},
	"info": {
		"myname": "Derek Scott",
		"dob": "1985-01-15T00:00:00.000Z",
		"shortdesc": "Job Title",
		"email": "test@huement.com",
		"phone": "(701)-777-1234",
		"homepage": "https://huement.com/",
		"github": "https://github.com/huement",
		"linkedin": "http://linkedin/huement",
		"twitter": "http://twitter.com/huement",
		"address": {
			"street": "11150 98th Street North",
			"city": "Fargo",
			"postal_code": 58103
		},
		"desc": "Prototype to production, I make napkin art real!"
	},
  ...
}
```

You can preview your changes via `http://resume.dev/` if using Pow or `http://localhost:4567/` otherwise.

    bundle exec middleman build

Build the static version of your resume, it will also create the PDF version.

    bundle exec middleman deploy

Upload it to a Github page. Your resume will be available at `http://yourusername.github.com/resume`.

## Installation

If you forked to your own repo:

    git clone https://github.com/<yourusername>/resume.git
    cd resume

Otherwise:

    git clone https://github.com/huement/MMCV.git
    cd ResumeMan

Install all dependencies:

    sudo gem install bundler
    bundle install --path vendor/bundle

Launch the previewing server:

    ./M.sh -l

Build out the static HTML:

    ./M.sh -b