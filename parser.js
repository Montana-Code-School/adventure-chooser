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
  //determining the first text to display
  for (var i = 0; i < actions.length; i++) {
    let action = parseAction(actions[i]);
    if (i === 0) {
      firstAction = action;
    }
    actionObj[action.label] = action;
  }

  //compiling our object into a tree
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
  //separating the actions from labels, putting the rest in an array
  var brackets = /^<([^<>]*)>([\s\S]*)/;
  var match = action.match(brackets);
  //cuts the labels out from story
  var label = match[1];
  //sets the first elements(labels) = label
  var rest = match[2].trim();
  //set second elements(options) = rest
  var actionFields = rest.split("-O");
  //splits the options from 'rest'
  var text = actionFields.shift().trim();
  //sets actionFields to the text var, trims white scace, deletes first element
  var options = [];
  //initiates empty array that the for loop then adds each option to said array
  for (var i = 0; i < actionFields.length; i++) {
    options.push(parseOption(actionFields[i]));
  }
  // puts the variables we created in an object
  return {
    text: text,
    label: label,
    options: options
  };
}

function parseOption(option) {
  //separating results(text?) from options
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
