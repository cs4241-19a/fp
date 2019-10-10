import { getCanvas, audioInit, audioGraph } from './setUpModule.js'
import { visualizer } from './visualizerModule'
import * as dat from 'dat.gui'

const gui = new dat.GUI()

let currColor = 0

const blue = function () {
  currColor = 0
}

const green = function () {
  currColor = 1
}

const changeParam = new function () {
  this.barHeight = 1
  this.barWidth = 4
  this.barFit = 2
  this.canvasClr = '#000000'
}()

const startMello = function () {
  console.log("yoooooooo")
  const canvas = getCanvas()

  const jsonAudioInit = audioInit(canvas)
  const jsonAudioGraph = audioGraph(canvas, jsonAudioInit)

  jsonAudioInit.audioElement.src = '../../media/music/mello.mp3'
  jsonAudioInit.audioElement.play()

  const results = new Uint8Array(jsonAudioGraph.analyser.frequencyBinCount)

  const draw = function () {
    window.requestAnimationFrame(draw)
    visualizer(canvas, jsonAudioInit, jsonAudioGraph, results, currColor, changeParam.barHeight, changeParam.barWidth, changeParam.barFit, changeParam.canvasClr)
  }
  draw()
}

window.onload = function () {
  document.getElementById('mello').onclick = startMello
  document.getElementById('blue').onclick = blue
  document.getElementById('green').onclick = green

  gui.add(changeParam, 'barHeight', 0, 3).name('Bar Height')
  gui.add(changeParam, 'barWidth', 0, 6).name('Bar Width')
  gui.add(changeParam, 'barFit', 0.5, 5).name('Visualizer Fit')
  gui.addColor(changeParam, 'canvasClr').name('Canvas Color')
}
