export const EDITORIAL_A = {
  "body-cameras": {
    kicker: "How to choose a body camera",
    intro: "A body camera is only useful if it is running when something happens. That single fact decides almost every specification below, so work through them in this order rather than starting from a price tag.",
    sections: [
      { h2: "Mount and clip come before image quality", p: [
        "The failure mode with body cameras is not poor video, it is a camera that is not pointed at anything. A clip that rotates under a jacket, a magnetic mount that slips when you run, or a harness that bounces with every step will ruin more footage than a mediocre sensor ever will.",
        "Decide how you will actually wear it before you compare models. Across the chest gives the steadiest view and the least self-view of your own arms. A shoulder mount sees further forward but swings. A hat or collar mount looks natural but tilts down when you look down. If you ride, drive, or climb for a living, test the mount while doing that activity, not while standing still in a shop."],
        list: [
          "Clip thickness — thin shirt fabric and thick duty belts need different clips",
          "Rotation lock — a mount that can spin will end up filming the sky",
          "Weight above about 120 g starts to drag on a light collar"] },
      { h2: "Battery life is quoted at the wrong resolution", p: [
        "Manufacturers quote standby hours, which describe a camera sitting idle. What matters is continuous recording at the resolution you intend to use, because higher resolution and higher frame rate both cut runtime sharply.",
        "Look for the continuous-record figure at your chosen resolution and assume a real-world haircut of roughly a third for cold weather, screen use, and Wi-Fi uploads. If your shift is ten hours and the camera is quoted at eight hours of continuous recording at 1080p, it is the wrong camera for you no matter how good the lens is.",
        "Cold is the second trap. Lithium cells hold far more capacity in winter than alkaline ones, and a camera that lasts a summer shift can die two hours into a January one."],
        list: [
          "Ask for continuous recording hours at the resolution you will use",
          "Reserve capacity for the upload, not just the recording",
          "Prefer replaceable cells over sealed packs if shifts run long"] },
      { h2: "Storage, audio, and the parts people discover too late", p: [
        "Loop recording with overwrite is the correct default, because a camera that stops when full is a camera that misses the moment you needed. Confirm the overwrite behaviour in writing rather than assuming it, and check whether the card is included — several brands ship the camera without one and the spec sheet does not say so.",
        "Audio is where body cameras cause legal trouble. Recording video in public is broadly permitted in the United States, but audio is governed by consent rules that vary by state, and a number of states require all parties to consent. If your camera records sound by default, you are carrying a legal question with you every day.",
        "Finally, ignore marketing language. Police and security purchasers should buy through their organisation's approved supply chain; a consumer camera described as police grade is a description of the box, not of any agency."],
        list: [
          "Confirm loop-overwrite is automatic, not an option buried in settings",
          "Check whether a card is in the box",
          "Treat audio as a separate legal decision from video"] }
    ],
    faq: [
      { q: "Is it legal to wear a body camera?", a: "In most US states you can record video in public spaces without permission. Private spaces and audio are different questions: many states require consent from at least one party, and several require all parties to consent before audio may be recorded. Check the law where you live and where you work before enabling sound." },
      { q: "What body camera do security guards use?", a: "Most security companies choose a clip-on 1080p unit with a ten-hour continuous battery, a locking mount, and a high-endurance card. Professional organisations buy through approved suppliers with warranty and evidence-handling support, which is why agency models differ from consumer ones." },
      { q: "How long do body camera batteries last in practice?", a: "Less than the box claims. Continuous recording at 1080p typically runs six to ten hours, and cold weather can cut that by a third. Replaceable lithium cells hold up far better in winter than alkaline ones." },
      { q: "Do body cameras record audio?", a: "Most consumer body cameras do, and audio is usually on by default. That is the setting to check first, because audio consent rules are stricter than video rules in most states." }
    ]
  },

  "car-cameras": {
    kicker: "How to choose a dash camera",
    intro: "A dash camera earns its keep on the one day you did not expect. Everything below is about making sure it is still recording, still powered, and still readable when that day comes.",
    sections: [
      { h2: "Parking mode is a wiring decision, not a feature", p: [
        "Every dash camera advertises parking mode. Almost none of them can sustain it out of the box, because parking mode needs the camera to run with the engine off, which means it is drawing from your car battery.",
        "The correct installation uses a hardwire kit with a low-voltage cutoff, so the camera shuts down before it flattens the battery enough to stop you starting the car. Plug the camera into a cigarette lighter socket and parking mode either will not work or will end with a dead battery and a tow.",
        "If you park on a street for long stretches, ask specifically about the cutoff threshold and set it with some margin, because batteries age and a threshold that was safe in year one can strand you in year three."],
        list: [
          "Hardwire kit with a low-voltage cutoff is mandatory for parking mode",
          "Set the cutoff conservatively — batteries degrade",
          "Confirm whether the kit is in the box or an extra purchase"] },
      { h2: "Heat, storage, and the card that fails first", p: [
        "A dashboard in summer is one of the harshest environments in a consumer device: sixty degrees Celsius or more behind glass, for hours. Cameras with internal batteries swell and fail in that heat; cameras built with capacitors tolerate it far better, which is why capacitor models are the usual recommendation for hot climates.",
        "The storage card is the single most common point of failure, and it is almost never the card that shipped in the box. Continuous recording writes far more data than normal phone use, and a generic card will develop bad sectors within a season.",
        "Use a high-endurance card rated for continuous recording, format it in the camera rather than on a computer, and expect to replace it every year or two as routine maintenance rather than as a repair."],
        list: [
          "Prefer capacitors over internal batteries in hot climates",
          "High-endurance card, formatted in the camera",
          "Budget for a card replacement every one to two years"] },
      { h2: "Field of view, mounting, and evidence", p: [
        "Wider is not better. A very wide lens curves the image and shrinks everything in it, so licence plates near the edge of frame become unreadable. A field of view around 140 degrees covers the lanes you care about without the fisheye distortion, and 150 to 160 is the practical ceiling before plate detail suffers.",
        "Mount high and behind the mirror, where the camera does not block your view and the windshield wipers clear it. Note that windshield obstruction rules differ by state, and a camera mounted in your line of sight can earn a ticket regardless of how useful it is.",
        "Finally, think about how the footage leaves the camera. If you cannot get the file off the card without the manufacturer's app, you have a video you cannot use. Locked event files that survive loop overwrite are the feature that matters at the moment of an incident."],
        list: [
          "About 140 degrees is the sweet spot for readable plates",
          "Mount behind the mirror, clear of your sight line",
          "Check your state's windshield obstruction rule"] }
    ],
    faq: [
      { q: "Does parking mode drain my car battery?", a: "It can, which is why it needs a hardwire kit with a low-voltage cutoff. The cutoff shuts the camera off before the battery drops too low to start the car. Without one, parking mode will eventually leave you stranded." },
      { q: "What size memory card does a dash cam need?", a: "High-endurance cards in the 64 to 256 GB range suit most people. Continuous recording writes far more data than normal use, so a generic card fails quickly. Format the card in the camera, not on a computer." },
      { q: "Can dash cam footage be used in an accident claim?", a: "Yes, and it is frequently the deciding evidence. Keep the locked event file rather than letting loop recording overwrite it, and export a copy promptly. Audio recordings carry consent rules that video does not." },
      { q: "Are wider dash cam lenses better?", a: "No. Beyond roughly 160 degrees the image distorts and distant detail such as licence plates becomes unreadable. Around 140 degrees covers the road ahead while keeping plate detail usable." }
    ]
  },

  "doorbell-cameras": {
    kicker: "How to choose a video doorbell",
    intro: "A doorbell camera solves two problems at once — seeing who is at the door, and knowing whether a package arrived. Power and mounting decide which models will work at your door, so start there.",
    sections: [
      { h2: "Wired or battery is a wiring question first", p: [
        "Battery models install anywhere but need charging every few months, and a battery doorbell in a busy doorway can empty in weeks. Mains models need an existing doorbell transformer, and the voltage matters: many transformers installed decades ago do not supply enough power for a modern video doorbell, which produces exactly the symptom of a doorbell that reboots every time the button is pressed.",
        "Check your transformer before ordering. If the chime sounds weak or the doorbell has never had a mechanical chime, measure rather than assume. A transformer upgrade is a small job; discovering the problem after installation is an annoying one.",
        "Battery owners should also think about where the doorbell sits relative to the router. A doorbell is at the far edge of the house from most routers, and a weak connection produces missed alerts exactly when it matters."],
        list: [
          "Test your existing transformer voltage before buying mains-powered",
          "Battery models need charging every few months, sooner in cold",
          "A doorbell is often far from the router — check signal"] },
      { h2: "Subscriptions, storage, and what you actually get free", p: [
        "The doorbell is cheap and the recording is not. Most manufacturers give you live view and motion alerts for free, and hold recorded clips behind a monthly plan. Some include a short free window of clip history; most do not.",
        "Work out what you need before you buy. If you only want to see who is at the door live and get an alert, you may not need a plan at all. If you want to review yesterday's clips or keep a week of history, you are signing up for a recurring cost that outlasts the hardware.",
        "Local storage options exist on some models and sidestep the subscription, though they shift the problem to protecting the card from theft."],
        list: [
          "Live view is nearly always free; recorded history usually is not",
          "Count the monthly cost over the life of the doorbell",
          "Local storage avoids the fee but not the theft risk"] },
      { h2: "Detection, packages, and placement", p: [
        "Cheap motion alerts fire for every passing car, and alert fatigue is why people turn notifications off. Look for adjustable zones and person detection, which are the difference between a useful alert and a nuisance.",
        "Package detection is a separate capability and not all models have it. If deliveries are your main concern, confirm the model detects a package being placed rather than only a person approaching.",
        "Placement matters more than resolution. A doorbell too low sees heads rather than faces; too high and it sees the tops of parcels. Roughly level with an adult's head, angled slightly down with a wedge kit if your door is recessed, is the usual answer.",
        "Audio is recorded on nearly every model. In all-party consent states, that has legal implications you should understand before you leave two-way audio enabled."],
        list: [
          "Person detection and adjustable zones prevent alert fatigue",
          "Confirm package detection is a real feature, not a label",
          "Wedge kits fix recessed and off-centre doorways"] }
    ],
    faq: [
      { q: "Why does my video doorbell keep rebooting when pressed?", a: "Almost always an underpowered doorbell transformer. Older transformers often cannot supply the current a video doorbell needs, so the button press causes a voltage drop and a restart. Measure the transformer output or have it upgraded." },
      { q: "Do I need a subscription for a doorbell camera?", a: "Usually not for live view and motion alerts, but yes if you want recorded clip history. Free tiers vary widely by manufacturer, so check what is included before assuming you can review yesterday's footage." },
      { q: "Where should a video doorbell be mounted?", a: "Roughly level with an adult's head and slightly above the door handle, angled down if the doorway is recessed. Too low and you record foreheads; too high and parcels fall out of frame." },
      { q: "Is a battery video doorbell worth it?", a: "Battery models install anywhere and suit renters, but charging every few months is a real chore and cold weather shortens that further. If a transformer already powers your doorbell, mains-powered models are the lower-maintenance choice." }
    ]
  },

  "indoor-security-cameras": {
    kicker: "How to choose an indoor camera",
    intro: "An indoor camera points at your own home, which makes privacy the first specification rather than the last. Decide what you are comfortable recording before you compare lenses.",
    sections: [
      { h2: "Start with what you are recording, not where", p: [
        "People buy indoor cameras for a short list of reasons: checking on a baby, watching a pet, keeping an eye on an empty property, or seeing who moved something. Each has different requirements, and buying for the wrong one is the usual source of regret.",
        "A baby monitor needs reliability and night performance above all else, and no subscription is a real advantage. Pet owners want a wide view and two-way audio, and often a treat dispenser. Property monitoring wants good motion detection and clip history, which usually means a subscription.",
        "The uncomfortable question is what the camera will see when you are home. A camera that films the sofa, the front door, or the home office captures you as well as intruders. Think about that before you mount it, because once a camera is installed people stop thinking about it."],
        list: [
          "Baby, pet, and property monitoring need different features",
          "Decide what the camera sees when you are home",
          "Two-way audio matters for pets, little for property"] },
      { h2: "Privacy shutters, local storage, and the account that watches you", p: [
        "A physical privacy shutter is the feature that separates a camera you can live with from one you turn around. With the shutter closed, the lens is covered and no amount of account compromise can change that.",
        "Account security deserves real attention because indoor cameras are the most commonly attacked consumer device in the home. Change the default password, enable two-factor authentication, and never expose a camera directly to the internet. Cameras that require a manufacturer cloud account deserve more scrutiny than ones that can run entirely on local storage.",
        "Local storage via a card or a home network recorder keeps footage off someone else's servers and avoids a monthly fee. The trade-off is that you are responsible for the card, and that a thief who takes the camera takes the footage with it."],
        list: [
          "A physical shutter beats any software off switch",
          "Enable two-factor authentication and change the default password",
          "Local storage avoids fees and keeps footage in your home"] },
      { h2: "Pan, tilt, and the features that quietly matter", p: [
        "Pan and tilt sounds useful and usually is not. A camera that moves on its own films whichever direction it last turned, which means you may not be watching the door. A fixed wide camera covering the whole room is more predictable for security; pan and tilt suits checking a specific spot such as a crib.",
        "Motion zones are worth more than resolution. Being able to exclude a ceiling fan, a window, or a busy hallway is what separates usable alerts from constant noise. Confirm the camera supports zones rather than only a global sensitivity slider.",
        "Power is the unglamorous constraint. Indoor cameras need an outlet, and the cable determines where they can live. Battery indoor cameras exist but rarely justify themselves, since the camera is already inside and near power."],
        list: [
          "Fixed wide view is more predictable for security use",
          "Motion zones matter more than megapixels",
          "Plan the power cable route before you mount"] }
    ],
    faq: [
      { q: "Are indoor security cameras safe from hackers?", a: "They can be if left on default settings. Change the default password immediately, enable two-factor authentication, keep firmware updated, and never port-forward the camera to the internet. Cameras that work with local storage and no cloud account reduce the exposure further." },
      { q: "Should I tell people there is a camera in my home?", a: "Legally the answer depends on your state and on whether audio is recorded; practically, visible cameras and a mention to guests, sitters, or workers avoid the worst outcomes. All-party consent states treat covert audio recording far more seriously than video." },
      { q: "Do I need a subscription for an indoor camera?", a: "Not for live view, which is free on nearly every model. Subscriptions buy clip history and longer cloud retention. A camera with a card slot gives you local recording with no ongoing cost." },
      { q: "Pan and tilt or a fixed wide camera?", a: "Fixed wide for security, because it always covers the same area. Pan and tilt for checking a specific place such as a crib or a pet's bed, where moving the view is genuinely useful." }
    ]
  },

  "outdoor-security-cameras": {
    kicker: "How to choose an outdoor camera",
    intro: "Outdoor cameras fail for reasons that have nothing to do with image quality: no power where you need it, trees triggering alerts all night, or a card that fills in a fortnight. Solve those first.",
    sections: [
      { h2: "Power is the constraint that decides everything", p: [
        "The most common outdoor camera mistake is choosing the camera before choosing where it will go, and then discovering there is no power within reach of the position that actually covers the driveway.",
        "Power over Ethernet gives the most reliable result: one cable carries data and power, there is no battery to service, and the connection does not drop. The cost is running cable, which is a real job on a finished house.",
        "Wireless battery cameras solve the cable problem and create a different one. They need charging several times a year at best, more in cold weather, and the solar panels sold alongside them only work with adequate direct sun and a clean panel.",
        "Whichever you choose, decide the mounting position for coverage first and solve power for that position, not the other way round."],
        list: [
          "PoE is one cable, no batteries, most reliable",
          "Battery cameras mean regular charging, worse in winter",
          "Pick the position first, then solve power"] },
      { h2: "Weather ratings, night vision, and the honest answers", p: [
        "An IP rating describes dust and water protection. IP65 resists rain and dust; IP66 handles heavier weather. For a camera under an eave, IP65 is adequate; for an exposed post, go higher. The rating says nothing about temperature range, which matters more in extremes — check the operating range rather than assuming.",
        "Night performance splits into infrared black-and-white and colour night vision. True colour at night needs ambient light or a built-in spotlight, and a spotlight is a visible deterrent but also a bright nuisance for neighbours and passing cars. Be realistic about which you want.",
        "Also check the field of view against the actual distance. A wide lens covers a patio beautifully and makes a licence plate at the end of a driveway unreadable. For identification at distance, a narrower lens or a second camera aimed at the approach works better than one wide view."],
        list: [
          "IP65 under an eave, higher for exposed mounting",
          "Colour night vision needs light or a spotlight",
          "One wide camera cannot identify a plate at distance"] },
      { h2: "Detection, storage, and the false-alert treadmill", p: [
        "Outdoor cameras generate more false alerts than anything else in the home: trees in wind, headlights, animals, and changing light all count as motion. Person and vehicle detection with adjustable zones is what keeps the camera usable; without it, most people disable notifications within a month.",
        "Storage is the second decision. Cloud plans give you remote access and clip history at a recurring cost; local cards are free but limited and can be stolen with the camera. Many owners use both — a card for continuous recording and cloud for locked events.",
        "Watch the write volume. Continuous outdoor recording on a small card fills fast and wears the card out. High-endurance cards and a sensible retention window prevent the camera quietly recording nothing useful."],
        list: [
          "Person and vehicle detection prevents alert fatigue",
          "High-endurance card sized for your retention window",
          "Cloud plus local covers theft and remote access"] }
    ],
    faq: [
      { q: "Do outdoor security cameras need Wi-Fi?", a: "Most consumer models do, which is why signal strength at the mounting position matters. Power over Ethernet models avoid Wi-Fi entirely by running a single cable for both power and data, and are more reliable at distance from the house." },
      { q: "What does an IP65 or IP66 rating mean?", a: "It describes protection against dust and water. IP65 resists rain and dust jets and suits a camera under an eave; IP66 handles heavier weather for exposed mounting. Neither rating describes temperature tolerance, so check the operating range separately." },
      { q: "Why does my security camera keep sending false alerts?", a: "Usually motion detection without person or vehicle filtering, so trees, headlights, and animals register as events. Enable person detection, set activity zones to exclude busy areas, and lower sensitivity rather than disabling notifications." },
      { q: "Can outdoor cameras see in the dark?", a: "Infrared models see in black and white at ranges typically between ten and thirty metres. Colour night vision needs ambient light or a built-in spotlight. Neither identifies a face at long range, so aim a second camera at the approach if identification matters." }
    ]
  },

  "pet-cameras": {
    kicker: "How to choose a pet camera",
    intro: "A pet camera is an indoor camera with a couple of features that matter enormously to animals and almost nothing to security. Buy it for those features, not for the resolution.",
    sections: [
      { h2: "Coverage and height beat every other specification", p: [
        "Most pet cameras are placed on a shelf at chest height, pointed across the room. That gives you a view of the floor and the ceiling and misses the corner where the dog actually sleeps.",
        "Think about the sightlines your animal uses. Cats move vertically — a camera that only sees floor level loses them the moment they climb. Dogs tend to stay on the floor, so a lower angle with a wide field of view works better.",
        "Height also affects the two-way audio. A camera high on a shelf puts your voice through the room's ceiling, which is where most of the echo lives. Placing it lower makes your voice sound more like you and less like a smoke alarm."],
        list: [
          "Cats need vertical coverage, dogs need floor coverage",
          "Lower placement makes two-way audio sound human",
          "Check the wide-angle corner distortion before you buy"] },
      { h2: "Two-way audio, treat dispensers, and what actually helps", p: [
        "Two-way audio is the feature owners use most, and quality varies enormously. A cheap speaker produces a muffled voice that startles rather than reassures, which is the opposite of the intended effect when a dog is barking at nothing.",
        "Listen to a sample recording before buying if you can. The voice should be recognisably yours at normal volume across a room.",
        "Treat dispensers are genuinely useful for routine and for breaking up separation anxiety, but they are a mechanical device that jams. Look for one that accepts ordinary kibble of a size you can actually buy, rather than a proprietary treat.",
        "Bark and meow alerts are worth having if noise is your concern, and worth switching off if it is not. Motion alerts in a busy room fire constantly."],
        list: [
          "Two-way audio quality varies more than any other feature",
          "Treat dispensers need kibble you can actually buy",
          "Noise alerts help with barking, annoy otherwise"] },
      { h2: "Power, storage, and the honest limits", p: [
        "Battery pet cameras are a poor trade. A camera that needs charging will be flat exactly on the day you want to check, and unlike a doorbell it has no useful function when unpowered. Keep it plugged in.",
        "Storage determines whether you can review anything. Cloud plans give you clip history for a monthly fee; a card slot gives you local recording. If your goal is catching a specific incident rather than daily reassurance, local storage is usually enough.",
        "Finally, be honest about what a camera can and cannot do. It does not reduce separation anxiety on its own and it cannot let a dog out. It tells you what happened, which for many people is genuinely enough."],
        list: [
          "Keep it plugged in — a flat battery camera is useless",
          "Local storage suits incident review; cloud suits history",
          "It shows you what happened, it does not change behaviour"] }
    ],
    faq: [
      { q: "Can a pet camera reduce separation anxiety?", a: "It can help some dogs to hear you, but it is not a treatment on its own. Gradual desensitisation to departures and adequate exercise do more. A camera is useful for finding out what happens when you are gone." },
      { q: "Where should I put a pet camera?", a: "Low enough that your voice travels through the room rather than the ceiling, and angled to cover where the animal actually rests. Cats need vertical coverage; dogs are covered by a wide floor-level view." },
      { q: "Do I need a subscription to review recordings?", a: "Not always. Cameras with a card slot record locally with no fee, though the history is limited by card size. Cloud plans add clip history and remote access for a monthly cost." },
      { q: "Why does my pet camera keep disconnecting?", a: "Usually weak Wi-Fi at the placement position or interference from other devices on the same band. Move the camera closer to the router, or move the router away from microwaves and thick walls. Battery models disconnect when the charge drops." }
    ]
  }
};
