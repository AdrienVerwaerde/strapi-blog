<script lang="ts">
  import type { ArticleContent } from "$lib/types/article";

  export let content: ArticleContent[];

  function getTextStyle(child: ArticleContent["children"][0]): string {
    const styles: string[] = [];

    return styles.join("; ");
  }
</script>

<div class="article-content">
  {#each content as block}
    {#if block.type === "paragraph"}
      <p>
        {#each block.children as child}
          <span style={getTextStyle(child)}>{child.text}</span>
        {/each}
      </p>
    {:else if block.type === "heading"}
      <h3>
        {#each block.children as child}
          <span style={getTextStyle(child)}>{child.text}</span>
        {/each}
      </h3>
    {:else if block.type === "list"}
      <ul>
        {#each block.children as child}
          <li>{child.text}</li>
        {/each}
      </ul>
    {:else if block.type === "quote"}
      <blockquote>
        {#each block.children as child}
          <span style={getTextStyle(child)}>{child.text}</span>
        {/each}
      </blockquote>
    {/if}
  {/each}
</div>

<style>
  .article-content {
    line-height: 1.8;
    color: #333;
    
  }

  .article-content :global(p) {
    margin-bottom: 1.5rem;
  }

  .article-content :global(h3) {
    font-size: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #111;
  }

  .article-content :global(code) {
    background-color: #f4f4f4;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-size: 0.9em;
  }

  .article-content :global(blockquote) {
    border-left: 4px solid #2563eb;
    padding-left: 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: #555;
  }

  .article-content :global(ul) {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }

  .article-content :global(li) {
    margin-bottom: 0.5rem;
  }
</style>
