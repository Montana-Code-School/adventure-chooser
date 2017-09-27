var bugStory = `##<storyTree> You are walking in the forest and you see a bug and this is totally working.
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

var gabeStory = `##<storyTree>   "You are a peasant living on a farm in the small county of Gellwing. Yesterday you learned that your father plans to send you to the mines to appease nobleman Rungshal.
 You now have a choice do you run away from home with no one to go to or to you stay and go to the mines.
  -O<stay> Stay
  -O<leave> Leave
##<stay> You have chosen to stay. Will you take your knife with you? A word of caution if the foreman finds it he will kill you.
  -O<take> Take your knife.
  -O<dontTake> Don't take the knife.
  ##<take> A smart choice you will likely need it.
  ##<dontTake> A true warrior requires only his fists.
##<leave> You have chosen to leave. Where will you go, to the Kingdom Of Lortall or to The Moutains Of Thrallson.
  -O<journey> The Kingdom Of Lortall.
  -O<journey> The Moutains of Thrallson.
   ##<journey> The road will be hard. I hope you have steeled your self.
`;

var stories = {
  bug: {
    key: "bug",
    title: "A bug's life (AND DEATH)",
    text: bugStory
  },
  gabe: {
    key: "gabe",
    title: "Life",
    text: gabeStory
  }
};
module.exports = stories;
