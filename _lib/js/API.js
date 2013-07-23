
var isCSS, isW3C, isIE4, isNN4, isSafari, isMac, isIEMac;

function initDHTMLAPI() {
    if (document.images) {
        isCSS = (document.body && document.body.style) ? true : false;
        isW3C = (isCSS && document.getElementById) ? true : false;
        isIE4 = (isCSS && document.all) ? true : false;
        isNN4 = (document.layers) ? true : false;
        isIE6CSS = (document.compatMode && document.compatMode.indexOf("CSS1") >= 0) ? true : false;
	}
	if (navigator.platform.indexOf("Mac") > -1)	isMac = true;
	if (isMac && (navigator.appName.indexOf("Microsoft") > -1)) isIEMac = true;

if (navigator.vendor == "Apple Computer, Inc.") {
		isSafari = true;
	}
}


function seekLayer(doc, name) {
    var theObj;
    for (var i = 0; i < doc.layers.length; i++) {
        if (doc.layers[i].name == name) {
            theObj = doc.layers[i];
            break;
        }
      
	  	if (doc.layers[i].document.layers.length > 0) {
            theObj = seekLayer(document.layers[i].document, name);
        }
    }
    return theObj;
}



function getRawObject(obj) {
    var theObj;
    if (typeof obj == "string") {
        if (isW3C) {
            theObj = document.getElementById(obj);
        } else if (isIE4) {
            theObj = document.all(obj);
        } else if (isNN4) {
            theObj = seekLayer(document, obj);
        }
    } else {

		theObj = obj;
    }
    return theObj;
}



function getObject(obj) {
    var theObj = getRawObject(obj);
    if (theObj && isCSS) {
        theObj = theObj.style;
    }
    return theObj;
}


function shiftTo(obj, x, y) {
    var theObj = getObject(obj);
    if (theObj) {
        if (isCSS) {

			var units = (typeof theObj.left == "string") ? "px" : 0 
            theObj.left = x + units;
            theObj.top = y + units;
        } else if (isNN4) {
            theObj.moveTo(x,y)
        }
    }
}


function shiftBy(obj, deltaX, deltaY) {
    var theObj = getObject(obj);
    if (theObj) {
        if (isCSS) {

			var units = (typeof theObj.left == "string") ? "px" : 0 
            theObj.left = getObjectLeft(obj) + deltaX + units;
            theObj.top = getObjectTop(obj) + deltaY + units;
        } else if (isNN4) {
            theObj.moveBy(deltaX, deltaY);
        }
    }
}


function setZIndex(obj, zOrder) {
    var theObj = getObject(obj);
    if (theObj) {
        theObj.zIndex = zOrder;
    }
}


function setBGColor(obj, color) {
    var theObj = getObject(obj);
    if (theObj) {
        if (isNN4) {
            theObj.bgColor = color;
        } else if (isCSS) {
            theObj.backgroundColor = color;
        }
    }
}


function show(obj) {
    var theObj = getObject(obj);
    if (theObj) {
        theObj.visibility = "visible";
    }
}


function hide(obj) {
    var theObj = getObject(obj);
    if (theObj) {
        theObj.visibility = "hidden";
    }
}


function getObjectLeft(obj) {
    var elem = getRawObject(obj);
    var result = 0;

	if (document.defaultView && document.defaultView.getComputedStyle) {
        var style = document.defaultView;
        var cssDecl = style.getComputedStyle(elem, "");
        result = cssDecl.getPropertyValue("left");
    }
    else if (isSafari) {
    	result = elem.offsetLeft;
    }
    else if (elem.currentStyle) {
        result = elem.currentStyle.left;
    } else if (elem.style) {
        result = elem.style.left;
    } else if (isNN4) {
        result = elem.left;
    }
    return parseInt(result);
}


function getObjectTop(obj) {
    var elem = getRawObject(obj);
    var result = 0;
    if (document.defaultView && document.defaultView.getComputedStyle) {
        var style = document.defaultView;
        var cssDecl = style.getComputedStyle(elem, "");
        result = cssDecl.getPropertyValue("top");
    }
    else if (isSafari) {
    	result = elem.offsetTop;
    }
    else if (elem.currentStyle) {
        result = elem.currentStyle.top;
    } else if (elem.style) {
        result = elem.style.top;
    } else if (isNN4) {
        result = elem.top;
    }
    return parseInt(result);
}


