/* Core JS */

// -------------------- [VARIABLES]

"use strict";

var notes = [];
var wcheck = [];
var ob = {};
var xw = 0;

var mainpage = false;
var artpage = false;
var scrollT = 0;
var angle = 0;
var width = 0;
var newAngle = "";

// -------------------- [FUNCTIONS]

function fitText(item) {
  item.style.display = "inline-block";
  item.style.fontSize = "1px";
  var parentWidth = item.parentNode.offsetWidth;
  var percentage = parentWidth / item.offsetWidth;
  var size = 0;
  while (item.offsetWidth < parentWidth) {
    size += 1;
    item.style.fontSize = size + "px";
  }
  item.style.fontSize = size - 1 + "px";
}

function rainCloud() {
  //console.log(notes);
  $("#keywords").html(" ").removeClass("jqcloud");
  $("#keywords").jQCloud(notes, {
    autoResize: true,
    shape: "rectangular",
    fontSize: { from: 0.13, to: 0.04 },
    colors: ["#412C64", "#7767AD", "#108AB1", "#3BB273", "#E9724C", "#CB2D54"],
    height: cloudHeight,
    steps: $(".interests-list li").length,
    removeOverflowing: true
  });
}

var loopLimit = 1;
function getRandom() {
  var xw = Math.floor(Math.random() * 19 + 1);
  if (jQuery.inArray(xw, wcheck) === -1) {
    wcheck.push(xw);
    return xw;
  } else {
    loopLimit++;
    if (loopLimit < 20) {
      getRandom();
    } else {
      xw = loopLimit * 3;
      loopLimit = 0;
      return xw;
    }
  }
}

function cloudData() {
  var randNum = 0;
  $(".interests-list li").each(function () {
    // let check = true;
    // while (check === true) {
    //   randNum = getRandom();
    //   if (randNum !== undefined) {
    //     check = false;
    //   }
    // }
    var randNum = Math.floor(Math.random() * 15 + 1);
    //console.log(randNum);
    ob = { text: $(this).text(), weight: randNum };
    notes.push(ob);
  });
}

function setPage() {
  if ($("#resume_content").html() !== undefined) {
    mainpage = true;
  } else if ($("#artpage").html() !== undefined) {
    artpage = true;
  }
}

function activateArtPage() {
  // portfolio
  $(".art-grid .masonry__item").on("click", function (eve) {
    eve.preventDefault();
    setAngle();
    scrollT = $(document).scrollTop();
    openArtOverlay($(this).data("target"));
  });

  $(".close").on("click", function (eve) {
    eve.preventDefault();
    closeArtOverlay();
  });

  $(document).keyup(function (eve) {
    if (eve.key === "Escape") closeArtOverlay();
  });

  // Masonry
  imagesLoaded(".js-images-loaded", function () {
    new Masonry(document.querySelector(".js-masonry"), {
      itemSelector: ".js-masonry-item"
    });
  });
}

function openArtOverlay(item) {
  //$('.gallery ul').addClass('item_open');
  $(item).addClass("item_open");
  $("html, body").css("overflow", "hidden");
  $("html, body").animate({
    scrollTop: 0
  }, 400);
  return false;
}

function closeArtOverlay() {
  $("html, body").css("overflow", "auto");
  $(document).scrollTop(scrollT);
  $(".art-grid .masonry__item, .art-grid .masonry, .port").removeClass("item_open");
  return false;
}

function setAngle() {
  var maxA = 180;
  var minA = 120;
  var maxW = 70;
  var minW = 13;

  angle = Math.floor(Math.random() * (maxA - minA + 1)) + minA;
  width = Math.floor(Math.random() * (maxW - minW + 1)) + minW;

  newAngle = "linear-gradient(" + angle + "deg, #f7f7f7 " + width + "%, #e4e4e4 " + width + "%)";

  // console.log("Open at: "+angle+"deg & "+width+"% ")
  // console.log("CSS:     "+newAngle)
  $(".port").css("backgroundImage", newAngle);
}

// -------------------- [INITIALIZE]
function menuClick() {
  $(".slider-arrow").click(function () {
    if ($(this).hasClass("show")) {
      $(".sidekick,.mini-overlay").removeClass("show");
      $("body").css("overflowY", "auto");
      $(".slider-arrow .arrow-box .fa").removeClass("pressed");
      $(this).removeClass("show").addClass("hide");
    } else {
      $(".sidekick,.mini-overlay").addClass("show");
      $("body").css("overflowY", "hidden");
      $(".slider-arrow .arrow-box .fa").addClass("pressed");
      $(this).removeClass("hide").addClass("show");
    }
  });

  $(".mini-overlay").on("click", function () {
    $(".slider-arrow,.sidekick,.mini-overlay").removeClass("show");
    $("body").css("overflowY", "auto");
  });
}

var minCloudSize = "0.6rem";
var maxCloudSize = "1.2rem";
var cloudHeight = 300;
jQuery(document).ready(function ($) {
  setPage();

  if ($(".slider-arrow")[0]) {
    menuClick();
  }

  if ($("#granim-canvas")[0]) {
    var granimInstance = new Granim({
      element: "#granim-canvas",
      name: "granim",
      opacity: [1, 1],
      states: {
        "default-state": {
          gradients: [["#834D9B", "#D04ED6"], ["#1CD8D2", "#93EDC7"]]
        }
      }
    });
  }

  if ($(".fittext")[0]) {
    var elements = document.querySelectorAll(".fittext span");

    window.onresize = function () {
      Array.prototype.forEach.call(elements, fitText);
    };

    window.onresize();
  }

  if ($(".interests-list li")[0]) {
    if ($(document).width() > 1120) {
      minCloudSize = "1.2rem";
      maxCloudSize = "2.5rem";
      cloudHeight = 360;
    }

    cloudData();
    setTimeout("rainCloud()", 150);
  }

  if ($(".art-grid")[0]) {
    activateArtPage();
  }
});