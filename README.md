# Aev Battle

スマートフォン・PCのブラウザで遊べる、Three.js製の3Dバトルロイヤル試作版です。

## プレイ方法
- **戦闘開始** を押して開始
- PC：WASD / 矢印キーで移動、マウスで視点、クリックで射撃、Shiftでダッシュ
- スマートフォン：左のスティックで移動、画面右側をドラッグして視点変更、FIREで射撃、RUNでダッシュ
- 敵AIを倒し、縮小する安全エリア内で生き残りましょう

## GitHub Pagesで公開
1. GitHubのリポジトリ **Settings** を開く
2. **Pages** を開く
3. **Build and deployment** の **Source** で **Deploy from a branch** を選択
4. Branch を **main**、フォルダを **/(root)** にして **Save**
5. 数分待ち、Pages欄に表示されたURLを開く

## 技術
- HTML / CSS / JavaScript modules
- Three.js 0.160.0（jsDelivr CDNから読み込み）
- ビルド手順不要。index.htmlをルートに置いて公開します。

## 現在の制限
これはローカルの練習用プロトタイプです。オンライン対戦、アカウント、サーバー同期、武器インベントリ、建築システムは未実装です。モバイル端末の性能やブラウザによって動作が異なる場合があります。
