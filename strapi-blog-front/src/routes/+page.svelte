<script lang="ts">
  import type { PageData } from "./$types";
  import type { Article } from "$lib/types/article";
  import ArticleCard from "$lib/components/ArticleCard.svelte";

  export let data: PageData;

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
</script>

<div class="container">
  <h1 class="title">StrapiBlog</h1>
  <h2>Liste des articles</h2>

  {#if data.error}
    <div class="error">
      <p>{data.error}</p>
    </div>
  {:else if data.articles.length === 0}
    <p class="no-articles">Aucun article disponible pour le moment.</p>
  {:else}
    <div class="articles-list">
      {#each data.articles as article (article.documentId)}
        <ArticleCard {article} />
      {/each}
    </div>
  {/if}
</div>

<style>
  .articles-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  h2 {
    text-align: center;
    margin: 2rem;
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

  .title {
    text-align: center;
    margin: 2rem;
    font-family: "Rubik Mono One", monospace;
  }
</style>
