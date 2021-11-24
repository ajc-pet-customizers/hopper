//document.getElementById("close").addEventListener("click", function() { document.getElementById("notice").style.visibility = "hidden"; } );
//document.getElementById("disclaimer").addEventListener("click", function() { document.getElementById("notice").style.visibility = "visible"; } );

var features = new Map();
features.set("color",["white","white"]);
features.set("antennae","45 degree");
features.set("pattern","no pattern");
features.set("eyeAsset","happy");
features.set("hair","mohawk");

setColorButtons("color_grid"); 
setEyeButtons();
setOtherButtons();

updateColor("white");
updateEye("happy","white");
updateAsset("antennae","45 degree");
updateAsset("hair","mohawk");
updateAsset("pattern","no pattern");

document.getElementById("save").addEventListener("click", function() { mergeImages("save"); } );
document.getElementById("new_tab").addEventListener("click", function() { mergeImages("new_tab"); } );
document.getElementById("randomize").addEventListener("click", function() { randomize(); } );
document.getElementById("bg_contrast").addEventListener("click", function() { flip_bg(); } );
light = true;

var myVar;
function loaded() {
  myVar = setTimeout(showPage, 2500);
}

function showPage() {
  document.getElementById("loading_container").style.display = "none";
}

function randomize() {
  var randfeatures = [["dark red", "light red", "dark pink", "light pink", "dark purple", "light purple", "black", "white", "dark blue", "teal", "burple", "yellow", "dark green", "medium green", "lime", "mint", "dark brown", "light brown", "orange", "mustard"],["lash","boy","happy","squint","angry","swirl"],["blocky", "dewdrop", "45 degree", "swooshback"], ["bald","tuft","fork","mohawk"], ["no pattern", "mask","diamond","nosedot"]];
  var randoms = []

  for (var i = 0; i < randfeatures.length; i++) {
    if (i==0) {
      randoms.push(randfeatures[i][Math.floor(Math.random()*randfeatures[i].length)])
    }
    randoms.push(randfeatures[i][Math.floor(Math.random()*randfeatures[i].length)]);
  }
  updateColor(randoms[0]);
  updateEye(features.get("eyeAsset"),randoms[1]);
  updateEye(randoms[2],features.get("color")[1]);
  updateAsset("antennae",randoms[3]);
  updateAsset("hair",randoms[4]);
  updateAsset("pattern",randoms[5]);
}

function flip_bg() {
  if (!light) {
    document.getElementById("hopper_container").style.backgroundImage = "url('misc_assets/light bg.png'"+")";
  }
  else {
    document.getElementById("hopper_container").style.backgroundImage = "url('misc_assets/dark bg.png'"+")";
  }
  light = !light;
}

function setColorButtons(className) {
var colorNames = ["dark red", "light red", "dark pink", "light pink", "dark purple", "light purple", "black", "white", "dark blue", "teal", "burple", "yellow", "dark green", "medium green", "lime", "mint", "dark brown", "light brown", "orange", "mustard"];
var colorRGBs = [[173, 16, 16], [235, 64, 64], [236, 90, 218], [255, 166, 255], [138, 53, 224], [167, 93, 255], [42, 42, 42], [255, 255, 255], [53, 116, 255], [82, 216, 231], [112, 112, 254], [255, 255, 0], [1, 149, 30], [53, 187, 79], [156, 231, 44], [218, 254, 163], [170, 84, 0], [198, 147, 69], [245, 122, 0], [255, 212, 9]];
for (var i = 0; i < colorNames.length; i++) {
  var b = document.createElement("BUTTON");
  b.className = "color_grid_button";
  b.id = colorNames[i]+"1";
  b.style.backgroundColor = "rgb("+colorRGBs[i].join(",")+")";
  document.getElementById(className+"_1").appendChild(b);
  b.addEventListener("click", function() { updateColor(this.id.substring(0,this.id.length - 1)) } );

  var b2 = document.createElement("BUTTON");
  b2.className = "color_grid_button";
  b2.id = colorNames[i]+"2";
  b2.style.backgroundColor = "rgb("+colorRGBs[i].join(",")+")";
  document.getElementById(className+"_2").appendChild(b2);
  b2.addEventListener("click", function() { updateEye(features.get("eyeAsset"),this.id.substring(0,this.id.length - 1)) } );
  }
}

