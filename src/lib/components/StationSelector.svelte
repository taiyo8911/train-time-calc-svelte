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
    .large-select {
        width: 100%;
        padding: var(--spacing-md);
        /* 16px以上に設定して自動拡大を防ぐ */
        font-size: 16px;
        border: var(--border-width) solid var(--color-border);
        border-radius: var(--border-radius);
        background: var(--color-white);
        cursor: pointer;
        transition: border-color var(--transition-fast);
        /* タッチデバイスでの拡大を防ぐ */
        touch-action: manipulation;
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
