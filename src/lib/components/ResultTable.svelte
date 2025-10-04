<script>
    let {
        displayStations,
        departureStation,
        kankouArrivalTimes,
        kyuukouArrivalTimes,
    } = $props();

    function timeToMinutes(timeStr) {
        if (!timeStr) return null;
        const [hours, minutes] = timeStr.split(":").map(Number);
        return hours * 60 + minutes;
    }

    function compareArrivalTimes(station) {
        const kankouMin = timeToMinutes(kankouArrivalTimes[station]);
        const kyuukouMin = timeToMinutes(kyuukouArrivalTimes[station]);

        if (kankouMin === null) return { faster: "kyuukou", difference: 0 };
        if (kyuukouMin === null) return { faster: "kankou", difference: 0 };

        const diff = Math.abs(kankouMin - kyuukouMin);

        if (kankouMin === kyuukouMin) return { faster: "same", difference: 0 };
        return {
            faster: kankouMin < kyuukouMin ? "kankou" : "kyuukou",
            difference: diff,
        };
    }
</script>

<div class="result-section">
    <h2>到着時刻</h2>
    <table class="result-table">
        <thead>
            <tr>
                <th>駅</th>
                <th>緩行</th>
                <th>急行</th>
                <th>時間差</th>
            </tr>
        </thead>
        <tbody>
            {#each displayStations as station}
                {#if station !== departureStation}
                    {@const comparison = compareArrivalTimes(station)}
                    <tr>
                        <th>{station}</th>
                        <td
                            class:fastest={comparison.faster === "kankou"}
                            class:slower={comparison.faster === "kyuukou"}
                            class:same={comparison.faster === "same"}
                        >
                            {#if kankouArrivalTimes[station]}
                                <span class="time"
                                    >{kankouArrivalTimes[station]}</span
                                >
                                {#if comparison.faster === "kankou"}
                                    <span class="badge fastest-badge">最速</span
                                    >
                                {/if}
                            {/if}
                        </td>
                        <td
                            class:fastest={comparison.faster === "kyuukou"}
                            class:slower={comparison.faster === "kankou"}
                            class:same={comparison.faster === "same"}
                        >
                            {#if kyuukouArrivalTimes[station]}
                                <span class="time"
                                    >{kyuukouArrivalTimes[station]}</span
                                >
                                {#if comparison.faster === "kyuukou"}
                                    <span class="badge fastest-badge">最速</span
                                    >
                                {/if}
                            {/if}
                        </td>
                        <td class="diff-cell">
                            {#if comparison.difference > 0}
                                <span class="time-diff"
                                    >{comparison.difference}分</span
                                >
                            {:else if comparison.faster === "same"}
                                <span class="time-same">同時</span>
                            {/if}
                        </td>
                    </tr>
                {/if}
            {/each}
        </tbody>
    </table>
</div>

<style>
    .result-section {
        margin-top: 30px;
    }

    .result-section h2 {
        font-size: var(--font-size-xl);
        margin-bottom: var(--spacing-lg);
        color: var(--color-text);
    }

    table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
    }

    th:nth-child(1),
    td:nth-child(1) {
        width: 25%;
    }
    th:nth-child(2),
    td:nth-child(2),
    th:nth-child(3),
    td:nth-child(3) {
        width: 30%;
    }
    th:nth-child(4),
    td:nth-child(4) {
        width: 15%;
    }

    th,
    td {
        border: 1px solid var(--color-border);
        padding: var(--spacing-md);
        text-align: left;
    }

    thead th {
        background-color: var(--color-primary);
        color: var(--color-white);
        font-weight: bold;
    }

    tbody th {
        background-color: var(--color-bg);
        font-weight: bold;
    }

    tbody tr:hover {
        background-color: #f9f9f9;
    }

    td.fastest {
        background-color: #e8f5e9;
        font-weight: bold;
        color: #2e7d32;
    }

    td.slower {
        background-color: #fafafa;
        color: #999;
    }

    td.same {
        background-color: #fff9e6;
    }

    .time {
        display: inline-block;
    }

    .badge {
        display: inline-block;
        margin-left: var(--spacing-xs);
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: bold;
    }

    .fastest-badge {
        background-color: #4caf50;
        color: white;
    }

    .diff-cell {
        text-align: center;
        font-weight: bold;
    }

    .time-diff {
        color: var(--color-primary);
        font-size: var(--font-size-sm);
    }

    .time-same {
        color: #ff9800;
        font-size: var(--font-size-sm);
    }

    @media (max-width: 600px) {
        th:nth-child(4),
        td:nth-child(4) {
            display: none;
        }
        th:nth-child(1),
        td:nth-child(1) {
            width: 30%;
        }
        th:nth-child(2),
        td:nth-child(2),
        th:nth-child(3),
        td:nth-child(3) {
            width: 35%;
        }

        .badge {
            display: block;
            margin-left: 0;
            margin-top: 4px;
            width: fit-content;
        }
    }
</style>
