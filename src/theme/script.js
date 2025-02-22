(function(document) {
	'use strict';

	var TableFilter = (function(Arr) {

		// the search bar element
		var _input;

		// find all rows of all tables and call _filter on them
		function _onInputEvent(e) {
			_input = e.target;
			var tables = document.getElementsByTagName('table');
			Arr.forEach.call(tables, function(table) {
				Arr.forEach.call(table.tBodies, function(tbody) {
					Arr.forEach.call(tbody.rows, _filter);
				});
			});
		}

		// show or hide a row based on the value of _input
		function _filter(row) {
			// skip "special" rows
			if (row.className.indexOf('indexhead') != -1 || row.className.indexOf('parent') != -1) {
				return;
			}

			// only check the 'name' field
			var text = row.getElementsByTagName('td')[1].textContent.toLowerCase();
			var val = _input.value.toLowerCase();

			// change display type to show / hide this row
			row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
		}

		return {
			init: function() {
				// grab the 1st child and add the indexhead class. tr:nth-child(1)
				var row = document.getElementsByTagName('tr')[0];
				// some versions of apache already add this class
				if (row !== null && row.className.indexOf('indexhead') == -1) {
					row.className += ' indexhead';
				}

				// grab the 2nd child and add the parent class. tr:nth-child(2)
				row = document.getElementsByTagName('tr')[1];
				// there is no "parent directory" row when we are in root folder
				if (row !== null && (row.getElementsByTagName('td')[1].textContent === 'Parent Directory' || row.getElementsByTagName('td')[1].textContent === 'Parent Folder')) {
					row.className += ' parent';
					// row.getElementsByTagName('td')[1].textContent = 'Parent Folder'
				}

				// find the search box and bind the input event
				document.getElementById('filter').oninput = _onInputEvent;
			}
		};

	})(Array.prototype);

	document.addEventListener('readystatechange', function() {
		if (document.readyState === 'complete') {
			TableFilter.init();
			var filterInput = document.getElementById('filter');
			if ( filterInput.value.trim().length ){
				filterInput.focus();
				filterInput.dispatchEvent(new Event('input'));
			}
		}
	});

	// Use Keydown to get special keys like Backspace, Enter, Esc.
	window.addEventListener('keydown', function (e) {
		var filterInput = document.getElementById('filter');
		var isFocused = (document.activeElement === filterInput);
		if ( !isFocused && String.fromCharCode(e.keyCode).match(/(\w|\s)/g) ) {
			filterInput.focus();
		} else {
			//pressed key is a non-char
			//e.g. 'esc', 'backspace', 'up arrow'
		}
	});

})(document);

// generate a breadcrumb
var uri = window.location.pathname.substr(1);
var arr = uri.split('/');
var url = ""
var bread = '<li><strong><a href="/">Home</a></strong></li>';
var cont = 1;
arr.forEach(function(value){	
	url = url + '/' + value;
	if(value != ''){
        if(arr.length == cont+1) {
			bread += "<li class='active'>"+decodeURI(value)+"</li>";
		} else {
			bread += "<li><a href='"+url+"'>"+decodeURI(value)+"</a></li>";
		}
    }
    cont++;
});
document.getElementById("breadcrumb").innerHTML = bread;

document.addEventListener("DOMContentLoaded", function() {
    let breadcrumb = document.getElementById("breadcrumb");
    if (breadcrumb) {
        let firstLi = breadcrumb.querySelector("li");
        if (firstLi) {
            firstLi.remove();
        }

		let secondLi = breadcrumb.querySelector("li:nth-child(1)"); // Jetzt das erste nach Entfernung
        if (secondLi) {
            let link = secondLi.querySelector("a");
            if (link) {
                link.textContent = "Home"; // Ändert nur den Text im <a>-Tag
            } else {
                secondLi.textContent = "Home"; // Falls kein <a>-Tag existiert
            }
        }
    }
});

// post processing

// Remove Icon by "Name" header
var xpathNameIcon = '//*[@id="indexlist"]/tbody/tr[1]/th[1]';
var result = document.evaluate(xpathNameIcon, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
var element = result.singleNodeValue;
if (element) {
    element.textContent = ''; // Entfernt den sichtbaren Textinhalt
}

// Remove '/'
var tdElements = document.querySelectorAll('td.indexcolname a');
tdElements.forEach(function(aElement) {
    // Originalen Text aus dem <a>-Tag holen
    var text = aElement.textContent;

    // Prüfen, ob der Text mit '/' endet, dann entfernen
    if (text.endsWith('/')) {
        aElement.textContent = text.slice(0, -1);
    }
});

// Rename "Parent Directory"
var xpath = '//*[@id="indexlist"]/tbody/tr[2]/td[2]/a';
// Element mit XPath abrufen
var result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
var element = result.singleNodeValue;
// Falls das Element gefunden wurde, Text ersetzen
if (element && element.textContent.trim() === "Parent Directory") {
    if (uri === 'home/'){
		element.parentElement.parentElement.remove();
		document.querySelectorAll("tr.odd, tr.even").forEach(tr => {
			tr.classList.toggle("odd");
			tr.classList.toggle("even");
		});
	} else {
		element.textContent = "Parent Folder";
	}
}

// Whole row as a link
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("tbody tr.even, tbody tr.even.parent, tbody tr.odd").forEach(function (row) {
        let firstLink = row.querySelector("td a"); // Ersten Link im ersten TD suchen

        if (firstLink) {
            let url = firstLink.getAttribute("href");

            row.style.cursor = "pointer"; // Ändert den Mauszeiger zu einer Hand
            row.addEventListener("click", function (event) {
                // Verhindert das Doppelauslösen, wenn der direkte Link angeklickt wird
                if (!event.target.closest("a")) {
                    window.location.href = url;
                }
            });
        }
    });
});