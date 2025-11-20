const profilesJson = `{
    "page": 1,
    "pageSize": 10,
    "data": [
        {
            "username": "techguru99",
            "displayName": "Tech Guru",
            "bio": "Exploring AI, gadgets, and all things tech ⚙️",
            "joinDate": "2020-03-15",
            "stats": {
                "followers": 12894,
                "following": 812,
                "posts": 342
            }
        },
        {
            "username": "dev_danielle",
            "displayName": "Danielle Coder",
            "bio": "Frontend dev | React, TypeScript & ☕ enthusiast",
            "joinDate": "2021-07-09",
            "stats": {
                "followers": 8471,
                "following": 420,
                "posts": 289
            }
        },
        {
            "username": "fitness_fanatic",
            "displayName": "Liam Strong",
            "bio": "Lifting, running, and living my best life 🏋️‍♂️",
            "joinDate": "2019-01-20",
            "stats": {
                "followers": 10432,
                "following": 235,
                "posts": 514
            }
        },
        {
            "username": "travelbug_jane",
            "displayName": "Jane Travels",
            "bio": "Passport ready 🌍 | 📍 Currently: Greece",
            "joinDate": "2022-05-02",
            "stats": {
                "followers": 15873,
                "following": 694,
                "posts": 403
            }
        },
        {
            "username": "booknerd_42",
            "displayName": "Alex the Reader",
            "bio": "Page turner, coffee sipper, and midnight thinker 📚",
            "joinDate": "2018-11-30",
            "stats": {
                "followers": 6634,
                "following": 712,
                "posts": 230
            }
        },
        {
            "username": "foodie_frank",
            "displayName": "Frank Yum",
            "bio": "Culinary explorer 🍣 | Ramen addict | 📍 Tokyo",
            "joinDate": "2023-02-18",
            "stats": {
                "followers": 9941,
                "following": 391,
                "posts": 119
            }
        },
        {
            "username": "ecoemma",
            "displayName": "Emma Green",
            "bio": "Zero waste & plant-based 🌱 | Tips & lifestyle",
            "joinDate": "2020-10-10",
            "stats": {
                "followers": 12015,
                "following": 643,
                "posts": 267
            }
        },
        {
            "username": "coder_carl",
            "displayName": "Carl the Coder",
            "bio": "Building web apps, one bug at a time 💻 #100DaysOfCode",
            "joinDate": "2021-01-01",
            "stats": {
                "followers": 7834,
                "following": 302,
                "posts": 168
            }
        },
        {
            "username": "startup_sid",
            "displayName": "Sid Kapoor",
            "bio": "Startup founder | MVP builder | Dream big 🚀",
            "joinDate": "2022-08-25",
            "stats": {
                "followers": 13420,
                "following": 511,
                "posts": 198
            }
        },
        {
            "username": "petlover_pete",
            "displayName": "Pete & Paws",
            "bio": "Dog dad 🐶 | Animal rescue volunteer | #AdoptDontShop",
            "joinDate": "2017-06-05",
            "stats": {
                "followers": 11207,
                "following": 379,
                "posts": 321
            }
        }
    ]
}`;

export const fetchProfiles = () => Promise.resolve(
    new Response(
        profilesJson, 
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        }
    )
);