export type BlogResponse = {
    date: string; // "2025-02-27 07:12:24"
    code: number; // 200
    message: string; // "All active blogs retrieved successfully"
    data: {
        data: BlogPost[];
        metadata: Metadata;
    };
};

export type BlogPost = {
    uuid: string;
    title: string;
    content: string;
    image: string;
    youtube_videos: string[];
    status: "draft" | "published" | string; // Can be expanded for other statuses
    published_at: string | null; // Null if not published
    views: number;
    created_at: string;
    updated_at: string;
    admin: Author;
};

type Author = {
    uuid: string;
    name: string;
    email: string;
    avatar: string | null;
};

type Metadata = {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
};


export interface BlogCommentsResponse {
    date: string;
    code: number;
    message: string;
    data: {
        blog_uuid: string;
        total_comments: number;
        comments: Comment[];
    };
}

export type LikeResponse = {
    date: string,
    code: number,
    message: string,
    data: {
        likes_count: number
    }
}

// Type for a user who posts a comment
interface User {
    uuid: string;
    name: string;
    avatar: string | null; // Nullable field
}

// Recursive type for a comment, since comments can have replies
export interface Comment {
    uuid: string;
    user: User;
    content: string;
    created_at: string;
    replies: Comment[]; // Nested replies (recursive structure)
}

// Type for the data object in the response
export interface CommentsData {
    blog_uuid: string;
    total_comments: number;
    comments: Comment[]; // List of top-level comments
    likes_count: number,
    comments_count: number,
    latest_comments: [],
    user_liked: boolean,
}

// Type for the entire API response
export interface GetCommentsResponse {
    date: string;
    code: number;
    message: string;
    data: CommentsData;
}
