var superPowerGood = {
  text: "You find a cure for Global Warming. Al Gore would be proud."
};

var superPowerEvil = {
  text: "You blow up the world... The end."
};

var eatIt = {
  text: "You get superpowers.",
  options: [
    { prompt: "You go mad with the power.", action: superPowerEvil },
    { prompt: "You use your powers to save humanity.", action: superPowerGood }
  ]
};

var talkativeBug = {
  text: "The bug makes you question your existence."
};

var climbingBug = {
  text: "The bug hugs you...to death. First contact went well."
};

var stepOn = {
  text: "You shrink to size of bug.",
  options: [
    { prompt: "The bug climbs on you.", action: climbingBug },
    { prompt: "The bug has a conversation with you.", action: talkativeBug }
  ]
};

var mineshaft = {
  text: "You are eaten by a grue"
};

var impaled = {
  text: "The bug and it's friends find you. Your body is never found."
};

var screamRun = {
  text: "You trip over a stump.",
  options: [
    { prompt: "You impale yourself on a sharp stick. ", action: impaled },
    {
      prompt: "You fall down a mine shaft and hit your head on a rock. ",
      action: mineshaft
    }
  ]
};

var storyTree = {
  text: "You are walking in the forest and you see a bug.",
  options: [
    {
      prompt: "Scream and run away.",
      action: screamRun
    },
    {
      prompt: "Step on it.",
      action: stepOn
    },
    {
      prompt: "Eat it.",
      action: eatIt
    }
  ]
};

function countEndings(action) {
  var endings = 0;
  if (action.options === undefined) {
    endings = 1;
  } else {
    for (var opt = 0; opt < action.options.length; opt++) {
      console.log("Counting endings for ", action.options[opt].prompt);
      endings += countEndings(action.options[opt].action);
    }
  }
  return endings;
}
/*
function factorial(num) {
  if (num === 0) {
    return 1;
  }
  return factorial(num - 1) * num;
}

function sum(arr) {
  if (arr.length === 0) {
    return 0;
  }
  return arr[0] + sum(arr.slice(1));
}
*/
function renderAction(action) {
  document.getElementById("text").innerHTML = action.text;
  var options = document.getElementById("options");
  while (options.firstChild) {
    options.removeChild(options.firstChild);
  }
  if (action.options === undefined) {
    options.innerHTML = "the end";
  } else {
    for (let i = 0; i < action.options.length; i++) {
      var button = document.createElement("button");
      var textnode = document.createTextNode(action.options[i].prompt);
      button.addEventListener("click", function() {
        renderAction(action.options[i].action);
      });
      button.appendChild(textnode);
      options.appendChild(button);
    }
  }
}

$.ajax({ method: "get", url: "/cya" }).done(function(result) {
  var options = $("#options");
  for (let key in result) {
    var button = document.createElement("button");
    var textnode = document.createTextNode(result[key].title);
    button.addEventListener("click", function() {
      console.log(result[key]);
      renderAction(parseStory(result[key].text));
    });
    button.appendChild(textnode);
    options.append(button);
  }
});

//renderAction(parsedStory);
