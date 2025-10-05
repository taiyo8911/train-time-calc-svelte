<script>
    import { getCurrentTime } from "../utils/timeCalculator.js";

    let { kankouTime = $bindable(), kyuukouTime = $bindable() } = $props();

    function setCurrentTime() {
        const currentTime = getCurrentTime();
        kankouTime = currentTime;
        kyuukouTime = currentTime;
    }

    function addMinutes(minutes) {
        const now = new Date();
        now.setMinutes(now.getMinutes() + minutes);
        return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    }

    function adjustTime(timeStr, minutesToAdd) {
        if (!timeStr) return "";
        const [hours, minutes] = timeStr.split(":").map(Number);
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes + minutesToAdd);
        return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    }
</script>

<div class="card">
    <div class="card-header">
        <span class="step-number">3</span>
        <h2>出発時刻</h2>
    </div>
    <div class="card-content">
        <button class="current-time-btn" on:click={setCurrentTime}>
            両方とも現在時刻に設定
        </button>

        <div class="time-inputs">
            <div class="time-input-group">
                <label>緩行</label>
                <input type="time" bind:value={kankouTime} />
                <div class="quick-buttons">
                    <button
                        class="quick-btn adjust-btn"
                        on:click={() =>
                            (kankouTime = adjustTime(kankouTime, -1))}
                        >-1分</button
                    >
                    <button
                        class="quick-btn now-btn"
                        on:click={() => (kankouTime = addMinutes(0))}
                        >現在</button
                    >
                    <button
                        class="quick-btn adjust-btn"
                        on:click={() =>
                            (kankouTime = adjustTime(kankouTime, 1))}
                        >+1分</button
                    >
                </div>
            </div>

            <div class="time-input-group">
                <label>急行</label>
                <input type="time" bind:value={kyuukouTime} />
                <div class="quick-buttons">
                    <button
                        class="quick-btn adjust-btn"
                        on:click={() =>
                            (kyuukouTime = adjustTime(kyuukouTime, -1))}
                        >-1分</button
                    >
                    <button
                        class="quick-btn now-btn"
                        on:click={() => (kyuukouTime = addMinutes(0))}
                        >現在</button
                    >
                    <button
                        class="quick-btn adjust-btn"
                        on:click={() =>
                            (kyuukouTime = adjustTime(kyuukouTime, 1))}
                        >+1分</button
                    >
                </div>
            </div>
        </div>
    </div>
</div>

<style>
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
        /* タッチデバイスでの拡大を防ぐ */
        touch-action: manipulation;
    }

    .current-time-btn:hover {
        background-color: #1565c0;
    }

    .time-inputs {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
    }

    .time-input-group {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
    }

    .time-input-group label {
        font-weight: bold;
        color: var(--color-text-muted);
        font-size: var(--font-size-sm);
    }

    .time-input-group input[type="time"] {
        width: 100%;
        padding: var(--spacing-sm);
        /* 16px以上に設定して自動拡大を防ぐ */
        font-size: 16px;
        border: var(--border-width) solid var(--color-border);
        border-radius: var(--border-radius);
        transition: border-color var(--transition-fast);
        /* タッチデバイスでの拡大を防ぐ */
        touch-action: manipulation;
    }

    .time-input-group input[type="time"]:focus {
        outline: none;
        border-color: var(--color-border-hover);
        box-shadow: var(--shadow-focus);
    }

    .quick-buttons {
        display: flex;
        gap: var(--spacing-xs);
    }

    .quick-btn {
        flex: 1;
        padding: 8px 10px;
        background-color: #f0f0f0;
        color: var(--color-text-muted);
        border: 1px solid var(--color-border);
        border-radius: var(--border-radius);
        /* 16px以上に設定して自動拡大を防ぐ */
        font-size: 14px;
        cursor: pointer;
        transition: all var(--transition-fast);
        font-weight: 500;
        /* タッチデバイスでの拡大を防ぐ */
        touch-action: manipulation;
    }

    .quick-btn:hover {
        background-color: var(--color-bg-selected);
        border-color: var(--color-primary);
        color: var(--color-primary);
    }

    .quick-btn:active {
        transform: scale(0.95);
    }

    .now-btn {
        background-color: var(--color-secondary);
        color: var(--color-white);
        border-color: var(--color-secondary);
    }

    .now-btn:hover {
        background-color: #1565c0;
        border-color: #1565c0;
        color: var(--color-white);
    }

    @media (max-width: 600px) {
        .quick-btn {
            /* スマホでも14px以上を維持 */
            font-size: 14px;
            padding: 8px 8px;
        }
    }
</style>
