//loader
function loadSwitch(){
    loading = document.getElementById('loading');
    var current = loading.style.display;
    if(current == ""){
        loading.style.display = "none";
    }else if(current == "none"){
        loading.style.display = "";
    }
}


//Setup function to load div and stuff
var motion;
if(window.location.href.split('#')[1] == "ripple") motion = "";
else motion = "1";
var ripTime
if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 ){
 if(motion == "") ripTime = 6000;
 else ripTime = 6000;
}else if(motion == "") ripTime = 2000;
else ripTime = 1000;
var widthDiv = 12;
var heightDiv = 8;
var widthDivisions = 12;
var heightDivisions = 8;
var ripCount = 1;
var ripSum = new Array();
var ripNum = new Array();
var ripEnd = false;
var currentTweet = 1;
var minLon = 2.58;
var maxLon = 2.622;
var minLat = 51.14;
var maxLat = 51.18;
var mapHeight;
var mapWidth;
var locked = "";
var paused = false;
var twitmap = "http://demo.papaonlegs.s1.goincloud.com/maptwit.html";
var seememove = "http://demo.papaonlegs.s1.goincloud.com/seememove.html";

function setup(){

    hiddenImage = document.getElementById("hiddenImage");

	map = document.getElementById("twitmap");
    if(map == null) map = document.getElementById("accelmap");
	

	map.style.height = hiddenImage.clientHeight;

	map.style.width = hiddenImage.clientWidth;
    
    mapHeight = hiddenImage.clientHeight;
    mapWidth = hiddenImage.clientWidth;
    
	hiddenImage.setAttribute('style', 'display:none');
    loadSwitch();
    moveLoad = document.getElementById("loading");
    map.appendChild(moveLoad);
    //document.removeChild(moveLoad);
    moveLoad.style.top = "0%";
    moveLoad.style.left = (((mapHeight-50)/mapHeight)*100) + "%";
    moveLoad.style.height = 50;
    moveLoad.style.width = 50;
    heightDiv = parseInt(mapHeight/8);
    widthDiv = parseInt(mapWidth/12);
}



//Drag functionality using object since we only want to move map



var dragObject={

	z: 0, x: 0, y: 0, offsetx : null, offsety : null, targetobj : null, dragapproved : 0,

	

	initialize:function(){

		document.onmousedown=this.drag

		document.onmouseup=function(){this.dragapproved=0; tooltip.init();locked = "";}

	},

	

	drag:function(e){
        locked = null;
		var evtobj=window.event? window.event : e

		this.targetobj=window.event? event.srcElement : e.target

		if (this.targetobj.id=="twitmap" || this.targetobj.id=="accelmap"){

			this.dragapproved=1

			if (isNaN(parseInt(this.targetobj.style.left))){this.targetobj.style.left=0}

			if (isNaN(parseInt(this.targetobj.style.top))){this.targetobj.style.top=0}

			this.offsetx=parseInt(this.targetobj.style.left)

			this.offsety=parseInt(this.targetobj.style.top)

			this.x=evtobj.clientX

			this.y=evtobj.clientY

			if (evtobj.preventDefault)

			evtobj.preventDefault()

			document.onmousemove=dragObject.moveit

		}

	},

	

	moveit:function(e){

		var evtobj=window.event? window.event : e

		if (this.dragapproved==1){

			this.targetobj.style.left=this.offsetx+evtobj.clientX-this.x+"px"

			this.targetobj.style.top=this.offsety+evtobj.clientY-this.y+"px"

			return false

		}

	}

};



dragObject.initialize();


function rippleTest(loop){
    for (var i=0; i<loop ; i++){
        testNum = Math.floor((Math.random()*(13))+2);
        drawRipple(testNum);
    }
    
}