function setEyeButtons() {
var eyeAssets = ["lash","boy","happy","squint","angry","swirl"];

for (var i = 0; i < eyeAssets.length; i++) {
  var b = document.createElement("BUTTON");
  b.className = "cell_button";
  b.id = ""+eyeAssets[i];
  b.style.backgroundImage = "url('button_assets/"+eyeAssets[i]+" cell.png'"+")";
  b.addEventListener("click", function() { updateEye(this.id,features.get("color")[1]) } );
  document.getElementsByClassName("eye_panel_div")[0].appendChild(b);
  }
}

function setOtherButtons() {
var antennae = ["blocky", "dewdrop", "45 degree", "swooshback"];
var hairs = ["bald","tuft","fork","mohawk"];
var patterns = ["no pattern", "mask","diamond","nosedot"];
for (var i = 0; i < 4; i++) {
  var a = document.createElement("BUTTON");
  a.className = "cell_button";
  a.id = ""+antennae[i];
  a.style.backgroundImage = "url('button_assets/"+antennae[i]+" cell.png'"+")";
  document.getElementsByClassName("other_panel_div")[0].appendChild(a);
  a.addEventListener("click", function() { updateAsset("antennae",this.id) } );

  var h = document.createElement("BUTTON");
  h.className = "cell_button";
  h.id = ""+hairs[i];
  h.style.backgroundImage = "url('button_assets/"+hairs[i]+" cell.png'"+")";
  h.addEventListener("click", function() { updateAsset("hair",this.id) } );
  document.getElementsByClassName("other_panel_div")[0].appendChild(h);

  var p = document.createElement("BUTTON");
  p.className = "cell_button";
  p.id = ""+patterns[i];
  p.style.backgroundImage = "url('button_assets/"+patterns[i]+" cell.png'"+")";
  p.addEventListener("click", function() { updateAsset("pattern",this.id) } );
  document.getElementsByClassName("other_panel_div")[0].appendChild(p);
  }
}

function updateBorders(buttonId, newButtonId) {
  var oldB = document.getElementById(buttonId);
  var newB = document.getElementById(newButtonId);
  if (oldB != null && newB != null) {
    oldB.style.outline = "none";
    newB.style.outline = "0.3vw solid #FBB148";
    oldB.style.zIndex = 0;
    newB.style.zIndex = 1000;
  }
}

//Functions for color/feature updating below
function updateColor(newColor) {
  updateBorders(features.get("color")[0]+"1",newColor+"1");
  features.set("color",[newColor,features.get("color")[1]]);
  updateBase();
  updateAsset("antennae",features.get("antennae"));
  updateAsset("pattern",features.get("pattern"));
  updateAsset("hair",features.get("hair"));
  //getWorth();
}

function updateBase() {
  document.getElementById("base").src = "hopper_assets/base/"+features.get("color")[0]+".png";
}

function updateEye(asset,color) {
  //fix so the code can figure out base
  if (asset == "lash" || asset == "boy") {
    document.getElementById("eye_base").src = "hopper_assets/eye/boy/"+color+".png";
    document.getElementById("eye_asset").src = "misc_assets/empty.png";
  }
 
  else if (asset == "angry") {
    document.getElementById("eye_base").src = "misc_assets/empty.png";
    document.getElementById("eye_asset").src = "hopper_assets/eye/"+asset+"/"+color+".png";
  }

  else { 
  document.getElementById("eye_asset").src = "hopper_assets/eye/"+asset+".png"; 
  document.getElementById("eye_base").src = "hopper_assets/eye/solid/"+color+".png";
  } 
  
  if (asset == "lash") {
    document.getElementById("eye_asset").src = "hopper_assets/eye/"+asset+".png"; 
  }

  updateBorders(features.get("color")[1]+"2",color+"2");
  updateBorders(features.get("eyeAsset"),asset);
  features.set("eyeAsset",asset);
  features.set("color",[features.get("color")[0],color]);
  //getWorth();
}

function updateAsset(type, asset) {
  if (asset == "bald" || asset == "no pattern") {
    document.getElementById(type).src = "misc_assets/empty.png"; 
  }
  else {
    document.getElementById(type).src = "hopper_assets/"+type+"/"+asset+"/"+features.get("color")[0]+".png";
  }
  updateBorders(features.get(type),asset);
  features.set(type,asset);
  //getWorth();
}

