interface SnowFlake {
    x: number;
    y: number;
  }
  
  function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  let flakes: SnowFlake[] = [];
  let animationFrameId: number | null = null;
  
  export function initSnowAnimation() {
    canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);
  
    ctx = canvas.getContext('2d')!;
  
    const numOfFlakes = randomInt(300, 600);
    for (let i = 0; i < numOfFlakes; i++) {
      flakes.push({
        x: randomInt(0, canvas.width),
        y: randomInt(0, canvas.height),
      });
    }
  
    draw();
  }
  
  function draw() {
    if (!canvas || !ctx) return;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    flakes.forEach((flake) => {
      ctx!.moveTo(flake.x, flake.y);
      ctx!.arc(flake.x, flake.y, 2, 0, Math.PI * 2);
  
      flake.y += 1;
      flake.x += 0;
      if (!canvas) return;
      if (flake.x > canvas.width) {
        flake.x = 0;
      } else if (flake.x < 0) {
        flake.x = canvas.width;
      } else if (flake.y > canvas.height) {
        flake.x = randomInt(0, canvas.width);
        flake.y = -2;
      }
    });
    ctx.fill();
    animationFrameId = window.requestAnimationFrame(draw);
  }
  
  export function stopSnowAnimation() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
    canvas = null;
    ctx = null;
    flakes = [];
  }