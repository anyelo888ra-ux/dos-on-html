// ==========================================
// HTML-DOS (c) 2026 stupid dev Systems
// Intérprete de Comandos Central (CLI Parser)
// ==========================================

let currentLang = localStorage.getItem('html_dos_lang') || 'es-es';
let installedOS = localStorage.getItem('html_dos_os') || null;

const inputField = document.getElementById('user-input');
const outputContainer = document.getElementById('terminal-output');

// Diccionario multiidioma interactivo con soporte para cambio en caliente
function getDictText(key, params = {}) {
  const dictionaries = {
    'es-es': {
      welcome: "HTML-DOS (c) 2026 stupid dev Systems. Versión de España.",
      help: `<b>Comandos Disponibles (HTML-DOS):</b><br>
        - <b>install [version]</b>: Instala Minwindes (minwindes1, minwindes98, me).<br>
        - <b>os [nombre]</b>: Arranca el Minwindes instalado (ej: <i>os minwindes98</i>, <i>os me</i>).<br>
        - <b>apps [nombre]</b>: Ejecuta herramientas expandibles (winamp, blender).<br>
        - <b>explorer.exe</b>: Abre el explorador gráfico de discos y archivos (C:, D:, Q:, Red K:).<br>
        - <b>lang [es-es|es-mx|en]</b>: Cambia el idioma del sistema.<br>
        - <b>badges</b>: Muestra tus logros desbloqueados.<br>
        - <b>cls</b>: Limpia la pantalla.`,
      installed: "Sistema instalado correctamente en C:\\Minwindes.",
      errorCmd: "Comando no reconocido. Escribe 'help' para asistencia."
    },
    'es-mx': {
      welcome: "HTML-DOS (c) 2026 stupid dev Systems. Versión chida para LATAM.",
      help: `<b>Comandos Chidos (HTML-DOS):</b><br>
        - <b>install [version]</b>: Instala Minwindes (minwindes1, minwindes98, me).<br>
        - <b>os [nombre]</b>: Arranca el Minwindes instalado (ej: <i>os minwindes98</i>, <i>os me</i>).<br>
        - <b>apps [nombre]</b>: Abre herramientas (winamp, blender).<br>
        - <b>explorer.exe</b>: Abre el explorador de discos (C:, D:, Q:, Red K:).<br>
        - <b>lang [es-es|es-mx|en]</b>: Cambia el idioma al instante.<br>
        - <b>badges</b>: Muestra tus logros.<br>
        - <b>cls</b>: Limpia la pantalla.`,
      installed: "¡Arre! Sistema instalado con éxito en C:\\Minwindes.",
      errorCmd: "¿Qué onda? Comando no válido. Escribe 'help'."
    },
    'en': {
      welcome: "HTML-DOS (c) 2026 stupid dev Systems. All rights reserved.",
      help: `<b>Available Commands (HTML-DOS):</b><br>
        - <b>install [version]</b>: Install Minwindes (minwindes1, minwindes98, me).<br>
        - <b>os [name]</b>: Boot installed Minwindes (e.g., <i>os minwindes98</i>, <i>os me</i>).<br>
        - <b>apps [name]</b>: Run tools (winamp, blender).<br>
        - <b>explorer.exe</b>: Open disk and file explorer (C:, D:, Q:, Network K:).<br>
        - <b>lang [es-es|es-mx|en]</b>: Change system language.<br>
        - <b>badges</b>: View unlocked achievements.<br>
        - <b>cls</b>: Clear screen.`,
      installed: "System successfully installed to C:\\Minwindes.",
      errorCmd: "Unknown command. Type 'help' for assistance."
    }
  };

  const langDict = dictionaries[currentLang] || dictionaries['es-es'];
  return langDict[key] || key;
}

window.addEventListener('DOMContentLoaded', () => {
  printToTerminal(getDictText('welcome') + "<br>Escribe <span class=\"cmd-highlight\">help</span> para ver los comandos disponibles.");
});

inputField.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const rawCommand = inputField.value.trim();
    if(rawCommand !== '') {
      printToTerminal(`C:\\> ${rawCommand}`, 'user-cmd');
      processCommand(rawCommand);
      inputField.value = '';
      outputContainer.scrollTop = outputContainer.scrollHeight;
    }
  }
});

function printToTerminal(text, className = '') {
  const p = document.createElement('p');
  p.className = className;
  p.innerHTML = text;
  outputContainer.appendChild(p);
}

