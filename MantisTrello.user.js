// ==UserScript==
// @name           MantisTrello Script
// @description    Script to create/automove cards in trello (inspired from http://jsfiddle.net/E4rLn/)
// @version        0.1
// @date           2012-04-27
// @author         FiNaLsPY
// @namespace      http://konkest.com
// @include        */bugs/view.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require		   https://api.trello.com/1/client.js?key=26f6ef82d61543a684199da34f16455d
// ==/UserScript==

// Initialize log system
if(unsafeWindow.console){
   var GM_log = unsafeWindow.console.log;
}

// Add login button
$('body').append('<div id="loggedout"><a id="connectLink" href="#">Connect To Trello</a></div>');
$('body').append('<div id="loggedin"><div id="header"> Logged in to TRELLO - <a id="disconnect" href="#">Log Out</a></div><div id="output"></div></div>');
$('#loggedout').css('position','absolute').css('right','10px').css('top','10px').css('font-size','20px').show();
$('#loggedin').css('position','absolute').css('right','10px').css('top','10px').css('font-size','20px').hide();


$("#connectLink").click(function(){
	GM_log('Try to connect ...');
    Trello.authorize({
        type: "popup",
        success: onAuthorize,
        scope: { write: true, read: true }
    });
});

var logout = function() {
    Trello.deauthorize();
    updateLoggedIn();
    GM_log('DISCONNECTED');
};  

Trello.authorize({
    interactive:false,
    success: onAuthorize
});

var updateLoggedIn = function() {
    var isLoggedIn = Trello.authorized();
    $("#loggedout").toggle(!isLoggedIn);
    $("#loggedin").toggle(isLoggedIn);        
};
   
var onAuthorize = function() {
    updateLoggedIn();
    $("#output").empty();
    
    GM_log("CONNECTED");

};

$("#disconnect").click(logout);



// DŽterminer le projet

// VŽrifier si activation plugin OK (site/projet non blacklistŽ)

// VŽrifier la connection ˆ Trello

// VŽrifier l'existence d'un board
// 		si non proposer la crŽation
//			si oui tenter la crŽation
//				si OK continuer
//				si non abandonner le script
//					mŽmoriser le refus de crŽation de board
//			si non abandonner le script
//				mŽmoriser le refus de crŽation de board
// 		si oui on continuer


function populateElementWithValueAt(string){
	var result = null;
	var snapResults = document.evaluate( string, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(null != snapResults && null != snapResults.snapshotItem(0)){
		result = snapResults.snapshotItem(0).innerHTML;
		GM_log("populated : " + result);
	}else{
		GM_log("missing value");
	}
	return result;
}

// rŽcupŽrer les infos de la fiche
var card = new Object();
card.num = populateElementWithValueAt("/html/body/table[3]/tbody/tr[3]/td[1]");
card.project = populateElementWithValueAt("/html/body/table[3]/tbody/tr[3]/td[2]");
card.category = populateElementWithValueAt("/html/body/table[3]/tbody/tr[3]/td[3]");
card.initialDate = populateElementWithValueAt("/html/body/table[3]/tbody/tr[3]/td[5]");
card.lastUpdateDate = populateElementWithValueAt("/html/body/table[3]/tbody/tr[3]/td[6]");


card.priority = populateElementWithValueAt("/html/body/table[3]/tbody/tr[7]/td[2]");
card.severity = populateElementWithValueAt("/html/body/table[3]/tbody/tr[7]/td[4]");
card.state = populateElementWithValueAt("/html/body/table[3]/tbody/tr[8]/td[2]");
card.resolution = populateElementWithValueAt("/html/body/table[3]/tbody/tr[8]/td[4]");

card.targetVersion = populateElementWithValueAt("/html/body/table[3]/tbody/tr[11]/td[2]");

card.title = populateElementWithValueAt("/html/body/table[3]/tbody/tr[13]/td[2]");
card.description = populateElementWithValueAt("/html/body/table[3]/tbody/tr[14]/td[2]");
//card.comments

GM_log("Card loaded : " + JSON.stringify(card));



// VŽrifier les changements

// reporter les changements mantis -> trello


// si activŽ reporter les changements trello -> mantis





//window.addEventListener('load', function () { alert("loaded : " + );}, true);