function drawRipple(num){

    map = document.getElementById("twitmap");
    if (map == null) document.getElementById("accelmap");
    ripple = document.createElement('img');
    src = "gifspeed.php?which=0&speed="+num;

    ripple.setAttribute('src',src);
    
	lat = Math.floor((Math.random()*(mapHeight-1))+1);
    ripple.style.top = lat;
	lon = Math.floor((Math.random()*(mapWidth -1))+1);
    ripple.style.left = lon;

    
    ripple.style.height = 50;
    ripple.style.width = 50;
    rippleSize = 100;
    


	

	id = lat + lon + 1;

	
    //title = objJson.sentiment+'<br>';
    title = num+" "+ lat+" "+lon;
	//lat = (objJson.lat / 2000) * 100;

	//longit = (objJson.lon / 3000) * 100;
    var imgs = document.getElementById("twitmap").getElementsByClassName("ripple");
    if(imgs == null) document.getElementById("accelmap").getElementsByClassName("ripple");
    if(imgs.length > 0){
        for (var i = 0; i < imgs.length; i++) {
            var radius = imgs[i].clientWidth - 20;
            var difX = Math.abs(parseInt(imgs[i].style.top) - parseInt(ripple.style.top));
            var difY = Math.abs(parseInt(imgs[i].style.left) - parseInt(ripple.style.left));
            
            if ((difX<=radius && difY<=radius) || (difX < 25 && difY < 25) || (imgs[i].style.left == ripple.style.left && imgs[i].style.top == ripple.style.top)) {
                //alert("collision detected");
                
                if(imgs[i].clientWidth<50){
                    imgs[i].style.width = imgs[i].clientWidth + 10;
                    imgs[i].style.height = imgs[i].clientHeight + 10;
                }
                
                temptip = imgs[i].getAttribute('tiptitle');
                if(temptip == null || temptip == ""){
                    temptip = imgs[i].getAttribute('title');
                }
                texts = imgs[i].getAttribute('texts');
                imgs[i].setAttribute('texts', texts);
                
                var tooBig = temptip.split("<br>");
                if (tooBig.length<10){
                    temptip = temptip +"<br>"+title;
                    texts = texts +"<br>"+title;
                    imgs[i].setAttribute('tiptitle', temptip);
                }else{
                    if (tooBig[tooBig.length-1] == "Click to see more"){
                        newPage = 'newWindow(this)';
                        imgs[i].setAttribute('onClick', newPage);
                        texts = texts +"<br>"+title;
                    }else{
                        linking = temptip + "<br>Click to see more";
                        imgs[i].setAttribute('tiptitle', linking);  
                    }
                    
                }
                imgs[i].setAttribute('texts', texts);
                
                //alert("temptip"+temptip);
                
                //feeling = imgs[i].getAttribute(objJson.sentiment);
                //feeling = parseInt(feeling) + 1;
                //imgs[i].setAttribute(objJson.sentiment, feeling);
                
                //alert(objJson.sentiment+" feeling : "+feeling);
                //var pos = imgs[i].getAttribute('positive');
                //var neg = imgs[i].getAttribute('negative');
                //var neu = imgs[i].getAttribute('neutral');
                //newBird = nextBird(pos, neg, neu);
                //imgs[i].setAttribute('src', newBird);
                //imgs[i].tiptitle = imgs[i].tiptitle + title;
                //alert(imgs[i].style.height);
                return;
            }
            
        }
    }

	ripple.setAttribute('class', 'ripple');

	ripple.setAttribute('id', id);
    
    ripple.setAttribute('title', title);
    ripple.setAttribute('texts', title);

	//ripple.setAttribute('onLoad', 'shakeAll()');
    ripple.setAttribute('onLoad', 'this.focus()');
    
    //ripple.setAttribute('onClick', "Popup.show(null,null,null,{'content':'DIV!','width':200,'height':200,'style':{'border':'1px solid black','backgroundColor':'cyan'}});return false;");
    
    //ripple.setAttribute('onClick', 'alert("working!")');

	map.appendChild(ripple);

	

	//ripples++;

	//ripplemap[id] = Math.floor((Math.random()*30)+50);

}

//function to draw birds



