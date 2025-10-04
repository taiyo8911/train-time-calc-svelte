<script>
    import { stations } from "../data/travelData.js";

    let { value = $bindable() } = $props();
</script>

<div class="card">
    <div class="card-header">
        <span class="step-number">1</span>
        <h2>出発駅</h2>
    </div>
    <div class="card-content">
        <select class="large-select" bind:value>
            {#each stations as station}
                <option value={station}>{station}</option>
            {/each}
        </select>
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

    .large-select {
        width: 100%;
        padding: var(--spacing-md);
        font-size: var(--font-size-base);
        border: var(--border-width) solid var(--color-border);
        border-radius: var(--border-radius);
        background: var(--color-white);
        cursor: pointer;
        transition: border-color var(--transition-fast);
    }

    .large-select:hover {
        border-color: var(--color-border-hover);
    }

    .large-select:focus {
        outline: none;
        border-color: var(--color-border-hover);
        box-shadow: var(--shadow-focus);
    }
</style>
