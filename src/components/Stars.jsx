import { Box } from '@mui/material'
import React, { useCallback, useEffect, useReducer, useRef } from 'react'
import PropTypes from 'prop-types'
import { usePixiApp } from '../hooks/pixi.hook'
import { Assets, Sprite } from 'pixi.js'
import { useRebound/* , useInterval */ } from '../hooks/timer.hook'
import { useSelector } from 'react-redux'
import { selectNav } from '../redux/selectors/nav.selector';

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PixiPlugin } from "gsap/PixiPlugin";
import * as PIXI from "pixi.js";

const initialStarState = {
  fov: 20,
  baseSpeed: 0.025,
  speed: 0,
  starStretch: 50,
  starBaseSize: 0.05,
}

function starReducer(state, action) {
  return { ...state, ...action.payload }
}

const getRandomColor = () => {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return parseInt(color.substring(1), 16)
}

const randomizeStar = (star, initial = false, cameraZ = 0) => {
  star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000

  // Calculate star positions with radial random coordinate so no star hits the camera.
  const deg = Math.random() * Math.PI * 2
  const distance = Math.random() * 50 + 1

  star.x = Math.cos(deg) * distance
  star.y = Math.sin(deg) * distance

  star.sprite.tint = getRandomColor()
}

export const StarsWrapper = (props) => {

  const { selectedItem } = useSelector(selectNav)
  const update = useRef()

  useEffect(() => {
    if (update.current && selectedItem) update.current({ selectedItem })
  }, [selectedItem])

  const onInitialized = useCallback((updateFunc) => {
    update.current = updateFunc
  }, [])

  return (
    <StarsMemo onInitialized={onInitialized} {...props} />
  )
}

export default StarsWrapper

export const Stars = ({ onInitialized }) => {
  const canvasRef = useRef()
  const containerRef = useRef()
  const stars = useRef([])
  const cameraZ = useRef(0)
  const speed = useRef(0)
  const [warpSpeed, updateWarpSpeed] = useRebound(0, 2000)
  const selectedItem = useRef(-1)
  const [starState] = useReducer(starReducer, initialStarState)
  const appRef = useRef();

  gsap.registerPlugin(PixiPlugin);
  PixiPlugin.registerPIXI(PIXI);

  const update = useCallback((data) => {
    if (!data) return;
    const app = appRef.current;
    const { selectedItem: newItem } = data;
    if (selectedItem.current >= 0) {
      gsap.to(planets.current[selectedItem.current].planetSprite, { pixi: { alpha: 0 }, duration: .3, delay: .3});
      gsap.fromTo(planets.current[selectedItem.current].planetSprite, { pixi: { scale: .5 } }, { pixi: { scale: 6, y:"+=5000" }, duration: .8, ease: "power2.inOut" });
    }
    gsap.to(planets.current[newItem].planetSprite, { pixi: { alpha: 1 }, duration: .3, delay: 1.9 });
    gsap.fromTo(planets.current[newItem].planetSprite, { pixi: { scale: .2, y:app.renderer.screen.height / 2 } }, { pixi: { scale: .5 }, duration: .8, delay: 1.9 });
    selectedItem.current = newItem;
    //updateWarpSpeed(1);
    gsap.to(warpSpeed, { current: 1, duration: 1, delay: 0, ease: "power2.inOut" });
    gsap.to(warpSpeed, { current: 0, duration: .5, delay: 1.5, ease: "power2.outIn" });
  }, []);

  //called on every frame of animation
  const updateStar = useCallback((star, initial, screenW, screenH, cameraZ = 0) => {
    let { fov, starStretch, starBaseSize } = starState;
    if (initial || star.z < cameraZ) randomizeStar(star, initial, cameraZ);

    // Map star 3d position to 2d with really simple projection
    const z = star.z - cameraZ;

    star.sprite.x = star.x * (fov / z) * screenW + screenW / 2;
    star.sprite.y = star.y * (fov / z) * screenH + screenH / 2;

    // Calculate star scale & rotation.
    const dxCenter = star.sprite.x - screenW / 2;
    const dyCenter = star.sprite.y - screenH / 2;
    const distanceCenter = Math.sqrt(
      dxCenter * dxCenter + dyCenter * dyCenter
    );
    const distanceScale = Math.max(0, (2000 - z) / 2000);

    star.sprite.scale.x = distanceScale * starBaseSize;
    // Star is looking towards center so that y axis is towards center.
    // Scale the star depending on how fast we are moving, what the stretchfactor is
    // and depending on how far away it is from the center.
    star.sprite.scale.y =
      distanceScale * starBaseSize +
      (distanceScale * speed.current * starStretch * distanceCenter) / screenW
    star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2
  }, [starState]);

  const updateStars = useCallback((deltaTime = 0, app) => {
    //console.log(deltaTime, app)
    let { baseSpeed } = starState;
    // Simple easing. This should be changed to proper easing function when used for real.
    speed.current += (warpSpeed.current - speed.current) / 20;
    cameraZ.current += deltaTime * 10 * (speed.current + baseSpeed);
    const len = stars.current.length;
    for (let i = 0; i < len; i++) {
      updateStar(stars.current[i], false, app.renderer.screen.width, app.renderer.screen.height, cameraZ.current)
    }
    //starDispatch({ payload: { stars, speed, warpSpeed, cameraZ } })
  }, [starState, stars, updateStar, warpSpeed]);

  const onReady = (appRef) => {
    initStars(appRef.current);
    initPlanets(appRef.current);
  }
  const { updateTicker } = usePixiApp({ canvasRef, containerRef, onReady })

  const ticker = useCallback((app) => (time) => {
    if (!time || !app) return
    //console.log(time.deltaTime, app);
    updateStars(time.deltaTime, app);
  }, [updateStars]);

  const initStars = useCallback((app) => {
    Assets.load("https://pixijs.com/assets/star.png").then((starTexture) => {
      // Create the stars
      for (let i = 0; i < 1000; i++) {
        const star = { sprite: new Sprite(starTexture), z: 0, x: 0, y: 0 }

        star.sprite.anchor.x = 0.5;
        star.sprite.anchor.y = .8;
        app.stage.addChild(star.sprite);
        updateStar(star, true, app.renderer.screen.width, app.renderer.screen.height);
        stars.current.push(star);
      }

      updateTicker(ticker(app));
      onInitialized(update);
    })
  }, [updateStar, updateTicker, ticker, onInitialized, update]);

  const planets = useRef([
    { name: "planet-green", url: "./assets/planet-green.png" },
    { name: "planet-red", url: "./assets/planet-red.png" },
    { name: "planet-blue", url: "./assets/planet-blue.png" },
    { name: "planet-orange", url: "./assets/planet-orange.png" },
  ]);
  
  const initPlanets = useCallback((app) => {
    appRef.current = app;
    planets.current.forEach((planet) => {
      Assets.load(planet.url).then((planetTexture) => {
        const planetSprite = planet.planetSprite = new Sprite(planetTexture);
        planetSprite.anchor.set(0.5);
        planetSprite.x = app.renderer.screen.width / 2;
        planetSprite.y = app.renderer.screen.height / 2;
        planetSprite.scale.set(0.2);
        planetSprite.alpha = 0;
        planet.active = false;
        app.stage.addChild(planetSprite);
      })
    });
    planets.current[0].active = true;
  }, []);

  return (
    <Box ref={containerRef} className="pixi-container">
      <canvas ref={canvasRef} />
    </Box>
  )
}

Stars.propTypes = {
  onInitialized: PropTypes.func
}

const StarsMemo = React.memo(Stars)