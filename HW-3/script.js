function storyFunction(choice) {
  var answer1 = document.getElementById("goodchoice").innerHTML;
  var answer2 = document.getElementById("badchoice").innerHTML;
  // Choice one is made here

  // This choice leads to the good path
  if (choice == 1 && answer1 == "Charity") {
    document.getElementById("story").innerHTML = "<p>You try and recall what you were doing... Oh right, that's it. You beam proudly.</p><p>\"I was in the middle of helping a group of orphans find their way back home, when all of a sudden a massive beast blocked the way. I jumped in while they ran. I took a blow, and then everything went black.\"</p><p>He looks you up and down and nods. \"Juding by the wounds on the corpse below that sounds about right. Perfect, off you go to Valhalla then!\"</p><p>He waves a hand(?) and a set of glass stairs stretching further into the sky appears. With a heart full of pride, you venture forward, climbing away towards the legendary resting place of all warriors good and valorous... Valorant? Full of valor?</p><p>As you climb the stairs, however, your path is blocked by a sword made entirely of stars! It swings violently, but you've heard of this... Perhaps you can tame this sword and bring it with you. What do you do?</p>";
    document.getElementById("image").innerHTML = "<img src=\"./images/Porksword.gif\" alt=\"An Astral Sword\">";
    document.getElementById("goodchoice").innerHTML = "Flex your Muscle";
    document.getElementById("badchoice").innerHTML = "Show it some Moxie";
    // This choice leads to the bad path
  } else if (choice == 2 && answer2 == "\"Charity\"") {
    document.getElementById("story").innerHTML = "<p>You think back to the last thing you remember... Oh, yeah! You remember. Your lips purse into a devious smile.</p><p>\"Well, I came across this kid selling gum, precariously keeping his money in an unsecured pouch... I went to snag it, and the kid ran me through with a pocket knife! He attacked me, and everything went black...! The nerve!\"</p><p>The figure examines you a bit and lets out what can only be a sigh, but all... Astral-y. \"One of these, huh? Alright, into Hey Deze with you.\"</p><p>You move to protest, but he clicks his pen and a trapdoor in the air below you opens like a rift and sucks you down, scraping your spiritual back against a burning highway as you spiral downwards. You're then dumped right into this dreadully hot enviornment, and pick yourself up to take a look around. You actually felt that pain. Ugh.</p><p>As you're getting your bearings, an imp wanders from around a jagged rock and screams at you. Looks like it's charging, time to show it who's boss.</p>";
    document.getElementById("image").innerHTML = "<img src=\"./images/Wimp.gif\" alt=\"A terrifying Imp.\">";
    document.getElementById("goodchoice").innerHTML = "Hurl a hot spell!";
    document.getElementById("badchoice").innerHTML = "Cast a cold spell!";
  }
    // Good Path
    else if (choice == 1 && answer1 == "Flex your Muscle") {
    document.getElementById("story").innerHTML = "<p>Using your bulging muscles and sheer grit, you grab onto the sword and hang on for dear life! You wrestle with it for a good while, until eventually the sword manages to calm itself down. As you hold it tightly in your hands, it's like you can feel how it feels. And man, it's sure frustrated.</p><p>Certain enough that you'll get along eventually, you continue your climb until you find yourself at the peak of the stairs... The gates to Valhalla shine brightly and you step through, ready to enjoy paradise.</p><p>... or is that really how your story ended? You can always go back and try again...</p>";
    document.getElementById("image").innerHTML = "<img src=\"./images/Apearlygates.gif\" alt=\"The Pearly Gates\">";
    document.getElementById("goodchoice").innerHTML = "I want to try again.";
    document.getElementById("badchoice").innerHTML = "Nah, I'm good.";
  }
    else if (choice == 2 && answer2 == "Show it some Moxie") {
    document.getElementById("story").innerHTML = "<p>You saunter your way towards the sword in an aloof manner, radiating a cool energy, a suave miasma. If you were to walk into a room like this, you're pretty sure half the people would die from your mojo.</p><p>However, since this is a sword and not a person, you don't really do much to catch it except casually reach for it... And that's when the sword turns and runs you through like a kebob. You feel it down in your very soul, and since you died while you were already dead, now you get to live in purgatory. Hooray!</p><p>... or is that really how your story ended? You can always go back and try again...</p>";
    document.getElementById("image").innerHTML = "<img src=\"./images/Corpse.gif\" alt=\"Your Dead Spirit\">";
    document.getElementById("goodchoice").innerHTML = "I want to try again.";
    document.getElementById("badchoice").innerHTML = "Nah, I'm good."; }

    // Bad Path
    else if (choice == 1 && answer1 == "Hurl a hot spell!") {
    document.getElementById("story").innerHTML = "<p>You summon your inert magical energy and whirl it into a searing ball of boiling vodka sauce, which you hurl with pinpoint accuracy at the imp. A direct hit! <b style=\"color:Red;\">WACK! SPLAT! BOOM! CRACK!</b></p><p>... However, as you neglected to take into account that this imp lives in a firey hellscape where tornadoes of flame are a common occurance, he shrugs it off and immediately pounces on you, shredding you to a pulp. You can feel each scratch in your very being, but soon enough it all fades into nothingness. Hooray! Since you died again, you went to purgatory. But hey, at least you can't feel pain here! (Or anything else.)</p><p>... or is that really how your story ended? You can always go back and try again...</p>";
    document.getElementById("image").innerHTML = "<img src=\"./images/Corpse.gif\" alt=\"Your Dead Spirit\">";
    document.getElementById("goodchoice").innerHTML = "I want to try again.";
    document.getElementById("badchoice").innerHTML = "Nah, I'm good.";
  }
    else if (choice == 2 && answer2 == "Cast a cold spell!") {
    document.getElementById("story").innerHTML = "<p>You call upon those ancient magics which you've learned and summon a canneloni the size of a rocket launcher. You hold it on your shoulder and it goes off, pelting the imp with shards of ice. <b style=\"color:DodgerBlue;\">WHAM! SOCKO! BAM! SPLORF!</b></p><p>The imp isn't used to this level of cold, and all that tough resistance to heat he's built up is useless. Your attack sends it screaming and running, and you nod in approval. Finally, you catch sight of a temple off in the distance... You move towards it, unsure of what awaits you next. You have a feeling, though, you're going to have a hell of a time.</p><p>... or is that really how your story ended? You can always go back and try again...</p>";
    document.getElementById("image").innerHTML = "<img src=\"./images/Azazel_temp.gif\" alt=\"Azazel's Temple\">";
    document.getElementById("goodchoice").innerHTML = "I want to try again.";
    document.getElementById("badchoice").innerHTML = "Nah, I'm good."; }

    // End Path
    else if (choice == 1 && answer1 == "I want to try again.") {
    document.getElementById("story").innerHTML = "<p>\"Howdy friend, and welcome to the afterlife!\"</p><p>You feel your senses coming back to you and your eyes open to a clear blue sky and clouds above and below you. Your head hurts like a bad hangover and your entire body aches distantly, which is to say your body <b>should</b> be aching, but it's not. You cast a quick glance down at yourself and you're but a shadow of your former self, a spirit!</p><p>You pick yourself up (or rather, you float yourself up) and face down a wispy looking person carrying a clipboard and wearing a funky hat. Your mind starts to clear a bit and he speaks up again.</p><p>\"So, you're dead, that much must be obvious to you at this point.\" He taps his finger-analogue (seriously, he doesn't even look like he has any) against his pen as he goes over the board. \"Problem is, our watcher was off on break while you bit the dust so we have no idea what you were just doing.\"</p><p>He looks up at you expectantly. \"So pal, what were you doing before you died just now?\"</p>";
    document.getElementById("image").innerHTML = "<img src=\"./images/Minipearl.gif\" alt=\"The Pearly Gatekeeper\">";
    document.getElementById("goodchoice").innerHTML = "Charity";
    document.getElementById("badchoice").innerHTML = "\"Charity\"";
  }
    else if (choice == 2 && answer2 == "Nah, I'm good.") {
    document.getElementById("story").innerHTML = "<p>Hey there, looks like you made it to the ending!" + "<p>Thank you for playing! As you can probably tell, this little game is an homage to <i>The Kingdom of Loathing</i>. You can find it simply by googling it or <a href=\"https://www.kingdomofloathing.com\" target=\"_blank\">clicking here</a>. It's a fantastic browser game that is way better made than this. Additionally, most of these images (except the one you see above now, that little guy with the d20 and book) are the property of The Kingdom of Loathing, copyright Asymmetric Publications, LLC. I just used them for this non-profit school project for fun.</p><p>If you want to play again, go ahead and say so. I won't judge!";
    document.getElementById("image").innerHTML = "<img src=\"./images/Logo_DMGuy.png\" alt=\"Azazel's Temple\">";
    document.getElementById("goodchoice").innerHTML = "I want to try again.";
    document.getElementById("badchoice").innerHTML = "Nah, I'm good."; }
}
