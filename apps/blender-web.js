// Mini Blender Web recreado en Canvas 2D / JS puro
function openBlender() {
  return `
    <div style="background:#2d2d2d; color:#fff; border:2px solid #555; width:340px; padding:10px; font-family:sans-serif; position:relative; z-index:99999;">
      <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.8rem; font-weight:bold;">
        <span>Blender v0.1-HTML (Default Cube)</span>
        <span style="cursor:pointer; color:#ff5555;" onclick="this.parentNode.parentNode.remove()">[X]</span>
      </div>
      <canvas id="blenderCanvas" width="320" height="200" style="background:#1e1e1e; border:1px solid #444; display:block;"></canvas>
      <p style="font-size:0.7rem; color:#aaa; margin-top:5px;">💡 Renderizando cubo 3D en tiempo real (Canvas JS).</p>
    </div>
    <script>
      (function() {
        const canvas = document.getElementById('blenderCanvas');
        if(!canvas) return;
        const ctx = canvas.getContext('2d');
        let angle = 0;
        
        function drawCube() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.save();
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate(angle);
          
          ctx.strokeStyle = '#ff7300';
          ctx.lineWidth = 2;
          ctx.strokeRect(-40, -40, 80, 80);
          
          ctx.restore();
          angle += 0.02;
        }
        setInterval(drawCube, 30);
      })();
    </script>
  `;
}