// Procesador central de comandos
function processCommand(cmd) {
  const parts = cmd.toLowerCase().trim().split(/\s+/);
  const mainCmd = parts[0];
  const subArg = parts[1];

  switch(mainCmd) {
    case 'help':
      printToTerminal(getDictText('help'));
      break;

    case 'install':
      if (!subArg) {
        printToTerminal(`
          <b>=== ASISTENTE DE INSTALACIÓN MINWINDES ===</b><br>
          Escribe <i>install [version]</i> para instalar:<br>
          - <b>minwindes1</b> (Modo básico monocromático)<br>
          - <b>minwindes98</b> (Clásico de estabilidad)<br>
          - <b>me</b> (Windows Millennium Edition - Caótico)<br>
          <i>Ejemplo:</i> install minwindes98
        `);
      } else {
        const validOS = ['minwindes1', 'minwindes98', 'me'];
        if(validOS.includes(subArg)) {
          localStorage.setItem('html_dos_os', subArg);
          installedOS = subArg;
          printToTerminal(`[✔] ${getDictText('installed')} <b>${subArg.toUpperCase()}</b>. Escribe <b>os ${subArg}</b> para iniciarlo.`);
          unlockAchievement('os_installed', 'Logro: Pionero de Minwindes 🪟');
        } else {
          printToTerminal(`<span style="color:#ff5555;">Error: Versión "${subArg}" no válida. Usa minwindes1, minwindes98 o me.</span>`);
        }
      }
      break;

    case 'os':
      if (!subArg) {
        printToTerminal(`Sistema operativo asignado: <b>${installedOS ? installedOS.toUpperCase() : 'Ninguno (Usa "install [version]")'}</b>`);
      } else {
        if(installedOS === subArg || subArg === 'me') {
          printToTerminal(`Cargando núcleo de <b>${subArg.toUpperCase()}</b>...`);
          setTimeout(() => {
            launchOSModule(subArg);
          }, 600);
        } else {
          printToTerminal(`<span style="color:#ff5555;">Error: Debes instalar primero el sistema escribiendo <b>install ${subArg}</b>.</span>`);
        }
      }
      break;

    case 'apps':
      if (!subArg) {
        printToTerminal(`Apps disponibles: <b>winamp</b>, <b>blender</b>. Usa <i>apps [nombre]</i>.`);
      } else if (subArg === 'winamp') {
        if(typeof openWinamp === 'function') {
          printToTerminal(openWinamp());
          unlockAchievement('app_winamp', 'Logro: DJ Retro con Winamp 🎶');
        } else {
          printToTerminal(`[!] Error: Módulo Winamp no encontrado en /apps/winamp-web.js`);
        }
      } else if (subArg === 'blender') {
        if(typeof openBlender === 'function') {
          printToTerminal(openBlender());
          unlockAchievement('app_blender', 'Logro: Modelador 3D en Canvas 🧊');
        } else {
          printToTerminal(`[!] Error: Módulo Blender no encontrado en /apps/blender-web.js`);
        }
      } else {
        printToTerminal(`<span style="color:#ff5555;">Aplicación "${subArg}" no encontrada.</span>`);
      }
      break;

    case 'explorer.exe':
      printToTerminal(`[i] Abriendo Explorador de Discos (C:, D:, Q:, Red K:)...`);
      setTimeout(() => {
        openDiskExplorer();
      }, 500);
      break;

    case 'stareggs': // EASTER EGG
      printToTerminal(`<span style="color: #ff00ff; font-weight: bold;">[SUS] ඞ ¡Comando secreto activado! Has encontrado el easter egg de los desarrolladores. ඞ</span>`);
      triggerAmogusPopup();
      unlockAchievement('stareggs_found', 'Logro Secreto: Easter Egg Stareggs ඞ');
      break;

    case 'badges':
      const savedBadges = JSON.parse(localStorage.getItem('html_dos_badges') || '[]');
      printToTerminal(`<b>🏆 TUS LOGROS (localStorage):</b><br>` + (savedBadges.length ? savedBadges.join('<br>') : 'Aún no tienes logros guardados.'));
      break;

    case 'lang':
      if(['es-es', 'es-mx', 'en'].includes(subArg)) {
        currentLang = subArg;
        localStorage.setItem('html_dos_lang', currentLang);
        printToTerminal(`Idioma actualizado exitosamente a: <b>${currentLang}</b>.<br>` + getDictText('welcome'));
      } else {
        printToTerminal(`<span style="color:#ff5555;">Idioma inválido. Opciones: lang es-es, lang es-mx, lang en</span>`);
      }
      break;

    case 'cls':
      outputContainer.innerHTML = '';
      break;

    default:
      printToTerminal(`<span style="color: #ff5555;">${getDictText('errorCmd')}: "${cmd}"</span>`);
  }
}

