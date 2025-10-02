export interface ArticleContent {
    type: string;
    children: {
        type: string;
        text: string;
        bold?: boolean;
        italic?: boolean;
        underline?: boolean;
        strikethrough?: boolean;
        code?: boolean;
    }[];
}

export interface ImageFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    url: string;
}

export interface CoverImage {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
        thumbnail?: ImageFormat;
        small?: ImageFormat;
        medium?: ImageFormat;
        large?: ImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    createdAt: string;
    updatedAt: string;
}

export interface Comment {
    id: number;
    documentId: string;
    authorName: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface Article {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    content: ArticleContent[];
    authorName: string;
    coverImage?: CoverImage | null;
    comments?: Comment[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface ArticlesResponse {
    data: Article[];
}

export interface SingleArticleResponse {
    data: Article;
}
