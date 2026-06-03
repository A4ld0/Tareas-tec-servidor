// 3. Crear un servicio de Log utilizando el patron Modular

// Objetivo: evitar contaminar el scope global

// Deberas crear un modulo Logger que incluya los siguientes metodos:

// "info", "warn" y "error"

// Se debe poder configurar el nivel de logueo (solo errores, warnings y errores, o todos los mensajes)

// El logger debera enviar los mensajes en una de 2 formas:

// mediante consola
// en un archivo 
// 
// El output (console vs file) debe ser configurable y debe poderse cambiar 
// (definir si se realiza mediante archivo de configuracion o un metodo de settings)

const fs = require('fs');

const Logger = (function() {
    let logLevel = 'info';
    let output = 'console';
    let filePath = 'logs.txt';

    const validLogLevels = ['error', 'warn', 'info'];
    const validOutputs = ['console', 'file'];

    function log(message, level) {
        if (shouldLog(level)) {
            const formattedMessage = `[${level.toUpperCase()}] ${new Date().toLocaleString()} - ${message}`;

            if (output === 'console') {
                console[level](formattedMessage);
            } else if (output === 'file') {
                fs.appendFileSync(filePath, formattedMessage + '\n');
            }
        }
    }

    function shouldLog(level) {
        const rules = {
            error: ['error'],
            warn: ['warn'],
            info: ['warn', 'error']
        };

        return rules[logLevel].includes(level);
    }

    return {
        warn(message) {
            log(message, 'warn');
        },

        error(message) {
            log(message, 'error');
        },

        setLogLevel(level) {
            if (validLogLevels.includes(level)) {
                logLevel = level;
            } else {
                console.error(`Nivel de log inválido: ${level}`);
            }
        },

        setOutput(out) {
            if (validOutputs.includes(out)) {
                output = out;
            } else {
                console.error(`Output inválido: ${out}`);
            }
        },

        setFilePath(path) {
            filePath = path;
        },

        getSettings() {
            return {
                logLevel,
                output,
                filePath
            };
        }
    };
})();

Logger.setOutput('console');

Logger.setLogLevel('error');
Logger.warn('Warning 1');
Logger.error('Error 1');

Logger.setLogLevel('warn');
Logger.warn('Warning 2');
Logger.error('Error 2');

Logger.setLogLevel('info');
Logger.warn('Warning 3');
Logger.error('Error 3');

Logger.setOutput('file');
Logger.setFilePath('logs.txt');
Logger.setLogLevel('info');
Logger.warn('Warning 4');
Logger.error('Error 4');