function drawBird(stringParams){

    map = document.getElementById("twitmap");
    if(map == null) document.getElementById("accelmap");

    bird = document.createElement('img');
    bird.setAttribute('positive', 0);
    bird.setAttribute('negative', 0);
    bird.setAttribute('neutral', 0);
    
    if(stringParams == null || stringParams == ""){
        return;
    }
	objJson=jQuery.parseJSON(stringParams);

	

	switch (objJson.sentiment){

		case "positive":
            
			birdie = "birds/twitbird-green.png";
            sentiment = "<font color='green'>"+objJson.text+"</font><br>";
            bird.setAttribute('positive', 1);
            alert(sentiment);

			break;

		case "negative":

			birdie = "birds/twitbird-red.png";
            sentiment = "<font color='red'>"+objJson.text+"</font><br>";
            bird.setAttribute('negative', 1);

			break;
            
        case "ripple":
            
            birdie = "gifspeed.php?speed="+objJson.speed;
            sentiment = "<font color='red'>"+objJson.text+"</font><br>";
            bird.setAttribute('negative', 1);

    		break;
            
		case "neutral":

			birdie = "birds/twitbird-blue.png";
            sentiment = "<font color='blue'>"+objJson.text+"</font><br>";
            bird.setAttribute('neutral', 1);

			break;

		default:

			return;

	}

	bird.setAttribute('src',birdie);
    
    if (objJson.lat == null || objJson.lat==""){
	lat = Math.floor((Math.random()*(mapHeight-100))+100);
    bird.style.top = lat;
	lon = Math.floor((Math.random()*(mapWidth -100))+100);
    bird.style.left = lon;
    }else{
        
        lat = calculateLat(objJson.lat);
        bird.style.top = lat;
        lon = calculateLon(objJson.lon);
        bird.style.left = lon
    }
    
    bird.style.height = 20;
    bird.style.width = 20;
    
    //bird.style.top = objJson.lat;
    //bird.style.left = objJson.lon;
    
    //alert(bird.style.top+" "+bird.style.left+" of "+mapHeight+" "+mapWidth);
    birdSize = 60;
    
    

	

	//bird.setAttribute('src','twitterpos.png');

	

	id = lat + lon + 1;

	
    //title = objJson.sentiment+'<br>';
    title = sentiment;// + objJson.lat+" "+objJson.lon;
	//lat = (objJson.lat / 2000) * 100;

	//longit = (objJson.lon / 3000) * 100;
    var imgs = document.getElementById("twitmap").getElementsByClassName("birdie");
    if(imgs == null) document.getElementById("accelmap").getElementsByClassName("birdie");
    if(imgs.length > 0){
        for (var i = 0; i < imgs.length; i++) {
            //var radius = imgs[i].clientWidth - 20;
            var radius = 200;
            var difX = Math.abs(parseInt(imgs[i].style.top) - parseInt(bird.style.top));
            var difY = Math.abs(parseInt(imgs[i].style.left) - parseInt(bird.style.left));
            
            if ((difX<=radius && difY<=radius) || (difX < 25 && difY < 25) || (imgs[i].style.left == bird.style.left && imgs[i].style.top == bird.style.top)) {
                //alert("collision detected");
                
                /*if(parseInt(imgs[i].clientWidth)<=40){
                    imgs[i].style.width = imgs[i].clientWidth + 20;
                    imgs[i].style.height = imgs[i].clientHeight + 20;
                }
                
                if(parseInt(imgs[i].clientWidth)>40){
                    imgs[i].style.width = 60;
                    imgs[i].style.height = 60;
                }*/
                
                imgs[i].style.width = sizeBird(imgs[i]);
                imgs[i].style.height = sizeBird(imgs[i]);
                
                temptip = imgs[i].getAttribute('tiptitle');
                if(temptip == null || temptip == ""){
                    temptip = imgs[i].getAttribute('title');
                }
                texts = imgs[i].getAttribute('texts');
                imgs[i].setAttribute('texts', texts);
                
                var tooBig = temptip.split("<br>");
                if (tooBig.length<10){
                    temptip = temptip +title; // <br> was here
                    texts = texts +title; // // <br> was here
                    imgs[i].setAttribute('title', temptip);
                }else{
                    if (tooBig[tooBig.length-1] == "Click to see more"){
                        newPage = 'newWindow(this)';
                        imgs[i].setAttribute('onClick', newPage);
                        texts = texts +title; // // <br> was here
                    }else{
                        linking = temptip + "Click to see more"; // <br> was here
                        imgs[i].setAttribute('title', linking);  
                    }
                    
                }
                newPage = 'newWindow(this)';
                imgs[i].setAttribute('onClick', newPage);
                imgs[i].setAttribute('texts', texts);
                //imgs[i].setAttribute('title', texts);
                
                //alert("temptip"+temptip);
                
                feeling = imgs[i].getAttribute(objJson.sentiment);
                feeling = parseInt(feeling) + 1;
                imgs[i].setAttribute(objJson.sentiment, feeling);
                
                //alert(objJson.sentiment+" feeling : "+feeling);
                var pos = imgs[i].getAttribute('positive');
                var neg = imgs[i].getAttribute('negative');
                var neu = imgs[i].getAttribute('neutral');
                newBird = nextBird(pos, neg, neu);
                imgs[i].setAttribute('src', newBird);
                //imgs[i].tiptitle = imgs[i].tiptitle + title;
                //alert(imgs[i].style.height);
                return;
            }
            
        }
    }

	bird.setAttribute('class', 'birdie');

	bird.setAttribute('id', id);
    
    bird.setAttribute('title', title);
    bird.setAttribute('texts', title);
    if (objJson.speed == null || objJson.speed == ""){
        bird.setAttribute('speed', Math.ceil((Math.random()*20)+1));
    }else{
        bird.setAttribute('speed', objJson.speed);
        
    }
    bird.setAttribute('direction', 1);

	//bird.setAttribute('onLoad', 'shakeAll()');
    bird.setAttribute('onLoad', 'this.focus()');
    
    //bird.setAttribute('onClick', "Popup.show(null,null,null,{'content':'DIV!','width':200,'height':200,'style':{'border':'1px solid black','backgroundColor':'cyan'}});return false;");
    
    //bird.setAttribute('onClick', 'alert("working!")');

	map.appendChild(bird);

	

	//birds++;

	//birdmap[id] = Math.floor((Math.random()*30)+50);
    
    //return;

}