function getObjectWidth(obj) {
    var elem = getRawObject(obj);
    var result = 0;
    if (elem.offsetWidth) {
        result = elem.offsetWidth;
    } else if (elem.clip && elem.clip.width) {
        result = elem.clip.width;
    } else if (elem.style && elem.style.pixelWidth) {
        result = elem.style.pixelWidth;
    }
    return parseInt(result);
}


function getObjectHeight(obj) {
    var elem = getRawObject(obj);
    var result = 0;
    if (elem.offsetHeight) {
        result = elem.offsetHeight;
    } else if (elem.clip && elem.clip.height) {
        result = elem.clip.height;
    } else if (elem.style && elem.style.pixelHeight) {
        result = elem.style.pixelHeight;
    }
    return parseInt(result);
}


function getInsideWindowWidth() {
    if (window.innerWidth) {
        return window.innerWidth;
    } else if (isIE6CSS) {

	return document.body.parentElement.clientWidth
    } else if (document.body && document.body.clientWidth) {
        return document.body.clientWidth;
    }
    return 0;
}


function getInsideWindowHeight() {
    if (window.innerHeight) {
        return window.innerHeight;
    } else if (isIE6CSS) {

	return document.body.parentElement.clientHeight
    } else if (document.body && document.body.clientHeight) {
        return document.body.clientHeight;
    }
    return 0;
}

function setDisplay(id) {
	var obj = getObject(id);
	obj.display = "block";
}

function unsetDisplay(id) {
	var obj = getObject(id);
	obj.display = "none";
}


function getTagObject(obj) {
	var mudObj;
	if (isW3C) {
		mudObj = document.getElementsByTagName(obj);
	}
	else if (isIE4) {
		mudObj = document.all(obj);
	}
	else if (isNN4) {
		mudObj = obj;
	}
	return mudObj;
}


function mudBlur() {
	var selections = getTagObject('select');
	for( i = 0; i < selections.length; i++ ) {
		selections[i].onfocus = function() { this.blur() };
	}
	var anchors = getTagObject('a');
	for( i = 0; i < anchors.length; i++ ) {
		anchors[i].onfocus = function() { this.blur() };
	}
	var cbox = getTagObject('input');
	for( i = 0; i < cbox.length; i++ ) {
		if ((cbox[i].type == 'checkbox') || (cbox[i].type == 'radio') || (cbox[i].type == 'submit') || (cbox[i].type == 'reset')) {
			cbox[i].onfocus = function() { this.blur() };
		}
	}
}


function mudOpenWin(URL, width, height, windowName) {
	var winFeatures = "height=" + height + ",width=" + width + ",resizable=no,toolbar=no,scrollbars=no";
	window.open(URL, windowName, winFeatures);
}


var timerID = null;
function mudScroll(layer, direction, speed) {
	if (timerID) window.clearTimeout(timerID);
	var obj = getObject(layer);
	var wrapperheight = getObjectHeight(layer + "-wrapper");
	var height = getObjectHeight(layer);
	var topLimit = height - wrapperheight;
	if (topLimit > 0) {
		if (direction == "down") {
			var top = getObjectTop(layer) - speed;
			if (top < -topLimit) obj.top = -topLimit + "px";
			else obj.top = top + "px";
		}
		else if (direction == "up") {
			var top = getObjectTop(layer) + speed;
			if (top > 0) obj.top = 0 + "px";
			else obj.top = top + "px";
		}
		else if (direction == "top") {
			obj.top = "0px";
		}
		timerID = window.setTimeout("mudScroll('" + layer + "', '" + direction + "'," + (speed+0.1) + ")", 10);
	}
}

function mudScrollStop() {
	window.clearTimeout(timerID);
	timerID = null;
}

function changeClass(obj, c) {
	getRawObject(obj).className = c;
}