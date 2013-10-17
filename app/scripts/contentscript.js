/* global $ */
/* global removeDiacritics */
'use strict';

function SensPirate() {
	this.mediaCls = 'div.main .prvie-title';
	this.mediaOriginalCls = 'div.main .prvie-original-title';
	this.tpbSearchUrl = 'http://thepiratebay.sx/search/{media}/0/99/100,200';
	this.t4SearchUrl = 'http://www.t411.me/torrents/search/?search={media}';

	this.getMediaTitle = function() {
		var title = $(this.mediaOriginalCls).text();
		if(!$(this.mediaOriginalCls).length) {
			title = $(this.mediaCls).text();
		}
		return removeDiacritics(title);
	};

	this.createDownloadButton = function(cls, text, url) {
		var btn = $('<a/>', {
		    href: url,
		    class: 'btn '+cls,
		    title: text,
		    target:'new',
		    text: text
		});
		return btn;
	};

	this.appendDownloadButtons = function() {
		var tpbBtn = this.createDownloadButton('tpb','Chercher sur ThePirateBay',this.tpbSearchUrl.replace('{media}',this.getMediaTitle())),
			t4Btn = this.createDownloadButton('t4','Chercher sur T411',this.t4SearchUrl.replace('{media}',this.getMediaTitle()));

		$(this.mediaCls).after(tpbBtn);
		$(this.mediaCls).after(t4Btn);
	};

	this.init = function() {
		this.appendDownloadButtons();
		console.log('SensPirate loaded');
	};
}
var SP = new SensPirate();
SP.init();