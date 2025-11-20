export type Post = {
    id: string,
    username: string,
    timestamp: string,
    content: string,
    likes: number,
    comments: number,
    shares: number
};

export type ProfileStats = {
        followers: number,
        following: number,
        posts: number
}

export type Profile = {
    username: string,
    displayName: string,
    bio: string,
    joinDate: string,
    stats:  ProfileStats
};

export type TagName = `#${string}`;

export type Tag = {
    tag: string,
    usageCount: number,
    trending: boolean,
    relatedTags: TagName[],
    category: string
};

// Options for the Common Part

// OPTION ONE
// make a specific type for each record
// This section would be cut-and-pasted then modify data type array
type PostsPageGood = {
    page: number,
    pageSize: number,
    data: Post[]
}

// OPTION TWO
// Use Intersection types
type PageBetter = {
    page: number,
    pageSize: number,
    data: any[]
}
type PostsPageBetter = PageBetter & {
    data: Post[]
}
type TagsPageBetter = PageBetter & {
    data: Tag[]
}

//OPTION THREE
// Use Generics
export type Page<Tdata extends object> = {
    page: number,
    pageSize: number,
    data: Array<Tdata> // or Tdata[]
}

// DISCRIMINATING UNIONS
type SuccessResult<T> = {
    success: true,
    value: T,
    error?: null
}

type ErrorResult = {
    success: false,
    value?: null,
    error: string
}

// This is a discriminating union; success is the discriminant
export type Result<T> = SuccessResult<T> | ErrorResult;
