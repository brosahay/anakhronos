$(document).ready(function(){
  $wh= $(window).height();
  $ww= $(window).width();
  $("#home").height($wh);
  $(".home-overlay").height($wh);
  $(".pad-section").height(0.75*$wh);
  $('#nmain').hide();
  $('#e1').hide();
  $('#e2').hide();
  $('#e3').hide();
  $('#e4').hide();
  $('#e5').hide();
  $('#e6').hide();
  $(window).scroll(function () {
    if ($(window).scrollTop() > (0.75*$wh)) {
      $('#nmain').slideDown("easing");
    }
    else{
      $('#nmain').slideUp("easing");
    }

    if ($(window).scrollTop() > 1850) {
      $('#e1').fadeIn(3000);
      $('#e2').fadeIn(3050);
      $('#e3').fadeIn(4000);
      $('#e4').fadeIn(4050);
    }

    if($(window).scrollTop()>2500){
      $('#e5').fadeIn(3000);
      $('#e6').fadeIn(4000);
    }
  });

  $("#scroll_icon").click(function(event){
    event.preventDefault();
    $('html,body').animate({
      scrollTop: $($(this).attr("href")).offset().top
    },2000);
  });

  $("nav div ul li a").click(function(event){
    event.preventDefault();
    $('html,body').animate({
      scrollTop: $($(this).attr("href")).offset().top
    },2000);
  });

  var backgrounds = Array('./img/sliders/home0.jpg', './img/sliders/home2.jpg', './img/sliders/home3.jpg', './img/sliders/home4.jpg');
  var current = 0;
  var home=$(document.getElementById('home'));

  $(window).ready(function(){
    function nextBackground(){
      home.animate({opacity: 1}, 1000, function(){
        home.animate({opacity: 0}, 1000, function(){
          var url = "url("+backgrounds[current = ++current % backgrounds.length]+")";
          home.css("background-image", url);
          home.animate({opacity:1}, 1000, function(){
            setTimeout(nextBackground, 3000);
          })
        })
      })
    }
    nextBackground();
  });

  $("#submit").click(function(e){
    e.preventDefault();

    var name = $("#name").val();
    var college = $("#college").val();
    var email = $("#email").val();
    var ph_number = $("#ph_number").val();
    var events = $("#event").val();
    var error = false;
    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    if(!name.trim()){
      $("#name-input-group span").removeClass("invisible");
      error=true;
    }
    else{
      $("#name-input-group span").addClass("invisible");
    }
    if(!college.trim()){
      $("#college-input-group span").removeClass("invisible");
      error=true;
    }
    else{
      $("#college-input-group span").addClass("invisible");
    }
    if(!events.trim()){
      $("#event-input-group span").removeClass("invisible");
      error=true;
    }
    else{
      $("#event-input-group span").addClass("invisible");
    }
    if(!email.trim() || !filter.test(email)){
      $("#email-input-group span").removeClass("invisible");
      error=true;
    }
    else{
      $("#email-input-group span").addClass("invisible");
    }

    if(!ph_number.trim()){
      $("#ph_number-input-group span").removeClass("invisible");
      error=true;
    }
    else{
      $("#ph_number-input-group span").addClass("invisible");
    }
    if(error)
    return false;
    if (!error){
      $.ajax({
        url: "https://docs.google.com/forms/d/1MxMvOZGrt7xN1qJ9p36vn9onAcxPj8rMmWwfh3LVPjk/formResponse",
        data: {
          "entry.2005620554" : name,
          "entry.1045781291" : email,
          "entry.1065046570" : college,
          "entry.1166974658" : ph_number,
          "entry.839337160" : events
        },
        type: "POST",
        dataType: "xml",
        statusCode: {
          0: function (){
            $("#name").val("");
            $("#college").val("");
            $("#event").val("");
            $("#email").val("");
            $("#ph_number").val("");
            $("#name-input-group span").addClass("invisible");
            $("#college-input-group span").addClass("invisible");
            $("#event-input-group span").addClass("invisible");
            $("#email-input-group span").addClass("invisible");
            $("#ph_number-input-group span").addClass("invisible");
            $("#response").removeClass("alert-danger").removeClass("invisible").addClass("alert-success").html("Your response has been submitted successfully. We will get back to you as soon as we can.").fadeOut(5000);
          },
          200: function (){
            $("#name").val("");
            $("#college").val("");
            $("#event").val("");
            $("#email").val("");
            $("#ph_number").val("");
            $("#name-input-group span").addClass("invisible");
            $("#college-input-group span").addClass("invisible");
            $("#event-input-group span").addClass("invisible");
            $("#email-input-group span").addClass("invisible");
            $("#ph_number-input-group span").addClass("invisible");
            $("#response").removeClass("alert-danger").removeClass("invisible").addClass("alert-success").html("You have successfully registered.").fadeOut(5000);
          }
        }
      });
    }
    else {
      $("#response").removeClass("alert-success").addClass("alert-danger").html("There was an error submitting in your response. Kindly get back to the team at nikunjakanaiky@gmail.com. We would be more than happy to help you.").fadeOut(5000);
    }
  });
});
