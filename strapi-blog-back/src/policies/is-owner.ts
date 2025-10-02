import { errors } from '@strapi/utils';
const { PolicyError } = errors;

export default async function isOwner(ctx, config, { strapi }) {
    const { id } = ctx.params;
    const user = ctx.state.user;

    // l'utilisateur est forcément défini si is-authenticated est appliqué avant
    const article = await strapi.entityService.findOne('api::article.article', id, {
        populate: ['author'],
    });

    if (!article || article.author?.id !== user.id) {
        throw new PolicyError('Vous ne pouvez modifier que vos propres articles', {
            policy: 'is-owner',
            articleId: id,
        });
    }

    return true;
}