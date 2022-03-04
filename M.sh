#!/usr/bin/env bash

#
#                 __     __     __ __         _______ _______ _______
#      .--------.|__|.--|  |.--|  |  |.-----.|   |   |   _   |    |  |
#      |        ||  ||  _  ||  _  |  ||  -__||       |       |       |
#      |__|__|__||__||_____||_____|__||_____||__|_|__|___|___|__|____|
#
#      --------------------------[BUILDER]----------------------------
#

set +e

###
### GLOBALS
###

MIDDLECMD=''
A=false
B=false
C=false
D=false
E=false
F=false

helpMsg()
{
    displayBanner
    echo "       -----------------------[   COMMANDS   ]------------------------ "
    printf "
            Run this script with any of the available parameters.
            For more info please checkout the README.md file.

            -a : Generate Artwork JSON

            -l : Live Reload Server (Dev Mode)

            -b : Build Website (Webpack + HTML)

            -w : Run the Webpack builder by itself

            -s : Sync files to an Amazon S3 Bucket

            -d : Deploy to Github Pages

    "

    echo ""
}

displayBanner()
{
    echo "                  __     __     __ __         _______ _______ _______  "
    echo "       .--------.|__|.--|  |.--|  |  |.-----.|   |   |   _   |    |  | "
    echo "       |        ||  ||  _  ||  _  |  ||  -__||       |       |       | "
    echo "       |__|__|__||__||_____||_____|__||_____||__|_|__|___|___|__|____| "
    echo ""
}

finishIt()
{
    end=$(date +%s)
    runtime=$((end - start))
    echo ""
    echo "       middleMAN Command Finished!       "
    echo ""
    echo "       --------------------------------"
    echo ""
    echo "       Finished Size: $(du -sh ./build)"
    echo "          Total Time:  ${runtime}        Seconds"
    echo ""
    echo ""
}

###
### Internal Functions
###

# DEFAULTS
JO="/usr/bin/jo"
ARTIST="Derek Scott"
EXAMPLE="todo..."

# CONFIG
shopt -s nullglob

# FUNCTIONS
newJSONFile()
{
    echo -e "  Adding new entry:\n    ${3}\n"
    $JO -p name="${1}" path="${2}" artist="${ARTIST}" details="${EXAMPLE}" >"${3}"
}

artJSON()
{
    DIR="artworks"
    buildJSON $DIR
}

oilfieldJSON()
{
    DIR="oilfield"
    buildJSON $DIR
}

buildJSON()
{
    # MAIN LOOP
    for filename in ./source/images/"${1}"/*.{jpg,jpeg,png}; do

        # check if they are already in ./data/artworks
        FNAME="$(basename $filename)"
        EXTLESS="$(basename "$filename" | sed 's/\(.*\)\..*/\1/')"
        FCHECK="./data/${1}/${EXTLESS}.json"
        FPATH="/images/${1}/${FNAME}"

        if [ -f "$FCHECK" ]; then
            echo -e "\n${FCHECK} JSON PRESENT!"
        else
            newJSONFile $EXTLESS $FPATH $FCHECK
        fi
    done

    # Finalize the JSON into one master file
    FINAL="./data/${1}.json"
    if [ -f "$FINAL" ]; then
        rm "${FINAL}"
    fi

    # create final json file from individual files
    jq -s 'flatten' ./data/"${1}"/*.json >"${FINAL}"

    # remove unneeded individual files
    rm -r ./data/"${1}"
}

###
### Parse Parameters
###

start=$(date +%s)

for ARG in "$@"; do
    case $ARG in
        -a | --art)
            F=true
            ;;
        -l | --live)
            A=true
            ;;
        -b | --build)
            B=true
            ;;
        -w | --webpack)
            C=true
            ;;
        -s | --s3sync)
            D=true
            ;;
        -d | --deploy)
            E=true
            ;;
        *)
            helpMsg
            ;;
    esac
done

###
### EXECUTE ANY FOUND OPTION(S)
###

if [ "$A" = true ]; then
    MIDDLECMD='NO_CONTRACTS=true bundle exec middleman server --verbose'
    MIDMSG='LIVE RELOAD'
fi

if [ "$B" = true ]; then
    MIDDLECMD='bundle exec middleman build && ./_makeWebP.js'
    MIDMSG='BUILD SITE'
fi

if [ "$C" = true ]; then
    MIDDLECMD='BUILD_DEVELOPMENT=1 ./node_modules/webpack/bin/webpack.js --watch -d --progress --color'
    MIDMSG='NODE.JS -> WEBPACK'
fi

if [ "$D" = true ]; then
    MIDDLECMD='bundle exec middleman s3_sync'
    MIDMSG='BUILD & S3 SYNC'
fi

if [ "$E" = true ]; then
    MIDDLECMD='bundle exec middleman deploy'
    MIDMSG='DEPLOY SITE'
fi

if [ "$F" = true ]; then
    MIDDLECMD='echo "Building out Artwork categories JSON"'
    artJSON
    oilfieldJSON
    MIDMSG='ARTWORK JSON'
fi

if [ "$A" = false ] && [ "$B" = false ] && [ "$C" = false ] && [ "$D" = false ] && [ "$E" = false ] && [ "$F" = false ]; then
    MIDDLECMD=''
    helpMsg
else
    echo ""
    displayBanner
    echo "       -----------------------[RESUME BUILDER]------------------------ "
    echo ""
    echo ""
    echo "        RUN COMMAND: ${MIDMSG}"
    echo ""
    echo ""
fi

###
### RUN CHOSEN COMMAND
###

eval "$MIDDLECMD"

finishIt
