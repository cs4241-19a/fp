const getCanvas = function () {
  document.getElementById('canvas').innerHTML = ''
  const canvas = document.createElement('canvas')
  document.getElementById('canvas').appendChild(canvas)
  canvas.width = 1500
  canvas.height = 750

  return canvas
}

const audioInit = function (canvas) {
  const ctx = canvas.getContext('2d')
  // audio init
  const audioCtx = new AudioContext()
  const audioElement = document.createElement('audio')
  document.getElementById('canvas').appendChild(audioElement)

  return { ctx: ctx, audioCtx: audioCtx, audioElement: audioElement }
}

const audioGraph = function (canvas, json) {
  const analyser = json.audioCtx.createAnalyser()
  analyser.fftSize = 2048
  const player = json.audioCtx.createMediaElementSource(json.audioElement)
  player.connect(json.audioCtx.destination)
  player.connect(analyser)

  return { analyser: analyser, player: player }
}

export { getCanvas, audioInit, audioGraph }
