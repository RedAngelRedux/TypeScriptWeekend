const postsJson = 
`{
    "page": 1,
    "pageSize": 20,
    "data": 
    [
        {
            "id": "post001",
            "username": "techguru99",
            "timestamp": "2025-06-25T14:32:00Z",
            "content": "Just tried the new AI-powered photo editor. Mind blown! 💥📸 #AI #photoediting",
            "likes": 127,
            "comments": 12,
            "shares": 8
        },
        {
            "id": "post002",
            "username": "dev_danielle",
            "timestamp": "2025-06-25T15:10:00Z",
            "content": "Coffee, code, deploy. ☕💻🚀 #DevLife #MondayMotivation",
            "likes": 213,
            "comments": 34,
            "shares": 19
        },
        {
            "id": "post003",
            "username": "fitness_fanatic",
            "timestamp": "2025-06-24T08:45:00Z",
            "content": "Early morning workout complete! 🏋️‍♂️💪 #NoExcuses #FitnessJourney",
            "likes": 98,
            "comments": 5,
            "shares": 2
        },
        {
            "id": "post004",
            "username": "travelbug_jane",
            "timestamp": "2025-06-23T19:25:00Z",
            "content": "Sunsets in Santorini never disappoint 🌅🇬🇷 #TravelGoals #Wanderlust",
            "likes": 354,
            "comments": 48,
            "shares": 29
        },
        {
            "id": "post005",
            "username": "booknerd_42",
            "timestamp": "2025-06-22T21:00:00Z",
            "content": "Just finished ‘The Midnight Library’. What a ride! 📚✨ Highly recommended. #BookReview #ReadMore",
            "likes": 156,
            "comments": 23,
            "shares": 11
        },
        {
            "id": "post006",
            "username": "foodie_frank",
            "timestamp": "2025-06-21T12:10:00Z",
            "content": "This ramen just changed my life 🍜🔥 #Foodie #TokyoEats",
            "likes": 289,
            "comments": 31,
            "shares": 14
        },
        {
            "id": "post007",
            "username": "ecoemma",
            "timestamp": "2025-06-20T09:00:00Z",
            "content": "Switched to a zero-waste lifestyle this month. It’s not easy but totally worth it 🌿♻️ #SustainableLiving",
            "likes": 312,
            "comments": 45,
            "shares": 21
        },
        {
            "id": "post008",
            "username": "gaming_greg",
            "timestamp": "2025-06-19T18:45:00Z",
            "content": "Just beat the final boss in Elden Ring II 😱🔥 #GamerLife",
            "likes": 415,
            "comments": 88,
            "shares": 36
        },
        {
            "id": "post009",
            "username": "momlife_mel",
            "timestamp": "2025-06-18T07:30:00Z",
            "content": "First day of kindergarten for my little one 😭💖 #ProudMom",
            "likes": 143,
            "comments": 18,
            "shares": 4
        },
        {
            "id": "post010",
            "username": "petlover_pete",
            "timestamp": "2025-06-17T20:20:00Z",
            "content": "Adopted this cutie today 🐶❤️ #RescueDog #AdoptDontShop",
            "likes": 502,
            "comments": 67,
            "shares": 40
        },
        {
            "id": "post011",
            "username": "minimalist_mia",
            "timestamp": "2025-06-16T13:15:00Z",
            "content": "Decluttered my entire apartment and I feel so free 🧘‍♀️🧺 #Minimalism #MentalClarity",
            "likes": 134,
            "comments": 11,
            "shares": 6
        },
        {
            "id": "post012",
            "username": "investor_ian",
            "timestamp": "2025-06-15T09:40:00Z",
            "content": "Tech stocks are on the rise again 📈💡 Are we heading into another bull market? #InvestSmart",
            "likes": 242,
            "comments": 39,
            "shares": 17
        },
        {
            "id": "post013",
            "username": "artist_amy",
            "timestamp": "2025-06-14T22:12:00Z",
            "content": "Finished my first mural today 🎨🌼 Check it out! #StreetArt #CreativeLife",
            "likes": 391,
            "comments": 52,
            "shares": 25
        },
        {
            "id": "post014",
            "username": "science_sam",
            "timestamp": "2025-06-13T11:05:00Z",
            "content": "New research suggests bees understand the concept of zero 🐝🧠 #ScienceFacts",
            "likes": 167,
            "comments": 20,
            "shares": 9
        },
        {
            "id": "post015",
            "username": "diy_dora",
            "timestamp": "2025-06-12T17:45:00Z",
            "content": "Built my own coffee table from reclaimed wood ☕🪵 #DIYProjects",
            "likes": 228,
            "comments": 26,
            "shares": 12
        },
        {
            "id": "post016",
            "username": "coder_carl",
            "timestamp": "2025-06-11T10:00:00Z",
            "content": "Finally mastered recursive functions in JavaScript 😤💻 #100DaysOfCode",
            "likes": 301,
            "comments": 44,
            "shares": 16
        },
        {
            "id": "post017",
            "username": "history_nerd",
            "timestamp": "2025-06-10T19:30:00Z",
            "content": "Fun fact: Napoleon was once attacked by a horde of bunnies. 🐇😂 #HistoryTrivia",
            "likes": 173,
            "comments": 21,
            "shares": 13
        },
        {
            "id": "post018",
            "username": "biker_brandon",
            "timestamp": "2025-06-09T07:50:00Z",
            "content": "Crushed a 50-mile ride today 🚴‍♂️💨 #CyclingLife #Endurance",
            "likes": 214,
            "comments": 29,
            "shares": 10
        },
        {
            "id": "post019",
            "username": "language_liz",
            "timestamp": "2025-06-08T16:18:00Z",
            "content": "Learning Japanese has been a wild ride! 今日もがんばろう！🇯🇵📚 #PolyglotLife",
            "likes": 148,
            "comments": 19,
            "shares": 7
        },
        {
            "id": "post020",
            "username": "startup_sid",
            "timestamp": "2025-06-07T14:59:00Z",
            "content": "Pitch deck is ready. MVP is live. Let’s do this. 🚀💼 #StartupGrind",
            "likes": 337,
            "comments": 41,
            "shares": 22
        }
    ]
}`;

export const fetchPosts = () => Promise.resolve(
    new Response(postsJson, 
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
);