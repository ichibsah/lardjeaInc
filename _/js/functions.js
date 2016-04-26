var openSitemap = false;

function showNav() {
  $.cookie('menu') != 'true' ? $.cookie('menu', 'true') : $.cookie('menu', 'false');
  if ($.cookie('menu') == 'true') {
    $('.switch').css('backgroundPosition', '0px -32px');
    $('.menu').css('visibility', 'visible');
    if( !device.tablet() && !device.mobile()) {
      var regEx = /[msie|trident]/g;
      if (regEx.test(navigator.userAgent.toLowerCase())) {
        $('.menu').animate({height: '182'}, 2000);
      } else {
        $('.menu').animate({height: '180'}, 2000);
      }
    } else {
      $('.menu').animate({height: '185'}, 2000);
    }
  } else {
    $('.switch').css('backgroundPosition', '0px 0px');
    $('.menu').animate({height: '0'}, 1000, function(){$('.menu').css('visibility', 'hidden');});
  }
}

function viewSitemap() {
  if (!openSitemap) {
    $(".toolbar-docked-bottom").animate({
      height: "+=165"
    }, 1400, function() {
      $(".toolbar-docked-bottom .symbol").html('}');
      openSitemap = true;
    });
  } else {
    $(".toolbar-docked-bottom").animate({
      height: "-=165"
    }, 1400, function () {
      $(".toolbar-docked-bottom .symbol").html('{');
      openSitemap = false;
    });
  }
}

function init_map() {
  var myLatlng = new google.maps.LatLng(47.397736,9.589992);
  var myOptions = {
        zoom: 10,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  var contentString = '<div id="map_content">' +
                        '<h1 id="firstHeading" class="firstHeading">code to web Braun</h1>' +
                        '<div id="bodyContent">' +
                          '<div>Flussgrabenstrasse 5A<br/>' +
                          'CH-9445 Rebstein</div>' +
                          '<a href="http://maps.google.com/maps?f=d&source=s_q&hl=de&geocode=%3BCVeEko_0Vk7hFUw70wIdiFSSACn_dKikVhabRzHFGQsmMCYX7g&q=flussgrabenstrasse+5a,+rebstein,+schweiz&aq=&sll=47.397736,9.589992&sspn=0.007945,0.013368&vpsrc=0&ie=UTF8&hq=&hnear=Flussgrabenstrasse+5A,+9445+Rebstein,+Sankt+Gallen,+Schweiz&ll=47.397736,9.589992&spn=0.031373,0.061798&z=14&iwloc=A&daddr=Flussgrabenstrasse+5A,+9445+Rebstein,+Schweiz" target="_blank">Routenplaner</a>' +
                        '</div>' +
                      '</div>';
  var infowindow = new google.maps.InfoWindow({
        content: contentString
      });
  var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title:"code to web Braun"
      });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
}

(function($) {
  "use strict";

  $(document).ready(function() {
    var nextImg, prevImg;
    var regEx = /chrome/g;
    if (regEx.test(navigator.userAgent.toLowerCase())) {
      $('.box h3').css("padding-bottom", "1px");
    }

    if ($('.fullscreen')) {
      var windowHeight = $(window).height();
      $('.fullscreen').height( windowHeight );
      $(window).resize(function() {
        var windowHeight = $(window).height();
        $('.fullscreen').height( windowHeight );
      });
    }

    $('.smoth').click(function(event) {
      event.preventDefault();
      var link = this;
      $.smoothScroll( {
        scrollTarget: link.hash,
        speed: 1400
      });
    });

    $("#contactform").validate({
      messages: {
        firstname: "<span class=\"rot\">Bitte geben Sie Ihren Vornamen ein.<br/><br/></span>",
        lastname: "<span class=\"rot\">Bitte geben Sie Ihren Nachnamen ein.<br/><br/></span>",
        email: {
          required: "<span class=\"rot\">Bitte geben Sie Ihre E-Mail Adresse ein.<br/><br/></span>",
          email: "<span class=\"rot\">Bitte geben Sie eine gültige E-Mail Adresse ein.<br/><br/></span>"
        }
      }
    });

    $("#image").dialog({
      autoOpen: false,
      draggable: false,
      closeText: "Schliessen",
      height: "auto",
      width: "auto",
      modal: true,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      }
    });

    $(".zoomImg").click(function(event) {
      var curObj = this;
      var style = "max-width: 618px;";
      if (window.screen.width <= 640 && window.screen.width >= 600) {
        style = "max-width: 570px;";
      } else if (window.screen.width == 480) {
        style = "max-width: 450px;";
      } else if (window.screen.width <= 360 && window.screen.width >= 320) {
        style = "max-width: 290px;";
      }
      $(".inner img").each(function(i) {
        if ($(".inner img")[i].src == curObj.getElementsByTagName("IMG")[0].src) {
          prevImg = i - 1;
          nextImg = i + 1;
          if (i == $(".inner img").length - 1 || nextImg > $(".inner img").length - 1) {
            nextImg = 0;
          }
          if (i == 0 || prevImg < 0) {
            prevImg = $(".inner img").length - 1;
          }
          $("#image").dialog("option", "buttons", 
            [{
              text: "[",
              class: "symbol scroll",
              click: function() {
                $(".ui-dialog-title").text($(".inner figcaption")[prevImg].textContent);
                $("#image img").prop("src", $(".inner img")[prevImg].src);
                prevImg -= 1;
                if (prevImg < 0) {prevImg = $(".inner img").length - 1;} 
              }
            },
            {
              text: "*",
              class: "scroll",
              click: function() {
                $("#image").dialog("close");
              }
            },
            {
              text: "]",
              class: "symbol scroll",
              click: function() {
                $(".ui-dialog-title").text($(".inner figcaption")[nextImg].textContent);
                $("#image img").prop("src", $(".inner img")[nextImg].src);
                nextImg += 1; 
                if (nextImg > $(".inner img").length - 1) {nextImg = 0;} 
              }
            }
          ]);
        }
      });
      $(".ui-dialog").attr("style", style);
      $(".ui-dialog-title").text(curObj.getElementsByTagName("FIGCAPTION")[0].innerHTML);
      $("#image").html(curObj.getElementsByTagName("IMG")[0].outerHTML);
      if( device.tablet() || device.mobile() ) {
        $(".ui-button-text").css("padding-top", "2px");
      }
      $("#image").dialog("open");
    });

    $("#search-wrapper").dialog( {
      autoOpen: false,
      draggable: false,
      closeText: "Schliessen",
      height: 200,
      width: 290,
      modal: true,
      close: function(event, ui) {
        this.getElementsByTagName("FORM")[0].reset();
      }
    });

    $(".search-dialog").click(function(event) {
      $("#search-wrapper").dialog("option", "title", "Suche");
      $("#search-wrapper").dialog("open");
    });


    var word_rotator = function() {
      var words = [
        'code to web fängt am liebsten dort an, wo andere aufhören',
        'Vorausschauendes Mitdenken durch Fachkompetenz',
        'code to web bildet mit Ihnen ein Team, um Ihre Projekte umzusetzen',
        'Sie erhalten Qualität nach höchsten Ansprüchen'
      ] ,
      counter = 0;                
      
      setInterval(function() {
        $(".slogan h1").fadeOut(function() {
          $(this).html(words[counter=(counter+1)%words.length]).fadeIn();
        });
      }, 4000 );
    }
    word_rotator();


    regEx = /firefox/g;
    if (regEx.test(navigator.userAgent.toLowerCase())) {
      $(".ui-icon-closethick").css("margin", "0 0 0 -7px");
    }


  });
})(jQuery);
