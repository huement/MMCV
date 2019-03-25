```bash
                             __     __     __ __         _______ _______ _______  
                  .--------.|__|.--|  |.--|  |  |.-----.|   |   |   _   |    |  |
                  |        ||  ||  _  ||  _  |  ||  -__||       |       |       |
                  |__|__|__||__||_____||_____|__||_____||__|_|__|___|___|__|____|
                  -----------------------[RESUME BUILDER]------------------------
```

# Middle Man Curriculum Vitae

[![Build Status](https://travis-ci.org/reefab/ResumeMan.svg?branch=master)](https://travis-ci.org/reefab/ResumeMan)

MMCV is an HTML resume builder (with optional PDF version) made in Ruby with [Middleman v4](http://middlemanapp.com/).

It has the following features:

-   Separation between content and data, all your resume information is an YAML file.
-   Uses your Gravatar picture.
-   Fork this project for maintaining multiple versions of your resume in sync.
-   Markdown for formatting of the longer paragraphs.
-   You can preview your changes with the included Middleman server (with live reload).
-   Automatic PDF generation using [wkhtmltopdf](http://wkhtmltopdf.org).
-   Turnkey deployment to a `http://yourusername.github.com/resume` page with no configuration necessary.

## Template

A split column layout built with [Avalanche.scss](http://colourgarden.net/avalanche/) Grid framework.

The main build script can be altered by modifying `source/style/styles.css.scss`.

Alternate the theme colors and fonts by modifying `source/style/_theme.scss`.

The majority of the styles and options are contained in `source/style/_resume.scss`.

## Preview

See the result: [huement.github.io/MMCV Example Site](https://huement.github.io/MMCV/).

## In practice

Fork this project and name it `resume` for example. Follow the installation instructions below.

To create/update your resume, you will just need to edit the [`data/resume.yml`](https://github.com/huement/MMCV/blob/master/data/resume.json) file.

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
}
```

You can preview your changes via `http://resume.dev/` if using Pow or `http://localhost:4567/` otherwise.

```bash
    ./M.sh -b
```

Build the static version of your resume, it will also create the PDF version.

```bash
    ./M.sh -d
```

Upload it to a Github page. Your resume will be available at `http://yourusername.github.com/resume`.

## Installation

If you forked to your own repo:

```bash
    git clone https://github.com/<yourusername>/resume.git
    cd resume
```

Otherwise:

```bash
    git clone https://github.com/huement/MMCV.git
    cd MMCV
```

Install all dependencies:

```bash
    sudo gem install bundler
    bundle install --path vendor/bundle
```

Launch the previewing server:

```bash
    ./M.sh -l
```

Build out the static HTML:

```bash
    ./M.sh -b
```

## Additional Info

There are a few extras and included bits with this Repo that may not be obvious at first.

### webpack.config.js

This project uses the `external_pipeline` option in `middleman` to handle the asset pipeline. Simply edit this file to change any of the webpack items, or alter how the assets are handled.

### Middleman Template Helpers

If you look at certain templates, there are at times more advanced functionality than simply echoing out a variable's value. For instance if you wish to have a variable's value processed as Markdown:

```ruby
  <% data.resume.jobs.each do |job| % >
    <%= markdown job.desc % >
  <% end % >
```

Or if you wish to have a Gravatar Profile image from a given email address, simply:

```ruby
    <%= gravatar_url data.resume.info.email % >
```

### M.sh Build Script

The included `M.sh` script can be run from the repository root, and will assist you with most if not all of the `middleman` commands you will need to run.

```bash
    MIDDLEMAN CMDS       [M.sh]
  ==============================

   -l : Live Reload Server (Dev Mode)

   -b : Build Website (Webpack + HTML)

   -w : Run the Webpack builder by itself

   -s : Sync files to an Amazon S3 Bucket

   -d : Deploy to Github Pages
```

### .AI Resume Template

In the root of the repository is a `resume.ai` file that can be editied in Adobe Illustrator, if you want a more fine tuned PDF version.

There is also an example `resume_print.pdf` that has been exported from Illustrator and is placed in the `/build/files` directory during each build.
