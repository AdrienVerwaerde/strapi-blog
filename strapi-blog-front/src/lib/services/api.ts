import type { ArticlesResponse, Article, Comment } from '$lib/types/article';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

export async function fetchArticles(): Promise<ArticlesResponse> {
    const response = await fetch(`${STRAPI_URL}/api/articles?populate=coverImage`);

    if (!response.ok) {
        throw new Error(`Erreur lors de la récupération des articles: ${response.status}`);
    }

    return await response.json();
}

export async function fetchArticleByDocumentId(documentId: string): Promise<Article> {
    const response = await fetch(
        `${STRAPI_URL}/api/articles/${documentId}?populate=*`
    );

    if (!response.ok) {
        throw new Error(`Erreur lors de la récupération de l'article: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
}

export async function createComment(
    articleDocumentId: string,
    authorName: string,
    content: string
): Promise<Comment> {
    const response = await fetch(`${STRAPI_URL}/api/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: {
                authorName,
                content,
                article: articleDocumentId,
                publishedAt: new Date().toISOString()
            }
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Erreur lors de la création du commentaire');
    }

    const data = await response.json();
    return data.data;
}

export function getImageUrl(path: string): string {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${STRAPI_URL}${path}`;
}
