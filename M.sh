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

# GLOBALS
MIDDLECMD=''
A=false
B=false
C=false
D=false
E=false

function helpMsg {
    printf "

  BUILD OPTIONS     [M.sh]
 =========================

  -l : Live Reload

  -b : Build Website

  -w : Webpack

  -s : S3 Sync


    "
}

# Parse Parameters
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
    MIDDLECMD='NO_CONTRACTS=true bundle exec middleman server'
    MIDMSG='MIDDLEMAN LIVE RELOAD'
fi

if [ "$B" = true ]; then
    MIDDLECMD='bundle exec middleman build'
    MIDMSG='MIDDLEMAN BUILD'
fi

if [ "$C" = true ]; then
    MIDDLECMD='BUILD_DEVELOPMENT=1 ./node_modules/webpack/bin/webpack.js --watch -d --progress --color'
    MIDMSG='NODE.JS WEBPACK'
fi

if [ "$D" = true ]; then
    MIDDLECMD='middleman s3_sync'
    MIDMSG='BUILD & S3 SYNC'
fi

if [ "$E" = true ]; then
    MIDDLECMD='middleman deploy'
    MIDMSG='BUILD & DEPLOY'
fi

if [ "$A" = false ] && [ "$B" = false ] && [ "$C" = false ] && [ "$D" = false ] && [ "$E" = false ]; then
    MIDDLECMD=''
    helpMsg
else
    echo ""
    echo "                  __     __     __ __         _______ _______ _______  "
    echo "       .--------.|__|.--|  |.--|  |  |.-----.|   |   |   _   |    |  | "
    echo "       |        ||  ||  _  ||  _  |  ||  -__||       |       |       | "
    echo "       |__|__|__||__||_____||_____|__||_____||__|_|__|___|___|__|____| "
    echo ""
    echo "       --------------------------[BUILDER]---------------------------- "
    echo ""
    echo ""
    echo "        RUN COMMAND: ${MIDMSG}"
    echo ""
    echo ""
fi

eval "$MIDDLECMD"

# if [ "$B" = true ] || [ "$D" = true ]; then
#     BUILDCMD='rm -R build/assets/stylesheets/bulma; rm -R build/source; rm -R build/pagemd; rm build/.editorconfig'
#     eval "$BUILDCMD"
#     echo ""
#     echo "Clean Up Completed!"
#     echo ""
# fi
