/* Core JS */

// -------------------- [VARIABLES]

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
  console.log(notes);
  $("#keywords").html(" ").removeClass("jqcloud");
  $("#keywords").jQCloud(notes, {
    autoResize: true,
    shape: "rectangular",
    fontSize: ["1rem", "2.3rem"],
    colors: ["#412C64", "#7767AD", "#108AB1", "#3BB273", "#E9724C", "#CB2D54"],
    height: 260,
  });
}

function cloudData() {
  $(".interests-list li").each(function () {
    xw = Math.floor(Math.random() * 10 + 1);

    if (jQuery.inArray(xw, wcheck) === -1) wcheck.push(xw);
    else xw = Math.floor(Math.random() * 15 + 1);

    ob = { text: $(this).text(), weight: xw };
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
  imagesLoaded(".js-images-loaded", () => {
    new Masonry(document.querySelector(".js-masonry"), {
      itemSelector: ".js-masonry-item",
    });
  });
}

function openArtOverlay(item) {
  //$('.gallery ul').addClass('item_open');
  $(item).addClass("item_open");
  $("html, body").css("overflow", "hidden");
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    400
  );
  return false;
}

function closeArtOverlay() {
  $("html, body").css("overflow", "auto");
  $(document).scrollTop(scrollT);
  $(".art-grid .masonry__item, .art-grid .masonry, .port").removeClass(
    "item_open"
  );
  return false;
}

function setAngle() {
  var maxA = 180;
  var minA = 120;
  var maxW = 70;
  var minW = 13;

  angle = Math.floor(Math.random() * (maxA - minA + 1)) + minA;
  width = Math.floor(Math.random() * (maxW - minW + 1)) + minW;

  newAngle =
    "linear-gradient(" +
    angle +
    "deg, #f7f7f7 " +
    width +
    "%, #e4e4e4 " +
    width +
    "%)";

  // console.log("Open at: "+angle+"deg & "+width+"% ")
  // console.log("CSS:     "+newAngle)
  $(".port").css("backgroundImage", newAngle);
}

// -------------------- [INITIALIZE]

jQuery(document).ready(function ($) {
  setPage();

  if (mainpage === true || artpage === true) {
    var granimInstance = new Granim({
      element: "#granim-canvas",
      name: "granim",
      opacity: [1, 1],
      states: {
        "default-state": {
          gradients: [
            ["#834D9B", "#D04ED6"],
            ["#1CD8D2", "#93EDC7"],
          ],
        },
      },
    });
  }

  if (mainpage === true) {
    var elements = document.querySelectorAll(".fittext span");

    window.onresize = function () {
      Array.prototype.forEach.call(elements, fitText);
    };

    window.onresize();

    cloudData();
    setTimeout("rainCloud()", 150);
  }

  if (artpage === true) activateArtPage();
});
