

enum MatchingQuestion {
    BEDTIME = "BEDTIME",
    CLEANLINESS = "CLEANLINESS",
    LOUDNESS = "LOUDNESS",

    START_DATE = "START_DATE",
    BUDGET_MAX = "BUDGET_MAX",
    BUDGET_TARGET = "BUDGET_TARGET",
    NUM_ROOMMATES_MIN = "NUM_ROOMMATES_MIN",
    NUM_ROOMMATES_MAX = "NUM_ROOMMATES_MAX",
    SHARE_BEDROOM = "SHARE_BEDROOM",
}

enum Bedtime {
    NINE_TO_ELEVEN = 1,
    ELEVEN_OR_TWELVE = 2,
    AFTER_MIDNIGHT = 3
}

enum CleanlinessResponse {
    VERY_CLEAN = 4,
    MOSTLY_TIDY = 3,
    SUFF_PLACES = 2,
    ALMOST_JUNGLE = 1
}

enum LoudnessResponse {
    VERY_PARTY = 4,
    OFTEN_SOCIAL = 3,
    OCCASIONALLY_LOUD = 2,
    MOSTLY_QUIET = 1,
}

enum StartDate {
    MAY_22 = "MAY_22",
    JUN_5 = "JUN_5",
    JUN_19 = "JUN_19"
}


enum LocationResponse {
    SAN_FRANCISCO = "SAN_FRANCISCO",
    HERNDON = "HERNDON",
    BURLINGTON = "BURLINGTON",
    DENVER = "DENVER",
    BELLEVUE = "BELLEVUE",
    CAMBRIDGE = "CAMBRIDGE",
    ATLANTA = "ATLANTA",
    INDIANAPOLIS = "INDIANAPOLIS",
}

const CapsToLower = (caps: string) => {
    return caps.replace("_", " ").toLowerCase()
}


export {
    MatchingQuestion,
    Bedtime,
    CleanlinessResponse,
    LoudnessResponse,
    StartDate,
    LocationResponse,
    CapsToLower
};