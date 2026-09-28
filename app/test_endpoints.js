const http = require('http');
const querystring = require('querystring');

const optionsTemplate = {
    hostname: 'localhost',
    port: 3001,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

let sessionCookie = '';

function makeRequest(path, method, postData = null) {
    return new Promise((resolve, reject) => {
        const options = { ...optionsTemplate, path, method };
        if (sessionCookie) {
            options.headers['Cookie'] = sessionCookie;
        }
        if (postData) {
            options.headers['Content-Length'] = Buffer.byteLength(postData);
        }

        const req = http.request(options, (res) => {
            let data = '';
            
            // Extract cookie
            if (res.headers['set-cookie']) {
                sessionCookie = res.headers['set-cookie'][0].split(';')[0];
            }

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    data: data
                });
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        if (postData) {
            req.write(postData);
        }
        req.end();
    });
}

async function runTests() {
    console.log("--- INICIANDO PRUEBAS AUTOMATIZADAS ---");

    // Prueba 1: Acceso bloqueado sin login
    console.log("\\n[Prueba 1] Acceso a / sin login:");
    let res = await makeRequest('/', 'GET');
    if (res.statusCode === 302 && res.headers.location === '/login') {
        console.log("✅ ÉXITO: Redirige a /login correctamente.");
    } else {
        console.log("❌ FALLO: No redirigió a login. Code: " + res.statusCode);
    }

    // Prueba 2: Login como Turista
    console.log("\\n[Prueba 2] Login como Turista (adolfo.leal@correo.cl):");
    const loginData = querystring.stringify({ correo: 'adolfo.leal@correo.cl', rut: '2222222-2' });
    res = await makeRequest('/login', 'POST', loginData);
    if (res.statusCode === 302 && res.headers.location === '/') {
        console.log("✅ ÉXITO: Login exitoso, redirige a / (Vista Turista).");
    } else {
        console.log("❌ FALLO: Login incorrecto. Code: " + res.statusCode);
    }

    // Prueba 3: Intentar acceder a /admin siendo Turista
    console.log("\\n[Prueba 3] Intentar acceder a /admin con sesión de Turista:");
    res = await makeRequest('/admin', 'GET');
    if (res.statusCode === 302 && res.headers.location === '/') {
        console.log("✅ ÉXITO: Acceso bloqueado. Redirige a / correctamente.");
    } else {
        console.log("❌ FALLO: Permitió el acceso o redirección errónea. Code: " + res.statusCode);
    }

    // Limpiar sesión para siguiente prueba
    sessionCookie = '';

    // Prueba 4: Login como Admin
    console.log("\\n[Prueba 4] Login como Admin (admin@hotel.cl):");
    const loginAdminData = querystring.stringify({ correo: 'admin@hotel.cl', rut: '1111111-1' });
    res = await makeRequest('/login', 'POST', loginAdminData);
    if (res.statusCode === 302 && res.headers.location === '/admin') {
        console.log("✅ ÉXITO: Login exitoso, redirige a /admin (Vista Administrador).");
    } else {
        console.log("❌ FALLO: Login incorrecto. Code: " + res.statusCode);
    }

    // Prueba 5: Acceso a /habitaciones siendo Admin
    console.log("\\n[Prueba 5] Acceder a gestión de habitaciones como Admin:");
    res = await makeRequest('/admin/habitaciones', 'GET');
    if (res.statusCode === 200) {
        console.log("✅ ÉXITO: Vista renderizada correctamente (Código 200).");
    } else {
        console.log("❌ FALLO: No se pudo acceder. Code: " + res.statusCode);
    }

    console.log("\\n--- PRUEBAS FINALIZADAS ---");
}

runTests();
