<script>
    let { value = $bindable(), availableDirections } = $props();
</script>

<div class="card">
    <div class="card-header">
        <span class="step-number">2</span>
        <h2>行き先方面</h2>
    </div>
    <div class="card-content">
        <div class="direction-buttons">
            {#each availableDirections as dir}
                <label class="direction-button" class:selected={value === dir}>
                    <input type="radio" bind:group={value} value={dir} />
                    <span>{dir}</span>
                </label>
            {/each}
        </div>
    </div>
</div>

<style>
    .card {
        background: var(--color-bg-secondary);
        border: var(--border-width) solid var(--color-border);
        border-radius: var(--border-radius-lg);
        overflow: hidden;
        transition: all var(--transition-fast);
    }

    .card:hover {
        border-color: var(--color-border-hover);
        box-shadow: var(--shadow-md);
    }

    .card-header {
        background: linear-gradient(
            135deg,
            var(--color-primary) 0%,
            var(--color-primary-dark) 100%
        );
        color: var(--color-white);
        padding: var(--spacing-lg);
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
    }

    .step-number {
        background: rgba(255, 255, 255, 0.3);
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: var(--font-size-lg);
    }

    h2 {
        color: inherit;
        font-size: var(--font-size-lg);
        margin: 0;
    }

    .card-content {
        padding: var(--spacing-xl);
    }

    .direction-buttons {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
    }

    .direction-button {
        display: flex;
        align-items: center;
        padding: var(--spacing-md);
        border: var(--border-width) solid var(--color-border);
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: all var(--transition-fast);
        background: var(--color-white);
    }

    .direction-button:hover {
        border-color: var(--color-border-hover);
        background: var(--color-bg-hover);
    }

    .direction-button.selected {
        border-color: var(--color-border-hover);
        background: var(--color-bg-selected);
        font-weight: bold;
    }

    .direction-button input[type="radio"] {
        margin-right: var(--spacing-xs);
        cursor: pointer;
    }

    .direction-button span {
        font-size: var(--font-size-base);
    }
</style>
