<script lang="ts">
  import type { PageData } from "./$types";
  import ArticleContent from "$lib/components/ArticleContent.svelte";
  import { getImageUrl } from "$lib/services/api";
  import Comments from "$lib/components/Comments.svelte";
  import CommentsForm from "$lib/components/CommentsForm.svelte";

  export let data: PageData;

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function getCoverImageUrl(): string {
    if (!data.article.coverImage) return "";

    const imageUrl =
      data.article.coverImage.formats?.large?.url ||
      data.article.coverImage.url;

    return getImageUrl(imageUrl);
  }

  const coverImageUrl = getCoverImageUrl();
</script>

<svelte:head>
  <title>{data.article.title} - Blog</title>
  <meta name="description" content={data.article.title} />
</svelte:head>

<article class="article-detail">
  <div class="back-link-container">
    <a href="/" class="back-link">← Retour aux articles</a>
  </div>

  {#if coverImageUrl}
    <div class="article-cover">
      <img
        src={coverImageUrl}
        alt={data.article.coverImage?.alternativeText || data.article.title}
      />
    </div>
  {/if}

  <div class="article-header">
    <h1>{data.article.title}</h1>

    <div class="article-meta">
      <div class="meta-item">
        <span class="label">Auteur:</span>
        <span class="value">{data.article.authorName}</span>
      </div>
      <div class="meta-item">
        <span class="label">Publié le:</span>
        <span class="value">{formatDate(data.article.publishedAt)}</span>
      </div>
    </div>
  </div>

  <div class="article-body">
    <ArticleContent content={data.article.content} />
  </div>

  <Comments comments={data.article.comments || []} />
  <CommentsForm articleDocumentId={data.article.documentId} />

  <div class="article-footer">
    <a href="/" class="back-link">← Retour aux articles</a>
  </div>
</article>

<style>
  .article-detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family:
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      "Open Sans",
      "Helvetica Neue",
      sans-serif;
  }

  .back-link-container {
    margin-bottom: 2rem;
  }

  .article-cover {
    width: 100%;
    max-height: 100%;
    overflow: hidden;
    border-radius: 12px;
    margin-bottom: 2rem;
  }

  .article-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .article-header {
    margin-bottom: 3rem;
  }

  .back-link {
    display: inline-block;
    color: #ffffff;
    font-weight: bold;
    background-color: #333;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    text-decoration: none;
    font-size: 0.95rem;
    transition: all 0.1s ease-in-out;
  }

  .back-link:hover {
    background: rgb(34, 34, 53);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(34, 34, 53, 0.3);
  }

  h1 {
    font-size: 3rem;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    color: #111;
  }

  .value {
    font-weight: bold;
  }

  .article-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding: 1rem 0;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
  }

  .meta-item {
    display: flex;
    gap: 0.5rem;
    font-size: 0.95rem;
  }

  .meta-item .label {
    color: #666;
    font-weight: 500;
  }

  .meta-item .value {
    color: #333;
  }

  .article-body {
    margin: 3rem 0;
    font-size: 1.125rem;
  }

  .article-footer {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid #e0e0e0;
  }

  @media (max-width: 768px) {
    .article-detail {
      padding: 1rem;
    }

    .article-cover {
      max-height: 300px;
      border-radius: 8px;
    }

    h1 {
      font-size: 2rem;
    }

    .article-meta {
      flex-direction: column;
      gap: 0.75rem;
    }

    .article-body {
      font-size: 1rem;
    }
  }
</style>
