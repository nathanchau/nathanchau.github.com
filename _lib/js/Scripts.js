
var selSection = new Array();
	selSection["level0"] = false;
	selSection["guilt"] = false;
	selSection["idea"] = false;
	selSection["proj"] = false;
	selSection["book"] = false;
	selSection["cinema"] = false;
	selSection["reading"] = false;
	selSection["about"] = false;
	selSection["contact"] = false;

var selItems = new Array();
	selItems["proj"] = false;
	selItems["about"] = false;
		
		
function toggleSection(link, type) {

		if (selItems[type]) {
		unsetItems(selItems[type], type);
		selItems[type] = false;
	}
	if (type == 'level0') {

		for (subItem in selItems) {
			if (selItems[subItem]) {
				unsetItems(selItems[subItem], subItem);
				selItems[subItem] = false;
			}
		}

		for (sub in selSection) {
			if (selSection[sub] && sub != 'level0') {
				unsetSection(selSection[sub], sub);
				selSection[sub] = false;
			}
		}
	}
	var selectNum = link.id.substring(link.id.indexOf("-")+1);
	switch (selSection[type]) {

		case selectNum:

			if (mov) {
				stopMovieSafari();
				mov = false;
			}
			selSection[type] = false;
			unsetSection(selectNum, type);
			break;

		default:
			if (selSection[type]) {
				if (mov) {
					stopMovieSafari();
					mov = false;
				}
				unsetSection(selSection[type], type);
			}
			selSection[type] = selectNum;
			setSection(selectNum, type);

			if (link.id=='level0-cinema' || link.id=='level0-proj') {
				initMovieSafari();
			}
			break;
	}
}


function toggleItems(link, type, proj_id) {
	var itemNum = link.id.substring(link.id.lastIndexOf("-")+1);
	if (selItems[type]) {
		if (itemNum != selItems[type]) {
			unsetItems(selItems[type], type);
			selItems[type] = itemNum;
			setItems(itemNum, type);
		} else {
			selItems[type] = false;
			unsetItems(itemNum, type);
		}
	} else {
		selItems[type] = itemNum;
		setItems(itemNum, type);
	}

	if (proj_id) {

		if (selItems[type] == false) {
			getRawObject(link.id.substring(0, link.id.length-2)+"-gallery").src = "proj-blank.html";
		}
		else {
			getRawObject(link.id.substring(0, link.id.length-2)+"-gallery").src = "proj-gallery.php?id=" + proj_id;
		}
	} 
}


function unsetSection(section, type) {
	var obj = getRawObject(type+"-"+section);
	obj.className = "notSelected";
	var inner = obj.innerHTML;
	switch (type) {
		case "level0":
			unsetDisplay(section+"-content");
			inner = inner.replace(/\+/g, "-");
			var selection = type+"-"+section;
			if (selection == "level0-book") {
			getRawObject("book-0-gallery").src = "proj-blank.html";
			}
			break;
		default:
			unsetDisplay(type+"-"+section+"-content");
			inner = inner.replace(/^\-/g, "+");
			var selection = type+"-"+section;
			if (selection == "guilt-1") {
				getRawObject("guilt-1-gallery").src = "proj-blank.html";
			}
			if (selection == "idea-1") {
				getRawObject("idea-1-gallery").src = "proj-blank.html";
			}
			break;
	}
	obj.innerHTML = inner;

	clearContent();
}

function setSection(section, type) {
	var obj = getRawObject(type+"-"+section);
	obj.className = "selected";
	var inner = obj.innerHTML;
	switch (type) {
		case "level0":
			setDisplay(section+"-content");
			inner = inner.replace(/\-/g, "+");
			var selection = type+"-"+section;
			if (selection == "level0-book") {
				getRawObject("book-0-gallery").src = "books.php";
			}
			break;
		default:
			setDisplay(type+"-"+section+"-content");
			inner = inner.replace(/^\+/g, "-");
			var selection = type+"-"+section;
			if (selection == "guilt-1") {
				getRawObject("guilt-1-gallery").src = "guilt.php";
			}
			if (selection == "idea-1") {
				getRawObject("idea-1-gallery").src = "idea.php";
			}
			break;
	}
	obj.innerHTML = inner;
}

function unsetItems(section, type) {
//alert ("unset " +type+"-"+selSection[type]+"-"+section);
	var obj = getRawObject(type+"-"+selSection[type]+"-"+section);
	obj.className = "notSelected";
	unsetDisplay(type+"-"+selSection[type]+"-"+section+"-content");
	var inner = obj.innerHTML;
	inner = inner.replace(/^\-/, "+");
	obj.innerHTML = inner;
}

function setItems(section, type) {
	var obj = getRawObject(type+"-"+selSection[type]+"-"+section);
	obj.className = "selected";
	setDisplay(type+"-"+selSection[type]+"-"+section+"-content");
	var inner = obj.innerHTML;
	inner = inner.replace(/^\+/, "-");
	obj.innerHTML = inner;
}

function showEssay(texthtml) {
	// picture obj in parent frame
	var obj = parent.getRawObject('content-right');
	var tag = '<iframe id="txt-' + Math.floor(Math.random() * 100) + '" src="_txt/' + texthtml + '" width="400" height="500" frameborder="0"></iframe>';
	// add close button
	tag += '<p><a href="#" onclick="clearContent();">--&gt; close</a></p>';
	obj.style.display = "block";
	obj.innerHTML = tag;
}

function clearContent() {
	var obj = getRawObject('content-right');
	obj.innerHTML = "";
	unsetDisplay('content-right');
}



function mudInit() {
	initDHTMLAPI();

	if (isNN4) {
		location.href = "notsupported.html";
	}

	if (!isMac) {
		getObject('content-left').width = "560px";
		getObject('content-right').left = "570px";
		getObject('body').fontSize = "11px";
	}

	getObject('loading').visibility = "hidden";
	getObject('content-wrapper').visibility = "visible";
}



if (typeof window.addEventListener != 'undefined') {
	window.addEventListener('load', mudInit, false);
}

else if (typeof document.addEventListener != 'undefined') {
	document.addEventListener('load', mudInit, false);
}

else if (typeof window.attachEvent != 'undefined') {
	window.attachEvent("onload", mudInit);
}

else {
	window.onload = mudInit;
}