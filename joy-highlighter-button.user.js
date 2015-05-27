// ==UserScript==
// @name         Joyreactor Comments Highlighter & Btn
// @namespace    http://apxeolog.com/
// @version      1.0
// @description  Simple script to highlight top-rated comments with nav button
// @author       APXEOLOG
// @match        http://*.joyreactor.cc/*
// @match        http://*.reactor.cc/*
// @grant        none
// ==/UserScript==

var COMMENTS_TO_HIGHLIGHT = 5;
var BORDER_STYLE = '3px solid green';

var comments = [];

$(document).ready(function() {
    $('.post_comment_list').on('DOMUpdate', function() {
        comments = [];
        $(this).find('.comment_rating').each(function(index, element) {
            var rating = parseFloat($(element).text());
            if (rating > 0) {
                comments.push({ id: $(element).attr('comment_id'), rating: rating });
            }
        });
        comments.sort(function(a, b) { return b.rating - a.rating });
        comments = comments.slice(0, Math.min(COMMENTS_TO_HIGHLIGHT, comments.length));
        comments.sort(function(a, b) { return $("#comment" + a.id).offset().top - $("#comment" + b.id).offset().top });
        for (var i = 0; i < comments.length; i++) {
            $('#comment' + comments[i].id).css({ 'border': BORDER_STYLE });
        }
    });

    var sliderElement = $('<div></div>');
    sliderElement = $('<div></div>');
    sliderElement.css({ 'position': 'fixed', 'left': '3px', 'top': '50%', 'z-index': '42' });
    sliderElement.html('<div><button id="com_next" style="margin: 3px; padding: 5px 20px"><p style="width: 10px; font: normal normal normal 13.3px/normal Arial">↓</p></button></div>');
    $('body').append(sliderElement);

    $('body').on('click', '#com_next', function() {
        if (comments.length > 0) {
            $('html, body').animate({
                scrollTop: $("#comment" + comments.shift().id).offset().top - window.screen.height / 4
            }, 800);
        } else {
            var found = false;
            $('.postContainer').each(function(index, element) {
                if (!found && $(element).offset().top > window.scrollY) {
                    found = true;
                    $('html, body').animate({
                        scrollTop: $(element).offset().top
                    }, 800);
                }
            });
        }
    });
});