function mergeImages(type) {
var c=document.getElementById("hopper_canvas");
var ctx=c.getContext("2d");
ctx.clearRect(0, 0, hopper_canvas.width, hopper_canvas.height);
var antennae = new Image();
var base = new Image();
var pattern = new Image();
var eyeBase = new Image();
var eyeAsset = new Image();
var hair = new Image();
var watermark = new Image();
antennae.src = document.getElementById("antennae").src;
antennae.onload = function() {
   ctx.drawImage(antennae,0,0);
   base.src = document.getElementById("base").src;
   base.onload = function() {
      ctx.drawImage(base,0,0);
      pattern.src = document.getElementById("pattern").src;
      pattern.onload = function() {
 	ctx.drawImage(pattern,0,0);
 	eyeBase.src = document.getElementById("eye_base").src;
	eyeBase.onload = function() {
	  ctx.drawImage(eyeBase,0,0);
 	  eyeAsset.src = document.getElementById("eye_asset").src;
	  eyeAsset.onload = function() {
	    ctx.drawImage(eyeAsset,0,0);
	    hair.src = document.getElementById("hair").src;
	    hair.onload = function() {
	      ctx.drawImage(hair,0,0);
	      watermark.src = document.getElementById("watermark").src;
	      watermark.onload = function() {
                ctx.drawImage(watermark,0,0);  
	        var image = hopper_canvas.toDataURL("image/png");
		if (type == "new_tab") { 
		  var newTab = window.open();
		  newTab.document.write('<img src="'+image+'" width="1100" height="1100"/>');
		  }
  		else { 
		  var a  = document.createElement('a');
   	  	  a.href = image;
		  a.download = "hopper.png"; //fix from CheesyPotatoes :)
    		  a.click();
		}
	      }
	    }
	  }
	}	
      }
    }
  }
}

function calcWorth() {
  var worth = 0.2;
  uncommons = ["dark red","light red","light brown","dark brown","mustard","orange","yellow","burple"];
  mediums = ["white","black","happy","squint"];
  kinda_commons = ["teal","dark blue","light purple","dark purple","light pink","dark pink"]

  if (features.get("eyeAsset") == "boy") {
    worth *= 2.5;
  }
  if (mediums.includes(features.get("eyeAsset"))) {
    worth *= 3.5;
  }
  if (features.get("eyeAsset") == "angry") {
    worth *= 4;
  }
  if (features.get("eyeAsset") == "swirl") {
    worth *= 5.2; 
  }
  //if (features.get("pattern") == "mask" ) { worth *= .9; }
  if (features.get("pattern") == "diamond" ) { worth *= 1.25; }
  var min_worth = worth;
  var max_worth = worth;
  if (uncommons.includes(features.get("color")[0])) {
    worth *= 2.5;
    min_worth *= 2.4;
    max_worth *= 2.8;
  }
  if (mediums.includes(features.get("color")[0])) {
    worth *= 1.5;
    min_worth *= 1.4;
    max_worth *= 1.6;
  }
  if (kinda_commons.includes(features.get("color")[0])) {
    worth *= 1.4;
    min_worth *= 1.3;
    max_worth *= 1.5;
  }
  if (features.get("hair") == "mohawk") {
    min_worth *= 1.6;
    max_worth *= 1.7;
  }
  if (features.get("pattern") == "no pattern") {
    min_worth *= 1.5;
    max_worth *= 1.6;
  }
  if (features.get("pattern") == "nosedot") {
    min_worth *= 1.4;
    max_worth *= 1.5;
  }
  if (features.get("color")[0] == features.get("color")[1]) {
    min_worth *= 1.1;
    max_worth *= 1.25;
  }
  if (features.get("eyeAsset") == "swirl" && (features.get("pattern") == "no pattern" || features.get("pattern") == "nosedot")) {
    min_worth *= 0.7;
    max_worth *= 0.8;
    if (uncommons.includes(features.get("color")[0])) {
      min_worth *= 0.7;
      max_worth *= 0.8;
    }
  } 
  return [min_worth,max_worth];
}

