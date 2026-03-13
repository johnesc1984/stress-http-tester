# Stress HTTP Tester
🚀 **Stress HTTP Tester** es una herramienta ligera para **realizar pruebas de estrés a APIs HTTP** desde Node.js.
Permite enviar múltiples peticiones concurrentes a un endpoint, validar respuestas y medir el rendimiento del servidor.


### Puede usarse como:

* **CLI (herramienta de terminal)**
* **Librería dentro de proyectos Node.js**

Es ideal para:

* Pruebas de carga de APIs
* Medición de rendimiento
* Validación automática de respuestas
* Detectar endpoints lentos
* Pruebas antes de despliegues en producción

---

# Características

* Enviar **miles de peticiones HTTP**
* Configurar **concurrencia**
* Validar **código de estado HTTP**
* Validar **estructura de respuesta**
* Generar **valores aleatorios en payload**
* Mostrar **barra de progreso en consola**
* Usar mediante **CLI o como librería**
* Configuración mediante **JSON**

---

# Instalación

### Ejecutar directamente con npx

```bash
npx stress-http-tester test.json
```

### Instalar globalmente

```bash
npm install -g stress-http-tester
```

### Luego ejecutar

```bash
stress-http-tester test.json
```

### Instalar como librería

```bash
npm install stress-http-tester
```

---

# Uso desde la terminal (CLI)
Ejemplo:

```bash
stress-http-tester config.json
stress-http-tester test.json
```

---

# Archivo de configuración

Debes crear un archivo JSON con la configuración del test.

Ejemplo `test.json`:

```json
{
  "url": "http://localhost:3000/api/test",
  "method": "POST",
  "requests": 100,
  "concurrency": 10,
  "headers": {
    "Content-Type": "application/json"
  },
  "payload": {
    "email": "test<random>@mail.com"
  },
  "expectedStatus": 200,
  "expectedBody": {
    "success": true
  }
}
```

---

# Opciones de configuración

| Opción         | Descripción                          |
| -------------- | ------------------------------------ |
| url            | Endpoint de la API                   |
| method         | Método HTTP (GET, POST, PUT, DELETE) |
| requests       | Número total de peticiones           |
| concurrency    | Número de peticiones concurrentes, simula varios usuarios al tiempo    |
| headers        | Encabezados HTTP                     |
| payload        | Cuerpo de la petición                |
| expectedStatus | Código HTTP esperado                 |
| expectedBody   | Estructura esperada de la respuesta  |

---

# Valores aleatorios en el payload

Puedes usar el texto `<random>` dentro del payload.

Ejemplo:

```json
{
  "email": "usuario<random>@correo.com"
}
```

Cada petición reemplazará `<random>` por un número diferente.

Ejemplo generado:

```
usuario4839201@correo.com
usuario9482349@correo.com
usuario2342390@correo.com
```

Esto es útil para evitar datos duplicados en APIs.

---

# Ejemplo de salida en consola

```
STRESS HTTP TESTER

**************************************************
   _____ _______ _____  ______ _____ _____
  / ____|__   __|  __ \|  ____/ ____/ ____|
 | (___    | |  | |__) | |__ | (___| (___
  \___ \   | |  |  _  /|  __| \___ \\___ \
  ____) |  | |  | | \ \| |____ ____)|___) |
 |_____/   |_|  |_|  \_\______|_____/_____/

           STRESS HTTP TESTER TOOL
             BY JOHN CASTIBLANCO
**************************************************

Iniciando prueba de estrés...

Progreso |████████████░░░░░░| 60% || 600/1000 Requests

RESULTADOS

Exitosas: 980
Fallidas: 20
Tiempo promedio: 120 ms
Requests por segundo (RPS): 850
```
```js
Detalle:
{
  "exitosas": 0,
  "fallidas": 100,
  "tiempo_promedio_ms": 12520,
  "criterio_exito": {
    "status_esperado": 200,
    "body_esperado_base": {
      "success": true
    }
  },
  "resumen_peticiones": [
    {
      "numero": 1,
      "status": 200,
      "tiempo_ms": 161,
      "exito": false,
      "motivo": "expectedBody dont Match"
    },
    {
      "numero": 2,
      "status": 200,
      "tiempo_ms": 138,
      "exito": false,
      "motivo": "expectedBody dont Match"
    }...
  ]
  ```

---

# Uso como librería

También puedes usar **Stress HTTP Tester** dentro de un proyecto Node.js.

## Uso Asíncrono
```javascript
const { stressTest } = require("stress-http-tester");

  //usalo dentro de una funcion asíncrona
  const resultado = await stressTest({
    url: "http://localhost:3000/api/test",
    method: "POST",
    requests: 100,
    concurrency: 10,
    payload: {
      email: "test<random>@mail.com",
      pass:"123456"
    },
    expectedStatus: 200,
    expectedBody: {
        state: 'ok',mensaje:"El correo test<random>@mail.com se ha creado correctamente"
    }
  });

  console.log(resultado)
```


## Uso con Callback

```javascript
const { stressTest } = require("stress-http-tester");

  stressTest({
    url: "http://localhost:3000/api/usuarios/Registro",
    method: "POST",
    requests: 100,
    concurrency: 10,
    payload: {
      email: "test<random>@mail.com",
      pass:"123456"
    },
    expectedStatus: 200,
    expectedBody: {
        state: 'ok',mensaje:"El correo test<random>@mail.com se ha creado correctamente"
    }
  }, function(resultado){
    console.log(resultado)
  });

  
```

---

# Ejemplo de resultado

```json
{
    "exitosas": 100,
    "fallidas": 0,
    "tiempo_promedio_ms": 122.24,
    "criterio_exito": {
        "status_esperado": 200,
        "body_esperado_base": {
            "state": "ok"
        }
    },
    "resumen_peticiones": [
        {
            "numero": 1,
            "status": 200,
            "tiempo_ms": 167,
            "exito": true,
            "motivo": null
        },
        {
            "numero": 2,
            "status": 200,
            "tiempo_ms": 143,
            "exito": true,
            "motivo": null
        }...
    ]
}
```

---

# Recomendaciones de rendimiento

Para pruebas de carga más altas:

* Aumentar la **concurrencia**
* Evitar guardar logs de todas las peticiones

# Contribuciones

Las contribuciones son bienvenidas.
Si encuentras un error o deseas proponer una mejora, puedes abrir un issue o enviar un pull request.

## ❤️ Apoya el proyecto

Si **stress-http-tester** te ayudó a probar tus APIs puedes apoyar su desarrollo.

[![Donar con MercadoPago](https://img.shields.io/badge/Donar-MercadoPago-009EE3?logo=mercadopago&logoColor=white)](https://link.mercadopago.com.co/johncastiblanco)


# Licencia
Uso personal y educativo únicamente.
El uso comercial requiere autorización del autor.
Ver archivo LICENSE para más información.

# Autor

* John Castiblanco
* <johnescastiblanco@gmail.com>
* <https://waco.com.co>
