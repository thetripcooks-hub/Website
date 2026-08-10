/**
 * Seeds 12 blog posts and 12 community stories into Contentful.
 * 5 featured in each category. All linked to the Trip Cooks author profile.
 *
 * Usage:
 *   node --env-file=.env scripts/seed-sample-content.mjs
 */

import { createClient } from "contentful-management";

const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT_ID ?? "master";

if (!MANAGEMENT_TOKEN || !SPACE_ID) {
  console.error("Missing NEXT_PUBLIC_CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN");
  process.exit(1);
}

const client = createClient({ accessToken: MANAGEMENT_TOKEN });

// ---------------------------------------------------------------------------
// Rich text helpers
// ---------------------------------------------------------------------------
const t = (value, ...markTypes) => ({
  nodeType: "text", value, data: {},
  marks: markTypes.map((type) => ({ type })),
});
const p = (...children) => ({
  nodeType: "paragraph", data: {},
  content: children.map((c) => (typeof c === "string" ? t(c) : c)),
});
const h2 = (value) => ({ nodeType: "heading-2", data: {}, content: [t(value)] });
const h3 = (value) => ({ nodeType: "heading-3", data: {}, content: [t(value)] });
const ul = (...items) => ({
  nodeType: "unordered-list", data: {},
  content: items.map((item) => ({
    nodeType: "list-item", data: {},
    content: [p(item)],
  })),
});
const doc = (...nodes) => ({ nodeType: "document", data: {}, content: nodes });
const entryLink = (id) => ({ sys: { type: "Link", linkType: "Entry", id } });

