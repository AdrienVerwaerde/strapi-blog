import { fetchArticles } from '$lib/services/api';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async () => {
    try {
        const articlesData = await fetchArticles();

        return {
            articles: articlesData.data
        };
    } catch (error) {
        console.error('Erreur de chargement des articles:', error);
        return {
            articles: [],
            error: 'Impossible de charger les articles'
        };
    }
};
