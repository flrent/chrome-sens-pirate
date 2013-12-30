/* global $ */
/* global removeDiacritics */
'use strict';

function SensPirate() {
	this.mediaCls = '.pco-cover-content';
	this.mediaOriginalCls = 'h1.pco-cover-originaltitle';
	this.mediaTitleCls = '.d-cover-title h1';
	this.tpbSearchUrl = 'http://thepiratebay.se/search/{media}/0/99/100,200';
	this.t4SearchUrl = 'http://www.t411.me/torrents/search/?search={media}';

	this.getMediaTitle = function() {
		var title = $(this.mediaOriginalCls).text();
		if(title==='') {
			title = $(this.mediaTitleCls).text();
		}
		return removeDiacritics(title);
	};

	this.createDownloadButton = function(cls, text, url) {
		var btn = $('<a/>', {
		    href: url,
		    class: 'pco-cover-button '+cls,
		    title: text,
		    target:'_blank',
		    text: text
		});
		return btn;
	};

	this.appendDownloadButtons = function() {
		var tpbBtn = this.createDownloadButton('tpb','Chercher sur ThePirateBay',this.tpbSearchUrl.replace('{media}',this.getMediaTitle())),
			t4Btn = this.createDownloadButton('t4','Chercher sur T411',this.t4SearchUrl.replace('{media}',this.getMediaTitle()));

		$(this.mediaCls).append(tpbBtn);
		$(this.mediaCls).append(t4Btn);
	};

	this.init = function() {
		this.appendDownloadButtons();
		console.log('SensPirate loaded');
	};
}
var SP = new SensPirate();
SP.init();