// ==========================================
// MÓDULO EXPLORADOR DE DISCOS Y ARCHIVOS (explorer.exe)
// ==========================================
function openDiskExplorer() {
  const explorerDiv = document.createElement('div');
  explorerDiv.style.cssText = "position:fixed; top:10%; left:10%; width:80vw; height:75vh; background:#ece9d8; border:3px solid #0055ea; z-index:999999; font-family:'Segoe UI', Tahoma, sans-serif; box-shadow: 0 10px 30px rgba(0,0,0,0.8); display:flex; flex-direction:column; color:#000;";
  
  explorerDiv.innerHTML = `
    <div style="background:linear-gradient(90deg, #0055ea, #2680eb); color:white; padding:8px 12px; font-weight:bold; display:flex; justify-content:space-between; align-items:center;">
      <span>🪟 Minwindes Explorer - PC de Anyelo (Modo Read-Only)</span>
      <button onclick="this.parentNode.parentNode.remove()" style="background:#f00; color:#fff; border:none; padding:2px 8px; font-weight:bold; cursor:pointer;">X</button>
    </div>
    <div style="display:flex; flex-grow:1; height: calc(100% - 35px);">
      <!-- Panel Izquierdo: Unidades -->
      <div style="width: 220px; background:#fff; border-right:1px solid #999; padding:10px; overflow-y:auto; font-size:0.9rem;">
        <b>Unidades de Disco:</b>
        <ul style="list-style:none; padding-left:10px; margin-top:5px; line-height: 1.8;">
          <li style="cursor:pointer;" onclick="loadDrive('C')">💾 Disco C: (Minwindes OS)</li>
          <li style="cursor:pointer;" onclick="loadDrive('D')">🎮 Disco D: (Juegos / ROMs)</li>
          <li style="cursor:pointer;" onclick="loadDrive('Q')">📦 Disco Q: (Store Cache)</li>
          <li style="cursor:pointer; color:#0000ff;" onclick="loadNetworkDrive()">🌐 Disco K: (Red Local / PC Real)</li>
        </ul>
      </div>
      <!-- Panel Derecho: Contenido -->
      <div id="explorer-content" style="flex-grow:1; background:#fff; padding:15px; overflow-y:auto; font-size:0.9rem;">
        <p>Selecciona una unidad a la izquierda para inspeccionar su contenido en modo <b>Read-Only</b>.</p>
      </div>
    </div>
  `;
  document.body.appendChild(explorerDiv);
  loadDrive('C'); // Cargar C por defecto
}

window.loadDrive = function(driveLetter) {
  const content = document.getElementById('explorer-content');
  if(!content) return;

  if(driveLetter === 'C') {
    content.innerHTML = `
      <h3>Disco C: \ [Sistema Minwindes Activo]</h3>
      <p style="color:666; font-size:0.8rem;">Estado: Instalado (${installedOS || 'Ninguno'}) - Solo Lectura</p>
      <ul style="margin-top:10px; line-height:1.6;">
        <li>📁 \Minwindes\System32\</li>
        <li>📁 \Minwindes\Config\</li>
        <li>📄 user_config.json (Configuración de usuario)</li>
        <li>📄 active_os.lock (${installedOS ? installedOS : 'none'})</li>
      </ul>
    `;
  } else if(driveLetter === 'D') {
    content.innerHTML = `
      <h3>Disco D: \ [Juegos y Proyectos]</h3>
      <p style="color:666; font-size:0.8rem;">Ecosistema stupid dev</p>
      <ul style="margin-top:10px; line-height:1.6;">
        <li>📁 \roms\psx_classics\</li>
        <li>📁 \projects\nexus-browser\</li>
        <li>📄 readme_stupid_dev.txt</li>
      </ul>
    `;
  } else if(driveLetter === 'Q') {
    content.innerHTML = `
      <h3>Disco Q: \ [Store Cache & APKs]</h3>
      <p style="color:666; font-size:0.8rem;">Almacenamiento temporal de la tienda</p>
      <ul style="margin-top:10px; line-height:1.6;">
        <li>📁 \store\apks_cache\</li>
        <li>📄 auth_token_discord.dat</li>
      </ul>
    `;
  }
}

