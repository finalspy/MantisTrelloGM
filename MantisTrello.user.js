// ==UserScript==
// @name           MantisTrello Script
// @description    Script to create/automove cards in trello 
// @version        0.1
// @date           2012-04-27
// @author         FiNaLsPY
// @namespace      http://konkest.com
// @include        */bugs/view.php*
// ==/UserScript==

// Initialize log system
if(unsafeWindow.console){
   var GM_log = unsafeWindow.console.log;
}

// Initialize values path variables
var cardNumPath = "/html/body/table[3]/tbody/tr[3]/td[1]";

// D�terminer le projet

// V�rifier si activation plugin OK (site/projet non blacklist�)

// V�rifier la connection � Trello

// V�rifier l'existence d'un board
// 		si non proposer la cr�ation
//			si oui tenter la cr�ation
//				si OK continuer
//				si non abandonner le script
//					m�moriser le refus de cr�ation de board
//			si non abandonner le script
//				m�moriser le refus de cr�ation de board
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

// r�cup�rer les infos de la fiche
var card = new Object();
card.num = populateElementWithValueAt(cardNumPath);
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



// V�rifier les changements

// reporter les changements mantis -> trello


// si activ� reporter les changements trello -> mantis





//window.addEventListener('load', function () { alert("loaded : " + );}, true);