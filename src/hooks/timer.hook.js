import { useCallback, useEffect, useRef, useState } from 'react'

export const useInterval = (callback, delay = 250) => {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) savedCallback.current()
    }

    let id = -1
    if (delay > 0) id = window.setInterval(tick, delay)
    return () => window.clearInterval(id)
  }, [delay])
}

export const useTimeout = (callback, delay = 250) => {
  const savedCallback = useRef()
  const isRunning = useRef(false)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  const run = useCallback(() => {
    const tick = () => {
      isRunning.current = false
      if (savedCallback.current) savedCallback.current()
    }

    let id = -1
    if (delay > 0) {
      id = window.setTimeout(tick, delay)
      isRunning.current = true
    }
    return () => window.clearTimeout(id)
  }, [delay])

  return [run, isRunning]
}

export const useDebounce = (val, delay = 250) => {
  const [value, setValue] = useState(val)
  const [pendingVal, setPendingVal] = useState(val)
  const clear = useRef()

  const update = useCallback((val) => {
    setValue(val)
  }, [])

  const debounceComplete = useCallback(() => {
    update(pendingVal)
  }, [pendingVal, update])
  const [debounceTimer] = useTimeout(debounceComplete, delay)

  const debounce = useCallback((v) => {
    if (clear.current) clear.current()
    setPendingVal(v)
    return clear.current = debounceTimer()
  }, [debounceTimer])

  return [value, debounce, update]
}

export const useRebound = (val, delay) => {
  const original = useRef(val)
  const value = useRef(val)
  const clear = useRef()

  const setValue = useCallback((v) => {
    value.current = v
  }, [])

  const reset = useCallback(() => {
    value.current = original.current
  }, [])

  const [resetTimer] = useTimeout(reset, delay)

  const rebound = useCallback((v) => {
    if (clear.current) clear.current()
    value.current = v
    return clear.current = resetTimer()
  }, [resetTimer])

  return [value, rebound, setValue]
}

export const useThrottle = (val, delay = 250) => {
  const [value, setValue] = useState(val)
  const pendingVal = useRef(val)

  const update = useCallback((v) => {
    setValue(v)
  }, [])

  const throttleComplete = useCallback(() => {
    update(pendingVal.current)
  }, [update])

  const [throttleTimer, isRunning] = useTimeout(throttleComplete, delay)

  const throttle = useCallback((v) => {
    if (!isRunning.current) {
      setValue(v)
      pendingVal.current = v
      throttleTimer()
    }
    else pendingVal.current = v
  }, [throttleTimer, isRunning])

  return [value, throttle, update]
}
