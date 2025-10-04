<script>
    import { getCurrentTime } from "../utils/timeCalculator.js";

    let { kankouTime = $bindable(), kyuukouTime = $bindable() } = $props();

    function setCurrentTime() {
        const currentTime = getCurrentTime();
        kankouTime = currentTime;
        kyuukouTime = currentTime;
    }

    // 指定した分数を足した時刻を返す
    function addMinutes(minutes) {
        const now = new Date();
        now.setMinutes(now.getMinutes() + minutes);
        const hours = String(now.getHours()).padStart(2, "0");
        const mins = String(now.getMinutes()).padStart(2, "0");
        return `${hours}:${mins}`;
    }

    // 緩行の時刻を設定
    function setKankouTime(offset) {
        kankouTime = addMinutes(offset);
    }

    // 急行の時刻を設定
    function setKyuukouTime(offset) {
        kyuukouTime = addMinutes(offset);
    }

    // 時刻文字列に分を加算/減算
    function adjustTime(timeStr, minutesToAdd) {
        if (!timeStr) return "";
        const [hours, minutes] = timeStr.split(":").map(Number);
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes + minutesToAdd);
        const newHours = String(date.getHours()).padStart(2, "0");
        const newMinutes = String(date.getMinutes()).padStart(2, "0");
        return `${newHours}:${newMinutes}`;
    }

    // 緩行の時刻を調整
    function adjustKankouTime(minutes) {
        kankouTime = adjustTime(kankouTime, minutes);
    }

    // 急行の時刻を調整
    function adjustKyuukouTime(minutes) {
        kyuukouTime = adjustTime(kyuukouTime, minutes);
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
                <div class="input-with-quick">
                    <input type="time" bind:value={kankouTime} />
                    <div class="quick-buttons">
                        <button
                            class="quick-btn adjust-btn"
                            on:click={() => adjustKankouTime(-1)}
                            title="1分早く"
                        >
                            -1分
                        </button>
                        <button
                            class="quick-btn now-btn"
                            on:click={() => setKankouTime(0)}
                            title="現在時刻"
                        >
                            現在
                        </button>
                        <button
                            class="quick-btn adjust-btn"
                            on:click={() => adjustKankouTime(1)}
                            title="1分遅く"
                        >
                            +1分
                        </button>
                    </div>
                </div>
            </div>

            <div class="time-input-group">
                <label>急行</label>
                <div class="input-with-quick">
                    <input type="time" bind:value={kyuukouTime} />
                    <div class="quick-buttons">
                        <button
                            class="quick-btn adjust-btn"
                            on:click={() => adjustKyuukouTime(-1)}
                            title="1分早く"
                        >
                            -1分
                        </button>
                        <button
                            class="quick-btn now-btn"
                            on:click={() => setKyuukouTime(0)}
                            title="現在時刻"
                        >
                            現在
                        </button>
                        <button
                            class="quick-btn adjust-btn"
                            on:click={() => adjustKyuukouTime(1)}
                            title="1分遅く"
                        >
                            +1分
                        </button>
                    </div>
                </div>
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
        gap: var(--spacing-lg);
    }

    .time-input-group {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
    }

    .time-input-group label {
        font-weight: bold;
        color: var(--color-text-secondary);
        font-size: var(--font-size-sm);
    }

    .input-with-quick {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
    }

    .time-input-group input[type="time"] {
        width: 100%;
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

    .quick-buttons {
        display: flex;
        gap: var(--spacing-xs);
    }

    .quick-btn {
        flex: 1;
        padding: 6px 8px;
        background-color: #f0f0f0;
        color: var(--color-text-secondary);
        border: 1px solid var(--color-border);
        border-radius: var(--border-radius);
        font-size: 12px;
        cursor: pointer;
        transition: all var(--transition-fast);
        font-weight: 500;
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
        background-color: var(--color-primary-darker);
        border-color: var(--color-primary-darker);
        color: var(--color-white);
    }

    .adjust-btn:hover {
        background-color: #e3f2fd;
    }

    /* レスポンシブ対応 */
    @media (max-width: 600px) {
        .quick-btn {
            font-size: 11px;
            padding: 5px 6px;
        }
    }
</style>
