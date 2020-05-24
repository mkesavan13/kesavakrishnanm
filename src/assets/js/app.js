if(typeof itsProfile === "undefined"){
	var itsProfile = {};
}

itsProfile.profileHeader = function(){
	return document.querySelector(".its_profile_header");
}();

itsProfile.stickHeader = function(){
	var header=itsProfile.profileHeader;
	var headerBounds = header.getBoundingClientRect();
	console.log(header.scrollTop,headerBounds.height);
	if(header.scrollTop > headerBounds.height){
		if(!header.classList.contains("its_profile_header_sticky")){
			header.classList.add("its_profile_header_sticky")
		}
	}
	else{
		header.classList.remove("its_profile_header_sticky")	
	}
}

itsProfile.switchTab = function(element){
	let its_menu_selected = document.querySelector(".its_menu .selected");
	if(its_menu_selected){
		its_menu_selected.classList.remove("selected");
	}

	let its_menu_body_selected = document.querySelector(".its_menu_body .selected");

	let its_menu_toSelect = document.getElementById(element.dataset.target);

	if(its_menu_body_selected){
		its_menu_body_selected.classList.remove("selected");
	}

	its_menu_toSelect.classList.add("selected");

	element.classList.add("selected");
}

itsProfile.appOnLoad = function(){
	// document.addEventListener("scroll",itsProfile.stickHeader);
}


document.body.onload = itsProfile.appOnLoad;