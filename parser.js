var storyString = `##<storyTree> You are walking in the forest and you see a bug and this is totally working.
   -O<screamRun> Scream and run away.
   -O<stepOn> Step on it.
   -O<eatIt> Eat it.

##<screamRun> You trip over a stump.
   -O<impaled> You impale yourself on a sharp stick.
   -O<mineshaft> You fall down a mine shaft and hit your head on a rock.

##<impaled> The bug and it's friends find you. Your body is never found.

##<mineshaft> You are eaten by a grue

##<stepOn> You shrink to size of bug.
   -O<climbingBug> The bug climbs on you.
   -O<talkativeBug> The bug has a conversation with you.

##<climbingBug> The bug hugs you...to death. First contact went well.

##<talkativeBug> The bug makes you question your existence.

##<eatIt> You get superpowers.
   -O<superPowerEvil> You go mad with the power.
   -O<superPowerGood> You use your powers to save humanity.

##<superPowerEvil> You blow up the world... The end.

##<superPowerGood> You find a cure for Global Warming. Al Gore would be proud.
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
