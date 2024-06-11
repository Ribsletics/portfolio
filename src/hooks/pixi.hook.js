import { Application } from "pixi.js"
import { useCallback, useEffect, useRef } from "react"

export const usePixiApp = ({ onReady, canvasRef, containerRef }) => {
  const app = useRef()
  const ticker = useRef()

  const init = useCallback((canvas, container) => {
    // Create a new application
    const pixiApp = new Application()

    const initPixi = async () => {
      // Initialize the application
      await pixiApp.init({ resizeTo: container, canvas })
      app.current = pixiApp
      onReady(app)
    }
    initPixi()
  }, [onReady])

  const updateTicker = useCallback((nextTicker) => {
    if (!app?.current || !nextTicker) return
    if (ticker) app.current.ticker.remove(ticker)

    app.current.ticker.add(nextTicker)
    ticker.current = nextTicker
  }, [app, ticker])

  useEffect(() => {
    if (!canvasRef?.current || !containerRef?.current) return
    init(canvasRef.current, containerRef.current)
  }, [init, canvasRef, containerRef])

  return { app: app.current, updateTicker }
}
