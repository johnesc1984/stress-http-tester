#Instalacion

npm i -g stress-http-tester

---
#uso
Crea un archivo con los test.json

```js

{
  "url": "http://localhost:3000/api/test",
  "method": "POST",
  "requests": 100,
  "concurrency": 20,
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

## Ejecución
```bash
stress-http-tester test.json
```
---


```bash
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

Progreso |████████████████████████████████████████| 100% || 5/5 Requests

RESULTADOS

Total requests: 100
Exitosas: 0
Fallidas: 100
Tiempo promedio: 12520 ms
Requests por segundo (RPS): 143.68


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