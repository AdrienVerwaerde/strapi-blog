<script lang="ts">
  import type { Comment } from "$lib/types/article";

  export let comments: Comment[] = [];

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return diffMinutes <= 1
          ? "À l'instant"
          : `Il y a ${diffMinutes} minutes`;
      }
      return diffHours === 1 ? "Il y a 1 heure" : `Il y a ${diffHours} heures`;
    }

    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;

    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
</script>

<section class="comments-section">
  <h2 class="comments-title">
    Commentaires
    <span class="comments-count">({comments.length})</span>
  </h2>

  {#if comments.length === 0}
    <div class="no-comments">
      <p>Aucun commentaire pour le moment.</p>
    </div>
  {:else}
    <div class="comments-list">
      {#each comments as comment (comment.id)}
        <article class="comment">
          <div class="comment-content">
            <div class="comment-header">
              <h3 class="comment-author">{comment.authorName}</h3>
              <time class="comment-date" datetime={comment.createdAt}>
                {formatDate(comment.createdAt)}
              </time>
            </div>

            <p class="comment-text">{comment.content}</p>
          </div>
        </article>
      {/each}
    </div>
  {/if}
</section>

<style>
  .comments-section {
    margin-top: 4rem;
    padding-top: 3rem;
    border-top: 2px solid #e5e7eb;
  }

  .comments-title {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: #111;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .comments-count {
    font-size: 1.25rem;
    color: #6b7280;
    font-weight: 400;
  }

  .no-comments {
    text-align: center;
    padding: 3rem 1rem;
    color: #6b7280;
  }

  .no-comments p {
    margin: 0.5rem 0;
    font-size: 1.125rem;
  }

  .comments-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .comment {
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    background: #f9fafb;
    border-radius: 12px;
    transition: background-color 0.2s;
  }

  .comment:hover {
    background: #f3f4f6;
  }

  .comment-content {
    flex: 1;
    min-width: 0;
  }

  .comment-header {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
  }

  .comment-author {
    font-size: 1rem;
    font-weight: 600;
    color: #111;
    margin: 0;
  }

  .comment-date {
    font-size: 0.875rem;
    color: #6b7280;
  }

  .comment-text {
    color: #374151;
    line-height: 1.6;
    margin: 0;
    word-wrap: break-word;
  }

  @media (max-width: 768px) {
    .comments-section {
      margin-top: 3rem;
      padding-top: 2rem;
    }

    .comments-title {
      font-size: 1.5rem;
    }

    .comment {
      padding: 1rem;
      gap: 0.75rem;
    }

    .comment-avatar {
      width: 40px;
      height: 40px;
      font-size: 0.875rem;
    }

    .comment-author {
      font-size: 0.95rem;
    }

    .comment-date {
      font-size: 0.8125rem;
    }

    .comment-text {
      font-size: 0.95rem;
    }
  }
</style>
