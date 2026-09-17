(function () {
  function drawBackground(ctx, width, height, time) {
    ctx.save();

    var sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#211744');
    sky.addColorStop(0.56, '#d6575a');
    sky.addColorStop(1, '#f2a14b');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    var pulse = 1 + Math.sin(time * 1.2) * 0.035;
    function sun(cx, cy, radius, core, glow) {
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.65 * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * pulse, 0, Math.PI * 2);
      ctx.fill();
    }

    sun(width * 0.25, height * 0.22, width * 0.075, '#ffe7a3', 'rgba(255, 229, 148, 0.18)');
    sun(width * 0.76, height * 0.31, width * 0.055, '#fff0bd', 'rgba(255, 239, 183, 0.16)');

    ctx.fillStyle = 'rgba(22, 20, 51, 0.48)';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.63);
    ctx.lineTo(width * 0.16, height * 0.56);
    ctx.lineTo(width * 0.3, height * 0.64);
    ctx.lineTo(width * 0.46, height * 0.53);
    ctx.lineTo(width * 0.62, height * 0.64);
    ctx.lineTo(width * 0.8, height * 0.55);
    ctx.lineTo(width, height * 0.62);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#433047';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.75);
    ctx.lineTo(width * 0.2, height * 0.68);
    ctx.lineTo(width * 0.39, height * 0.75);
    ctx.lineTo(width * 0.57, height * 0.66);
    ctx.lineTo(width * 0.76, height * 0.74);
    ctx.lineTo(width, height * 0.67);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  function drawGround(ctx, width, height, groundHeight, offset) {
    ctx.save();
    var top = height - groundHeight;
    ctx.fillStyle = '#6d3c36';
    ctx.fillRect(0, top, width, groundHeight);

    ctx.fillStyle = '#d78448';
    ctx.fillRect(0, top, width, 7);
    ctx.strokeStyle = '#241b31';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, top + 1.5);
    ctx.lineTo(width, top + 1.5);
    ctx.stroke();

    var stride = 42;
    var start = -((offset || 0) % stride) - stride;
    ctx.strokeStyle = 'rgba(37, 25, 39, 0.55)';
    ctx.lineWidth = 3;
    for (var x = start; x < width + stride; x += stride) {
      ctx.beginPath();
      ctx.moveTo(x, top + 18);
      ctx.lineTo(x + 22, top + groundHeight - 8);
      ctx.stroke();
    }
    ctx.fillStyle = '#3e2933';
    ctx.fillRect(0, height - 8, width, 8);
    ctx.restore();
  }

  function drawBird(ctx, x, y, size, velocity) {
    ctx.save();
    ctx.translate(x, y);
    var tilt = Math.max(-0.3, Math.min(0.45, velocity / 900));
    ctx.rotate(tilt);
    var half = size * 0.43;
    var nose = size * 0.47;
    var wing = size * 0.2;

    ctx.fillStyle = '#17253d';
    ctx.strokeStyle = '#111827';
    ctx.lineWidth = Math.max(2, size * 0.08);
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(-half, size * 0.12);
    ctx.lineTo(-size * 0.14, -size * 0.3);
    ctx.lineTo(size * 0.18, -size * 0.23);
    ctx.lineTo(nose, 0);
    ctx.lineTo(size * 0.18, size * 0.23);
    ctx.lineTo(-size * 0.14, size * 0.3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#35d3d0';
    ctx.beginPath();
    ctx.moveTo(-size * 0.12, -size * 0.08);
    ctx.lineTo(-size * 0.44, -wing);
    ctx.lineTo(-size * 0.18, size * 0.02);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffcf5c';
    ctx.beginPath();
    ctx.arc(size * 0.1, 0, size * 0.075, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ff6b57';
    ctx.beginPath();
    ctx.moveTo(-half - 1, -size * 0.1);
    ctx.lineTo(-size * 0.57, 0);
    ctx.lineTo(-half - 1, size * 0.1);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawPipe(ctx, x, gapTop, gapBottom, pipeWidth, height) {
    ctx.save();
    var topHeight = Math.max(0, gapTop);
    var bottomHeight = Math.max(0, height - gapBottom);

    function gate(y, gateHeight) {
      if (gateHeight <= 0) return;
      ctx.fillStyle = '#17253d';
      ctx.fillRect(x, y, pipeWidth, gateHeight);
      ctx.strokeStyle = '#101522';
      ctx.lineWidth = 3;
      ctx.strokeRect(x + 1.5, y + 1.5, Math.max(0, pipeWidth - 3), Math.max(0, gateHeight - 3));
      ctx.fillStyle = '#e94f9b';
      ctx.fillRect(x + pipeWidth * 0.18, y, pipeWidth * 0.18, gateHeight);
      ctx.fillStyle = '#35d3d0';
      ctx.fillRect(x + pipeWidth * 0.64, y, pipeWidth * 0.18, gateHeight);
      ctx.fillStyle = 'rgba(255, 240, 189, 0.75)';
      for (var stripe = y + 14; stripe < y + gateHeight; stripe += 28) {
        ctx.fillRect(x + pipeWidth * 0.38, stripe, pipeWidth * 0.24, 7);
      }
    }

    gate(0, topHeight);
    gate(gapBottom, bottomHeight);
    ctx.restore();
  }

  window.SPRITES = { drawBackground: drawBackground, drawGround: drawGround, drawBird: drawBird, drawPipe: drawPipe };
})();