// Conexión a Disco Real Local (Unidad K: de Red en modo Read-Only)
window.loadNetworkDrive = async function() {
  const content = document.getElementById('explorer-content');
  if(!content) return;

  if (!window.showDirectoryPicker) {
    content.innerHTML = `<h3>Disco K: [Red Local]</h3><p style="color:red;">Tu navegador no soporta la API File System Access. Usa el navegador en versión de escritorio o app EXE.</p>`;
    return;
  }

  try {
    content.innerHTML = `<h3>Disco K: [Red Local / PC Real]</h3><p>Solicitando permisos de lectura al usuario (Modo Red Segura)...</p>`;
    const dirHandle = await window.showDirectoryPicker();
    let fileListHTML = `<ul style="margin-top:10px; line-height:1.6;">`;
    
    for await (const entry of dirHandle.values()) {
      fileListHTML += `<li>📁 ${entry.name} (${entry.kind})</li>`;
    }
    fileListHTML += `</ul>`;

    content.innerHTML = `
      <h3>Disco K: [Red Local conectada con éxito]</h3>
      <p style="color:green; font-size:0.8rem;">Conectado a tu disco real en modo Read-Only (Seguro).</p>
      ${fileListHTML}
    `;
  } catch (err) {
    content.innerHTML = `<h3>Disco K: [Red Local]</h3><p style="color:#666;">Permiso denegado o cancelado por el usuario.</p>`;
  }
}

// Lanzador de OS
function launchOSModule(osName) {
  const screenDiv = document.createElement('div');
  screenDiv.style.cssText = "position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:999999; background:#000;";
  
  if(osName === 'minwindes1' && typeof bootMinwindes1 === 'function') {
    screenDiv.innerHTML = bootMinwindes1();
  } else if(osName === 'minwindes98' && typeof bootMinwindes98 === 'function') {
    screenDiv.innerHTML = bootMinwindes98();
  } else if(osName === 'me' && typeof bootMinwindesMe === 'function') {
    screenDiv.innerHTML = bootMinwindesMe();
  } else {
    screenDiv.innerHTML = `
      <div style="background:#008080; color:#fff; width:100%; height:100%; padding:30px; font-family:monospace;">
        <h2>Simulador de ${osName.toUpperCase()}</h2>
        <p>Módulo interactivo en ejecución pura.</p>
        <button onclick="this.parentNode.parentNode.remove()" style="padding:8px 16px; background:#c0c0c0; color:#000; border:2px outset #fff; cursor:pointer; margin-top:20px;">Cerrar OS</button>
      </div>
    `;
  }
  document.body.appendChild(screenDiv);
}

// Logros y Easter Eggs
function unlockAchievement(id, title) {
  let badges = JSON.parse(localStorage.getItem('html_dos_badges') || '[]');
  if (!badges.includes(title)) {
    badges.push(title);
    localStorage.setItem('html_dos_badges', JSON.stringify(badges));
    showAchievementPopup(title);
  }
}

function triggerAmogusPopup() {
  const div = document.createElement('div');
  div.style.cssText = "position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:#000; border:3px solid #ff00ff; padding:25px; color:#ff00ff; z-index:999999; text-align:center; font-family:monospace; box-shadow: 0 0 20px rgba(255,0,255,0.5);";
  div.innerHTML = `<h2>ඞ SUSSY AMOGUS ඞ</h2><p>El impostor hackeó HTML-DOS.</p><button onclick="this.parentNode.remove()" style="margin-top:15px; background:#ff00ff; color:#000; border:none; padding:8px 20px; font-weight:bold; cursor:pointer;">Cerrar</button>`;
  document.body.appendChild(div);
}

function showAchievementPopup(title) {
  const pop = document.createElement('div');
  pop.style.cssText = "position:fixed; bottom:20px; right:20px; background:#111; border:2px solid #ffcc00; color:#ffcc00; padding:12px 18px; z-index:999999; font-family:monospace; box-shadow:0 0 15px rgba(255,204,0,0.6);";
  pop.innerHTML = `🏆 <b>¡LOGRO DESBLOQUEADO!</b><br><span style="color:#fff; font-size:0.9rem;">${title}</span>`;
  document.body.appendChild(pop);
  setTimeout(() => pop.remove(), 4500);
}
