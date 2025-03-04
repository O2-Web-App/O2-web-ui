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
