#!/bin/bash

NAME_SINGLE=$1
NAME_MANY=$3
COUNT=$2

mkdir -p modules/$NAME_MANY

clear

function createMainFile {
  mixinCalls=""

  for i in $(seq 1 $COUNT)
    do
      mixinCalls="$mixinCalls
      +$NAME_SINGLE-$i()"
    done
  
  echo "extend ../layout

block title
  title $NAME_MANY

block content
  include $NAME_MANY/includes

  .main$mixinCalls
  " > modules/$NAME_MANY.pug
}


function createIncludesFile {
  includes=""

  for i in $(seq 1 $COUNT)
    do
     includes="$includes\n
include $NAME_SINGLE-$i"
    done

  echo $includes > modules/$NAME_MANY/includes.pug
  echo "" > modules/$NAME_MANY/partials.pug
}


function createModuleFiles {
  echo "Creating $COUNT files for $NAME_MANY"


  for i in $(seq 1 $COUNT)
    do
      echo "include partials

mixin $NAME_SINGLE-$i()
  section.$NAME_SINGLE.$NAME_SINGLE-$i
    .container
      .row
    " > modules/$NAME_MANY/$NAME_SINGLE-$i.pug;
      
    done
}

createMainFile
createIncludesFile
createModuleFiles

echo "Finished!"