function replaceInCommitTitle() {
	'use strict';
	console.log("called");
	var commitTitle = document.querySelector('.commit-title');
	commitTitle.innerHTML = commitTitle.innerHTML.replace(/#(\d+)/, "<a href='https://app.asana.com/0/0/$1'>#$1</a>");
}

document.onreadystatechange = function () {
	'use strict';
	if (document.readyState === "complete") {
		replaceInCommitTitle();
	}
};
