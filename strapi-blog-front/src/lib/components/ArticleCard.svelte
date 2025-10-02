<script lang="ts">
  import type { Article } from "$lib/types/article";
  import { getImageUrl } from "$lib/services/api";
  import { goto } from "$app/navigation";

  export let article: Article;

  function extractText(content: Article["content"]): string {
    return content
      .map((block) => block.children.map((child) => child.text).join(" "))
      .join(" ");
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Get l'image de couverture
  function getCoverImageUrl(): string {
    if (!article.coverImage) return "";

    // Essayer d'abord le format medium, puis small, puis l'original
    const imageUrl =
      article.coverImage.formats?.medium?.url ||
      article.coverImage.formats?.small?.url ||
      article.coverImage.url;

    return getImageUrl(imageUrl);
  }

  const coverImageUrl = getCoverImageUrl();
  function handleCardClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName === "A" || target.closest("a")) {
      return;
    }

    goto(`/articles/${article.documentId}`);
  }
</script>

<article
  class="article-card"
  on:click={handleCardClick}
>
  {#if coverImageUrl}
    <div class="article-image">
      <img
        src={coverImageUrl}
        alt={article.coverImage?.alternativeText || article.title}
        loading="lazy"
      />
    </div>
  {/if}

  <div class="article-content">
    <h2>
      {article.title}
    </h2>

    <div class="article-meta">
      <span class="author">Par <b>{article.authorName}</b></span>
      <span class="date">{formatDate(article.publishedAt)}</span>
    </div>

    <div class="article-excerpt">
      {extractText(article.content).substring(0, 200)}...
    </div>
  </div>
</article>

<style>
  .article-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 540px;
    overflow: hidden;
    font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    transition:
      transform 0.2s,
      box-shadow 0.2s;
  }

  .article-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }

  .article-image {
    width: 100%;
    height: 340px;
    overflow: hidden;
    background-color: #f5f5f5;
  }

  .article-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  .article-card:hover .article-image img {
    transform: scale(1.05);
  }

  .article-content {
    padding: 1.5rem;
    text-decoration: none;
  }

  h2 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
    line-height: 1.3;
  }

  .article-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 1rem;
  }

  .article-excerpt {
    color: #444;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    .article-image {
      height: 200px;
    }

    .article-content {
      padding: 1rem;
    }

    h2 {
      font-size: 1.25rem;
    }
  }
</style>
