const ASSET_NAMES = [
  'green_tank.png',
  'red_tank.png',
  'purple_tank.png',
  'blue_tank.png',
  'bullet.svg',
  'basic_obstacle.png',
];

const assets = {};

const downloadPromise = Promise.all(ASSET_NAMES.map(downloadAsset));

function downloadAsset(assetName) {
  return new Promise(resolve => {
    const asset = new Image();
    asset.onload = () => {
      assets[assetName] = asset;
      resolve();
    };
    asset.src = `/assets/${assetName}`;
  });
}

export const downloadAssets = () => downloadPromise;

export const getAsset = assetName => assets[assetName];
