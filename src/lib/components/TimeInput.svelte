<script>
    import { getCurrentTime } from "../utils/timeCalculator.js";

    let { kankouTime = $bindable(), kyuukouTime = $bindable() } = $props();

    function setCurrentTime() {
        const currentTime = getCurrentTime();
        kankouTime = currentTime;
        kyuukouTime = currentTime;
    }
</script>

<div class="card">
    <div class="card-header">
        <span class="step-number">3</span>
        <h2>出発時刻</h2>
    </div>
    <div class="card-content">
        <button class="current-time-btn" on:click={setCurrentTime}>
            現在時刻に設定
        </button>
        <div class="time-inputs">
            <div class="time-input-group">
                <label>緩行</label>
                <input type="time" bind:value={kankouTime} />
            </div>
            <div class="time-input-group">
                <label>急行</label>
                <input type="time" bind:value={kyuukouTime} />
            </div>
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

    .current-time-btn {
        width: 100%;
        padding: var(--spacing-sm);
        margin-bottom: var(--spacing-lg);
        cursor: pointer;
        background-color: var(--color-secondary);
        color: var(--color-white);
        border: none;
        border-radius: var(--border-radius);
        font-size: var(--font-size-sm);
        transition: background-color var(--transition-fast);
    }

    .current-time-btn:hover {
        background-color: var(--color-primary-darker);
    }

    .time-inputs {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
    }

    .time-input-group {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
    }

    .time-input-group label {
        font-weight: bold;
        min-width: 60px;
        color: var(--color-text-secondary);
    }

    .time-input-group input[type="time"] {
        flex: 1;
        padding: var(--spacing-sm);
        font-size: var(--font-size-base);
        border: var(--border-width) solid var(--color-border);
        border-radius: var(--border-radius);
        transition: border-color var(--transition-fast);
    }

    .time-input-group input[type="time"]:focus {
        outline: none;
        border-color: var(--color-border-hover);
        box-shadow: var(--shadow-focus);
    }
</style>
