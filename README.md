# CheatWebJapo

# 📚 Compendio de Japonés (A2 - B1)

Una aplicación web estática (SPA) diseñada como una "chuleta" interactiva para el estudio y repaso de japonés. Nace de la necesidad de unificar apuntes de clase, vocabulario y gramática en un solo lugar, huyendo de la fragmentación típica de los libros de texto.

El objetivo es servir tanto como herramienta de estudio personal (repaso rápido y tests) como demostración técnica de manipulación de datos y UI sin frameworks.

## ✨ Características

- **📖 Gramática por Conceptos:** Las reglas no están ordenadas por lecciones, sino agrupadas por familias lógicas (ej. *La Forma て*, *Condicionales*, *Keigo*).
- **🔍 Búsqueda y Filtros:** Buscador en tiempo real para gramática y vocabulario. El vocabulario se puede filtrar simultáneamente por tipo (Verbo, Sustantivo, Adjetivo) y por nivel (A1, A2.1, A2.2, A2B1).
- **🔄 Conjugaciones Interactivas:** Un manual de referencia para saber cómo conjugar verbos y adjetivos según su grupo gramatical.
- **🃏 Modal de Verbos:** Al hacer clic en un verbo del vocabulario, se abre una tarjeta flotante con todas sus conjugaciones específicas.
- **🌗 Modo Oscuro/Claro:** Se adapta automáticamente a la configuración del sistema operativo.
- **📱 Responsive Design:** Totalmente funcional en ordenador y dispositivos móviles.

## 🛠️ Stack Técnico

Este proyecto está construido deliberadamente con **Vanilla JavaScript, HTML5 y CSS3**, sin dependencias ni frameworks externos.

- **Arquitectura:** Single Page Application (SPA) basada en manipulación del DOM.
- **Estado:** Gestión de estado local (filtros, pestañas activas, acordeones) sin librerías.
- **Datos:** Archivos `.js` que exportan arrays de objetos (`VOCABULARIO` y `GRAMATICA`) para evitar problemas de CORS si se abre el archivo en local (`file://`).
- **UI/UX:** Uso intensivo de CSS Grid, Flexbox y variables CSS para el diseño adaptativo y los temas de color.

## 📂 Estructura del Proyecto

```text
/
├── index.html            # Esqueleto de la aplicación y sistema de pestañas
├── app.js                # Lógica principal (renderizado, filtros, modales, acordeones)
├── datos_vocabulario.js  # Base de datos de vocabulario
├── datos_gramatica.js    # Base de datos de gramática
└── README.md             # Este archivo
```

## 🚀 Cómo usarlo en local

Al no tener dependencias externas ni backend, no necesitas instalar nada. 

1. Descarga o clona este repositorio.
2. Abre el archivo `index.html` en tu navegador web (Firefox, Chrome, etc.).
3. ¡Listo! La aplicación cargará todos los datos locales.

*(Nota: Algunos navegadores muy estrictos con la seguridad pueden bloquear la carga de los archivos `.js` si se abren con doble clic. Si tienes problemas, puedes levantar un servidor local rápido con Python en la carpeta del proyecto: `python3 -m http.server`).*

## 📝 Estructura de los Datos

Si quieres añadir o modificar contenido manualmente, los datos siguen esta estructura:

**Vocabulario (`datos_vocabulario.js`):**
```javascript
{ 
  palabra: "水", 
  lecturas: [{ lectura: "みず", traduccion: "agua", nivel: "A1" }], 
  tipo: "sustantivo" 
},
{ 
  palabra: "書く", 
  lecturas: [{ lectura: "かく", traduccion: "escribir", nivel: "A1" }], 
  tipo: "verbo", 
  grupo: 1, 
  transitivo: true, 
  conjugaciones: { 
    indicativa: "書く", 
    progresiva: "書いている", 
    pasada: "書いた", 
    negativa: "書かない", 
    imperativa: "書け", 
    potencial: "書ける", 
    condicional: "書けば / 書いたら", 
    volitiva: "書こう" 
  } 
},
```


**Gramática (`datos_gramatica.js`):**
```javascript
{ 
  categoria: "1. Los Cimientos", 
  subcategorias: [
    { 
      nombre: "Partículas", 
      usos: [{ patron: "は", significado: "Tema", ejemplos: [...] }] 
    }
  ]
}
```

## 🤖 Créditos y Transparencia

- **Código y UI:** Desarrollados con la asistencia de un modelo de lenguaje (IA) para la generación de código y optimización del DOM.
- **Contenido didáctico (gramática y vocabulario):** Estructurado y redactado con asistencia de IA, partiendo de apuntes personales y datos del idioma japonés. Revisado y dirigido por el autor.
