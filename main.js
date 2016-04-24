jQuery(function () {
    var myPlayer = jQuery("#bgndVideo").YTPlayer();

    var filters = {
        opacity: 50,
        blur: 7
    }
    jQuery('#bgndVideo').YTPApplyFilters(filters);

    //$('#bgndVideo').YTPUnmute();
    //$('#bgndVideo').YTPToggleVolume();
});
/****/



