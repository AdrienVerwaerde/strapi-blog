<script lang="ts">
  import { enhance } from "$app/forms";

  export let articleDocumentId: string;
  export let form: {
    success?: boolean;
    error?: string;
    authorName?: string;
    content?: string;
  } | null = null;

  let isSubmitting = false;
</script>

<div class="comment-form-container">
  <h3>Laisser un commentaire</h3>

  {#if form?.success}
    <div class="success-message">
      ✓ Votre commentaire a été publié avec succès !
    </div>
  {/if}

  {#if form?.error}
    <div class="error-message">
      ✗ {form.error}
    </div>
  {/if}

  <form
    method="POST"
    action="?/addComment"
    use:enhance={() => {
      isSubmitting = true;
      return async ({ update }) => {
        await update();
        isSubmitting = false;
      };
    }}
  >
    <input type="hidden" name="articleDocumentId" value={articleDocumentId} />

    <div class="form-group">
      <label for="authorName">
        Votre nom <span class="required">*</span>
      </label>
      <input
        type="text"
        id="authorName"
        name="authorName"
        placeholder="Jean Dupont"
        required
        disabled={isSubmitting}
        value={form?.authorName || ""}
      />
    </div>

    <div class="form-group">
      <label for="content">
        Commentaire <span class="required">*</span>
      </label>
      <textarea
        id="content"
        name="content"
        placeholder="Partagez votre avis..."
        rows="5"
        required
        disabled={isSubmitting}
        value={form?.content || ""}
      ></textarea>
    </div>

    <button type="submit" class="submit-button" disabled={isSubmitting}>
      {#if isSubmitting}
        <span class="spinner"></span>
        Publication...
      {:else}
        Publier le commentaire
      {/if}
    </button>
  </form>
</div>

<style>
  .comment-form-container {
    margin-top: 3rem;
    padding: 2rem;
    background: #f9fafb;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }

  h3 {
    margin: 0 0 1.5rem 0;
    font-size: 1.5rem;
    color: #111;
  }

  .success-message {
    padding: 1rem;
    background: #dcfce7;
    color: #166534;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    border: 1px solid #bbf7d0;
  }

  .error-message {
    padding: 1rem;
    background: #fee2e2;
    color: #991b1b;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    border: 1px solid #fecaca;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #374151;
    font-size: 0.95rem;
  }

  .required {
    color: #dc2626;
  }

  input[type="text"],
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    transition: all 0.2s;
    background: white;
  }

  input[type="text"]:focus,
  textarea:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  input[type="text"]:disabled,
  textarea:disabled {
    background: #f3f4f6;
    cursor: not-allowed;
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }

  .submit-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgb(102, 102, 255);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .submit-button:hover:not(:disabled) {
    background: #1d4ed8;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }

  .submit-button:active:not(:disabled) {
    transform: translateY(0);
  }

  .submit-button:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    .comment-form-container {
      padding: 1.5rem;
      margin-top: 2rem;
    }

    h3 {
      font-size: 1.25rem;
    }
  }
</style>
