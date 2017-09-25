var storyString = `##<storyTree> You and your band of adventurers have finally reached the dragons cave do you wait for morning or do you go in tonight.
   -O<tonight> Go in tonight.
   -O<morning> Wait for morning.

##<tonight> Your crew of adventurers dont want to enter the cave at night. Do you listen to them or do you force them to go.
   -O<force> Force them to go in tonight.
   -O<listen> You agree to wait till morning.

##<force> As you enter the cave you hear a deep ominous banging deep in the mountain.

##<listen> You decide to wait until morning.

##<morning> Your crew of adventurers does not want to wait they are impatient.
   -O<agree> You decide not to wait.
   -O<disagree> You thing it would be better to wait till morning.

##<disagree> You insist that they wait for morning.

##<agree> As you enter the cave you hear a deep ominous banging deep in the mountain.

`;

function parseStory(story) {
  // Split apart the string by actions
  var actions = story.split("##");
  // Remove the first item from the array because it is empty
  actions.shift();
  //console.log(actions);

  //console.log(regExpTest());
  var firstAction;
  var actionObj = {};
  for (var i = 0; i < actions.length; i++) {
    let action = parseAction(actions[i]);
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
  console.log(firstAction);
  return firstAction;
}

function parseAction(action) {
  /*
  This regular expression - Explained!
  / - start of regular expression
  ^ - symbol meaning start of line
  < - match an angle bracket
  ( - start a group that we can capture the output
  [^<>]* - zero or more non-angle bracket characters
  ) - end of a group
  > - match an angle bracket
  ([\s\S]* - match all characters including newlines
  */
  var brackets = /^<([^<>]*)>([\s\S]*)/;
  var match = action.match(brackets);
  var label = match[1];
  var rest = match[2].trim();
  var actionFields = rest.split("-O");
  var text = actionFields.shift().trim();
  var options = [];
  for (var i = 0; i < actionFields.length; i++) {
    options.push(parseOption(actionFields[i]));
  }
  return {
    text: text,
    label: label,
    options: options
  };
}

function parseOption(option) {
  var brackets = /^<([^<>]*)>([\s\S]*)/;
  var match = option.match(brackets);
  var label = match[1];
  var text = match[2].trim();
  return {
    label: label,
    prompt: text
  };
}

var parsedStory = parseStory(storyString);

//var Action(str) {
//  text: "";
//  options: <>;
//}
