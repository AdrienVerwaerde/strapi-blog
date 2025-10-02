import { createComment, fetchArticleByDocumentId } from '$lib/services/api';
import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

// Récupérer les articles
export const load: PageServerLoad = async ({ params }) => {
    try {
        const article = await fetchArticleByDocumentId(params.documentId);

        if (!article) {
            throw error(404, {
                message: 'Article non trouvé'
            });
        }

        return {
            article
        };
    } catch (err) {
        console.error('Erreur de chargement de l\'article:', err);
        throw error(404, {
            message: 'Article non trouvé'
        });
    }
};


// Poster un commentaire
export const actions: Actions = {
    addComment: async ({ request, params }) => {
        const formData = await request.formData();
        const authorName = formData.get('authorName')?.toString();
        const content = formData.get('content')?.toString();

        // Validation
        if (!authorName || authorName.trim().length === 0) {
            return fail(400, {
                error: 'Le nom est requis',
                authorName,
                content
            });
        }

        if (!content || content.trim().length === 0) {
            return fail(400, {
                error: 'Le contenu du commentaire est requis',
                authorName,
                content
            });
        }

        if (content.trim().length < 3) {
            return fail(400, {
                error: 'Le commentaire doit contenir au moins 3 caractères',
                authorName,
                content
            });
        }

        try {
            await createComment(
                params.documentId,
                authorName.trim(),
                content.trim()
            );

            return {
                success: true
            };
        } catch (error) {
            console.error('Erreur lors de la création du commentaire:', error);
            return fail(500, {
                error: 'Une erreur est survenue lors de la publication du commentaire',
                authorName,
                content
            });
        }
    }
};
