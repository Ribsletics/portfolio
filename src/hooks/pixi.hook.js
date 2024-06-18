import { Application } from "pixi.js"
import { useCallback, useEffect, useRef } from "react"

export const usePixiApp = ({ onReady, canvasRef, containerRef, width, height }) => {
  const app = useRef()
  const ticker = useRef()

  const init = useCallback((canvas, container) => {
    // Create a new application
    const pixiApp = new Application()

    const initPixi = async () => {
      // Initialize the application
      await pixiApp.init({ autoStart: false, width, height, canvas })
      app.current = pixiApp
      onReady(app)
    }
    initPixi()
  }, [onReady, width, height])

  const updateTicker = useCallback((nextTicker) => {
    if (!app?.current || !nextTicker) return
    if (ticker.current) app.current.ticker.remove(ticker.current);

    app.current.ticker.add(nextTicker);
    ticker.current = nextTicker;
  }, [app, ticker]);

  useEffect(() => {
    if (app?.current?.renderer.context?.extensions) {
      app.current.renderer.context.extensions.loseContext = null;
    }
    if (canvasRef?.current && containerRef?.current) {
      init(canvasRef.current, containerRef.current)
      return () => {
        console.log('unmount!')
        if (app?.current) {
          app.current.destroy()
          app.current = null
        }
      }
    }
  }, [init, canvasRef, containerRef])

  return { app: app.current, updateTicker }
}