function nextBird(pos,neg,neu){
    if(pos == neg){
        return "birds/twitbird-blue.png";
    }
    if (pos > neg){
        if(pos>neu){
            return "birds/twitbird-green.png";
        }else{
            return "birds/twitbird-blue.png";
        }
    }else{
        if(neg>neu){
            return "birds/twitbird-red.png";
        }else{
            return "birds/twitbird-blue.png";
        }
    }
}

function sizeBird(obj){
    pos = obj.getAttribute('positive');
    neg = obj.getAttribute('negative');
    neu = obj.getAttribute('neutral');
    tweetNums = parseInt(pos)+parseInt(neg)+parseInt(neu);
    if(tweetNums < 10) return 20;
    if(tweetNums <100) return 40;
    return 60;
}
function newWindow(obj){
    allTexts = obj.getAttribute('texts');
    pos = obj.getAttribute('positive');
    neg = obj.getAttribute('negative');
    neu = obj.getAttribute('neutral');
    tweetNums = parseInt(pos)+parseInt(neg)+parseInt(neu);
    var j = window.open('');
    j.document.write(tweetNums+"Tweets! <br><br>");
    j.document.write(allTexts);
    j.document.close();
}

function getBirds(){
                //hashy = document.getElementById('hashtag').value;
                if(locked == null) return;
                if(paused) return;
                amount = 10;
                urlString = "i="+currentTweet;
                //if (amount == "" || amount == null){
                 //   alert(urlString);
                    //urlString += "&number="+amount;
                //}else{
                    urlString = urlString +"&j="+amount;
                    //alert(urlString);
                //}
                loadSwitch();
                jQuery.post("sentimentise.php", urlString, function(data){
                    //alert(data);
                    var sentiments = data.split('<br>');
                    for (num in sentiments){if(locked == null){setTimeout("",100)} drawBird(sentiments[num]);}
                    tooltip.init();
                    shakeAllnew();
                    loadSwitch();
                    //rippleTest(50);
                    //alert("Data loaded:" + sentiments[1]);
                });
                currentTweet+=amount;
            }

function loopy(){
    
    //var where = document.getElementById('index');
    //loadSwitch();
    getBirds();
    //dragObject.initialize();
    //loadSwitch();
    setTimeout(loopy, 2000);
}

