var storyString = "";
document.getElementById("button").addEventListener("click", newStory);
function newStory() {
  window.storyString = document.getElementById("text").value;
  var parsedStory = parsers.parseStory(storyString);
  view.renderAction(parsedStory);
}

var parsers = {
  parseStory: function(story) {
    var actions = story.split("##");
    actions.shift();
    var firstAction;
    var actionObj = {};
    for (var i = 0; i < actions.length; i++) {
      let action = this.parseAction(actions[i]);
      if (i === 0) {
        firstAction = action;
      }
      actionObj[action.label] = action;
    }
    for (var label in actionObj) {
      let action = actionObj[label];
      for (var i = 0; i < action.options.length; i++) {
        var option = action.options[i];
        option.action = actionObj[option.label];
      }
    }
    return firstAction;
  },
  parseAction: function(action) {
    var brackets = /^<([^<>]*)>([\s\S]*)/;
    var match = action.match(brackets);
    var label = match[1];
    var rest = match[2].trim();
    var actionFields = rest.split("-O");
    var text = actionFields.shift().trim();
    var options = [];
    for (var i = 0; i < actionFields.length; i++) {
      options.push(this.parseOption(actionFields[i]));
    }
    return {
      text: text,
      label: label,
      options: options
    };
  },
  parseOption: function(option) {
    var brackets = /^<([^<>]*)>([\s\S]*)/;
    var match = option.match(brackets);
    var label = match[1];
    var text = match[2].trim();
    return {
      label: label,
      prompt: text
    };
  }
};

var view = {
  renderAction: function(action) {
    document.getElementById("header").innerHTML = "Your Story:";
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
          view.renderAction(action.options[i].action);
        });
        button.appendChild(textnode);
        options.appendChild(button);
      }
    }
  }
};
