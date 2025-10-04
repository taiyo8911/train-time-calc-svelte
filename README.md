# 🚆 到着時刻予想システム

総武線の緩行と急行の到着時刻を比較するWebアプリケーションです。

![Svelte](https://img.shields.io/badge/Svelte-5.39-FF3E00?style=flat-square&logo=svelte&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=flat-square&logo=vite&logoColor=white)

## 📋 概要

緩急分離運転線区において、急行と緩行のどちらが早く目的地に到着するかを簡単に比較できるシステムです。出発駅と出発時刻を入力するだけで、各駅への到着時刻と時間差が一目で分かります。

## ✨ 主な機能

- 🏢 **出発駅の選択**: 錦糸町、新小岩、市川、船橋、津田沼、稲毛、千葉から選択
- 🧭 **方面の選択**: 千葉方面・錦糸町方面の自動判定
- ⏰ **出発時刻の入力**: 緩行・急行それぞれの時刻を設定
  - 現在時刻の自動設定機能
  - ±1分の微調整ボタン
- 📊 **到着時刻の比較**: 
  - 各駅への到着時刻を一覧表示
  - 最速列車をハイライト表示
  - 時間差を分単位で表示

## 🛠 技術スタック

- **フレームワーク**: [Svelte 5](https://svelte.dev/)
- **ビルドツール**: [Vite 7](https://vitejs.dev/)
- **言語**: JavaScript
- **スタイル**: CSS（カスタムプロパティ使用）

## 🚀 セットアップ

### 前提条件

- Node.js 20.19以上または22.12以上

### インストール
```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# 本番ビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

## 📁 プロジェクト構造
```
src/
├── App.svelte                      # メインコンポーネント
├── main.js                         # エントリーポイント
├── lib/
│   ├── components/
│   │   ├── StationSelector.svelte    # 出発駅選択
│   │   ├── DirectionSelector.svelte  # 方面選択
│   │   ├── TimeInput.svelte          # 時刻入力
│   │   └── ResultTable.svelte        # 結果表示テーブル
│   ├── data/
│   │   └── travelData.js             # 駅データ・所要時間データ
│   └── utils/
│       └── timeCalculator.js         # 時刻計算ロジック
└── styles/
    ├── global.css                    # グローバルスタイル
    └── variables.css                 # CSS変数定義
```


## データのカスタマイズ
```javascript
// 駅リスト
export const stations = ['錦糸町', '新小岩', '市川', '船橋', '津田沼', '稲毛', '千葉'];

// 所要時間データ（分単位）
export const travelTimes = {
    千葉方面: {
        緩行: { ... },
        急行: { ... }
    },
    錦糸町方面: {
        緩行: { ... },
        急行: { ... }
    }
};
```

## 💻 開発について

### Svelte 5の新機能を使用

このプロジェクトはSvelte 5の新しいリアクティビティシステムを採用しています：

- `$state`: リアクティブな状態管理
- `$derived`: 派生状態の計算
- `$effect`: 副作用の実行
- `$bindable`: 双方向バインディング用のプロパティ

### コーディング規約

- コンポーネントは機能ごとに分割
- スタイルはコンポーネントスコープとグローバルを使い分け
- CSS変数で統一されたデザインシステムを維持

## 📄 ライセンス

このプロジェクトはプライベート使用を想定しています。

## 🔧 推奨IDE

[VS Code](https://code.visualstudio.com/) + [Svelte拡張機能](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
