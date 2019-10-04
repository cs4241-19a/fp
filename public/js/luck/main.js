const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-area',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
const mean = Math.pow(2, 12);
const max = mean * 2;
const min = 0;
const stddev = mean / 4;
const startReadings = 10;
let readingsLeft = startReadings;
let totalLuck = 0;

// assets from www.flaticon.com
function preload() {
    this.load.image('potOfGold', '/assets/luck/pot-of-gold.svg');
}

function create() {
    const scene = this;
    const playBtn = scene.add.image(250, 300, 'potOfGold').setInteractive();
    const readingsContainer = scene.add.container(5, 5);
    readingsContainer.add(scene.add.text(0, 0, `Readings Left: ${readingsLeft}`, {fontSize: 28}));
    readingsContainer.add(scene.add.text(0, 40, `Luck: ${getAvgLuck()}`, {fontSize: 28}));
    const textContainer = scene.add.container(350, 260);
    playBtn.setScale(0.2, 0.2);
    playBtn.on('pointerdown', function (pointer) {
        this.setTint(0xffff00);
    });
    playBtn.on('pointerout', function (pointer) {
        this.clearTint();
    });
    playBtn.on('pointerup', function (pointer) {
        if (readingsLeft === 0) return;
        this.clearTint();
        const num = getNumber();
        const luck = getLuck(num);
        textContainer.removeAll();
        textContainer.add(scene.add.text(0, 0, `Your number is ${num}!`));
        textContainer.add(scene.add.text(0, 60, `Your luck is at ${luck.toFixed(3)}%`));
        readingsLeft--;
        totalLuck += luck;
        readingsContainer.removeAll();
        readingsContainer.add(scene.add.text(0, 0, `Readings Left: ${readingsLeft}`, {fontSize: 28}));
        readingsContainer.add(scene.add.text(0, 40, `Luck: ${getAvgLuck()}%`, {fontSize: 28}));
        if (readingsLeft === 0) {
            console.log(getAvgLuck());
            alert(getAvgLuck());
            readingsLeft = startReadings;
            totalLuck = 0;
            textContainer.removeAll();
            readingsContainer.removeAll();
            readingsContainer.add(scene.add.text(0, 0, `Readings Left: ${readingsLeft}`, {fontSize: 28}));
            readingsContainer.add(scene.add.text(0, 40, `Luck: ${getAvgLuck()}`, {fontSize: 28}));
        }
    });
}

function update() {

}

function getNumber() {
    return createMemberInNormalDistribution(mean, stddev).toFixed(0);
}


/**
 * Returns member of set with a given mean and standard deviation
 * @author: https://stackoverflow.com/a/196941
 * @param {Number} mean
 * @param {Number} std_dev
 * @returns {Number}
 */
function createMemberInNormalDistribution(mean, std_dev) {
    let diff = (gaussRandom() * std_dev);
    let adj = mean + diff;  // adjusted for range
    if (adj > max) {
        adj = max;
    } else if (adj < min) {
        adj = min;
    }
    return adj;
}

/*
 * Returns random number in normal distribution centering on 0.
 * ~95% of numbers returned should fall between -2 and 2
 * ie within two standard deviations
 */
function gaussRandom() {
    const u = 2 * Math.random() - 1;
    const v = 2 * Math.random() - 1;
    const r = u * u + v * v;
    /*if outside interval [0,1] start over*/
    if (r === 0 || r >= 1) return gaussRandom();
    const c = Math.sqrt(-2 * Math.log(r) / r);
    return u * c;
}

function getLuck(number) {
    return (100 * Math.abs(mean - number) / mean);
}

function getAvgLuck() {
    if (readingsLeft !== startReadings) {
        return totalLuck / (startReadings - readingsLeft);
    }
    else {
        return 0;
    }
}