function getWorthString(worth) {
  var solids = Math.floor(worth);
  var dec = worth-solids;
  var dec_string = "";
  var dec_rounded = Math.round(dec/0.125);
  if (solids >= 2) {
  	if (dec_rounded >= 6) {
    	dec_rounded = 8;
    }
    if (dec_rounded <= 2) {
    	dec_rounded = 0;
    }
    if (dec_rounded == 5 || dec_rounded == 3) {
    	dec_rounded = 4;
    }
  }
  if (dec_rounded == 1) {
    dec_string = "bad";
  }
  if (dec_rounded == 2) {
    dec_string = "blue";
  }
  if (dec_rounded == 3) {
    dec_string = "red";
  }
  if (dec_rounded == 4) {
    dec_string = ".5";
  }
  if (dec_rounded == 5) {
    dec_string = "2 good";
  }
  if (dec_rounded == 6) {
    dec_string = "2 red";
  }
  if (dec_rounded == 7) {
    //dec_string = "2 red+bad";
    solids+=1;
  }
  if (dec_rounded == 8) {
    solids+=1;
  }
  if (solids < 1) { 
    return (dec_string);
  }
  else if ([0,4,7,8].includes(dec_rounded)) { 
    return (solids+dec_string); 
  }
  else { return (solids+"+"+dec_string); }
}

function getWorth() {
  worths = calcWorth();
  min = getWorthString(worths[0]);
  max = getWorthString(worths[1]);
  getDemand();
  if (min === max) {
    document.getElementById("range").innerHTML = "<b>Worth:</b> "+min;
  }
  else { 
    document.getElementById("range").innerHTML = "<b>Worth:</b> "+min+" - "+max; 
  }
  //document.getElementById("demand").innerHTML = "<b>Demand:</b> "+demand;
}

function getDemand() { 
  var demand = 0;
  var temp = features.get("color").slice();
  var colors = temp.sort();
  var has_cc = false;
  var color_combos = [["dark green","dark red"],["dark red","medium green"],["dark red","lime"],["dark green","light red"],["light red","medium green"],["light red","lime"],["black","orange"],["dark pink","dark red"],["dark red","light pink"],["dark pink","light red"],["light pink","light red"],["dark purple","orange"],["light purple","orange"],["light red","yellow"],["light red","mustard"],["dark blue","yellow"],["light pink","mint"],["light pink","teal"],["light brown","light pink"],["dark brown","orange"],["white","yellow"],["mustard","white"],["dark green","orange"],["medium green","orange"],["lime","orange"],["dark green","light purple"],["light purple","medium green"],["light purple","lime"],["dark green","dark purple"],["dark purple","medium green"],["dark purple","lime"],["dark blue","dark green"],["dark blue","medium green"],["dark blue","lime"],["dark red","light red"],["dark pink","light pink"],["dark purple","light purple"],["dark blue","teal"],["burple","light purple"],["light pink","light purple"],["mustard","yellow"],["mustard","orange"],["dark brown","light brown"],["mint","teal"]];
  for (var i = 0; i < color_combos.length; i++) {
    if (color_combos[i][0] == colors[0] && color_combos[i][1] == colors[1]) {
      has_cc = true;
      demand+=0.5; 
    }
  }
  if (!["mint","lime","medium green","dark green"].includes(features.get("color")[0])) { demand=demand+0.5; }
  if (features.get("color")[0] == features.get("color")[1]) { demand+=0.5; }
  if (features.get("hair") == "mohawk") { demand=demand+1.5; }
  if (features.get("pattern") != "mask") { demand+=1.5; }
  if (features.get("pattern") == "diamond") { demand-=0.5; }
  if (["happy","squint","angry"].includes(features.get("eyeAsset"))) { demand++; }
  if (["boy","swirl"].includes(features.get("eyeAsset"))) { demand+=0.5; }
  if (uncommons.includes(features.get("color")[0]) && features.get("eyeAsset") == "swirl") { 
    if (has_cc == false) { demand--; }
  }
  document.getElementById("demand").innerHTML = "<b>Demand:</b> "+"<i class=\"material-icons-outlined\" style=\"font-size:120%;position:relative;top:.3vw;\">star</i>".repeat(Math.floor(demand));
  if (demand%1 == 0.5) { 
    document.getElementById("demand").innerHTML = document.getElementById("demand").innerHTML+"<i class=\"material-icons-outlined\" style=\"font-size:120%;position:relative;top:.3vw;\">star_half</i>"; 
  }
  document.getElementById("demand").innerHTML = document.getElementById("demand").innerHTML+"<i class=\"material-icons-outlined\" style=\"font-size:120%;position:relative;top:.3vw;\">star_outline</i>".repeat(Math.floor(5-demand));
  //return "★".repeat(demand)+"☆".repeat(5-demand);
}
