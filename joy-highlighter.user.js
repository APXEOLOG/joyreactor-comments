// ==UserScript==
// @name         Joyreactor Comments Highlighter
// @namespace    http://apxeolog.com/
// @version      1.0
// @description  Simple script to highlight top-rated comments
// @author       APXEOLOG
// @match        http://*.joyreactor.cc/*
// @match        http://*.reactor.cc/*
// @grant        none
// ==/UserScript==

var COMMENTS_TO_HIGHLIGHT = 5;

var BORDER_STYLE = '3px solid green';

$('.post_comment_list').on('DOMUpdate', function() {
    var comments = [];
    $(this).find('.comment_rating').each(function(index, element) {
        comments.push({ id: $(element).attr('comment_id'), rating: parseFloat($(element).text()) });
    });
    comments.sort(function(a, b) { return b.rating - a.rating });
    for (var i = 0; i < COMMENTS_TO_HIGHLIGHT; i++) {
        $('#comment' + comments[i].id).css({ 'border': BORDER_STYLE });
    }
});