function snoopy(){
    
    //var where = document.getElementById('index');
    //loadSwitch();
    getRips();
    //dragObject.initialize();
    //loadSwitch();
    if(!ripEnd)setTimeout(snoopy, ripTime);
}

function calculateLon(numLon){
    num = Math.abs(numLon);
    if(num < minLon) return 100;
    if(num > maxLon) return mapWidth - 200;
    return ((num-minLon)/maxLon) * mapWidth;
}

function calculateLat(num){
    if(num < minLat) return 100;
    if(num > maxLat) return mapHeight - 200;
    return ((num-minLat)/maxLat) * mapHeight;
}

function shakeAllnew() {
    var container = document.getElementById("twitmap");
    if (container == null) document.getElementById("accelmap");
    var imgs = container.getElementsByClassName("birdie");

    // save away original position
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].basePos = parseInt(imgs[i].style.height, 10);
    }

    var numShakes = 0;
    var maxShakes = 10;
    var range = 2;
    var direction = 1;
    var duration = 300;   // ms
    var startTime = (new Date()).getTime();
    var deltas = [];

    function shakeImgsnew() {
        var now = (new Date()).getTime();
        var elapsed = Math.min(now - startTime, duration);
        var delta = Math.round(easeInOutQuad(elapsed, 0, range, duration));
        delta *= direction;
        for (var i = 0; i < imgs.length; i++) {
            var basePos = imgs[i].basePos;
            if (direction < 0) {
                basePos += range;
            }
            imgs[i].style.height = (basePos + delta) + "px";
            imgs[i].style.width = (basePos + delta) + "px";
        }
        if (now - startTime >= duration) {
            startTime = now;
            direction *= -1;
            //++numShakes;
        }
        if (numShakes < maxShakes) {
            setTimeout(shakeImgsnew, 10);
        }
    }

    shakeImgsnew();
}



var easeInOutQuad = function (t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
};

var linearTween = function (t, b, c, d) {
    return c*t/d + b;
};

// cubic easing in/out - acceleration until halfway, then deceleration
var easeInOutCubic = function (t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
};


function shakeAll() {
    var container = document.getElementById("twitmap");
    if(container == null) document.getElementById("accelmap");
    var imgs = container.getElementsByClassName("birdie");
    
    // save away original position
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].basePos = parseInt(imgs[i].style.height, 10);
    }
    
    var numShakes = 0;
    var maxShakes = 10;
    var range = 10;
    var direction = 1;
    var duration = 300;   // ms
    var startTime = (new Date()).getTime();
    var deltas = [];
    
    function shakeImgs() {
        var now = (new Date()).getTime();
        var elapsed = Math.min(now - startTime, duration);
        //var delta = Math.round(easeInOutQuad(elapsed, 0, range, duration));
        //delta *= direction;
        for (var i = 0; i < imgs.length; i++) {
            deltas[i] = Math.round(easeInOutQuad(elapsed, 0, imgs[i].getAttribute('speed'), duration));
            deltas[i] *= direction;
            var basePos = imgs[i].basePos;
            if (direction < 0) {
                basePos += range;
            }
            imgs[i].style.height = (basePos + deltas[i]) + "px";
            imgs[i].style.width = (basePos + deltas[i]) + "px";
        }
        if (now - startTime >= duration) {
            startTime = now;
            direction *= -1;
            //++numShakes;
        }
        if (numShakes < maxShakes) {
            setTimeout(shakeImgs, 100);
        }
    }
    
    shakeImgs();
}
function getStyle(el,styleProp) {
    el = document.getElementById(el);
    var result;
    if(el.currentStyle) {
        result = el.currentStyle[styleProp];
    } else if (window.getComputedStyle) {
        result = document.defaultView.getComputedStyle(el,null)
                                    .getPropertyValue(styleProp);
    } else {
        result = 'unknown';
    }
    return result;
}

function addStyle(el,styleProp, addition) {
    el = document.getElementById(el);
    if(el.currentStyle) {
        el.currentStyle[styleProp] = addition + el.currentStyle[styleProp];
    } else if (window.getComputedStyle) {
        //el.currentStyle[styleProp] = addition + document.defaultView.getComputedStyle(el,null).getPropertyValue(styleProp);
    }
}

