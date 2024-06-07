import { Application, Assets, Sprite } from "pixi.js";
import { useCallback, useEffect, useState, useReducer } from "react";
import { useSelector } from "react-redux";
import { selectNav } from "../redux/selectors/nav.selector";

const initialStarState = {
  fov: 20,
  baseSpeed: 0.025,
  speed: 0,
  warpSpeed: 0,
  starStretch: 50,
  starBaseSize: 0.05,
  stars: [],
  cameraZ: 0,
};

function starReducer(state, action) {
  return { ...state, ...action.payload };
}

export const useStarwarp = (canvasRef, containerRef) => {
  const [pixi, setApp] = useState(null);
  const { selectedItem } = useSelector(selectNav);
  const [starState, starDispatch] = useReducer(starReducer, initialStarState);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return parseInt(color.substring(1), 16);
  };

  const randomizeStar = (star, initial, cameraZ = 0) => {
    star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000;

    // Calculate star positions with radial random coordinate so no star hits the camera.
    const deg = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 1;

    star.x = Math.cos(deg) * distance;
    star.y = Math.sin(deg) * distance;

    star.sprite.tint = getRandomColor();
  };

  const init = async (canvas, container, starAmount = 250) => {
    // Create a new application
    const app = new Application();

    // Initialize the application
    await app.init({ resizeTo: container, canvas });

    const starTexture = await Assets.load("https://pixijs.com/assets/star.png");

    // Create the stars
    const stars = [];

    for (let i = 0; i < starAmount; i++) {
      const star = { sprite: new Sprite(starTexture), z: 0, x: 0, y: 0 };

      star.sprite.anchor.x = 0.5;
      star.sprite.anchor.y = 0.7;
      randomizeStar(star, true);
      app.stage.addChild(star.sprite);
      stars.push(star);
    }
    setApp(app);
    return stars;
  };

  useEffect(() => {
    const { warpSpeed } = starState;
    const t = setInterval(() => {
      warpSpeed = warpSpeed > 0 ? 0 : 1;
    }, 5000);
    return () => clearInterval(t);
  }, [starState]);

  const ticker = useCallback((time) => {
    let { fov, baseSpeed, speed, warpSpeed, starStretch, starBaseSize, stars, cameraZ } = starState;
    // Simple easing. This should be changed to proper easing function when used for real.
    speed += (warpSpeed - speed) / 20;
    cameraZ += time.deltaTime * 10 * (speed + baseSpeed);
    const len = stars.length;
    for (let i = 0; i < len; i++) {
      const star = stars[i];

      if (star.z < cameraZ) randomizeStar(star, false, cameraZ);

      // Map star 3d position to 2d with really simple projection
      const z = star.z - cameraZ;

      star.sprite.x =
        star.x * (fov / z) * pixi.renderer.screen.width +
        pixi.renderer.screen.width / 2;
      star.sprite.y =
        star.y * (fov / z) * pixi.renderer.screen.width +
        pixi.renderer.screen.height / 2;

      // Calculate star scale & rotation.
      const dxCenter = star.sprite.x - pixi.renderer.screen.width / 2;
      const dyCenter = star.sprite.y - pixi.renderer.screen.height / 2;
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
        (distanceScale * speed * starStretch * distanceCenter) /
        pixi.renderer.screen.width;
      star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
    }
    starDispatch({ payload: { stars, speed, warpSpeed, cameraZ }});
}, [starState, starDispatch, pixi]);

useEffect(() => {
  if (!canvasRef?.current || !containerRef?.current) return;
  init(canvasRef.current, containerRef.current).then((stars) => {
    starDispatch({ payload: { stars }});
  });
  return () => {
    pixi?.destroy();
  };
}, [canvasRef?.current, containerRef?.current, starDispatch]);

useEffect(() => {
  if (!pixi) return;
  pixi.ticker.add(ticker);
}, [pixi, ticker]);

return pixi;
};
