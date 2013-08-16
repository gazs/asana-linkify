(function () {

	var reReplacedTicketId = /(?:">)#(\d+)(?:<\/a>)/gm;
	var reTicketId = /#(\d+)/gm;
	var template = "<a href=\"https://app.asana.com/0/0/$1\">#$1</a>";
	var commitMessageSelector = '.full-commit';

	var observeNodeWithHandler = function (node, handler) {
		if (node && handler) {

			// configuration of the observer:
			var config = { attributes: true, childList: true, characterData: true };

			var observer = new MutationObserver(function(mutations) {
		  		mutations.forEach(function(mutation) {
		  			handler(node);
		  		});    
			});

			// pass in the target node, as well as the observer options
			observer.observe(node, config);

			var _unload = document.onunload;
			document.onunload = function () {
				observer.disconnect();		
				return document.onunload.apply(document, arguments);
			}

		}
	};

	var replaceAsanaIdsWithLink = function (container) {
		// get matching NodeList
		var targetNodes = container.querySelectorAll(commitMessageSelector);

		
		// https://developer.mozilla.org/en-US/docs/Web/API/NodeList
		// NodeList is not iterable via a Array.prototype.forEach, so standard for loop instead
		for (var i = 0; i < targetNodes.length; i++) {
			var node = targetNodes[i];
			var hasId = reTicketId.test(node && node.innerHTML);
			// make sure we haven't already replaced the id with a link
			var hasReplacedId = reReplacedTicketId.test(node && node.innerHTML);

			if (hasId && !hasReplacedId) {
				node.innerHTML = node.innerHTML.replace(reTicketId, template);
			}
		}
		
	};

	document.onreadystatechange = function () {
		'use strict';
		if (document.readyState === "complete") {
			var container = document.querySelector('#js-repo-pjax-container');
			replaceAsanaIdsWithLink(container);
			observeNodeWithHandler(container, replaceAsanaIdsWithLink);
		}

	};

}());