function thatRip(sum ,lat, lon){
    if(paused) return;
    //var avgSpeed = ((sum/num)/20)*10;
    
    
    //alert("here");
    //alert(color);
    //if(lon == 1) alert(lon);
    var position = ((lat-1)*widthDivisions) + lon;
    //alert(position);
    setRandomValues(sum,position);
    var avgSpeed = (((ripSum[position] - (9*ripNum[position]))/ripNum[position])/2)*10;
    var color = calculateColor(avgSpeed);
    //var position = calculateCoords(calculateLat(lat), calculateLon(lon));
    //color = "gray";
    var overlay = "url(gifspeed.php?s=2&f="+motion+"&c="+color+"&w="+position+"),";
    map = document.getElementById("accelmap");
    if (map == null) document.getElementById("twitmap");
    loadSwitch();
    map.style.backgroundImage = overlay + getStyle('accelmap','background-image');
    setTimeout(loadSwitch,2000);
}

function setRandomValues(summation, where){
    if(ripSum[where] == undefined) ripSum[where] = 0;
    ripSum[where] += summation;
    if(ripNum[where] == undefined) ripNum[where] = 0;
    ripNum[where] += 1;
}

var someCount = 0;
function calculateCoords(lat, lon){
    var latMod = lat%heightDiv;
    while(latMod != 0){
        lat++;
        latMod = lat%heightDiv;
        //alert(theMod);
        //if(theMod == 0) return alert("success"+num/7);
    }
    var latPos = lat/heightDiv;
    var lonMod = lon%widthDiv;
    while(lonMod != 0){
        lon++;
        lonMod = lon%widthDiv;
        //alert(theMod);
        //if(theMod == 0) return alert("success"+num/7);
    }
    var lonPos = lon/widthDiv;
    //("latpos:"+latPos+"lonpos:"+lonPos);
    var finalPos = ((latPos-1)*widthDiv) + lonPos;
    //alert(finalPos);
    //return finalPos;
    someCount++;
    return someCount;
}

function calculateColor(speed){
    var a = Math.abs(speed-2);
    var c = Math.abs(speed-6);
    if(a<c){return "red";//2;
    }else{
        return "green";//10;
    }
    return "green";//6;
}

function getRips(){
    if(paused)return;
    var ripAmount = 10;
    var url = "accelerate.php";
    var qry = "i="+ripCount.toString()+"&j="+ripAmount.toString();
    //var amount = parseInt((Math.random()*19)+1);
    //var summation = parseInt((Math.random()*19)+1);
    $.get(url,qry, function(data){
        if(data == "") return;
        var ripples = data.split('<br>');
        for(item in ripples){
            var ripple = jQuery.parseJSON(ripples[item]);
            if (ripple == null){ripEnd = true; return;}
            var lat = Math.round((Math.random()*(heightDivisions - 1))+1);
            var lon = Math.round((Math.random()*(widthDivisions - 1))+1);
            thatRip(ripple.rms,lat, lon);
        }
        //alert(data);
    });
    //var lat = parseInt((Math.random()*(maxLat - minLat))+minLat);
    //var lon = parseInt((Math.random()*(maxLon - minLon))+minLon);
    //var lat = Math.round((Math.random()*(heightDivisions - 1))+1);
    //alert("lat:"+lat.toString());
    //var lon = Math.round((Math.random()*(widthDivisions - 1))+1);
    //alert("lon:"+lon.toString());
    //if(position == 6) position = 12;
    //alert("here");
    //thatRip(summation,lat, lon);
    ripCount+=ripAmount;
    //alert("back");
}

function playPause(){
    if(paused){
        var icon = document.getElementById('playpause');
        icon.setAttribute('src','assets/pause.png');
        paused = false;
        return;
    }else{
        var icon = document.getElementById('playpause');
        icon.setAttribute('src','assets/play.png');
        paused = true;
        return;
    }
}

function rippleSwitch(){
    if(motion == ""){
        motion = "1";
        newLoc = window.location.href.split('#')[0];
        window.location.href = newLoc;
    }else{
        motion="";
        newLoc = window.location.href+'#ripple';
        window.location.href = newLoc;
    }
}