// ---------------------------------------------------------------------------
// Blog posts — 12 total, 5 featured
// ---------------------------------------------------------------------------
const BLOG_POSTS = [
  // 1 — FEATURED
  {
    title: "5 Things Nobody Tells You About Travelling to Morocco",
    slug: "5-things-nobody-tells-you-about-travelling-to-morocco",
    category: "travel-updates",
    date: "2026-03-15",
    featured: true,
    excerpt: "From haggling in the medina to camel rides at Agafay Desert, Morocco hides surprises around every corner. Here's what our group discovered on the ground.",
    body: doc(
      h2("The Souks Are Overwhelming — In the Best Way"),
      p("Walking into Marrakesh's medina for the first time is full sensory overload. The colours, the smells, the sound of a thousand conversations happening at once. Our guide warned us the souks are easy to get lost in, but that's kind of the point. Give yourself at least half a day to wander without an agenda and see where you end up."),
      p("Haggling is expected and, once you get the hang of it, genuinely fun. Start at roughly a third of the asking price and work your way up from there. The vendors have done this thousands of times and appreciate the sport of a good negotiation. Don't feel guilty — it's part of the culture."),
      h2("The Train Journey North Is a Highlight in Itself"),
      p("Taking the train from Marrakesh towards Tangier, you watch the landscape shift from the ochre plains of the south to the green, rolling hills of the Rif Mountains. It's a journey that feels quietly cinematic — grab a window seat, buy a coffee from the trolley, and don't stare at your phone the whole way."),
      p("We used the train leg to swap stories from the first half of the trip and properly get to know each other as a group. Some of our best conversations happened in those carriages. Budget at least five hours and treat it as part of the experience rather than just transit."),
      h2("Ouzoud Waterfalls Will Stop You in Your Tracks"),
      p("No amount of preparation prepares you for the scale of the Ouzoud Waterfalls. At 110 metres high and three hours from Marrakesh, these cascades attract Barbary macaque monkeys who will absolutely steal your snacks if you look away. Bring a rain poncho for the closest viewpoints — you will get soaked, and you won't mind at all."),
      p("We spent a full morning here and it still felt rushed. The light in the late afternoon bounces off the mist in a way that makes every photo look edited. If you can stay until golden hour, do it."),
      h2("The Food Is Better Than You Imagined"),
      p("Tagines, couscous, bastilla, harira soup — Moroccan cuisine is extraordinarily varied and almost uniformly excellent. We ate our best meals not at tourist restaurants but at small local spots our guide pointed us towards. The fresh-squeezed orange juice sold on every street corner for a few dirhams is quietly addictive."),
      p("Breakfast every morning was a spread: Moroccan pancakes, honey, amlou, soft-boiled eggs, olives, and fresh bread warm from the oven. We ate well every single day without having to search for it. The food simply finds you in Morocco."),
      h2("You Will Need More Time Than You Think"),
      p("Morocco rewards slowness. Avoid cramming it into a long weekend if you can. Our trip ran over a week and we still felt like we'd barely scratched the surface. The blue streets of Chefchaouen alone could fill two full days. Agafay Desert at sunset deserves an unhurried evening."),
      p("We came home with full camera rolls, full stomachs, and a long list of things we'd do differently next time — starting with booking extra days. Morocco isn't a box to tick. It's a place you plan your return to before you've landed home.")
    ),
  },

  // 2 — not featured
  {
    title: "What It Actually Feels Like to Stand at Machu Picchu",
    slug: "what-it-actually-feels-like-to-stand-at-machu-picchu",
    category: "stories",
    date: "2026-05-02",
    featured: false,
    excerpt: "No photo prepares you for the moment the clouds lift and the citadel appears. We made the journey with a group of ten and the experience was better for it.",
    body: doc(
      h2("The Altitude Hits Before Anything Else"),
      p("We flew into Cusco on day two and were warned repeatedly about altitude sickness. At 3,400 metres above sea level, the air is thin enough that going up one flight of stairs leaves you slightly breathless. I spent the first afternoon horizontal in my hotel room eating crackers and drinking coca tea, wondering if I'd made a terrible decision."),
      p("By the following morning, the acclimatisation had kicked in enough to function. Our guide had been through this with every group before us and handled it without drama — a slower morning, a walking tour of Cusco rather than anything strenuous, and a dinner that lasted three hours because nobody was in a hurry."),
      h2("The Train Down to the Cloud Forest"),
      p("The train from Cusco to Aguas Calientes drops nearly two thousand metres in altitude and passes through a landscape transformation that feels like a time-lapse. High Andean grassland gives way to cloud forest. Orchids appear on cliffsides. The air thickens. You arrive in Aguas Calientes feeling like you've passed through several different worlds."),
      p("We ate the best ceviche of the trip in a restaurant there that evening. Simple place, handwritten menu, probably the best twelve pounds I spent the entire week. Sometimes the unremarkable-looking restaurant next to the hotel is the answer."),
      h2("Sunrise at the Sun Gate"),
      p("We set a 4am alarm to hike the Sun Gate trail before the site opened. The path climbs steeply through mist and jungle and gives no preview of what's waiting at the top. Then, suddenly, there's a gap in the treeline and the citadel appears below — terraced, enormous, impossibly green, and half-covered in cloud."),
      p("When the mist lifted and the full site came into view, someone in our group let out a long, involuntary exhale. Nobody spoke for about two minutes. After all the photographs and documentaries, the real thing still manages to surprise you. It's bigger, steeper, and more alive than any screen can convey."),
      h2("Huacachina: The Unexpected Highlight"),
      p("After Machu Picchu, almost anything would feel like a comedown. Then we drove to Huacachina — a tiny oasis town in the Peruvian desert ringed by enormous sand dunes — and the trip found a second gear we hadn't expected. Sandboarding down a face so steep you can't see the bottom, with the oasis glittering below as the sun drops, turned out to be the most purely fun moment of the week."),
      p("Peru doesn't give you a single headline. It gives you a week of completely different experiences, each one quietly outdoing the last. If you're thinking about booking — book it.")
    ),
  },

  // 3 — not featured
  {
    title: "Your First Group Trip With Trip Cooks: An Honest Guide",
    slug: "your-first-group-trip-with-trip-cooks-an-honest-guide",
    category: "support",
    date: "2026-04-20",
    featured: false,
    excerpt: "Nervous about travelling with people you've never met? Here's an honest breakdown of how our group trips actually work, from the first WhatsApp message to the last dinner.",
    body: doc(
      h2("The Group Chat Comes First"),
      p("Once you've booked your spot, you'll be added to a WhatsApp group with everyone else on the trip. A bunch of strangers suddenly sharing memes about the destination, asking what to pack, nervously checking about visas. It's slightly chaotic and completely normal. By the time you land, these people already feel familiar."),
      p("We host a pre-trip video call for every group, usually two to three weeks before departure. It's a chance to see faces, ask questions, meet the Trip Cooks team, and settle any lingering anxieties. Most people come in quiet and leave the call already excited."),
      h2("What's Included — and What Isn't"),
      p("Every Trip Cooks trip price covers accommodation, planned activities, in-country transport, and daily breakfasts where possible. What it doesn't cover is your international flights, travel insurance, personal shopping, or any optional extras. We're always transparent about this upfront — no nasty surprises at the end."),
      p("Travel insurance is strongly recommended. A few pounds a day gives you genuine peace of mind for the whole trip and covers scenarios that Trip Cooks can't manage on your behalf."),
      h2("The People You'll Travel With"),
      p("Trip Cooks groups are typically between 6 and 15 people depending on the destination. The mix varies — some trips attract mostly first-time solo travellers, others bring together people who've done several Trip Cooks trips before. What doesn't vary is the general atmosphere: open, friendly, and unbothered by the pressure to perform a good time."),
      p("You don't need to be an extrovert. Plenty of people who book with us are travelling solo for the first time. In practice, a shared hotel, shared meals, and a shared itinerary create natural connection points. Nobody is left behind, and nobody is forced to be 'on' all the time."),
      h2("How Much Free Time Will You Have?"),
      p("Trip Cooks trips are structured but not rigid. Each day has a plan — usually a morning activity, some downtime, and an evening arrangement — but there's always space to explore independently. Some people join every element. Others dip in and out. Both approaches are completely fine."),
      p("If you want to wander a local market alone for a morning or find a café and read for an hour, you'll have the opportunity. We're not a tour bus operation where everyone moves as one block at all times."),
      h2("One Last Thing"),
      p("The best thing you can do before a Trip Cooks trip is let go of the expectation that everything will be perfect. Some moments will be extraordinary. Some will be chaotic. All of it, together, is what makes a real travel experience — and the people you go through it with are what make it yours.")
    ),
  },

  // 4 — FEATURED
  {
    title: "Japan in November: Why Autumn Is the Best Time to Visit",
    slug: "japan-in-november-why-autumn-is-the-best-time-to-visit",
    category: "travel-updates",
    date: "2026-06-10",
    featured: true,
    excerpt: "Crimson maple leaves, Shinkansen rides through rolling countryside, and the once-a-year magic of the Chiang Mai Lantern Festival. Our Japan trip in November was unlike anything we'd planned for.",
    body: doc(
      h2("Why November Specifically?"),
      p("Japan has a clearly superior time of year to visit, and for most of the country it's November. The summer humidity is gone. The cherry blossoms of spring attract enormous crowds but autumn's koyo — the changing of the leaves — is equally spectacular and significantly less hectic. The temperature is cool and comfortable. The light is extraordinary."),
      p("Kyoto's temples, which can feel overwhelming with tourists in April, become navigable in November. You can stand in front of the Kinkaku-ji golden pavilion at a reasonable hour without a hundred cameras in your frame. The parks shift to deep reds and burning oranges that make the landscape look deliberately painted."),
      h2("Starting in Okinawa"),
      p("Our Trip Cooks Japan itinerary begins in Okinawa, the southernmost island chain of Japan, and it immediately sets the trip's tone. Okinawa is nothing like the Japan most people picture — subtropical, beach-lined, with turquoise water and a culture distinct from the mainland. Two days here to decompress before flying north."),
      p("The food in Okinawa deserves its own mention. Champuru, goya, Orion beer — local staples of an island that has one of the highest concentrations of centenarians in the world. The locals attribute this partly to the diet. We ate well, swam, and went to bed early. The perfect start."),
      h2("Osaka: The City That Refuses to Sleep"),
      p("Flying from Okinawa to Osaka feels like arriving in a different country. The city is electric — neon-lit, takoyaki-scented, perpetually buzzing. Dotonbori at night, with its giant mechanical crab signs and canal-side restaurants, is exactly as overwhelming as photographs suggest and worth every second."),
      p("Osaka Castle is the city's quieter counterpoint — a beautifully preserved structure set in park grounds whose trees were, during our visit, at peak autumn colour. We spent a morning there and couldn't stop photographing the contrast of white castle walls against deep red maples."),
      h2("The Shinkansen to Kyoto"),
      p("The bullet train from Osaka to Kyoto takes eighteen minutes and covers 80 kilometres. By the time you've processed that you're moving, you're already there. The Shinkansen is one of those genuinely exciting modes of transport that never becomes ordinary no matter how many times you take it."),
      p("Kyoto repays several days of exploration. Fushimi Inari is best done early before tour groups arrive. The Arashiyama Bamboo Grove is extraordinary and takes fifteen minutes to walk through, but the surrounding neighbourhood rewards hours of wandering. The evening light over the Kamo River is worth sitting beside for an hour doing nothing at all."),
      h2("Why See Japan in a Group"),
      p("Japan can feel intimidating to navigate alone — the language barrier is real, train systems are labyrinthine, and some cultural nuances take time to absorb. Travelling with Trip Cooks meant having a guide who smoothed logistics and explained context. We ate at restaurants we'd never have found independently and accessed areas of temples not signposted to visitors."),
      p("More than that, Japan is a place that benefits from being shared. The moment someone spots a deer bowing in Nara, or a perfectly composed autumn-leaf scene in a temple garden, the instinct is immediately to show someone else. Our group amplified every experience. Book the November trip.")
    ),
  },

  // 5 — FEATURED
  {
    title: "Safari, Cities, and Vineyards: Why South Africa Is the Ultimate Group Trip",
    slug: "safari-cities-and-vineyards-why-south-africa-is-the-ultimate-group-trip",
    category: "travel-updates",
    date: "2026-07-18",
    featured: true,
    excerpt: "From the Apartheid Museum in Johannesburg to the Big Five in Kruger and wine tasting in the Cape Winelands — South Africa packs more into ten days than most countries manage in a lifetime.",
    body: doc(
      h2("Three Cities, Three Completely Different Worlds"),
      p("South Africa's Trip Cooks itinerary visits Johannesburg, Kruger National Park, and Cape Town — and each one resets your expectations entirely. Johannesburg is raw, energetic, and historically dense. Kruger is wilderness. Cape Town is cosmopolitan, impossibly photogenic, and quietly one of the best food cities in the world. Moving between them across ten days gives you a South Africa that defies any single description."),
      p("Most visitors arrive in Cape Town and stay there. Sensible, but incomplete. Johannesburg is where the country's modern history is most legibly written. Arriving there first — taking the Apartheid Museum seriously, spending time in Soweto — gives everything that follows a weight it wouldn't otherwise have."),
      h2("The Apartheid Museum Is Non-Negotiable"),
      p("We visited the Apartheid Museum on day two and nobody in the group was ready for it. The museum is brilliantly designed — you're assigned either a 'white' or 'non-white' entrance ticket at the door, separated to enter through different turnstiles, and the experience begins immediately. By the time you reach the main exhibitions, you're already unsettled in a productive way."),
      p("Allow at least three hours. The permanent exhibition covers the full history from apartheid's legislative foundation through the Soweto Uprising to Mandela's release and the 1994 elections. The video footage of crowd responses on election day is one of the most moving things we've collectively watched on a trip."),
      h2("Kruger: When the Big Five Becomes Real"),
      p("Safari is one of those experiences that sounds exceptional in theory and turns out to be even more so in practice. We spent three nights near Kruger and completed two game drives per day — dawn and dusk, when animals are most active. We saw lions within twenty minutes of our first drive. Two hours later, a leopard crossed the track fifteen metres from our vehicle."),
      p("What surprised everyone was how unhurried the experience felt. No rushing between sightings. Plenty of time at each animal encounter. You find yourself staring at a hippo surfacing in a waterhole for twenty minutes without checking your phone once."),
      h2("Cape Town and What Comes After"),
      p("Cape Town operates at a different pace to the rest of the trip. Table Mountain — flat-topped, cloud-draped, looming over the city bowl — is visible from almost everywhere. We took the cable car to the summit on a clear afternoon and the view across the Cape Peninsula and Robben Island was one of the trip's defining images."),
      p("Boulders Beach, where African penguins colony the shoreline completely unbothered by visitors, is thirty minutes south and completely surreal. The vineyards of Stellenbosch are another forty minutes and a different universe entirely. South Africa keeps expanding its offer well past the point you think it's peaked.")
    ),
  },

  // 6 — not featured
  {
    title: "New Orleans Has More to Offer Than Bourbon Street",
    slug: "new-orleans-has-more-to-offer-than-bourbon-street",
    category: "stories",
    date: "2026-05-28",
    featured: false,
    excerpt: "Most people arrive in NOLA expecting Bourbon Street and leave without seeing the city's real character. Our four-day group trip found jazz, jambalaya, and something far more interesting.",
    body: doc(
      h2("The French Quarter Is the Beginning, Not the Destination"),
      p("Everyone arrives in New Orleans with a version of the city already in their head — wrought iron balconies, street jazz, hurricanes in plastic cups. The French Quarter delivers all of that and it's genuinely enjoyable, but it's also the most tourist-facing version of a city that is far stranger, deeper, and more interesting than its famous strip suggests."),
      p("We spent an evening on Bourbon Street because you have to, then spent the remaining three days actively looking for everything else. The city rewards that curiosity generously. Within a few blocks of the tourist centre you find neighbourhoods that operate entirely on their own terms, with music from corner bars and restaurants run by families cooking the same recipes for three generations."),
      h2("The Jazz Festival Is Its Own World"),
      p("We timed our trip to coincide with the New Orleans Jazz & Heritage Festival, held annually in late April at the Fair Grounds Race Course. This is not a music festival with a curated lineup and wristbands. It's a full-city event where jazz, blues, gospel, brass band, and Cajun music coexist across multiple stages while food vendors serve genuine Creole cooking to tens of thousands of people."),
      p("The crawfish étouffée alone would justify the trip. Our group split by musical preference and regrouped for food — the most natural arrangement. The atmosphere is unlike any music event we'd attended. More communal, more cross-generational, more rooted in actual cultural tradition."),
      h2("The Mississippi River at Night"),
      p("We took a river cruise on the Steamboat Natchez on our second evening — a working steam-powered paddleboat operating on the Mississippi for over fifty years. The city looks extraordinary from the river at dusk. The skyline, the bridges, the industrial infrastructure, the water itself moving with a weight and authority that reminds you this is one of the great rivers of the world."),
      p("Our guide explained that the river's surface level can shift by metres depending on the season, and that the city's relationship with that water — loving and terrified in equal measure — has shaped everything about how New Orleans thinks and moves. It was an unexpectedly profound twenty minutes of a light-hearted evening cruise."),
      h2("Where to Actually Eat"),
      p("Dooky Chase's Restaurant in Tremé is a New Orleans institution — a place where civil rights leaders met over fried chicken, and where Barack Obama once ate red beans and rice. The food is exceptional and the history of the room is palpable. Book well in advance."),
      p("Commander's Palace in the Garden District hosts a Saturday jazz brunch worth experiencing once. Twenty-five cent martinis and live music with eggs benedict at 11am is a distinctly New Orleans proposition. We arrived slightly hungover and left feeling entirely restored. The city has a gift for that.")
    ),
  },

  // 7 — FEATURED
  {
    title: "Jordan: Ancient Wonders, Bedouin Camps, and the Healing Dead Sea",
    slug: "jordan-ancient-wonders-bedouin-camps-and-the-healing-dead-sea",
    category: "travel-updates",
    date: "2026-01-20",
    featured: true,
    excerpt: "Five days in Jordan covers Petra, Wadi Rum, Jerash, and the Dead Sea — and still leaves you feeling like you've only scratched the surface of one of the Middle East's most rewarding destinations.",
    body: doc(
      h2("Petra: More Than Just the Treasury"),
      p("Petra is one of those places where the famous image — the rose-red Treasury framed by the narrow Siq gorge — turns out to be just the introduction. The site extends far beyond the iconic façade into a canyon system of tombs, temples, colonnaded streets, and a Byzantine church with extraordinary mosaic floors. Most day visitors see the Treasury, take photographs, and turn back. Stay longer."),
      p("The Monastery, reached by climbing 800 rock-cut steps, is arguably more impressive than the Treasury and draws a fraction of the visitors. The hike takes about forty minutes at a comfortable pace and ends at a structure that dwarfs everything below it, with views across a canyon to the horizon that make the climb feel like a bargain."),
      h2("Wadi Rum: Earth's Most Alien Landscape"),
      p("Wadi Rum is the vast red desert in southern Jordan that has doubled as Mars in more films than you'd guess — The Martian, Lawrence of Arabia, Rogue One. The landscape earns every comparison. Enormous sandstone formations rise from a flat red floor. There is no human noise. There is, at night, more sky than you thought possible."),
      p("We spent a night in a Bedouin camp in Wadi Rum and the experience was exactly what the photographs suggest and more. A fire, good food, and a sky so densely starred that several people in our group went completely quiet for extended periods. The silence of the desert is its own kind of overwhelming."),
      h2("Jerash: Rome Without the Queues"),
      p("Jerash is one of the best-preserved Roman cities in the world and, because it sits in Jordan rather than Italy or Turkey, attracts a fraction of the visitors it deserves. The colonnaded main street, the oval plaza, the temples and theatres — all largely intact, all explorable without crowds pressing in from every side."),
      p("Our guide walked us through the site over two hours and gave us a picture of what daily life looked like here two thousand years ago. The still-functioning ancient drainage system was, for reasons we couldn't quite articulate, the detail that made it feel most real."),
      h2("The Dead Sea Does Exactly What It Promises"),
      p("The Dead Sea is one of those experiences that lives up to its reputation completely. The water's salt concentration is so high that your body floats without any effort. Trying to swim normally is immediately absurd. Our group ended up floating in the same corner, sunglasses on, some people reading books, all of us slightly stunned by the physics of it."),
      p("The black mineral mud that lines the shore is apparently exceptional for skin. We all looked ridiculous applying it. The photos are not flattering and have been agreed to stay exclusively in the group chat. Jordan kept finding ways to be funny precisely when you weren't expecting it — which turns out to be a significant part of its charm.")
    ),
  },

  // 8 — not featured
  {
    title: "How to Actually Make the Most of a Group Trip",
    slug: "how-to-actually-make-the-most-of-a-group-trip",
    category: "support",
    date: "2026-02-05",
    featured: false,
    excerpt: "Group trips are only as good as what you bring to them. Here's what experienced Trip Cooks travellers do differently — and what first-timers wish they'd known before they boarded.",
    body: doc(
      h2("Arrive With an Open Schedule"),
      p("The single biggest mistake first-time group travellers make is over-programming their own time on top of the planned itinerary. You don't need to have booked a restaurant for every dinner, a museum for every free morning, or a list of must-see things to tick off alongside the group plans. The best moments tend to happen in the gaps — the spontaneous evening that runs three hours longer than intended, the detour someone suggests on the way back from a site."),
      p("Bring a list of places you'd like to see if the opportunity arises. Don't treat it as a schedule. The group will generate its own momentum and the best trips flow with that rather than against it."),
      h2("Talk to People in the First 24 Hours"),
      p("The social dynamic of a group trip is largely set in the first day. If you spend that time in your room recovering from travel, eating alone, or keeping earphones in, you'll spend the rest of the trip on the outside of a group that's already formed. Make the effort early, even if you're tired and not feeling particularly social."),
      p("The easiest openers are the obvious ones: where did you fly from, have you been to this country before, what are you most looking forward to. Nobody is as intimidating as they seem in a group of strangers. Most people on a Trip Cooks trip booked it specifically because they wanted to meet people. Use that."),
      h2("Don't Eat Every Meal With the Group"),
      p("This sounds counterintuitive but it's genuinely good advice: take at least one or two meals on your own or with one other person from the group. Eating alone in an unfamiliar city is one of the most clarifying travel experiences there is. You notice things differently. You end up talking to locals or other travellers at the bar. You decompress from the social energy of a group in a way that makes you better company when you return to it."),
      p("The solo lunch on day four of a trip is often the meal you remember most clearly weeks later. Give yourself the room to have it."),
      h2("Spend Money on the Optional Extras"),
      p("Trip Cooks itineraries include core activities but almost always offer optional experiences on top. Game drives at dawn. Desert dinners. Hang gliding. Hot air balloon rides. The optional extras are optional for good reasons — they cost more, they're more demanding, and not everyone wants them. But they're also almost always the moments people talk about for years afterwards."),
      p("Budget a small contingency specifically for the optionals before you travel. The worst feeling is watching half the group head off for a sunrise excursion you couldn't justify on the day because you hadn't planned for it."),
      h2("Take the Photo, Then Put the Phone Down"),
      p("Document enough to remember it. Don't document so much that you're experiencing the trip through a screen. This is easier said than done in places that genuinely demand to be photographed, but the group setting helps — if twelve other people are also photographing something, you can reasonably trust that the image will exist without your contribution."),
      p("The memories that stay longest are the ones you were fully present for. Machu Picchu at sunrise, the Dead Sea at golden hour, the first sight of Table Mountain from Cape Town — these are moments that deserve your full attention. The photo is the souvenir. The experience is the point.")
    ),
  },

  // 9 — not featured
  {
    title: "Brazil in 8 Days: Rio, Favelas, and the Island Paradise You've Never Heard Of",
    slug: "brazil-in-8-days-rio-favelas-and-island-paradise",
    category: "stories",
    date: "2026-04-30",
    featured: false,
    excerpt: "Eight days in Brazil with Trip Cooks covered Christ the Redeemer, Favela Rocinha, and two days island hopping in Angra dos Reis. We came home with a very long list of reasons to go back.",
    body: doc(
      h2("Rio Is Bigger Than You Think"),
      p("Arriving in Rio de Janeiro by car from the airport, watching the city reveal itself through the windscreen — mountains pressing against the city on one side, the Atlantic on the other, the vast favela complexes on the hillsides, the gleaming skyscrapers of the business district — our group went quiet in the way groups go quiet when everyone is having the same thought simultaneously."),
      p("We spent the first full day on the ground-level stuff: Escadaria Selarón, the mosaic staircase that's been a work in progress since 1990, and Favela Rocinha with a local guide who grew up there. The favela tour is one of those experiences that efficiently challenges a lot of preconceptions. The community is densely layered, remarkably organised, and has a complex relationship with outside visitors that our guide navigated thoughtfully."),
      h2("Christ the Redeemer at Dawn"),
      p("We booked the earliest slot to take the Corcovado train to Christ the Redeemer, which meant a 5am start and some grumbling in the hotel lobby. The grumbling stopped about forty minutes later when we reached the statue and the city below was still in partial darkness with the first light catching the tops of the mountains."),
      p("The views of the city from that height — Sugarloaf Mountain in the foreground, the bays of Guanabara and Sepetiba extending in both directions — are the defining image of the trip. We stayed far longer than planned. Nobody suggested leaving."),
      h2("Angra dos Reis: The Part Everyone Underestimates"),
      p("Leaving Rio for Angra dos Reis felt like the trip shifting gear. The drive takes about two hours and ends at a marina where a boat was waiting. Angra dos Reis sits in a bay containing 365 islands — one for each day of the year, as locals will tell you — and the water between them is the clear turquoise blue that looks edited in photographs and isn't."),
      p("We spent two days here, swimming in coves accessible only by boat, eating grilled fish on floating restaurants, and moving at the pace that coastal Brazil seems to enforce on everyone within its vicinity. Several people in the group said, unprompted, that these two days were their favourite of the whole trip."),
      h2("The Hang Gliding Moment"),
      p("Hang gliding from Pedra Bonita above Ipanema was an optional activity I signed up for after one caipirinha too many at dinner. I'd like to report I remained composed. The truth is I made a noise on launch that I will not reproduce in print. What I can report is that two minutes gliding over the Tijuca Forest with the entire sweep of Ipanema Beach below was one of the most singular physical experiences of my life."),
      p("Brazil has a gift for pushing you gently into experiences you wouldn't have chosen in a quieter moment and making you glad for it. The country is relentless in the best possible way — it just keeps delivering.")
    ),
  },

  // 10 — FEATURED
  {
    title: "Thailand in November: Chasing the Yi Peng Lantern Festival",
    slug: "thailand-in-november-chasing-the-yi-peng-lantern-festival",
    category: "travel-updates",
    date: "2026-08-05",
    featured: true,
    excerpt: "Bangkok's street energy, Phuket's beaches, and Chiang Mai's once-a-year lantern festival that fills the sky with thousands of lights. Our November Thailand trip was genuinely hard to believe.",
    body: doc(
      h2("Why November Is the Window"),
      p("Thailand in November sits in a particular sweet spot: the wet season has ended, the cool season hasn't made the north uncomfortably cold, and the Yi Peng Lantern Festival in Chiang Mai — a once-a-year event tied to the full moon of the twelfth lunar month — falls sometime in late November. This is a genuinely limited-time experience that runs for one night and cannot be replicated at any other time of year."),
      p("Our Trip Cooks Thailand itinerary is built around that anchor event, with Bangkok and Phuket serving as context on either side of it. The result is a trip with enormous variety: urban chaos, beach slowness, and a mountain-city festival that manages to be both spiritual and spectacular in a way that doesn't cancel either quality."),
      h2("Bangkok: Two Days Is Not Enough"),
      p("Bangkok moves at a speed and a volume that is either exhilarating or exhausting depending on which hour you're experiencing it. The street food is some of the best urban eating in the world. The temples are extraordinary. The tuk-tuk traffic is its own kind of performance art. We had two days here and came away with a list of things we hadn't had time for."),
      p("Wat Pho, the temple complex housing the enormous reclining Buddha, was the site that landed hardest. The scale of the sculpture — 46 metres long, gilded, serene, contained within a building that barely fits it — is absurd in the best sense. We spent an hour there and none of us were ready to leave when the next group arrived."),
      h2("Phuket's Quieter Side"),
      p("The version of Phuket that most people encounter — Patong Beach, bucket cocktails, loud bars — is real and has its place. Our group spent a day there and enjoyed it for what it was. The rest of our Phuket time was spent on the quieter beaches of the peninsula and on a boat excursion to the Phi Phi Islands."),
      p("The Andaman Sea around Phuket in November is calm, clear, and warm. We snorkelled over coral, ate on a floating dock at a restaurant that had presumably been serving fishermen and then tourists for decades, and watched the sun drop below the horizon from a beach that was almost empty. These are the Phuket photographs that don't make it onto Instagram and deserve to."),
      h2("The Yi Peng Lantern Festival"),
      p("Nothing I write here will adequately convey what the Yi Peng Lantern Festival looks like from inside it. You're standing in a field in Chiang Mai as darkness falls, holding a paper lantern with a flame at its base. Around you are thousands of other people doing the same thing. At a signal, everyone releases simultaneously."),
      p("The sky above you fills with light. Slowly, then densely, then almost beyond comprehension — thousands of lanterns rising and drifting in the same direction, each one trailing a small flame, the whole sky turning amber and gold. It lasts about fifteen minutes and produces, in most people, a silence that is its own kind of conversation."),
      p("Our group stood together and nobody said very much for a long time after the last lanterns disappeared over the horizon. Someone eventually said 'I'm so glad we came here' and everyone agreed without elaborating. Some experiences don't require elaboration. This is one of them.")
    ),
  },

  // 11 — not featured
  {
    title: "Everything You Need to Know Before Visiting the Grand Canyon",
    slug: "everything-you-need-to-know-before-visiting-the-grand-canyon",
    category: "support",
    date: "2026-05-15",
    featured: false,
    excerpt: "The Grand Canyon is one of those places that defies expectation regardless of how much you've prepared. Here's what our group learned across three days in Arizona that we wish we'd known before arriving.",
    body: doc(
      h2("The Canyon Is Much Larger Than You Imagine"),
      p("Every person in our group had the same experience at their first viewpoint: a pause, a quiet breath, and something like disbelief. The Grand Canyon is 446 kilometres long, 29 kilometres wide at its broadest point, and 1.6 kilometres deep. These are numbers that don't produce comprehension until you're standing at the rim looking at them."),
      p("Your brain initially processes it as a very large painting. Then slowly, as you start to trace individual features — a river thread at the bottom, a butte catching the afternoon light, a shadow line moving across the canyon walls — the scale becomes real. Give yourself time at the first viewpoint. Don't rush towards the next one."),
      h2("Mather Point vs. Other Viewpoints"),
      p("Mather Point is the most accessible viewpoint on the South Rim and the one most visitors arrive at first. It's excellent. It's also the most crowded. If you want quieter alternatives with equally impressive or more interesting perspectives, walk west along the Rim Trail towards Maricopa and Powell Points, or drive to Desert View at the canyon's eastern end."),
      p("We spent a late afternoon at Desert View and had the platform almost to ourselves. The Watchtower there, designed by Mary Colter in 1932 to echo Ancestral Puebloan architecture, adds context and visual interest that the main viewpoints lack. The light on the eastern canyon at dusk is different and worth the detour."),
      h2("Antelope Canyon Requires Booking in Advance"),
      p("Upper Antelope Canyon, about an hour's drive from the South Rim, can only be visited on a guided tour run by Navajo-owned operators. The tours are limited in number, fill up months in advance, and are worth every effort required to secure them. The 'light beam' effect — sunlight dropping vertically through openings in the canyon ceiling — happens only around midday and only in the right light conditions."),
      p("We booked the midday tour and the light beams appeared. They are exactly as extraordinary as the photographs suggest, which is more than can be said for most famous sights. The sandstone walls glow orange and red at close range and the shapes they form — waves, ripples, formations that look deliberately sculpted — make the hour inside feel like fifteen minutes."),
      h2("Horseshoe Bend at Sunrise"),
      p("The overlook above Horseshoe Bend — where the Colorado River curves in a near-complete circle below 300-metre sandstone cliffs — has no barrier between you and a very significant drop. Our group spread along the rim with varying degrees of proximity to the edge, which told us something useful about each other."),
      p("Sunrise here is the best time: the crowds arrive mid-morning, the light is softer in the early hours, and the river changes colour as the sun clears the canyon walls — from dark to a luminous blue-green that looks impossible in photographs and is equally impossible in person."),
      h2("What to Bring"),
      ul(
        "Water — more than you think. The desert air is dry and the elevation increases fluid loss.",
        "Sunscreen and a hat — the South Rim sits at 2,100 metres elevation and the sun is intense.",
        "A jacket for the rim at dawn or dusk — temperatures drop significantly after sunset.",
        "Comfortable shoes with grip — the Rim Trail is paved but many viewpoints involve uneven rock.",
        "Cash — some vendors and Navajo tour operators don't accept card."
      ),
      p("The Grand Canyon rewards preparation not because it's difficult but because it's the kind of place that reveals more the better equipped you are to spend time in it. Slow down, look carefully, and leave more than you think you need.")
    ),
  },

  // 12 — not featured
  {
    title: "How Trip Cooks Plans a Group Trip: Behind the Scenes",
    slug: "how-trip-cooks-plans-a-group-trip-behind-the-scenes",
    category: "company-updates",
    date: "2026-03-01",
    featured: false,
    excerpt: "What does it actually take to organise a trip for 15 people across 10 days in South Africa? More spreadsheets than you'd imagine, and a lot of WhatsApp voice notes.",
    body: doc(
      h2("It Starts With a Destination, Not a Date"),
      p("When Ovie and Lanre started Trip Cooks in 2022 with a group trip to Stonehaven, Scotland, the planning process was straightforward: a small group, a single destination, a few nights in a rental. The planning process for a ten-day South Africa trip for fifteen people involves considerably more moving parts, but it starts from the same place — a destination that excites us first, before we figure out the logistics."),
      p("We pick destinations we've researched deeply, often places one or both of us have visited personally, where we know local guides who share our philosophy about what makes a trip worth taking. The itinerary comes second. The relationships come first."),
      h2("Building the Itinerary"),
      p("A Trip Cooks itinerary goes through multiple drafts. The first draft is aspirational — everything we'd want to do if time and budget were unlimited. The second draft is realistic — what can be done in the available days without the trip feeling rushed. The third draft is what gets published."),
      p("We build in more unstructured time than most group trip operators would. This is deliberate. The best feedback we receive is almost never about a specific activity — it's about a conversation at dinner, a spontaneous detour, a morning when the group decided to stay at the hotel pool instead of joining a tour. You can't plan for those moments, but you can leave room for them."),
      h2("The Local Guide Question"),
      p("We do not operate as a travel agent that books third-party tours. For every Trip Cooks trip, we work with local guides who we've vetted personally — who know the destination not as a collection of sites but as a place where people live, work, and make meaning. The difference between a guided experience and a local guided experience is the difference between being shown a city and being introduced to it."),
      p("Finding those guides takes time. Our South Africa guide, for example, was recommended by someone we met on a different trip, whose brother had grown up in Soweto and now leads walking tours in the area. That relationship took months to establish and is the reason our Johannesburg experience is unlike anything you'd find in a standard tour package."),
      h2("The WhatsApp Group"),
      p("Every Trip Cooks group gets a WhatsApp group created about six weeks before departure. It is, reliably, chaos within the first twenty-four hours. Everyone has questions. Someone asks about luggage limits. Someone posts a meme about the destination. Someone asks the same question that was answered two messages earlier."),
      p("We love this. The group chat is where the trip actually starts — where strangers become familiar, where anxieties get named and answered, where the shared anticipation builds into something that carries everyone through the airport and into the first day of the actual experience. By the time the group lands, it's already a community. We just created the conditions."),
      h2("What Happens When Something Goes Wrong"),
      p("On every trip, something goes sideways. A flight is delayed. A restaurant has closed. A planned activity gets rained out. We don't tell people this before they book because it would worry them unnecessarily, but we tell them on the pre-trip call because we want everyone to have realistic expectations."),
      p("Our job when things go wrong is to adapt quickly, communicate clearly, and make sure nobody is left standing in an unfamiliar city not knowing what's happening. We've done this enough times now to be calm about it. The trips that involve the most unexpected problems are often the ones that produce the strongest group bonds. Shared adversity, it turns out, is extremely effective social glue.")
    ),
  },
];

