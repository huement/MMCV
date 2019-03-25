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

function helpMsg {
    displayBanner
    echo "       -----------------------[   COMMANDS   ]------------------------ "
    printf "
            Run this script with any of the available parameters.
            For more info please checkout the README.md file.


            -l : Live Reload Server (Dev Mode)

            -b : Build Website (Webpack + HTML)

            -w : Run the Webpack builder by itself

            -s : Sync files to an Amazon S3 Bucket

            -d : Deploy to Github Pages

    "

    echo ""
}

function displayBanner {
    echo "                  __     __     __ __         _______ _______ _______  "
    echo "       .--------.|__|.--|  |.--|  |  |.-----.|   |   |   _   |    |  | "
    echo "       |        ||  ||  _  ||  _  |  ||  -__||       |       |       | "
    echo "       |__|__|__||__||_____||_____|__||_____||__|_|__|___|___|__|____| "
    echo ""
}

function finishIt {
    end=`date +%s`
    runtime=$((end-start))
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
### Parse Parameters
###

start=`date +%s`

for ARG in "$@"; do
    case $ARG in
        -l|--live)
            A=true
            ;;
        -b|--build)
            B=true
            ;;
        -w|--webpack)
            C=true
            ;;
        -s|--s3sync)
            D=true
            ;;
        -d|--deploy)
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

if [ "$A" = false ] && [ "$B" = false ] && [ "$C" = false ] && [ "$D" = false ] && [ "$E" = false ]; then
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
