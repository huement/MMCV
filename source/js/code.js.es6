/* Core JS */

// -------------------- [VARIABLES]

var notes  = [];
var wcheck = [];
var ob     = {};
var xw     = 0;


// -------------------- [FUNCTIONS]

function fitText(item)
{
	item.style.display = 'inline-block';
	item.style.fontSize = '1px';
	var parentWidth = item.parentNode.offsetWidth;
	var percentage = parentWidth / item.offsetWidth;
	var size = 0;
	while (item.offsetWidth < parentWidth) {
			size += 1;
			item.style.fontSize = size + 'px';
	}
	item.style.fontSize = size - 1 + 'px';
}

function rainCloud()
{
  console.log(notes);
  $('#keywords').html(" ").removeClass("jqcloud");
  $('#keywords').jQCloud(notes,
  {
    autoResize : true,
    shape      : 'rectangular',
    fontSize   : ["0.8rem", "1.6rem"],
    colors     : ["#412C64","#7767AD","#108AB1","#3BB273","#E9724C","#CB2D54"]
  });
}

function cloudData()
{
  $('.interests-list li').each(function()
  {
    xw = Math.floor((Math.random() * 10) + 1);

    if(jQuery.inArray(xw, wcheck) === -1)
      wcheck.push(xw);
    else
      xw = Math.floor((Math.random() * 15) + 1);

    ob = { "text" : $(this).text(), "weight" : xw };
    notes.push(ob);
  });
}


// -------------------- [INITIALIZE]

var elements = document.querySelectorAll('.fittext span');
window.onresize = function(){ Array.prototype.forEach.call(elements, fitText) };

jQuery(document).ready(function($){

  var granimInstance = new Granim({
     element: '#granim-canvas',
        name: 'granim',
     opacity: [1, 1],
     states : {
       "default-state" : {
         gradients : [
           ['#834D9B', '#D04ED6'],
           ['#1CD8D2', '#93EDC7']
         ]
       }
     }
  });

  window.onresize();

  cloudData();
  setTimeout( "rainCloud()" , 150 );
});
