var itemPreview = 0;
var itemThumbnails = new Array();
var items;
var itemTimeout = 10000;
var itemFadeOut = 1000;
var itemFadeIn = 1000;

function nextItemIndex(index){
    if ((index + 1) >= items.length) {
        return 0;
    }
    else {
        return index + 1;
    }
}

function continueItemAnimation(){
    var n = itemThumbnails.length;
    if (n > 0) {
        itemPreview = itemThumbnails[0];
        for (var i = 1; i < n; ++i) {
            itemThumbnails[i - 1] = itemThumbnails[i];
        }
        itemThumbnails[n - 1] = nextItemIndex(itemThumbnails[n - 1]);
        $.each($('div.thumbnail'), function(i, e){
            $(e).animate({
                opacity: 0
            }, itemFadeOut, (function(elem, item){
                return function(){
                    var img = $(elem).find('img');
                    $(img).attr('src', 'images/120/' + item.id + '.jpg');
                    $(img).attr('alt', item.title);
                    $(elem).animate({
                        opacity: 1
                    }, itemFadeIn);
                }
            })(e, items[itemThumbnails[i]]));
        });
    }
    else {
        itemPreview = nextItemIndex(itemPreview);
    }
		
    $('div.preview').animate({
        opacity: 0
    }, itemFadeOut, function(){
		var preview = new Image();
		preview.onload = function(){
	        $('div.preview').animate({
    	        opacity: 1
        	}, itemFadeIn);
		}
        $('div.preview img').attr('src', 'images/440/' + items[itemPreview].id + '.jpg');
        $('div.preview img').attr('alt', items[itemPreview].title);
		preview.src = 'images/440/' + items[itemPreview].id + '.jpg';
    });
}

function startItemAnimation(data, status){
    var e = $('div.thumbnail');
    var n = e.length;
    items = data;
    itemPreview = Math.floor(Math.random() * (items.length + 1));
    if (n > 0) {
        itemThumbnails[0] = nextItemIndex(itemPreview);
        for (var i = 1; i < n; ++i) {
            itemThumbnails[i] = nextItemIndex(itemThumbnails[i - 1]);
        }
        $.each(e, function(idx, val){
            $(val).html($('<img src="images/120/' + items[itemThumbnails[idx]].id + '.jpg" alt="' + items[itemThumbnails[idx]].title + '"/>'));
        });
    }
    $('div.preview').html($('<img src="images/440/' + items[itemPreview].id + '.jpg" alt="' + items[itemPreview].title + '"/>'));
    $(document).everyTime(itemTimeout, continueItemAnimation);
}

$(document).ready(function(){
    $.getJSON("portfolio.json", startItemAnimation);
});