// ---------------------------------------------------------------------------
// Community stories — 12 total, 5 featured
// ---------------------------------------------------------------------------
const COMMUNITY_STORIES = [
  // 1 — FEATURED
  {
    title: "I Nearly Didn't Book the Jordan Trip — Here's Why I'm So Glad I Did",
    slug: "i-nearly-didnt-book-the-jordan-trip",
    date: "2026-04-05",
    country: "Jordan",
    category: "stories",
    featured: true,
    excerpt: "I'd been going back and forth for weeks. Five days in Jordan with nine strangers later, I'm already looking at what's next on the Trip Cooks calendar.",
    body: doc(
      h2("Why I Almost Talked Myself Out of It"),
      p("I'd been following Trip Cooks on Instagram for eight months before I actually booked anything. The Jordan trip appeared in December and I spent three weeks in my own head about it. I'd never travelled with a group of strangers before. I'm not the most outgoing person in a room of people I don't know. I genuinely wasn't sure I was the right type of person for a group trip."),
      p("What tipped me was a friend who'd been on an earlier Morocco trip. She said the WhatsApp group before departure was where the trip actually started — where you get a feel for the people before you're in an airport together. She was right. By the time we flew out, I already had a sense of who I was travelling with. The anxiety had mostly dissolved."),
      h2("Petra on Day One"),
      p("Nothing prepares you for Petra. You walk through the Siq — a kilometre-long narrow gorge between sandstone cliffs that seem to lean towards each other overhead — and then the rock parts and the Treasury is just there. Full size. Rose-red. Carved directly into the cliff face two thousand years ago. Our group went very quiet at that moment."),
      p("We spent most of the day exploring the site. Our guide knew which routes were quiet and worth the effort, and we saw parts of Petra that the majority of day visitors miss entirely. By the end we were dusty, tired, and completely satisfied."),
      h2("Wadi Rum Overnight"),
      p("The second night we camped in Wadi Rum — the vast red desert in southern Jordan. It looks alien because it kind of is: enormous sandstone formations rising from a flat red floor, no human noise, no light pollution, and a sky at night that made several people in our group genuinely emotional."),
      p("We had a fire, we had food, and somewhere around 10pm someone pulled out a bluetooth speaker and we ended up dancing on the sand under more stars than I'd ever seen. It's a sentence that sounds like a travel cliché and I don't care. It was exactly that and it was wonderful."),
      h2("Who I Came Home With"),
      p("I arrived at Amman airport knowing nobody. I left five days later with eight people I've since seen twice more at home, a group chat that hasn't gone quiet, and a confirmed place on the South Africa trip in September. The travel was the obvious part. The people were the surprise. That's probably the Trip Cooks thing — it keeps happening.")
    ),
  },

  // 2 — not featured
  {
    title: "Morocco Was My First Solo Group Trip and I'd Do It All Over Again",
    slug: "morocco-was-my-first-solo-group-trip-and-id-do-it-all-over-again",
    date: "2026-02-18",
    country: "Morocco",
    category: "stories",
    featured: false,
    excerpt: "I booked the Morocco trip alone, flew alone, and arrived knowing nobody. By day two I was wondering why I'd waited so long to travel like this.",
    body: doc(
      h2("What Booking Solo Actually Looked Like"),
      p("I'm thirty-one and most of my friends have hit the phase where travel requires six months of schedule coordination and ends up being postponed indefinitely. I was tired of waiting. Morocco had been on my list for years and Trip Cooks had a group leaving in October with a few spots still available. I booked on a Thursday evening without telling anyone and spent the rest of the week alternating between excitement and mild panic."),
      p("The pre-trip video call helped. Seeing faces, hearing voices, having the Trip Cooks team walk through the itinerary in real time — it took the abstract anxiety down to something specific and manageable. I realised I wasn't the only first-timer on the trip."),
      h2("Marrakesh from the Rooftops"),
      p("Our riad in Marrakesh was in the heart of the medina and had a rooftop terrace where we gathered every morning before the day's plans started. The first morning, bleary and jet-lagged, I went up early and found two other people from the group already there with coffee, watching the city wake up below. That was when I knew the trip was going to be fine."),
      p("Marrakesh from above is a completely different city from Marrakesh at ground level. The pink roofscape, the minarets, the sound of the call to prayer echoing across the medina — it's a view that rewards sitting with. We ended up spending an extra hour there talking rather than going down for breakfast, and that set a pattern for the rest of the week."),
      h2("The Desert Was the Part I Didn't Expect to Love"),
      p("I'm not a desert person. I'd never been drawn to the sand-and-heat aesthetic. Agafay Desert converted me in forty minutes. We arrived at sunset, climbed a dune in bare feet, and watched the light change from gold to pink to deep orange while the silence expanded around us. Not peaceful in the meditative sense — more in the genuinely-stunned sense."),
      p("We ate dinner in a tent that evening with candles, lanterns, and food arriving in waves. A musician played oud in the corner. The temperature dropped and someone pulled out a blanket they'd bought in the souk that afternoon for twelve dirhams. It's one of those evenings you try to describe to people back home and immediately realise you're not doing it justice."),
      h2("What I'd Tell Anyone Considering It"),
      p("The people who told me 'the group thing isn't for everyone' were, in my case, wrong. The group dynamic was the best part. Having an instant social context in an unfamiliar city, people to share meals with, someone to split a taxi with at midnight — it removes a layer of friction from travel I hadn't realised I was carrying. I came home with a group chat of ten genuine friends and a return trip to Morocco already loosely planned.")
    ),
  },

  // 3 — not featured
  {
    title: "Standing at Machu Picchu With Nine Strangers Who Became My People",
    slug: "standing-at-machu-picchu-with-nine-strangers",
    date: "2026-06-01",
    country: "Peru",
    category: "stories",
    featured: false,
    excerpt: "I thought Machu Picchu would be the trip highlight. Then we got to Huacachina and I realised Peru had been saving its best moment for last.",
    body: doc(
      h2("The Altitude Caught Us All Off Guard"),
      p("We landed in Cusco on the second day and every single person in our group underestimated what the altitude would feel like. At 3,400 metres, going up a single flight of stairs leaves you breathless. I spent the first afternoon horizontal in my hotel room eating crackers and drinking coca tea, wondering if I'd made a terrible decision. By the following morning, the acclimatisation had kicked in and we could function again."),
      p("Our guide had been through this with every group before us and handled it without drama — a slower start, a walking tour of Cusco rather than anything strenuous, and a dinner that lasted three hours because nobody was in a hurry to go anywhere. That evening together, slightly wretched and relieved to be recovering, was where the group properly bonded."),
      h2("Machu Picchu Itself"),
      p("We took the 5:30am bus to be at the gate when it opened. The site in that first hour, with mist sitting in the valley below and terraces catching the first light, is something that would require a much better writer than me to describe adequately. I'll just say that everyone in our group went quiet for a sustained period and nobody needed to explain why."),
      p("Our guide spent two hours walking us through the site with the kind of contextual knowledge that turns ancient stones into a comprehensible civilisation. Where people slept, how the water system worked, what the agricultural terraces were actually for. Machu Picchu with context is a profoundly different experience from Machu Picchu as a backdrop for photographs."),
      h2("Huacachina: The Surprise Finale"),
      p("I'd heard about Huacachina but hadn't paid much attention to it. An oasis town in the middle of a desert sounded like a novelty rather than a destination. Then we drove there from Lima and I completely revised that assessment. Sandboarding down a dune so steep you lose visibility of the town below, with the sun dropping behind the horizon and the oasis appearing in miniature below you, was the most exhilarating hour of the entire trip. Most of our group went back up for a second run. Peru saves the fun for last, and it lands.")
    ),
  },

  // 4 — FEATURED
  {
    title: "From Strangers to a Group Chat That Won't Stop — Our Brazil Experience",
    slug: "from-strangers-to-a-group-chat-that-wont-stop-our-brazil-experience",
    date: "2026-05-15",
    country: "Brazil",
    category: "stories",
    featured: true,
    excerpt: "Eight days, Christ the Redeemer, island hopping off Angra dos Reis, and a hang gliding moment I will never fully recover from. Brazil with Trip Cooks delivered things I didn't know I needed.",
    body: doc(
      h2("Rio Was Not What I'd Built It Up to Be — It Was Better"),
      p("I'd watched too many documentaries about Rio and arrived with an image that was about seventy percent accurate. The scale of it — mountains pressing against the city, sea on one side, the sprawl of everything — you genuinely cannot prepare for that visually. Arriving by car from the airport, watching the city reveal itself through the windscreen, our group went quiet in the way groups go quiet when they're all having the same thought."),
      p("We spent the first full day on Escadaria Selarón and Favela Rocinha with a local guide who grew up there. The favela tour is one of those experiences that challenges preconceptions efficiently. The community is densely layered, remarkably organised, and has a complex relationship with outside visitors that our guide navigated thoughtfully."),
      h2("Christ the Redeemer at Dawn"),
      p("We booked the earliest slot on the Corcovado train, which meant a 5am start and some grumbling in the hotel lobby. The grumbling stopped about forty minutes later when we reached the statue and the city below was still in partial darkness with the first light catching the tops of the mountains. At full height, the statue is considerably larger than photographs suggest."),
      p("The views of the city from that height — Sugarloaf Mountain in the foreground, the bays extending in both directions — are the defining image of the trip. We stayed far longer than planned. Nobody suggested leaving."),
      h2("Island Hopping at Angra dos Reis"),
      p("Leaving Rio for Angra dos Reis felt like the trip shifting gear. The drive takes about two hours and ends at a marina where a boat was waiting. The bay contains 365 islands and the water between them is the turquoise blue that looks edited in photographs and isn't. We spent two days here, swimming in coves accessible only by boat, eating grilled fish on floating restaurants, moving at the pace coastal Brazil enforces on everyone. Several people said these were their favourite days of the whole trip."),
      h2("The Hang Gliding Incident"),
      p("Hang gliding from Pedra Bonita above Ipanema was an optional activity I signed up for after one caipirinha too many at dinner. I made a noise on launch that I will not reproduce in print. What I can report is that two minutes gliding over the Tijuca Forest with the entire sweep of Ipanema Beach below was one of the most singular physical experiences of my life. Three other people in our group did it after watching me survive.")
    ),
  },

  // 5 — not featured
  {
    title: "Grand Canyon Road Trip: Three Days, Two Canyons, Zero Sleep Regrets",
    slug: "grand-canyon-road-trip-three-days-two-canyons-zero-regrets",
    date: "2026-07-10",
    country: "United States",
    category: "stories",
    featured: false,
    excerpt: "Arizona's Big Three in three days with a group of six. A road trip that turned out to be about more than the landscape.",
    body: doc(
      h2("Arriving at the Grand Canyon at Golden Hour"),
      p("We drove from Las Vegas in the late afternoon, reaching the South Rim just as the sun was getting low. The first viewpoint — Mather Point — was our introduction and it was overwhelming. The canyon is so large that your brain initially refuses to process it as a single geological feature. It looks like a photograph of itself. The colour shifts in the evening light from burnt orange to deep purple while you stand there trying to adjust."),
      p("Six of us stood at the rim for nearly an hour saying very little. The silence around the canyon is unusual — there are other visitors, there's wind, but the space seems to absorb sound. People who'd been chatty and social in Las Vegas went quiet in a way that felt right."),
      h2("Antelope Canyon by Light Beam"),
      p("Upper Antelope Canyon is a slot canyon — a narrow gorge carved by flash floods into the Navajo sandstone, with walls smoothed into undulating curves. In certain light conditions, beams of sunlight drop vertically through openings in the ceiling and illuminate dust particles in the air. It's one of the most photographed places in the world and still manages to exceed expectation in person."),
      p("The canyon is narrow enough that you walk single-file. The sandstone walls glow orange and red at close range and the shapes they form — ripples, waves, formations that look deliberately carved — are hypnotic. We were inside for about an hour and it felt like fifteen minutes."),
      h2("Horseshoe Bend at Sunrise"),
      p("We set an early alarm to reach Horseshoe Bend before the crowds, arriving with the light still low and the Colorado River below still in shadow. The drop from the overlook to the river is around 300 metres and the edge has no barrier. Our group spread along the rim with varying degrees of proximity to the edge, which told us something about each other."),
      p("The light came up slowly and painted the cliffs in layers. The river turned from dark to a luminous blue-green as the sun cleared the horizon. We've got a group chat called 'Antelope Alumni' that is currently arguing about what the next trip should be.")
    ),
  },

  // 6 — not featured
  {
    title: "Wales Surprised Me Completely and I'm Not Over It",
    slug: "wales-surprised-me-completely-and-im-not-over-it",
    date: "2026-06-20",
    country: "Wales",
    category: "stories",
    featured: false,
    excerpt: "I almost skipped this one. Wales didn't sound like the adventure I was looking for. Five days in North Wales proved me completely wrong in the best possible way.",
    body: doc(
      h2("The Case I Made Against Booking"),
      p("Wales was not on my list. I'm from London, Wales is two hours away by train, and spending money on a trip that close felt counterintuitive when Morocco and Japan were on the same booking page. I mentioned this in the pre-trip video call, semi-apologetically, and three other people immediately said the same thing. The Trip Cooks host asked us to keep an open mind for five days. That turned out to be excellent advice."),
      h2("Llandudno Was Not What I'd Imagined"),
      p("Our base for the trip was Llandudno, a Victorian seaside town that has preserved its promenade, pier, and general sense of a place that peaked in 1910 and decided to stay there. This sounds like a criticism. It is not. The Great Orme Tram — a Victorian-era funicular that climbs the limestone headland — gave us views on the first afternoon that reset the tone of the trip entirely. The Irish Sea in one direction, Snowdonia mountains in the other."),
      h2("Zip World Was Genuinely Terrifying"),
      p("Zip World Velocity operates the fastest zip line in the world, launching you face-down across a disused slate quarry at up to 160 kilometres per hour. Our group split between those who screamed the entire way and those who went completely silent. Our guide told us the silent ones are apparently more alarming for the staff watching. The Quarry Karts that followed were objectively funnier as a shared experience."),
      h2("Portmeirion Is Genuinely Surreal"),
      p("No preparation would have made Portmeirion feel expected. The village — Mediterranean architecture dropped without apology onto the North Wales coastline, built between 1925 and 1976 — is one of the strangest and most charming places I've visited anywhere. Terracotta buildings, Italian campanile, Baroque fountains, and views across the Dwyryd Estuary to the mountains. Our group was the most animated it had been all trip."),
      h2("Snowdon on the Last Day"),
      p("We took the Snowdon Mountain Railway to the summit on our final morning. At 1,085 metres, Snowdon's summit on a clear day gives views to Ireland, Scotland, and Brittany. We got cloud, which turned out to be its own experience — the summit emerging and disappearing as mist moved through, other walkers appearing and vanishing. On the train back down, someone said 'I didn't know Wales was like this' and everyone agreed. That's probably the best possible review of a Trip Cooks trip.")
    ),
  },

  // 7 — FEATURED
  {
    title: "Kruger National Park Redefined What Adventure Means to Me",
    slug: "kruger-national-park-redefined-what-adventure-means-to-me",
    date: "2026-08-20",
    country: "South Africa",
    category: "stories",
    featured: true,
    excerpt: "I'd been on trips with adrenaline activities before. Nothing had prepared me for the particular feeling of a lion walking past your vehicle at dawn in Kruger National Park.",
    body: doc(
      h2("I Didn't Think I Was a Safari Person"),
      p("Before the South Africa trip, if you'd asked me whether I wanted to go on safari, I'd have said it wasn't really my thing. I thought I'd be bored, or that the experience would feel performative — animals kept at a comfortable distance for tourists to photograph. I was wrong about all of it."),
      p("Our first game drive started at 5:30am. By 6:15am we had seen three lions, a herd of elephants, and a giraffe so close to the vehicle that our guide told us to keep our arms inside. By 7am everyone in the jeep was completely recalibrated about what the next three days were going to look and feel like."),
      h2("The Silence Is the Thing Nobody Mentions"),
      p("People talk about the Big Five. They don't talk about the silence. In Kruger, away from the camp, the absence of urban noise is so complete that it functions as its own kind of presence. You become aware of sounds you normally filter out entirely — the wind in the grass, something moving in the undergrowth, the distant call of an animal you'll spend the next ten minutes trying to locate."),
      p("Our guide could identify birds by sound at a distance that seemed impossible. He knew what was moving in the bush from shifts in the behaviour of other animals. Watching someone operate with that level of attentiveness to a landscape was its own kind of education — about what it means to actually pay attention to a place."),
      h2("The Johannesburg Day That Changed the Trip's Tone"),
      p("We visited the Apartheid Museum on day two of the trip, before Kruger, and it set a context that made everything else more meaningful. I knew the broad outline of apartheid history. The museum made it specific, immediate, and emotionally impossible to hold at arm's length. By the time we arrived at Kruger, we were thinking about the country differently — with more respect for its complexity, more awareness of what its people had been through to arrive at the present."),
      p("Our game drives felt different for that. The landscape wasn't just beautiful — it was the landscape of a country with a particular history that we'd been given some tools to understand. That's the advantage of having a guide who knows how to introduce a place rather than just show it to you."),
      h2("Cape Town as the Ending"),
      p("Cape Town after Johannesburg and Kruger felt like exhaling. The city is beautiful in an almost embarrassingly obvious way — the mountain, the ocean, the light, the food. We spent three days there moving at a pace that the rest of the trip hadn't allowed. Wine tasting in Stellenbosch. A morning at Boulders Beach watching penguins operate with complete indifference to human presence. An evening on the V&A Waterfront that extended well past its planned end time."),
      p("I came home from South Africa thinking it might be the best trip I'd ever done. Several months later, I still haven't revised that assessment. The breadth of it — the history, the wilderness, the cities, the food — doesn't feel like it should fit into ten days. Trip Cooks made it fit.")
    ),
  },

  // 8 — FEATURED
  {
    title: "My First Time in Japan and I Went With Strangers — No Regrets",
    slug: "my-first-time-in-japan-and-i-went-with-strangers-no-regrets",
    date: "2026-09-05",
    country: "Japan",
    category: "stories",
    featured: true,
    excerpt: "I'd been trying to plan a Japan trip on my own for two years and failing. Booking with Trip Cooks in November turned out to be the best planning decision I never quite made.",
    body: doc(
      h2("The Planning Problem"),
      p("Japan had been on my list for years. The problem wasn't enthusiasm — it was the logistics. The rail system is complex, the language barrier is real, and the sheer quantity of things to see in any given city is paralysing. Every time I sat down to plan a Japan trip I ended up with seventeen browser tabs and no itinerary. Then someone I know from work mentioned the Trip Cooks Japan trip and I booked a spot before I had time to overthink it."),
      h2("Okinawa First: The Right Call"),
      p("Starting the trip in Okinawa — before the intensity of Osaka and Kyoto — turned out to be a smart sequencing decision. Okinawa is subtropical, relaxed, and entirely unlike the Japan of most people's imaginations. Two days of clear water, good food, and a pace that allowed for jet lag recovery before the busier mainland cities. I arrived in Osaka already feeling like the trip had started well rather than like I was still adjusting."),
      h2("Osaka in Three Days"),
      p("Osaka at night, walking along Dotonbori with the neon reflections in the canal and the smell of takoyaki from every vendor stall, is one of those urban experiences that goes straight into a permanent mental category. The city is confident in a way that doesn't require your validation. It knows what it is and invites you to participate on those terms."),
      p("Osaka Castle in the morning, with the autumn maple trees at full colour in the surrounding park, was one of the most visually complete moments of the trip. Red leaves, white castle walls, the sound of raked gravel. Our guide had timed the visit to catch the peak of the koyo. It was impeccably judged."),
      h2("Kyoto: The City You Could Spend a Month In"),
      p("Two days in Kyoto felt both sufficient and completely inadequate. We covered the essential sites — Fushimi Inari at 7am before the crowds, the Bamboo Grove at Arashiyama, Kinkaku-ji at a reasonable hour with a guide who gave us context most visitors don't have. We also had one completely unplanned afternoon where the group split up and just walked."),
      p("I found a small temple I couldn't identify, sat in its garden for forty minutes, and felt a particular kind of quietness that I associate with Kyoto specifically. The city has an atmosphere of accumulated time — all those centuries of being Japan's capital, all that architecture and ritual — that settles on you if you give it the chance."),
      h2("What the Group Made Possible"),
      p("There are experiences on the Trip Cooks Japan itinerary that I simply couldn't have accessed independently — the restaurant in Osaka that doesn't take walk-ins and requires a local recommendation, the temple section in Kyoto that isn't marked on tourist maps, the guide's explanation of the deer at Nara that turned a novelty into something with context and history. The group setting made all of that available without any of the planning work. I came home with a trip that exceeded what I'd have managed on my own by a significant margin.")
    ),
  },

  // 9 — not featured
  {
    title: "Four Days in New Orleans Taught Me to Stop Rushing",
    slug: "four-days-in-new-orleans-taught-me-to-stop-rushing",
    date: "2026-05-30",
    country: "United States",
    category: "stories",
    featured: false,
    excerpt: "I'm not good at slowing down on trips. New Orleans, and specifically the Jazz Festival, forced the issue. I'm grateful it did.",
    body: doc(
      h2("I Booked It for the Festival"),
      p("I'll be honest about my motivations: I booked the New Orleans trip specifically because it coincided with the Jazz & Heritage Festival. I'm a music person and the lineup was exceptional. The city itself was secondary in my thinking. Four days later, the city had comprehensively won the argument and the festival had become one element of a much larger and more interesting experience."),
      h2("The French Quarter at Midnight"),
      p("Nothing quite prepares you for Bourbon Street at midnight. Not the photographs, not the descriptions, not having been warned. It's extraordinarily loud, unambiguously hedonistic, and somehow charming in a way that its reputation doesn't quite convey. We spent one evening there and our group managed to find a jazz bar three streets away from the main strip where a four-piece was playing to about twenty people. We stayed for three sets. Nobody wanted to leave."),
      h2("The Festival: Day Two"),
      p("Day two of the Jazz Festival, which our group attended as a full group rather than splitting up, was the most communal day of the trip. The Fair Grounds Race Course at capacity, music from seven stages simultaneously, food vendors serving crawfish étouffée and beignets and boudin to tens of thousands of people who had all made the same calculation about how to spend a Saturday."),
      p("We lost each other twice and found each other again both times near the food. The crawfish étouffée was the meeting point. This became a metaphor for the trip generally."),
      h2("Commander's Palace on Saturday Morning"),
      p("The Saturday jazz brunch at Commander's Palace is one of those experiences that shouldn't work as well as it does. Twenty-five cent martinis, live jazz, eggs benedict, and a dining room full of people in various states of having-a-very-good-time — all of it before noon on a Saturday. We arrived slightly the worse for wear from the previous night and left feeling entirely restored. New Orleans has a gift for this kind of recalibration."),
      h2("What I Took Home"),
      p("I'm not naturally inclined to slow down on trips. My instinct is always to do more, see more, cover more ground. New Orleans resisted that instinct at every turn. The city operates at a pace that is insistently, unapologetically its own, and the Jazz Festival is its fullest expression. I came home having spent four days actually inhabiting a place rather than moving through it. I don't do that enough. I'm working on it.")
    ),
  },

  // 10 — FEATURED
  {
    title: "All-Inclusive in Cancun With a Group of Strangers Was Not What I Expected",
    slug: "all-inclusive-in-cancun-with-a-group-of-strangers",
    date: "2026-08-01",
    country: "Mexico",
    category: "stories",
    featured: true,
    excerpt: "All-inclusive resorts are supposed to be lazy holidays. Add Chichen Itza, a Mayan cenote, ATV jungle trails, and a group of people you've never met, and the definition changes entirely.",
    body: doc(
      h2("I Had the Wrong Idea About All-Inclusive"),
      p("When I saw the Cancun trip was all-inclusive, my first thought was: loungers, unlimited cocktails, and five days of deliberate inactivity. That's a legitimate holiday. It's just not usually what I book. What actually happened was something considerably more active, and the all-inclusive base — the resort, the food, the pool — turned out to be the perfect contrast to days that were anything but restful."),
      h2("Chichen Itza: The Pyramid That Earns Every Photograph"),
      p("We drove to Chichen Itza on day two and arrived in the early morning before the peak heat and the majority of other visitors. The pyramid of El Castillo — 24 metres high, geometrically perfect, built to align precisely with the spring and autumn equinoxes — is one of those sites that makes its fame feel earned rather than manufactured. Standing at the base and looking up, the scale is genuinely difficult to process."),
      p("The surrounding site extends across a large area and includes a ball court, a skull platform, and the temple of the Warriors, all in varying states of remarkable preservation. Our guide walked us through the site over two hours with the kind of contextual detail that makes an ancient city comprehensible rather than just impressive."),
      h2("The Mayan Cenote"),
      p("On the drive back from Chichen Itza we stopped at a cenote — a natural sinkhole sacred to the Maya, filled with extraordinarily clear groundwater — and swam in it. The cenote we visited was in a cave, the water lit from below and from a natural opening in the roof above. The visibility underwater was surreal; you could see thirty metres in every direction through water so clear it barely registered as a medium."),
      p("Swimming in a Mayan sacred site was, predictably, not something I'd anticipated from a Cancun trip. It was also probably the most memorable single experience of the week."),
      h2("The ATV Day"),
      p("The optional ATV excursion through jungle trails was one of those activities where the pre-activity briefing and the actual experience turn out to be operating in completely different registers. The briefing was calm, procedural, focused on safety. The actual trail — narrow, root-crossed, occasionally very steep, entirely enclosed by jungle canopy — was wild in the specific sense that it required total concentration for forty-five continuous minutes."),
      p("Our group emerged from the jungle muddy, laughing, and immediately debating whether to sign up for the zipline above the canopy that the guide had mentioned. Most of us did. The Cancun trip kept finding new gears."),
      h2("The Group Dynamic in a Resort Setting"),
      p("All-inclusive in a group of strangers turned out to be a surprisingly effective social context. The shared base — same pool, same dining room, same bar — meant that the group formed quickly and the trip had a natural social rhythm from the first evening. We ate together, explored together, and had a common homebase to return to after the day's activities. I'd underestimated how much that continuity would shape the experience. We went from strangers to a functional, genuinely fun group by day two. The all-inclusive structure accelerated that in ways I hadn't predicted.")
    ),
  },

  // 11 — not featured
  {
    title: "I Went to Thailand for the Beaches and Stayed for Chiang Mai",
    slug: "i-went-to-thailand-for-the-beaches-and-stayed-for-chiang-mai",
    date: "2026-10-05",
    country: "Thailand",
    category: "stories",
    featured: false,
    excerpt: "Phuket delivered everything I hoped for. Then Chiang Mai happened and turned out to be a completely different kind of memorable.",
    body: doc(
      h2("Bangkok: My Reference Point Shifted Immediately"),
      p("I'd been told Bangkok was chaotic and overwhelming and would either exhaust or energise me. It turned out to be both, simultaneously and continuously, which is probably what everyone means when they say this but is still difficult to prepare for. We had two days there and I spent most of both days with my mouth slightly open, processing what the city was doing around me."),
      p("The food made everything else manageable. Bangkok's street food scene is so extraordinary and so accessible — satay from a cart, pad see ew at a plastic table three feet from a busy road, mango sticky rice from a vendor who had clearly been making exactly this for forty years — that the city's intensity becomes something you eat through rather than simply endure."),
      h2("Phuket: The Expectation Was Correct"),
      p("I expected Phuket to be beautiful and warm and relaxed, and it was all of those things without complication. The Phi Phi Islands boat trip on day three was the kind of experience that makes 'I'll have the pasta again please' feel like a reasonable life decision in the days after returning. The water is exactly the colour in the photographs and photographing it anyway is an irresistible impulse that every person on every boat trip succumbs to."),
      p("We had one evening in Patong — Phuket's famous beach strip — and it was everything described: loud, colourful, and exhausting in a way that was briefly enjoyable. The rest of our Phuket time was spent on quieter beaches and eating grilled fish at restaurants that didn't have signs in English."),
      h2("Chiang Mai: The Part I Hadn't Planned On Loving"),
      p("Flying from Phuket to Chiang Mai felt like arriving in a different country. The northern city is cooler, slower, more culturally layered than the south. The night markets are less about selling and more about community — locals eating alongside tourists without either group dramatically adjusting their behaviour for the other."),
      p("Doi Suthep, the temple on the mountain above the city, is a forty-five minute drive and worth every kilometre of the traffic getting there. The view over Chiang Mai from the temple terrace, especially at dusk when the mist starts to gather in the valley below, is the kind of image that takes a while to believe is real."),
      h2("The Lantern Festival"),
      p("The Yi Peng Lantern Festival in Chiang Mai happens once a year and cannot be replicated by any other experience I've had. Standing in a field as thousands of paper lanterns rise simultaneously into the night sky, each carrying a small flame, the entire sky turning amber and gold — it's a moment that exists entirely outside of the framework of normal experience. I'm still not sure I've fully processed it. I'm not sure I want to.")
    ),
  },

  // 12 — not featured
  {
    title: "I've Done Four Trip Cooks Trips Now. Here's What I've Learned.",
    slug: "ive-done-four-trip-cooks-trips-now-heres-what-ive-learned",
    date: "2026-07-25",
    country: "Morocco",
    category: "stories",
    featured: false,
    excerpt: "Morocco, Jordan, Brazil, and now South Africa. After four Trip Cooks trips I've got opinions — about group travel, about what makes a destination worth it, and about myself as a traveller.",
    body: doc(
      h2("Morocco Was the One That Started It"),
      p("I booked the Morocco trip in 2025 because a friend sent me a link and said 'you'd be good at this'. I'm not sure what that meant and I didn't ask. I booked it without much deliberation and arrived in Marrakesh not knowing a single other person on the trip. Three years later I've been on four trips with Trip Cooks and have a WhatsApp group for each one that I genuinely consider a form of social life."),
      p("Morocco taught me that the thing I'd been avoiding — travelling with strangers — was the thing I'd actually been looking for. The social structure of a group trip removes a particular kind of loneliness from solo travel without removing any of the freedom. I didn't know that until I tried it."),
      h2("Jordan Was Where I Understood the Guide Question"),
      p("On the Morocco trip I'd been moderately engaged with our guide's knowledge of the place. On the Jordan trip I became obsessed with it. Our guide in Petra knew the site not just as a tourist attraction but as a place embedded in the history of the Nabataean empire, connected to trade routes that stretched from Arabia to Egypt to Greece. Walking through Petra with that framing was a fundamentally different experience from walking through it with a map and a guidebook."),
      p("This is consistently the thing that distinguishes a Trip Cooks trip from independent travel at the same destination: the quality of the local expertise. Every trip I've been on has had a guide or local contact who knew something about the place that I couldn't have found independently. That knowledge compounds over a week in ways that are difficult to quantify."),
      h2("Brazil Was the One That Surprised Me Most"),
      p("I expected Brazil to be a great trip. I didn't expect it to be the most joyful trip I've ever had. Something about the country — the music, the food, the physical scale of the landscape, the particular energy of Rio — amplified the group dynamic in a way that produced something close to euphoria for long stretches of the week. We danced at 11pm on a beach in Angra dos Reis for reasons nobody could fully explain. We all agreed it was exactly right."),
      h2("South Africa Changed the Framework"),
      p("After three trips with various degrees of intensity, South Africa reset what I thought a trip could contain. The Apartheid Museum in Johannesburg, the silence of Kruger at dawn, the wine estates of Stellenbosch at dusk — these are experiences that sit in different categories of human life and don't normally appear in the same week. Trip Cooks made them a single coherent journey. I'm still thinking about it."),
      h2("What I Know Now That I Didn't Then"),
      p("Four trips in, the thing I'd tell my pre-Morocco self is this: the destination matters less than you think. Every Trip Cooks trip I've been on has exceeded my expectations regardless of how high they were going in. This isn't because every destination is equally extraordinary — they're not. It's because the combination of good logistics, local expertise, and people who showed up wanting to have a real experience produces something that destination alone can't create."),
      p("Book the trip you're considering. The one you've been looking at and not booking for reasons that, honestly, aren't as solid as you think they are. I've now done this four times and the only regret I have is that I didn't start sooner.")
    ),
  },
];

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const envParams = { spaceId: SPACE_ID, environmentId: ENVIRONMENT_ID };

