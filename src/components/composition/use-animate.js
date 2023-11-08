let states = {
  STOP: 3,
  PAUSE: 2,
  PLAY: 1,
}

export default function useAnimate() {
  let state = states.STOP

  let startTime = 0
  let pausedTime = 0

  let duration = 0
  let timing = null
  let draw = null

  let stop = () => {
    if (state === states.STOP) return
    state = states.STOP
    pausedTime = 0
  }

  let pause = () => {
    if (state === states.PAUSE || state === states.STOP) return
    state = states.PAUSE
    pausedTime = performance.now() - startTime
  }

  let play = () => {
    if (state === states.PLAY) return
    startTime = performance.now() - pausedTime
    state = states.PLAY
    animate()
  }

  let set = (animation) => {
    ({ duration, timing, draw } = animation)
  }

  let destroy = () => {
    stop()
  }

  let animate = () => {
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - startTime) / duration;
      if (timeFraction > 1) timeFraction = 1;

      let progress = timing(timeFraction)

      draw(progress);

      if (state === states.PLAY && timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
  }

  return {
    play,
    stop,
    pause,
    set,
    destroy,
  }
}