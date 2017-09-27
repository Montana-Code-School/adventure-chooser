$(document).ready(function() {
  var fadeOutTimer = 2000;
  var fadeInTimer = 2000;
  $(".login").load("post_login.html");
  $("#background_music").prop("volume", 0);
  $("#background_music")
    .get(0)
    .play();
  $("#submitter").click(function() {
    $(".login").fadeOut(fadeOutTimer, function() {
      $("#sub").fadeIn(2000, function() {});
      $("#logout").fadeIn(2000, function() {});
    });
  });

  $("#logout").click(function() {
    $("#logout").fadeOut(fadeOutTimer, function() {});
    $("#sub").fadeOut(fadeOutTimer, function() {
      $(".login").fadeIn(fadeInTimer, function() {});
    });
  });
  $("#b1").hover(
    function() {
      document.getElementById("b1_text").innerHTML = "Create";
    },
    function() {
      document.getElementById("b1_text").innerHTML = "";
    }
  );
  $("#b1").click(function() {
    console.log("Hi mom!");
  });
  $("#b2").hover(
    function() {
      document.getElementById("b2_text").innerHTML = "Find";
    },
    function() {
      document.getElementById("b2_text").innerHTML = "";
    }
  );
  $("#b2").click(function() {
    console.log("Hi mom2!");
  });
  $("#b3").hover(
    function() {
      document.getElementById("b3_text").innerHTML = "Delete";
    },
    function() {
      document.getElementById("b3_text").innerHTML = "";
    }
  );
  $("#b3").click(function() {
    console.log("Hi mom3!");
  });
});