async function main() {
  await client.space.get({ spaceId: SPACE_ID });

  // Find Trip Cooks author profile
  const authorEntries = await client.entry.getMany({
    ...envParams,
    query: { content_type: "authorProfile", "fields.name": "Trip Cooks", limit: 1 },
  });

  if (authorEntries.total === 0) {
    console.error("[error] Could not find 'Trip Cooks' author profile entry. Run setup-contentful.mjs first.");
    process.exit(1);
  }

  const authorId = authorEntries.items[0].sys.id;
  console.log(`✓ Found Trip Cooks author profile (${authorId})\n`);

  // Create blog posts
  console.log("→ Creating blog posts...");
  for (const post of BLOG_POSTS) {
    const existing = await client.entry.getMany({
      ...envParams,
      query: { content_type: "blogPost", "fields.slug": post.slug, limit: 1 },
    });

    if (existing.total > 0) {
      console.log(`  skip  "${post.title}" (already exists)`);
      continue;
    }

    try {
      const entry = await client.entry.create(
        { ...envParams, contentTypeId: "blogPost" },
        {
          fields: {
            title:         { "en-US": post.title },
            slug:          { "en-US": post.slug },
            category:      { "en-US": post.category },
            date:          { "en-US": post.date },
            excerpt:       { "en-US": post.excerpt },
            featured:      { "en-US": post.featured ?? false },
            body:          { "en-US": post.body },
            authorProfile: { "en-US": entryLink(authorId) },
          },
        },
      );
      await client.entry.publish({ ...envParams, entryId: entry.sys.id }, entry);
      console.log(`  ✓  [${post.featured ? "FEATURED" : "       "}] "${post.title}"`);
    } catch (err) {
      console.error(`  ✗  "${post.title}": ${err.message}`);
    }
  }

  // Create community stories
  console.log("\n→ Creating community stories...");
  for (const story of COMMUNITY_STORIES) {
    const existing = await client.entry.getMany({
      ...envParams,
      query: { content_type: "communityStory", "fields.slug": story.slug, limit: 1 },
    });

    if (existing.total > 0) {
      console.log(`  skip  "${story.title}" (already exists)`);
      continue;
    }

    try {
      const entry = await client.entry.create(
        { ...envParams, contentTypeId: "communityStory" },
        {
          fields: {
            title:         { "en-US": story.title },
            slug:          { "en-US": story.slug },
            date:          { "en-US": story.date },
            excerpt:       { "en-US": story.excerpt },
            category:      { "en-US": story.category },
            country:       { "en-US": story.country },
            featured:      { "en-US": story.featured ?? false },
            body:          { "en-US": story.body },
            authorProfile: { "en-US": entryLink(authorId) },
          },
        },
      );
      await client.entry.publish({ ...envParams, entryId: entry.sys.id }, entry);
      console.log(`  ✓  [${story.featured ? "FEATURED" : "       "}] "${story.title}"`);
    } catch (err) {
      console.error(`  ✗  "${story.title}": ${err.message}`);
    }
  }

  const featuredBlog = BLOG_POSTS.filter((p) => p.featured).length;
  const featuredStory = COMMUNITY_STORIES.filter((s) => s.featured).length;
  console.log(`\n✓ Done.`);
  console.log(`  Blog posts:        ${BLOG_POSTS.length} (${featuredBlog} featured)`);
  console.log(`  Community stories: ${COMMUNITY_STORIES.length} (${featuredStory} featured)`);
}

main().catch((err) => {
  console.error("[error]", err.message ?? err);
  process.exit(1);
});
