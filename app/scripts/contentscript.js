/* global $ */
/* global removeDiacritics */
'use strict';

function SensPirate() {
	this.mediaCls = 'ul.d-menu-list';
	this.mediaOriginalCls = '.pvi-product-originaltitle';
	this.mediaTitleCls = 'h1.pvi-product-title';
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
		var btn = $('<button/>', {

		    class: 'pco-social-action '+cls,
		    title: text,
		    target:'_blank',
		    text: text
		});
		btn.on("click", function() {
			window.open(url);
		});
		return btn;
	};

	this.appendDownloadButtons = function() {
		var tpbBtn = this.createDownloadButton('tpb','ThePirateBay',this.tpbSearchUrl.replace('{media}',this.getMediaTitle())),
			t4Btn = this.createDownloadButton('t4','T411',this.t4SearchUrl.replace('{media}',this.getMediaTitle()));

		var litpb = $('<li class="pco-menu-social" />');
		$(this.mediaCls).append(litpb.html(tpbBtn));
		
		var lit4B = $('<li class="pco-menu-social" />');
		$(this.mediaCls).append(lit4B.html(t4Btn));
	};

	this.init = function() {
		this.appendDownloadButtons();
		console.log('SensPirate loaded');
	};
}
var SP = new SensPirate();
SP.init();