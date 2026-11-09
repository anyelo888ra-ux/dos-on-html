// Estado global de la terminal HTML-DOS
let currentLang = 'es-es'; // Idioma por defecto
let installedOS = localStorage.getItem('html_dos_os') || null;
let installedApps = JSON.parse(localStorage.getItem('html_dos_apps') || '[]');

const inputField = document.getElementById('user-input');
const outputContainer = document.getElementById('terminal-output');

inputField.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const rawCommand = inputField.value.trim();
    printToTerminal(`C:\\> ${rawCommand}`, 'user-cmd');
    processCommand(rawCommand);
    inputField.value = '';
    outputContainer.scrollTop = outputContainer.scrollHeight;
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
  const args = cmd.toLowerCase().split(' ');
  const mainCmd = args[0];

  switch(mainCmd) {
    case 'help':
      printToTerminal(`
        <b>Comandos Disponibles:</b><br>
        - <b>install</b>: Asistente para instalar la familia Minwindes (1 al Me).<br>
        - <b>os [nombre]</b>: Arranca un Minwindes instalado (ej: <i>os minwindes98</i>, <i>os me</i>).<br>
        - <b>apps</b>: Lista o instala herramientas expandibles (blender, winamp).<br>
        - <b>lang [es-es|es-mx|en]</b>: Cambia el idioma del sistema.<br>
        - <b>badges</b>: Muestra tus logros desbloqueados guardados en localStorage.<br>
        - <b>cls</b>: Limpia la pantalla.
      `);
      break;

    case 'install':
      printToTerminal(`
        <b>=== ASISTENTE DE INSTALACIÓN MINWINDES ===</b><br>
        Selecciona la versión a instalar escribiendo el comando correspondiente:<br>
        1. <b>minwindes1</b> (El origen en blanco y negro)<br>
        2. <b>minwindes95</b> (La revolución de las ventanas)<br>
        3. <b>minwindes98</b> (Estabilidad y soporte USB)<br>
        4. <b>minwindes-me</b> (El legendario Windows Millennium Edition)<br>
        <i>Ejemplo de uso:</i> install minwindes98
      `);
      break;

    case 'minwindes1':
    case 'minwindes95':
    case 'minwindes98':
    case 'minwindes-me':
      if(args[-1] === 'install' || cmd.includes('minwindes')) {
        localStorage.setItem('html_dos_os', mainCmd);
        printToTerminal(`[✔] Sistema <b>${mainCmd.toUpperCase()}</b> instalado correctamente en C:\\Minwindes. Escribe <b>os ${mainCmd}</b> para iniciarlo.`);
        checkAchievement('os_installed');
      }
      break;

    case 'os':
      const targetOS = args[1];
      if (!targetOS) {
        printToTerminal(`Error: Especifica un sistema. Ej: <b>os minwindes98</b>`);
      } else {
        printToTerminal(`Cargando núcleo de ${targetOS}... Iniciando interfaz gráfica...`);
        setTimeout(() => {
          alert(`¡Simulando el arranque de ${targetOS.toUpperCase()} en HTML puro! (Aquí se abriría el módulo gráfico del SO).`);
        }, 1000);
      }
      break;

    case 'stareggs': // EASTER EGG SECRETO
      printToTerminal(`<span style="color: #ff00ff; font-weight: bold;">[SUS] ඞ ¡Has descubierto el easter egg secreto de Amogus! ඞ</span>`);
      triggerAmogusPopup();
      unlockAchievement('stareggs_found', 'Logro Secreto: ¡Among Us en la BIOS! ඞ');
      break;

    case 'badges':
      const savedBadges = JSON.parse(localStorage.getItem('html_dos_badges') || '[]');
      printToTerminal(`<b>🏆 TUS LOGROS DESBLOQUEADOS:</b><br>` + (savedBadges.length ? savedBadges.join('<br>') : 'Aún no tienes logros. Prueba escribiendo comandos secretos.'));
      break;

    case 'lang':
      if(['es-es', 'es-mx', 'en'].includes(args[1])) {
        currentLang = args[1];
        printToTerminal(`Idioma cambiado exitosamente a: <b>${currentLang}</b>`);
      } else {
        printToTerminal(`Idiomas válidos: es-es, es-mx, en`);
      }
      break;

    case 'cls':
      outputContainer.innerHTML = '';
      break;

    default:
      printToTerminal(`Comando no reconocido: "${cmd}". Escribe <b>help</b> para asistencia.`);
  }
}

// Sistema de Logros y Easter Eggs con localStorage
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
  div.style.cssText = "position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:#000; border:3px solid #00ff00; padding:20px; color:#00ff00; z-index:99999; text-align:center; font-family:monospace;";
  div.innerHTML = `<h2>ඞ SUSSY BAKA ඞ</h2><p>El impostor estaba en la línea de comandos.</p><button onclick="this.parentNode.remove()" style="margin-top:10px; background:#00ff00; color:#000; border:none; padding:5px 15px; cursor:pointer;">Cerrar</button>`;
  document.body.appendChild(div);
}

function showAchievementPopup(title) {
  const pop = document.createElement('div');
  pop.style.cssText = "position:fixed; bottom:20px; right:20px; background:#111; border:2px solid #ffcc00; color:#ffcc00; padding:10px 15px; z-index:99999; font-family:monospace; box-shadow:0 0 10px rgba(255,204,0,0.5);";
  pop.innerHTML = `🏆 <b>¡LOGRO DESBLOQUEADO!</b><br>${title}`;
  document.body.appendChild(pop);
  setTimeout(() => pop.remove(), 4000);
}
