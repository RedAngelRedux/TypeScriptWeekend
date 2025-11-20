export const tagsJson = `{
    "page": 1,
    "pageSize": 15,
    "data": [
        {
            "tag": "#AI",
            "usageCount": 1530294,
            "trending": true,
            "relatedTags": ["#MachineLearning", "#Tech", "#DeepLearning"],
            "category": "Technology"
        },
        {
            "tag": "#photoediting",
            "usageCount": 213892,
            "trending": false,
            "relatedTags": ["#Photography", "#AI", "#Photoshop"],
            "category": "Technology"
        },
        {
            "tag": "#DevLife",
            "usageCount": 743118,
            "trending": false,
            "relatedTags": ["#Coding", "#100DaysOfCode", "#SoftwareEngineer"],
            "category": "Technology"
        },
        {
            "tag": "#MondayMotivation",
            "usageCount": 1210382,
            "trending": true,
            "relatedTags": ["#Motivation", "#StartStrong", "#WorkGoals"],
            "category": "Lifestyle"
        },
        {
            "tag": "#FitnessJourney",
            "usageCount": 872194,
            "trending": false,
            "relatedTags": ["#Workout", "#HealthyLiving", "#NoExcuses"],
            "category": "Health & Fitness"
        },
        {
            "tag": "#NoExcuses",
            "usageCount": 498222,
            "trending": false,
            "relatedTags": ["#Motivation", "#FitnessGoals", "#Discipline"],
            "category": "Health & Fitness"
        },
        {
            "tag": "#TravelGoals",
            "usageCount": 645383,
            "trending": true,
            "relatedTags": ["#Wanderlust", "#TravelGram", "#BucketList"],
            "category": "Lifestyle"
        },
        {
            "tag": "#Wanderlust",
            "usageCount": 1183021,
            "trending": true,
            "relatedTags": ["#Adventure", "#Explore", "#TravelPhotography"],
            "category": "Lifestyle"
        },
        {
            "tag": "#BookReview",
            "usageCount": 129007,
            "trending": false,
            "relatedTags": ["#BookLover", "#CurrentlyReading", "#ReadMore"],
            "category": "Entertainment"
        },
        {
            "tag": "#Foodie",
            "usageCount": 1892834,
            "trending": true,
            "relatedTags": ["#FoodPorn", "#InstaFood", "#Yummy"],
            "category": "Food & Drink"
        },
        {
            "tag": "#TokyoEats",
            "usageCount": 23820,
            "trending": false,
            "relatedTags": ["#JapaneseFood", "#Ramen", "#Foodie"],
            "category": "Food & Drink"
        },
        {
            "tag": "#StreetArt",
            "usageCount": 204993,
            "trending": false,
            "relatedTags": ["#UrbanArt", "#Mural", "#PublicArt"],
            "category": "Arts & Culture"
        },
        {
            "tag": "#100DaysOfCode",
            "usageCount": 963345,
            "trending": true,
            "relatedTags": ["#CodeNewbie", "#DevLife", "#WebDev"],
            "category": "Technology"
        },
        {
            "tag": "#AdoptDontShop",
            "usageCount": 411287,
            "trending": false,
            "relatedTags": ["#RescueDog", "#PetRescue", "#AnimalLove"],
            "category": "Animals"
        },
        {
            "tag": "#StartupGrind",
            "usageCount": 534089,
            "trending": true,
            "relatedTags": ["#Entrepreneur", "#PitchDeck", "#Founders"],
            "category": "Business"
        }
    ]
}`;

export const fetchTags = () => Promise.resolve(
    new Response(
        tagsJson, 
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        }
    )
);