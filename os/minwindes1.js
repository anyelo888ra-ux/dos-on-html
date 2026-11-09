// Simulador interactivo Minwindes 1 (1 bit / Monocromático)
function bootMinwindes1() {
  return `
    <div style="background:#000; color:#fff; width:100vw; height:100vh; padding:30px; font-family:monospace; position:fixed; top:0; left:0; z-index:999999;">
      <h1 style="border-bottom: 2px solid #fff; padding-bottom: 10px;">Minwindes 1.0 (The Origin)</h1>
      <p style="margin-top:20px;">Bienvenido al entorno gráfico primitivo de 1 bit. Sin soporte para ratón avanzado, solo pura nostalgia de código.</p>
      <button onclick="this.parentNode.remove()" style="margin-top:30px; background:#fff; color:#000; padding:8px 16px; font-weight:bold; cursor:pointer; border:none;">Salir a HTML-DOS</button>
    </div>
  `;
}
