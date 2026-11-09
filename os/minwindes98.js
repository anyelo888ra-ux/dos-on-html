// Simulador interactivo Minwindes 98
function bootMinwindes98() {
  return `
    <div style="background:#008080; color:#fff; width:100vw; height:100vh; padding:20px; font-family:'MS Sans Serif', Tahoma, sans-serif; position:fixed; top:0; left:0; z-index:999999; box-sizing:border-box;">
      <div style="background:#000080; color:#fff; padding:6px; font-weight:bold; display:flex; justify-content:space-between; align-items:center;">
        <span>Minwindes 98 - Escritorio Activo</span>
        <span style="cursor:pointer; background:#c0c0c0; color:#000; padding:0 6px; border:1px outset #fff;" onclick="this.parentNode.parentNode.remove()">X</span>
      </div>
      <div style="padding:30px;">
        <h2>🖥️ Mi PC / Internet Explorer 4.0</h2>
        <p style="margin:10px 0;">El sistema operativo definitivo del cambio de milenio corriendo íntegramente en tu navegador.</p>
        <button onclick="this.parentNode.parentNode.remove()" style="background:#c0c0c0; color:#000; border:2px outset #fff; padding:6px 14px; margin-top:15px; cursor:pointer; font-weight:bold;">Apagar equipo / Volver</button>
      </div>
    </div>
  `;
}
