<script>
  import StationSelector from "./lib/components/StationSelector.svelte";
  import DirectionSelector from "./lib/components/DirectionSelector.svelte";
  import TimeInput from "./lib/components/TimeInput.svelte";
  import ResultTable from "./lib/components/ResultTable.svelte";
  import {
    getAvailableDirections,
    getDisplayStations,
    calculateArrivalTimes,
  } from "./lib/utils/timeCalculator.js";

  let departureStation = $state("錦糸町");
  let direction = $state("千葉方面");
  let kankouTime = $state("");
  let kyuukouTime = $state("");

  // 選択可能な方向を計算（リアクティブ）
  let availableDirections = $derived(getAvailableDirections(departureStation));

  // 方向が選択不可になった場合、自動的に選択可能な方向に変更
  $effect(() => {
    if (
      !availableDirections.includes(direction) &&
      availableDirections.length > 0
    ) {
      direction = availableDirections[0];
    }
  });

  // 表示する駅リストを計算（リアクティブ）
  let displayStations = $derived(
    getDisplayStations(departureStation, direction),
  );

  // 到着時刻を計算（リアクティブ）
  let kankouArrivalTimes = $derived(
    calculateArrivalTimes(
      "緩行",
      kankouTime,
      displayStations,
      departureStation,
      direction,
    ),
  );
  let kyuukouArrivalTimes = $derived(
    calculateArrivalTimes(
      "急行",
      kyuukouTime,
      displayStations,
      departureStation,
      direction,
    ),
  );

  // 時刻が入力されているかチェック
  let hasTimeInput = $derived(kankouTime !== "" || kyuukouTime !== "");
</script>

<main>
  <h1>緩急分離運転到着予想システム</h1>

  <p class="description">
    緩急分離運転線区において、急行と緩行どちらが早く到着するかを比較するシステムです。
  </p>

  <!-- 入力エリア -->
  <section class="input-section">
    <h2 class="section-title">
      <span class="icon">⚙️</span>
      条件設定
    </h2>
    <div class="card-container">
      <StationSelector bind:value={departureStation} />
      <DirectionSelector bind:value={direction} {availableDirections} />
      <TimeInput bind:kankouTime bind:kyuukouTime />
    </div>
  </section>

  <!-- 結果エリア -->
  <section class="result-section">
    <h2 class="section-title">
      <span class="icon">📊</span>
      計算結果
    </h2>
    {#if hasTimeInput}
      <ResultTable
        {displayStations}
        {departureStation}
        {kankouArrivalTimes}
        {kyuukouArrivalTimes}
      />
    {:else}
      <div class="empty-state">
        <div class="empty-state-icon">🕐</div>
        <p class="empty-state-title">時刻を入力してください</p>
        <p class="empty-state-description">
          緩行または急行の出発時刻を入力すると、各駅への到着時刻が表示されます
        </p>
      </div>
    {/if}
  </section>
</main>

<style>
  main {
    background-color: var(--color-white);
    padding: var(--spacing-xxl);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-sm);
  }

  h1 {
    color: var(--color-text);
    margin-bottom: var(--spacing-sm);
  }

  .description {
    color: var(--color-text-tertiary);
    margin-bottom: var(--spacing-xxl);
  }

  /* セクション */
  .input-section,
  .result-section {
    margin-bottom: var(--spacing-xxxl);
  }

  .result-section {
    border-top: 3px solid var(--color-border);
    padding-top: var(--spacing-xxxl);
    margin-top: var(--spacing-xxxl);
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: var(--font-size-xl);
    color: var(--color-text);
    margin-bottom: var(--spacing-xl);
    font-weight: 600;
  }

  .section-title .icon {
    font-size: 1.2em;
  }

  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-xl);
  }

  /* 空状態 */
  .empty-state {
    background: var(--color-bg-secondary);
    border: 2px dashed var(--color-border);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-xxxl);
    text-align: center;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .empty-state-icon {
    font-size: 4em;
    margin-bottom: var(--spacing-lg);
    opacity: 0.5;
  }

  .empty-state-title {
    font-size: var(--font-size-xl);
    color: var(--color-text-secondary);
    font-weight: 600;
    margin-bottom: var(--spacing-sm);
  }

  .empty-state-description {
    color: var(--color-text-tertiary);
    max-width: 400px;
    line-height: 1.6;
  }
</style>
