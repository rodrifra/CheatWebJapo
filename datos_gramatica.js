const GRAMATICA = [
    {
    categoria: "1. Los Cimientos (Partículas y Estructuras Básicas)",
    subcategorias: [
      {
        nombre: "El Tema y el Sujeto (は vs が)",
        usos: [
          {
            id: "P13",
            patron: "は (wa) vs が (ga)",
            significado: "Tema de la conversación vs. Sujeto de la acción",
            forma: "は (Tema) / が (Sujeto)",
              explicacion: "は marca el TEMA de la conversación ('En cuanto a...'). Se usa para información conocida o para contrastar. が marca el SUJETO que realiza la acción, y se usa para información NUEVA o para responder a '¿Quién?' o '¿Qué?'.",
              ejemplos: [
                { jp: "私は学生です。", es: "En cuanto a mí, soy estudiante. (Tema: は)" },
                { jp: "誰が来ましたか？ → 田中さんが来ました。", es: "¿Quién vino? → Vino el señor Tanaka. (Sujeto nuevo: が)" },
                { jp: "象は鼻が長いです。", es: "En cuanto al elefante, tiene la trompa larga. (Tema: は, Sujeto de la característica: が)" }
              ],
              excepciones: "Con adjetivos como 好き (gustar), わかる (entender) o できる (poder), el objeto suele llevar が, no を.",
              errores: "Usar は para responder a una pregunta de '¿Quién?': ✗ 誰が来ましたか？ → 田中さんは来ました (suena a que estás contrastando: 'En cuanto a Tanaka, vino, pero otros no')."
          }
        ]
      },
      {
        nombre: "Las 3 Partículas Espaciales (El Mapa)",
        usos: [
          {
            id: "P1",
            patron: "に (ni) - La Diana 🎯",
            significado: "Punto exacto (Destino, Existencia, Tiempo, Frecuencia)",
            forma: "Lugar/Tiempo + に",
            explicacion: "Imagina que に es una diana. Marca el punto exacto al que algo va o donde algo está. También se usa para el tiempo exacto y la frecuencia.",
            ejemplos: [
              { jp: "学校に行きます。", es: "Voy a la escuela. (Destino - Punto final)" },
              { jp: "部屋に猫がいます。", es: "Hay un gato en la habitación. (Existencia - Dónde está)" },
              { jp: "3時に会いましょう。", es: "Reunámonos a las 3. (Tiempo exacto)" },
              { jp: "一日に3回薬を飲みます。", es: "Tomo medicina 3 veces al día. (Frecuencia)" },
              { jp: "先生に褒められる。", es: "Ser elogiado por el profesor. (Agente en pasiva)" }
            ],
            excepciones: "Con verbos de movimiento, indica el destino final, no el trayecto.",
            errores: "Usar で para destino por calco del español: ✗ 学校で行きます."
          },
          {
            id: "P2",
            patron: "で (de) - La Herramienta/Escenario 🛠️🎭",
            significado: "Medio, instrumento, lugar de acción o causa",
            forma: "Lugar/Herramienta/Sustantivo (causa) + で",
            explicacion: "Imagina que で es el escenario donde ocurre la obra (la acción) o la herramienta con la que se hace. También se usa para el material y la causa.",
            ejemplos: [
              { jp: "公園で遊びます。", es: "Juego en el parque. (Lugar de acción - Escenario)" },
              { jp: "電車で行きます。", es: "Voy en tren. (Medio/Herramienta)" },
              { jp: "ペンで書きます。", es: "Escribo con bolígrafo. (Herramienta)" },
              { jp: "木で作ります。", es: "Hacer de madera. (Material)" },
              { jp: "風邪で学校を休みました。", es: "Falté a la escuela por un resfriado. (Causa)" }
            ],
            excepciones: "El mismo で cubre dos funciones (lugar y medio); el contexto desambigua.",
            errores: "Confundir で de lugar con で de medio cuando el sustantivo puede ser ambos (ej. 電話で — siempre es medio)."
          },
          {
            id: "P3",
            patron: "を (o) - El Recorrido / Objeto 🚶‍♂️🍎",
            significado: "Objeto directo o espacio que se atraviesa",
            forma: "Objeto/Espacio + を",
            explicacion: "Imagina que を es el recorrido que haces al caminar o el objeto que coges. Marca lo que comes, lo que atraviesas o de donde sales.",
            ejemplos: [
              { jp: "リンゴを食べます。", es: "Como una manzana. (Objeto directo)" },
              { jp: "公園を散歩します。", es: "Paseo por el parque. (Espacio recorrido)" },
              { jp: "空を飛びます。", es: "Vuelo por el cielo. (Atravesar el espacio)" },
              { jp: "家を出ます。", es: "Salgo de casa. (Punto de partida)" }
            ],
            excepciones: "Se usa con verbos de movimiento para indicar el área que se recorre (散歩する, 歩く, 飛ぶ, 旅行する).",
            errores: "Usarlo con verbos de estado."
          },
          {
            id: "P4",
            patron: "へ (e) - Hacia (Dirección)",
            significado: "Hacia / Dirección del movimiento",
            forma: "Lugar + へ + Verbo de movimiento",
              explicacion: "Indica la dirección hacia donde se mueve el sujeto. Es muy similar a に, pero へ enfatiza el trayecto o el rumbo (la flecha ➡️) en lugar del punto exacto de llegada (la diana 🎯).",
              ejemplos: [
                { jp: "日本へ行きます。", es: "Voy hacia Japón. (Enfoca la dirección)" },
                { jp: "駅へ向かいます。", es: "Me dirijo a la estación." }
              ],
              excepciones: "A menudo es intercambiable con に con verbos como 行く, 来る, 帰る, pero no se puede usar con verbos que no implican movimiento.",
              errores: "Usar へ con verbos de existencia (✗ 部屋へ猫がいます). Para existencia siempre se usa に."
          },
        ]
      },
      {
        nombre: "Partículas de Conexión (Y / O / Solo / Razones)",
        usos: [
          {
            id: "P5",
            patron: "と (to) - Y (lista cerrada) / Con",
            significado: "Y (lista completa) / Con (compañía)",
            forma: "Sustantivo + と + Sustantivo / Persona + と + Verbo",
            explicacion: "Une dos elementos que forman una lista completa (A y B, y no hay más). También indica con quién se hace algo.",
            ejemplos: [
              { jp: "パンと卵を買いました。", es: "Compré pan y huevos. (Lista completa)" },
              { jp: "友達と映画を見ます。", es: "Veré una película con mi amigo. (Compañía)" }
            ],
            excepciones: "Para listas incompletas se usa や.",
            errores: "Usar と para listas infinitas: ✗ リンゴとバナナとイチゴと..."
          },
          {
            id: "P6",
            patron: "や (ya) - Y (lista incompleta)",
            significado: "Y (entre otras cosas)",
            forma: "Sustantivo + や + Sustantivo",
            explicacion: "Se usa para enumerar cosas de forma no exhaustiva. Implica que hay más elementos que no se mencionan. A menudo va acompañado de など (etcétera).",
            ejemplos: [
              { jp: "机の上に本やノートがあります。", es: "Sobre la mesa hay libros, cuadernos, etc." },
              { jp: "パンや卵を買いました。", es: "Compré pan, huevos, entre otras cosas." }
            ],
            excepciones: "Se puede usar や...など para ser aún más explícito con la lista abierta.",
            errores: "Confundir con と (lista completa)."
          },
          {
            id: "P7",
            patron: "か (ka) - O (Elección)",
            significado: "O (Elegir entre opciones)",
            forma: "Sustantivo + か + Sustantivo",
            explicacion: "Se usa para ofrecer una elección entre dos o más opciones. Al final de la frase, か es la partícula de pregunta.",
            ejemplos: [
              { jp: "コーヒーか紅茶を飲みますか。", es: "¿Beberás café o té?" },
              { jp: "日本語か英語で話してください。", es: "Por favor, habla en japonés o inglés." }
            ],
            excepciones: "Con pronombres interrogativos, significa 'algo/alguien': 誰か (alguien), 何か (algo).",
            errores: "Usar と para elecciones cuando quieres decir 'o'."
          },
          {
            id: "P14",
            patron: "も (mo) - También / Tampoco",
            significado: "También... / Tampoco...",
            forma: "Sustantivo + も",
              explicacion: "Se usa para indicar que algo es igual que lo anterior ('también'). Sustituye a las partículas は y が. En oraciones negativas, significa 'tampoco'.",
              ejemplos: [
                { jp: "私は学生です。田中さんも学生です。", es: "Soy estudiante. El señor Tanaka también es estudiante." },
                { jp: "私は行きません。彼も行きません。", es: "Yo no voy. Él tampoco va." },
                { jp: "これもください。", es: "Esto también, por favor." }
              ],
              excepciones: "No se puede usar junto a は o が (no se dice ✗ 私がも). Si quieres usar も con otras partículas como に o で, estas se mantienen (例: 東京にも行きました - También fui a Tokio).",
              errores: "Usar は junto a も: ✗ 私はも行きます → ✓ 私も行きます."
          },
          {
            id: "P8",
            patron: "だけ (dake) - Solo (afirmativo)",
            significado: "Solo / Únicamente",
            forma: "Sustantivo + だけ",
              explicacion: "Indica que no hay nada más que eso, pero de forma neutral (a diferencia de しか, que siempre va con negación). Puede ir seguido de partículas como で o が.",
              ejemplos: [
                { jp: "水だけあります。", es: "Solo hay agua. (Neutral)" },
                { jp: "これだけください。", es: "Solo deme esto, por favor." },
                { jp: "一人だけで行きます。", es: "Iré solo (una persona)." }
              ],
              excepciones: "Puede usarse con verbos negativos (水だけない), pero lo más común es verlo en afirmativo.",
              errores: "Confundirlo con しか (que enfatiza la falta de otras cosas y exige verbo negativo)."
          },
          {
            id: "P9",
            patron: "しか (shika) - Solo (con negación)",
            significado: "Solo / Nada más que...",
            forma: "Sustantivo + しか + Verbo en negativo",
            explicacion: "Indica que no hay nada más que eso. A diferencia de だけ (que es neutral), しか siempre requiere un verbo en negativo y enfatiza la falta de otras opciones.",
            ejemplos: [
              { jp: "水しかありません。", es: "Solo hay agua. (Nada más que agua)" },
              { jp: "日本語しか話せません。", es: "Solo puedo hablar japonés." }
            ],
            excepciones: "Siempre debe ir con una negación al final de la oración.",
            errores: "Usar しか con verbo afirmativo: ✗ 水しかあります → ✓ 水しかありません."
          },
          {
            id: "P11",
            patron: "S1 し、S2 し",
            significado: "Y además... / (Lista de razones o acciones)",
            forma: "Oración 1 (forma llana o cortés) + し、Oración 2 + し",
              explicacion: "Se usa para enumerar dos o más acciones o razones, generalmente para justificar algo. A diferencia de たり, し se usa a menudo para dar razones. Implica que puede haber más razones no mencionadas.",
              ejemplos: [
                { jp: "この店は安いし、美味しいし、よく来ます。", es: "Esta tienda es barata y además está rica, así que vengo a menudo." },
                { jp: "今日は雨だし、寒いし、出かけたくないです。", es: "Hoy llueve y además hace frío, así que no quiero salir." }
              ],
              excepciones: "El tiempo verbal (pasado/presente) y la forma (afirmativa/negativa) pueden variar en cada oración.",
              errores: "Usarlo para enumerar objetos (para eso se usa や o と)."
          },
          {
            id: "P12",
            patron: "N-でも (Incluso / Sugerencia)",
            significado: "Incluso... / Algo como... (Sugerencia)",
            forma: "Sustantivo + でも",
              explicacion: "Tiene dos usos principales. 1) Dar un ejemplo extremo ('incluso un niño'). 2) Hacer una sugerencia suave ('¿y si tomamos un té o algo?').",
              ejemplos: [
                { jp: "子供でも分かります。", es: "Incluso un niño lo entiende. (Ejemplo extremo)" },
                { jp: "お茶でも飲みませんか。", es: "¿No tomamos un té o algo? (Sugerencia)" },
                { jp: "先生でも間違えることがあります。", es: "Incluso los profesores a veces se equivocan." }
              ],
              excepciones: "No confundir con el でも que significa 'pero' al principio de una frase (接続詞 - setsuzokushi).",
              errores: "Usarlo para sugerencias con verbos (para eso se usa 〜てみませんか)."
          },
        ]
      },
      {
        nombre: "Preguntas y Cantidades Indefinidas",
        usos: [
          {
            id: "P9",
            patron: "なん／いつ／どこ／いくつ でも ＿＿＿",
            significado: "Cualquier... / En cualquier...",
            forma: "Pronombre interrogativo (何, いつ, どこ, 誰, いくつ) + でも",
            explicacion: "Al añadir でも a un pronombre interrogativo, se expresa 'cualquiera' o 'en cualquier momento/lugar'.",
            ejemplos: [
              { jp: "何でも食べます。", es: "Como cualquier cosa (de todo). (何でも)" },
              { jp: "この店はいつでも空いています。", es: "Esta tienda está vacía en cualquier momento. (いつでも)" },
              { jp: "どこでもいいです。", es: "Cualquier sitio está bien. (どこでも)" },
              { jp: "誰でも分かります。", es: "Cualquiera lo entiende. (誰でも)" },
              { jp: "いくつでも持っていってください。", es: "Llévate tantos como quieras. (いくつでも)" }
            ],
            excepciones: "Para 'nada' o 'nadie' se usa el interrogativo + も + verbo negativo (何もない, 誰もいない).",
            errores: "Confundir でも (cualquiera) con ても (aunque): ✗ 誰ても → ✓ 誰でも."
          }
        ]
      }
    ]
  },
  {
    categoria: "2. La Forma て (El Conector Universal)",
    subcategorias: [
      {
        nombre: "Acción y Estado",
        usos: [
          {
            id: "T1",
            patron: "V-ています① (Acción en curso)",
            significado: "Estar haciendo algo (Ahora)",
            forma: "Verbo en forma て + います",
              explicacion: "Describe una acción que está ocurriendo ahora o en un periodo presente. Solo con verbos de acción continua, no con estados.",
              ejemplos: [
                { jp: "今、ごはんを食べています。", es: "Ahora estoy comiendo." },
                { jp: "雨が降っています。", es: "Está lloviendo." }
              ],
              excepciones: "Verbos de estado (ある, いる, 分かる) no se usan con esta forma.",
              errores: "✗ 知っています como 'estoy sabiendo'. En realidad significa 'sé' (estado)."
          },
          {
            id: "T2",
            patron: "V-ています② (Estado resultante)",
            significado: "Estar en un estado (Resultado)",
            forma: "Verbo intransitivo en forma て + います",
              explicacion: "Indica el estado resultante de una acción o un estado continuo. Se usa con verbos intransitivos.",
              ejemplos: [
                { jp: "私は東京に住んでいます。", es: "Vivo en Tokio. (Estado)" },
                { jp: "窓が開いています。", es: "La ventana está abierta. (Estado)" }
              ],
              excepciones: "No confundir con la acción en curso (T1). Se usa con verbos que indican un cambio de estado.",
              errores: "Usarlo con verbos transitivos para indicar estado."
          },
          {
            id: "T3",
            patron: "V-て います／V-て いる＋N（ひと）",
            significado: "Estar... (Estado de una persona) / Persona que está...",
            forma: "Verbo en forma て + います / Verbo en forma て + いる + 人 (N)",
              explicacion: "Se usa para describir el estado actual de una persona o para modificar a un sustantivo.",
              ejemplos: [
                { jp: "あの眼鏡をかけている人は誰ですか。", es: "¿Quién es esa persona que lleva gafas?" },
                { jp: "彼は東京に住んでいます。", es: "Él vive en Tokio." }
              ],
              excepciones: "Se usa mucho para profesiones (働いています) o hábitos.",
              errores: "Usar la forma diccionario para modificar: ✗ 眼鏡をかける人."
          },
          {
            id: "T4",
            patron: "V-て いました",
            significado: "Estaba haciendo algo (Pasado continuo)",
            forma: "Verbo en forma て + いました",
              explicacion: "Describe una acción que estaba ocurriendo en el pasado, a menudo cuando otra acción la interrumpió.",
              ejemplos: [
                { jp: "昨日の夜、テレビを見ていました。", es: "Anoche estaba viendo la televisión." },
                { jp: "電話が来たとき、私は寝ていました。", es: "Cuando llegó la llamada, yo estaba durmiendo." }
              ],
              excepciones: "También se usa para describir un estado en el pasado (住んでいました - vivía).",
              errores: "Confundirlo con el pasado simple (見ました - vi)."
          },
          {
            id: "T11",
            patron: "V-て あります",
            significado: "Estar hecho / Estado resultante de una acción intencionada",
            forma: "Verbo transitivo en forma て + あります",
              explicacion: "Indica que alguien realizó una acción intencionada y el resultado de esa acción permanece en el presente. A diferencia de 〜ています, aquí se enfatiza que alguien lo hizo con un propósito.",
              ejemplos: [
                { jp: "ドアが開けてあります。", es: "La puerta está abierta (alguien la abrió y la dejó así)." },
                { jp: "壁に地図が貼ってあります。", es: "El mapa está pegado en la pared (alguien lo pegó)." }
              ],
              excepciones: "Se usa casi exclusivamente con verbos transitivos. No se puede usar con verbos intransitivos (ej. ✗ 窓が開いてあります).",
              errores: "Confundirlo con 〜ています (que indica un estado natural o acción en curso)."
          },
          {
            id: "T12",
            patron: "V-て おきます",
            significado: "Hacer algo de antemano / Dejar algo preparado",
            forma: "Verbo en forma て + おきます",
              explicacion: "Indica que se realiza una acción con anticipación para un propósito futuro o como preparación. 'Dejar algo hecho'.",
              ejemplos: [
                { jp: "ホテルを予約しておきます。", es: "Reservaré el hotel de antemano." },
                { jp: "窓を閉めておきます。", es: "Cerraré la ventana (por si acaso / de antemano)." }
              ],
              excepciones: "En el habla coloquial se acorta a 〜とく (予約しとく).",
              errores: "Confundirlo con 〜てあります (que es el estado resultante, no la acción de preparar)."
          },
        ]
      },
      {
        nombre: "Peticiones y Órdenes",
        usos: [
          {
            id: "T3",
            patron: "V-てください (Petición)",
            significado: "Por favor, haz...",
            forma: "Verbo en forma て + ください",
              explicacion: "Pedir un favor o dar una instrucción educada.",
              ejemplos: [
                { jp: "ここに名前を書いてください。", es: "Por favor, escriba su nombre aquí." },
                { jp: "ちょっと待ってください。", es: "Por favor, espere un momento." }
              ],
              excepciones: "Para algo más formal: ～てくださいませんか.",
              errores: "Usarlo con superiores sin cuidado."
          },
          {
            id: "T5",
            patron: "V-て くださいませんか",
            significado: "¿Sería tan amable de...? (Petición muy educada)",
            forma: "Verbo en forma て + くださいませんか",
              explicacion: "Es una versión más formal y educada de 〜てください. Se usa con superiores.",
              ejemplos: [
                { jp: "すみませんが、窓を開けてくださいませんか。", es: "Disculpe, ¿sería tan amable de abrir la ventana?" }
              ],
              excepciones: "La forma aún más formal es 〜ていただけませんか.",
              errores: "Usarlo con amigos cercanos."
          },
          {
            id: "T4",
            patron: "V-ないでください (Petición negativa)",
            significado: "Por favor, no hagas...",
            forma: "Verbo en forma ない (sin い) + でください",
              explicacion: "Pedir educadamente que no se haga una acción.",
              ejemplos: [
                { jp: "ここで写真を撮らないでください。", es: "Por favor, no tome fotos aquí." },
                { jp: "心配しないでください。", es: "Por favor, no se preocupe." }
              ],
              excepciones: "También existe 〜ないようにしてください.",
              errores: "Usar la forma て normal para negar."
          }
        ]
      },
      {
        nombre: "Secuencias y Conexiones",
        usos: [
          {
            id: "S1",
            patron: "V1-て、V2",
            significado: "Hacer A y luego B (Secuencia)",
            forma: "Verbo 1 en forma て + Verbo 2",
              explicacion: "Conecta dos acciones que ocurren en secuencia, o donde la primera es la causa de la segunda. El tiempo verbal lo determina el último verbo.",
              ejemplos: [
                { jp: "朝起きて、顔を洗います。", es: "Me levanto por la mañana y me lavo la cara." },
                { jp: "電車に乗って、会社へ行きます。", es: "Tomo el tren y voy a la empresa." }
              ],
              excepciones: "Si quieres indicar una pausa, se usa 〜てから.",
              errores: "Usarlo para acciones simultáneas de dos sujetos diferentes."
          },
          {
            id: "S2",
            patron: "V1-て から、V2",
            significado: "Después de hacer A, hacer B",
            forma: "Verbo 1 en forma て + から、Verbo 2",
              explicacion: "Enfatiza que la acción 1 debe ocurrir y terminar antes que la acción 2. Es más estricto que 〜あとで, que simplemente indica que algo ocurre después, sin la misma urgencia o secuencia inmediata.",
              ejemplos: [
                { jp: "手を洗ってから、ごはんを食べます。", es: "Después de lavarme las manos, como." },
                { jp: "宿題をしてから、ゲームをします。", es: "Después de hacer los deberes, juego a videojuegos." }
              ],
              excepciones: "No se puede usar con acciones que ocurren al mismo tiempo.",
              errores: "Usar la forma て normal cuando el orden es estricto."
          },
          {
            id: "S5",
            patron: "V1-ながら V2",
            significado: "Hacer V2 mientras se hace V1",
            forma: "Verbo 1 en forma ます (sin ます) + ながら + Verbo 2",
              explicacion: "Dos acciones simultáneas por la misma persona. La acción principal es V2.",
              ejemplos: [
                { jp: "音楽を聞きながら、勉強します。", es: "Estudio mientras escucho música." },
                { jp: "コーヒーを飲みながら、話しましょう。", es: "Hablemos mientras tomamos café." }
              ],
              excepciones: "El sujeto de ambas acciones debe ser el mismo.",
              errores: "Usar la forma て: ✗ 聞いてながら."
          }
        ]
      },
      {
        nombre: "Conexión de Adjetivos y Sustantivos",
        usos: [
          {
            id: "A1",
            patron: "イA-くて／ナA-で／N で、イA／ナA／…",
            significado: "Y (conexión de adjetivos y sustantivos)",
            forma: "Adjetivo い (quitar い) + くて / Adjetivo な + で / Sustantivo + で",
              explicacion: "Se usa para conectar dos o más adjetivos o sustantivos que describen lo mismo.",
              ejemplos: [
                { jp: "この部屋は広くて、明るいです。", es: "Esta habitación es amplia y luminosa. (Adjetivos い)" },
                { jp: "彼は静かで、真面目です。", es: "Él es tranquilo y serio. (Adjetivos な)" },
                { jp: "私は学生で、田中です。", es: "Soy estudiante y me llamo Tanaka. (Sustantivos)" }
              ],
              excepciones: "La excepción más famosa es いい (bueno): se convierte en よくて (no いくて).",
              errores: "Usar て con adjetivos な o sustantivos: ✗ 静かくて → ✓ 静かで."
          },
          {
            id: "A2",
            patron: "イA-くて／ナA で イA-い／ナA-な N (Modificación)",
            significado: "Un N que es [Adj1] y [Adj2]",
            forma: "Adj 1 (en forma て) + Adj 2 + Sustantivo",
              explicacion: "Cuando quieres describir un sustantivo con dos adjetivos, el primero va en forma て y el segundo se une directamente.",
              ejemplos: [
                { jp: "広くて明るい部屋です。", es: "Es una habitación amplia y luminosa." },
                { jp: "静かで綺麗な公園です。", es: "Es un parque tranquilo y bonito." }
              ],
              excepciones: "El último adjetivo antes del sustantivo mantiene su forma original (い o な).",
              errores: "Poner el último adjetivo en forma て: ✗ 広くて明るくて部屋です."
          },
          {
            id: "A3",
            patron: "イA-くて／イA-くなくて、ナA-で／ナA-じゃなくて、…",
            significado: "Y (conexión afirmativa y negativa)",
            forma: "Afirmativo: い→くて / な→で. Negativo: い→くなくて / な→じゃなくて",
              explicacion: "Permite conectar un adjetivo afirmativo con uno negativo (o viceversa).",
              ejemplos: [
                { jp: "この部屋は広くて、綺麗じゃないです。", es: "Esta habitación es amplia pero no bonita." },
                { jp: "この本は安くなくて、面白いです。", es: "Este libro no es barato, pero es interesante." }
              ],
              excepciones: "Para el negativo de いい: よくなくて.",
              errores: "Usar くて para negativos de adjetivos い: ✗ 高くてない."
          },
          {
            id: "A4",
            patron: "N1 じゃなくて、N2",
            significado: "No es N1, sino N2 (Conexión negativa)",
            forma: "Sustantivo 1 + じゃなくて (o ではなくて) + Sustantivo 2",
              explicacion: "Se usa para negar el primer sustantivo y afirmar el segundo.",
              ejemplos: [
                { jp: "これはコーヒーじゃなくて、紅茶です。", es: "Esto no es café, sino té." },
                { jp: "彼は学生じゃなくて、先生です。", es: "Él no es estudiante, sino profesor." }
              ],
              excepciones: "En un contexto formal se usa ではなくて.",
              errores: "Usar じゃないで en lugar de じゃなくて: ✗ コーヒーじゃないで、紅茶です."
          }
        ]
      },
      {
        nombre: "Permiso, Prohibición y Otros Usos",
        usos: [
          {
            id: "PM1",
            patron: "N でも いいですか / V-ても いいですか",
            significado: "¿Está bien si...? / ¿Puedo...?",
            forma: "Sustantivo + でも いいですか / Verbo en forma て + も いいですか",
              explicacion: "Se usa para pedir permiso de forma educada.",
              ejemplos: [
                { jp: "写真を撮ってもいいですか。", es: "¿Puedo tomar fotos?" },
                { jp: "ここに座ってもいいですか。", es: "¿Puedo sentarme aquí?" }
              ],
              excepciones: "En tono informal: 〜てもいい？",
              errores: "Usarlo para pedir un objeto."
          },
          {
            id: "PM2",
            patron: "V-ては いけません / V-ちゃ だめです",
            significado: "No se puede... / Está prohibido...",
            forma: "Verbo en forma て + は いけません",
              explicacion: "Expresa una prohibición o que algo no está permitido.",
              ejemplos: [
                { jp: "ここでタバコを吸ってはいけません。", es: "No se puede fumar aquí." },
                { jp: "授業中に寝てはだめです。", es: "No está permitido dormir durante la clase." }
              ],
              excepciones: "En tono informal se acorta a 〜ちゃだめ.",
              errores: "Confundirlo con 〜なくてもいいです."
          },
          {
            id: "C4",
            patron: "（いつ、なに、どこ、だれ）V-て も、＿＿＿",
            significado: "No importa cuándo / qué / dónde / quién...",
            forma: "Interrogativo + Verbo en forma て + も",
              explicacion: "Expresa que una acción o estado ocurre independientemente de la condición expresada por el interrogativo.",
              ejemplos: [
                { jp: "何を食べても、美味しいです。", es: "No importa qué coma, todo está delicioso." },
                { jp: "どこに行っても、人が多いです。", es: "No importa a dónde vaya, hay mucha gente." },
                { jp: "誰に聞いても、分かりません。", es: "No importa a quién pregunte, nadie lo sabe." }
              ],
              excepciones: "También se puede usar con adjetivos (〜くても / 〜でも).",
              errores: "Usar la forma diccionario en lugar de la forma て."
          },
          {
            id: "T6",
            patron: "V-て みます",
            significado: "Intentar hacer algo / Probar a hacer algo",
            forma: "Verbo en forma て + みます",
              explicacion: "Expresa que se va a probar o intentar una acción para ver qué pasa.",
              ejemplos: [
                { jp: "このケーキを食べてみます。", es: "Voy a probar este pastel." },
                { jp: "日本語で話してみます。", es: "Voy a intentar hablar en japonés." }
              ],
              excepciones: "En pasado (〜てみました) significa 'probé a hacer...'.",
              errores: "Confundirlo con 〜ようとします."
          },
          {
            id: "T9",
            patron: "V-て しまいました",
            significado: "Hacer algo sin querer / Acabar haciendo algo",
            forma: "Verbo en forma て + しまいました",
              explicacion: "Expresa que una acción se ha completado, o que se ha hecho algo accidentalmente con arrepentimiento.",
              ejemplos: [
                { jp: "財布を忘れてしまいました。", es: "Me he olvidado la cartera." },
                { jp: "ケーキを全部食べてしまいました。", es: "Me he comido todo el pastel." }
              ],
              excepciones: "En habla coloquial se acorta a 〜ちゃいました.",
              errores: "Usarlo para acciones planeadas con orgullo."
          },
          {
            id: "T10",
            patron: "V-て あげます",
            significado: "Hacer un favor a alguien (Dar)",
            forma: "Verbo en forma て + あげます",
              explicacion: "Indica que el hablante hace un favor a otra persona.",
              ejemplos: [
                { jp: "私は彼に日本語を教えてあげました。", es: "Le enseñé japonés (como favor)." }
              ],
              excepciones: "Puede sonar condescendiente con superiores.",
              errores: "Usarlo para favores que recibes."
          }
        ]
      }
    ]
  },
  {
    categoria: "3. Modificadores y Tiempos Verbales (El Motor)",
    subcategorias: [
      {
        nombre: "Nominalización y Modificación",
        usos: [
          {
            id: "N1",
            patron: "V-る こと (Nominalización)",
            significado: "El hecho de... / Hacer algo",
            forma: "Verbo en forma diccionario + こと",
              explicacion: "Convierte un verbo en un sustantivo. Muy usado para hablar de aficiones, habilidades o cosas que te gustan.",
              ejemplos: [
                { jp: "音楽を聞くことが好きです。", es: "Me gusta escuchar música." },
                { jp: "私の趣味は映画を見ることです。", es: "Mi afición es ver películas." }
              ],
              excepciones: "En el habla informal, a veces se usa の en lugar de こと, pero こと es más formal y seguro.",
              errores: "Usarlo con verbos de estado si no es una acción (ej. ✗ 分かることが好き)."
          },
          {
            id: "N3",
            patron: "V（ふつうけい plain form）＋人 / V（ふつうけい plain form）＋N",
            significado: "Persona que... / Cosa que... (Modificador de sustantivos)",
            forma: "Verbo/Adjetivo en forma llana + Sustantivo",
              explicacion: "En japonés, las frases que modifican a un sustantivo van delante de él, usando la forma llana.",
              ejemplos: [
                { jp: "あそこにいる人は誰ですか。", es: "¿Quién es la persona que está allí?" },
                { jp: "これは私が作ったケーキです。", es: "Este es el pastel que yo hice." }
              ],
              excepciones: "Los adjetivos な usan な, los sustantivos usan の, y los verbos/adjetivos い usan la forma llana.",
              errores: "Usar la forma ます para modificar un sustantivo: ✗ あそこにいます人."
          },
          {
            id: "N4",
            patron: "V／イA／ナA（ふつうけい plain form）のは、N です",
            significado: "Lo que [verbo/adjetivo] es N / Hacer [verbo] es N",
            forma: "Oración en forma llana + の + は、Sustantivo + です",
              explicacion: "Se usa para nominalizar una acción o un estado y definir qué es. El の sustituye a un sustantivo que se explica después.",
              ejemplos: [
                { jp: "私が好きなのは、日本のアニメです。", es: "Lo que me gusta son los animes japoneses." },
                { jp: "一番大切なのは、健康です。", es: "Lo más importante es la salud." }
              ],
              excepciones: "En lugar de の, se puede usar こと en contextos más formales.",
              errores: "Usar が en lugar de は para el tema: ✗ 好きなのが、アニメです."
          },
          {
            id: "N6",
            patron: "イA／ナA ＋ さ",
            significado: "Convertir adjetivos en sustantivos abstractos",
            forma: "Adjetivo い (quitar い) + さ / Adjetivo な (quitar な) + さ",
              explicacion: "El sufijo さ se añade a adjetivos para crear sustantivos que expresan la cualidad o el grado de ese adjetivo.",
              ejemplos: [
                { jp: "この本の面白さは、登場人物です。", es: "La parte interesante de este libro son los personajes." },
                { jp: "この仕事の大変さが分かります。", es: "Entiendo lo duro de este trabajo." }
              ],
              excepciones: "No se usa con sustantivos.",
              errores: "Usar さ con sustantivos: ✗ 学生さ."
          }
        ]
      },
      {
        nombre: "Cambios, Estados y Decisiones",
        usos: [
          {
            id: "C1",
            patron: "N に／イA-く／ナA-に なります",
            significado: "Convertirse en... / Llegar a ser...",
            forma: "Sustantivo + に + なります / Adjetivo い (sin い) + く + なります / Adjetivo な + に + なります",
              explicacion: "Indica un cambio de estado o una transformación.",
              ejemplos: [
                { jp: "先生になりました。", es: "Me convertí en profesor." },
                { jp: "寒くなりました。", es: "Se ha vuelto frío." },
                { jp: "静かになりました。", es: "Se ha vuelto tranquilo." }
              ],
              excepciones: "Para 'bueno' (いい), se usa よく なります (no いく).",
              errores: "Usar に con adjetivos い: ✗ 寒いに なりました."
          },
          {
            id: "C2",
            patron: "V-る ように なりました",
            significado: "Haber llegado a poder hacer... / Haberse acostumbrado a...",
            forma: "Verbo en forma diccionario + ように なりました",
              explicacion: "Indica un cambio de estado o hábito a lo largo del tiempo.",
              ejemplos: [
                { jp: "日本語が話せるようになりました。", es: "He llegado a poder hablar japonés." },
                { jp: "毎朝、走るようになりました。", es: "He empezado a correr cada mañana." }
              ],
              excepciones: "Para cambios de estado físico o de adjetivos se usa 〜く/〜に なりました.",
              errores: "Usarlo con verbos en forma ます: ✗ 話しますようになりました."
          },
          {
            id: "C3",
            patron: "V-る ことに しました / V-る ことに なりました",
            significado: "He decidido hacer... / Se ha decidido que...",
            forma: "Verbo en forma diccionario + ことに しました / ことになりました",
              explicacion: "ことにしました expresa una decisión propia. ことになりました expresa una decisión externa o un acuerdo.",
              ejemplos: [
                { jp: "毎日、日本語を勉強することにしました。", es: "He decidido estudiar japonés todos los días." },
                { jp: "来月、結婚することになりました。", es: "Se ha decidido que me casaré el mes que viene." }
              ],
              excepciones: "No usar ことにしました para decisiones de otras personas.",
              errores: "Usarlo para decisiones espontáneas en el momento."
          },
          {
            id: "C4",
            patron: "V-た まま です",
            significado: "Dejar algo como está / Hacer algo sin cambiar el estado",
            forma: "Verbo en forma た + まま",
              explicacion: "Indica que se realiza una acción sin cambiar el estado resultante de una acción anterior.",
              ejemplos: [
                { jp: "窓を開けたまま、寝ました。", es: "Dormí con la ventana abierta." },
                { jp: "電気をつけたまま、出かけました。", es: "Salí con la luz encendida." }
              ],
              excepciones: "Se usa con verbos transitivos (acción consciente). Si el estado es natural, se usa 〜ています.",
              errores: "Usarlo con verbos intransitivos: ✗ 窓が開いたまま."
          },
          {
            id: "C5",
            patron: "V-て いきます／きます (Dirección del cambio)",
            significado: "Ir haciendo... / Venir haciendo...",
            forma: "Verbo en forma て + いきます / きます",
              explicacion: "Indica la dirección de un cambio o una acción continua en el tiempo o el espacio.",
              ejemplos: [
                { jp: "これからも日本語を勉強していきます。", es: "A partir de ahora seguiré estudiando japonés." },
                { jp: "日本に来てから、日本語が分かってきました。", es: "Desde que vine a Japón, he empezado a entender el japonés." }
              ],
              excepciones: "También se usa en sentido físico: 走っていきます, 走ってきます.",
              errores: "Usarlo con verbos de estado (ある, いる)."
          },
          {
            id: "C6",
            patron: "V-なく なりました (Cambio negativo)",
            significado: "Dejar de hacer... / Ya no hacer...",
            forma: "Verbo en forma ない (sin い) + く + なりました",
              explicacion: "Indica un cambio de estado en el que una acción que antes se realizaba ha dejado de hacerse.",
              ejemplos: [
                { jp: "最近、肉を食べなくなりました。", es: "Últimamente he dejado de comer carne." },
                { jp: "子供のときは、野菜が好きじゃなかったですが、今は食べるようになりました。", es: "Cuando era niño no me gustaban las verduras, pero ahora he llegado a comerlas." }
              ],
              excepciones: "Para cambios en adjetivos い, se usa 〜く なりました.",
              errores: "Usar la forma diccionario con なく: ✗ 食べるなくなりました."
          },
          {
            id: "C7",
            patron: "N1 を N2 に します",
            significado: "Convertir N1 en N2 / Hacer N1 como N2",
            forma: "Sustantivo 1 + を + Sustantivo 2 + に + します",
              explicacion: "Indica que alguien (el sujeto) cambia o transforma algo (N1) en otra cosa (N2). Es una acción intencionada.",
              ejemplos: [
                { jp: "部屋を綺麗にします。", es: "Voy a limpiar la habitación." },
                { jp: "この本を日本語に翻訳します。", es: "Voy a traducir este libro al japonés." }
              ],
              excepciones: "También se usa para pedir algo en un restaurante: コーヒーにします.",
              errores: "Usar が en lugar de を: ✗ 部屋が綺麗にします."
          },
          {
            id: "C8",
            patron: "N1 が N2 に なります",
            significado: "N1 se convierte en N2 (Cambio natural)",
            forma: "Sustantivo 1 + が + Sustantivo 2 + に + なります",
              explicacion: "Indica que algo (N1) se transforma en otra cosa (N2) de forma natural.",
              ejemplos: [
                { jp: "氷が水になりました。", es: "El hielo se convirtió en agua." },
                { jp: "来月、20歳になります。", es: "El mes que viene cumpliré 20 años." }
              ],
              excepciones: "La diferencia con を に します es que aquí no hay un 'alguien' haciendo la acción.",
              errores: "Usar を en lugar de が: ✗ 氷を水になりました."
          }
        ]
      },
      {
        nombre: "Tiempo, Frecuencia y Condicionales",
        usos: [
          {
            id: "T1",
            patron: "N の まえに、V / V-る まえに",
            significado: "Antes de...",
            forma: "Sustantivo + の + まえに / Verbo en forma diccionario + まえに",
              explicacion: "Indica que una acción ocurre antes que otra. El verbo antes de まえに siempre va en forma diccionario.",
              ejemplos: [
                { jp: "食事のまえに、手を洗います。", es: "Antes de la comida, me lavo las manos." },
                { jp: "寝るまえに、歯を磨きます。", es: "Antes de dormir, me lavo los dientes." }
              ],
              excepciones: "El verbo antes de まえに NO se conjuga en pasado.",
              errores: "Usar la forma た antes de まえに: ✗ 食べたまえに."
          },
          {
            id: "T2",
            patron: "N の あとで、V",
            significado: "Después de...",
            forma: "Sustantivo + の + あとで / Verbo en forma た + あとで",
              explicacion: "Indica que una acción ocurre después de otra. A diferencia de 〜てから (que es más estricto y exige que la acción 1 termine por completo antes de la 2), あとで simplemente indica que ocurre en un momento posterior, sin tanta urgencia o secuencia inmediata.",
              ejemplos: [
                { jp: "仕事のあとで、飲みに行きます。", es: "Después del trabajo, voy a beber." },
                { jp: "映画を見たあとで、食事をします。", es: "Después de ver la película, comeremos." }
              ],
              excepciones: "La versión informal de あとで es あと.",
              errores: "Usar la forma diccionario antes de あとで: ✗ 映画を見るあとで."
          },
          {
            id: "T3",
            patron: "V1-る まで、V2",
            significado: "Hasta que...",
            forma: "Verbo 1 en forma diccionario + まで、Verbo 2",
              explicacion: "Indica el límite temporal de una acción.",
              ejemplos: [
                { jp: "雨が止むまで、待ちます。", es: "Esperaré hasta que pare de llover." }
              ],
              excepciones: "Se puede usar までに para indicar el plazo límite.",
              errores: "Usar までに para acciones continuas."
          },
          {
            id: "T4",
            patron: "N の とき／V-るとき",
            significado: "Cuando... / En el momento de...",
            forma: "Sustantivo + の + とき / Verbo (forma llana) + とき",
              explicacion: "Se usa para indicar el momento o la condición en la que ocurre algo.",
              ejemplos: [
                { jp: "子供のとき、よく遊びました。", es: "Cuando era niño, jugaba mucho." },
                { jp: "忙しいとき、お茶を飲みます。", es: "Cuando estoy ocupado, bebo té." }
              ],
              excepciones: "Con adjetivos な, se usa な + とき.",
              errores: "Olvidar el な en los adjetivos na: ✗ 静かとき."
          },
          {
            id: "T5",
            patron: "週／月／年 に ～回（ぐらい）",
            significado: "~ veces por semana / mes / año",
            forma: "Periodo + に + Número + 回 (veces) + (ぐらい)",
              explicacion: "Se usa para expresar la frecuencia con la que ocurre algo.",
              ejemplos: [
                { jp: "週に2回、テニスをします。", es: "Juego al tenis 2 veces por semana." },
                { jp: "月に1回ぐらい、映画を見ます。", es: "Veo películas más o menos 1 vez al mes." }
              ],
              excepciones: "Para 'una vez al día' se usa 一日に1回.",
              errores: "Usar la partícula で en lugar de に: ✗ 週で2回."
          },
          {
            id: "T6",
            patron: "V-て ～年／～か月に なります",
            significado: "Llevar haciendo algo durante...",
            forma: "Verbo en forma て + 期間 + に なります",
              explicacion: "Indica cuánto tiempo ha pasado desde que se empezó una acción o estado.",
              ejemplos: [
                { jp: "日本に来て、1年になります。", es: "Llevo 1 año desde que vine a Japón." },
                { jp: "日本語を勉強して、半年になります。", es: "Llevo medio año estudiando japonés." }
              ],
              excepciones: "Se usa el verbo en forma て para indicar el inicio de la acción.",
              errores: "Usar ました en lugar de になります."
          },
          {
            id: "S3",
            patron: "S1 ば／なければ、S2",
            significado: "Si... / A menos que... (Condicional formal)",
            forma: "Verbo en forma ば / ない (sin い) + ければ",
              explicacion: "Condicional formal. La forma negativa significa 'si no...'.",
              ejemplos: [
                { jp: "お金があれば、買います。", es: "Si tengo dinero, lo compraré." },
                { jp: "行かなければ、分かりません。", es: "Si no voy, no lo entenderé." }
              ],
              excepciones: "En el habla coloquial, なければ se acorta a なきゃ.",
              errores: "Usar たら en contextos muy formales."
          }
        ]
      },
      {
        nombre: "Habilidad, Deseo y Propósito",
        usos: [
          {
            id: "H1",
            patron: "N が V-（られ）ます (Potencial)",
            significado: "Poder hacer... / Ser capaz de...",
            forma: "Grupo 1: U→E+ます / Grupo 2: quitar る+られます / Irregulares: できます, こられます",
              explicacion: "Indica la capacidad o posibilidad de realizar una acción.",
              ejemplos: [
                { jp: "私は日本語が話せます。", es: "Puedo hablar japonés." },
                { jp: "この店ではカードが使えます。", es: "En esta tienda se puede usar tarjeta." }
              ],
              excepciones: "El potencial de する es できる.",
              errores: "Usar la partícula を con el potencial."
          },
          {
            id: "H5",
            patron: "V-る ことが できます",
            significado: "Poder hacer... (Habilidad formal)",
            forma: "Verbo en forma diccionario + ことが できます",
              explicacion: "Otra forma de expresar habilidad o posibilidad. Más formal que el potencial.",
              ejemplos: [
                { jp: "私は日本語を話すことができます。", es: "Puedo hablar japonés." }
              ],
              excepciones: "Con sustantivos: することができます.",
              errores: "Usar la forma ます antes de こと: ✗ 話しますことができます."
          },
          {
            id: "D1",
            patron: "V-たいです／V-たくないです",
            significado: "Quiero hacer... / No quiero hacer...",
            forma: "Verbo en forma ます (sin ます) + たいです / たくないです",
              explicacion: "Expresa el deseo del propio hablante de realizar una acción.",
              ejemplos: [
                { jp: "日本に行きたいです。", es: "Quiero ir a Japón." },
                { jp: "肉は食べたくないです。", es: "No quiero comer carne." }
              ],
              excepciones: "No se usa para deseos de terceras personas.",
              errores: "Usarlo con la forma diccionario: ✗ 行くたい."
          },
          {
            id: "D2",
            patron: "V-つもりです／V-つもりはない",
            significado: "Tengo la intención de... / No tengo la intención de...",
            forma: "Verbo en forma diccionario + つもりです",
              explicacion: "Expresa una intención o plan firme del hablante.",
              ejemplos: [
                { jp: "来年、日本へ行くつもりです。", es: "Tengo la intención de ir a Japón el año que viene." },
                { jp: "彼と結婚するつもりはありません。", es: "No tengo la menor intención de casarme con él." }
              ],
              excepciones: "Para planes espontáneos, se usa 〜予定です.",
              errores: "Usarlo para intenciones de terceras personas."
          },
          {
            id: "D4",
            patron: "V-（よ）うと 思っています",
            significado: "Estoy pensando en hacer...",
            forma: "Verbo en forma volitiva + と 思っています",
              explicacion: "Expresa una intención o un plan que el hablante está considerando.",
              ejemplos: [
                { jp: "来年、日本へ行こうと思っています。", es: "Estoy pensando en ir a Japón el año que viene." }
              ],
              excepciones: "〜ようと思います es más inmediato.",
              errores: "Usar la forma diccionario."
          },
          {
            id: "PD1",
            patron: "S1（V ふつうけい plain form）ように、S2",
            significado: "Para que... / De modo que...",
            forma: "Verbo en forma diccionario o negativa + ように",
              explicacion: "Se usa con verbos que no son de acción voluntaria (como 分かる, 見える) o en forma negativa.",
              ejemplos: [
                { jp: "日本語が分かるように、毎日勉強します。", es: "Estudio todos los días para poder entender el japonés." },
                { jp: "風邪をひかないように、気をつけてください。", es: "Por favor, ten cuidado para no resfriarte." }
              ],
              excepciones: "Para verbos de acción voluntaria, se usa ために.",
              errores: "Usar ように con verbos de acción voluntaria."
          },
          {
            id: "PD3",
            patron: "V-る／N の ために、＿＿＿",
            significado: "Para... / Con el fin de...",
            forma: "Verbo en forma diccionario + ために / Sustantivo + の + ために",
              explicacion: "Expresa un propósito u objetivo, generalmente con verbos de acción voluntaria.",
              ejemplos: [
                { jp: "家族のために、働いています。", es: "Trabajo por mi familia." },
                { jp: "日本に留学するために、お金を貯めています。", es: "Estoy ahorrando dinero para estudiar en Japón." }
              ],
              excepciones: "También puede expresar causa o motivo.",
              errores: "Usar ために con verbos de estado como 分かる."
          },
          {
            id: "PD4",
            patron: "V-る／V-ない ように して います",
            significado: "Estoy intentando hacer... / Estoy procurando no hacer...",
            forma: "Verbo en forma diccionario o negativa + ように して います",
              explicacion: "Expresa un esfuerzo continuo o un hábito.",
              ejemplos: [
                { jp: "毎日、野菜を食べるようにしています。", es: "Todos los días procuro comer verduras." },
                { jp: "健康のために、お酒を飲まないようにしています。", es: "Por mi salud, procuro no beber alcohol." }
              ],
              excepciones: "Si quieres decir 'haz un esfuerzo por...', se usa 〜ようにしてください.",
              errores: "Usar la forma て directa."
          },
          {
            id: "PD5",
            patron: "V-る のに いいです／つかいます／…",
            significado: "Es bueno para... / Se usa para...",
            forma: "Verbo en forma diccionario + のに + いいです",
              explicacion: "Expresa el propósito o la utilidad de algo.",
              ejemplos: [
                { jp: "このナイフは野菜を切るのにいいです。", es: "Este cuchillo es bueno para cortar verduras." },
                { jp: "このアプリは日本語を勉強するのに使います。", es: "Uso esta aplicación para estudiar japonés." }
              ],
              excepciones: "En este uso, のに va precedido siempre de un verbo en forma diccionario.",
              errores: "Usar la forma た."
          },
          {
            id: "H6",
            patron: "V-やすいです／V-にくいです",
            significado: "Es fácil de... / Es difícil de...",
            forma: "Verbo en forma ます (sin ます) + やすい / にくい",
              explicacion: "Se usa para evaluar la facilidad o dificultad de realizar una acción. やすい se conjuga como un adjetivo い (やすいです, やすかったです).",
              ejemplos: [
                { jp: "この本は読みやすいです。", es: "Este libro es fácil de leer." },
                { jp: "この漢字は書きにくいです。", es: "Este kanji es difícil de escribir." }
              ],
              excepciones: "Se pueden conjugar como adjetivos い (書きにくかったです).",
              errores: "Usar la forma diccionario: ✗ 書くにくい → ✓ 書きにくい."
          },
        ]
      },
      {
        nombre: "Apariencia, Grado y Conjetura",
        usos: [
          {
            id: "A1",
            patron: "イA／ナA-そうです (Apariencia)",
            significado: "Parece que... (por lo que veo)",
            forma: "Adjetivo い (quitar い) + そうです / Adjetivo な (quitar な) + そうです",
              explicacion: "Expresa una impresión visual o una suposición basada en lo que se ve.",
              ejemplos: [
                { jp: "このケーキは美味しそうです。", es: "Este pastel parece delicioso." },
                { jp: "彼は元気そうです。", es: "Él parece estar bien." }
              ],
              excepciones: "La excepción es いい → よさそうです.",
              errores: "Usarlo con sustantivos: ✗ 学生そうです."
          },
          {
            id: "A2",
            patron: "イA／ナA-そうな N (Apariencia)",
            significado: "Un N que parece...",
            forma: "Adjetivo い (quitar い) + そうな + Sustantivo",
              explicacion: "Es la forma de usar la apariencia para modificar a un sustantivo.",
              ejemplos: [
                { jp: "美味しそうなケーキですね。", es: "Es un pastel que parece delicioso, ¿verdad?" },
                { jp: "元気そうな人ですね。", es: "Es una persona que parece estar bien." }
              ],
              excepciones: "La excepción vuelve a ser いい → よさそうな.",
              errores: "Olvidar el な."
          },
          {
            id: "A3",
            patron: "S (ふつうけい) そうです (Rumor)",
            significado: "Dicen que... / Se rumorea que...",
            forma: "Verbo/Adjetivo/Sustantivo en forma llana + そうです",
              explicacion: "Transmite información que has oído o leído.",
              ejemplos: [
                { jp: "明日は雨が降るそうです。", es: "Dicen que mañana lloverá." },
                { jp: "彼は学生だそうです。", es: "Dicen que él es estudiante." }
              ],
              excepciones: "Si la información es fiable, puedes usar 〜ということです.",
              errores: "Confundirlo con la apariencia."
          },
          {
            id: "A5",
            patron: "V-そうです／V-そうな N",
            significado: "Parece que va a... / Parece que está...",
            forma: "Verbo en forma ます (sin ます) + そうです / そうな + Sustantivo",
              explicacion: "Expresa una impresión visual sobre una acción que está a punto de ocurrir o un estado.",
              ejemplos: [
                { jp: "雨が降りそうです。", es: "Parece que va a llover." },
                { jp: "このケーキは美味しそうな N ですね。", es: "Este pastel parece delicioso. (Modificador de N: そうな)" },
                { jp: "今にも泣きそうな顔をしています。", es: "Tiene una cara como si fuera a llorar en cualquier momento. (Modificador de N: そうな)" }
              ],
              excepciones: "No confundir con el rumor (〜そうです con forma llana: 降るそうです).",
              errores: "Usar la forma diccionario antes de そうです para apariencia: ✗ 降るそうです (esto es rumor)."
          },
          {
            id: "T7b",
            patron: "N2 みたいな N1 ／ N1 は N2 みたいです",
            significado: "Parecer / Ser como...",
            forma: "Sustantivo + みたいな + Sustantivo / Sustantivo + みたいです",
              explicacion: "Se usa para hacer una comparación o decir que algo se parece a otra cosa.",
              ejemplos: [
                { jp: "彼は子供みたいです。", es: "Él parece un niño." },
                { jp: "まるで夢みたいな話ですね。", es: "Es una historia como un sueño, ¿verdad?" }
              ],
              excepciones: "En lugar de みたい, se puede usar よう (formal) o らしい (rumor).",
              errores: "Usar みたい con adjetivos o verbos."
          },
          {
            id: "E1",
            patron: "イA／ナA／V-すぎます",
            significado: "Demasiado... / Exceso de...",
            forma: "Adjetivo い (quitar い) + すぎます / Adjetivo な (quitar な) + すぎます / Verbo en forma ます (sin ます) + すぎます",
              explicacion: "Indica que algo excede el límite o es demasiado.",
              ejemplos: [
                { jp: "この問題は難しすぎます。", es: "Este problema es demasiado difícil." },
                { jp: "この部屋は静かすぎます。", es: "Esta habitación es demasiado silenciosa." },
                { jp: "昨日、食べすぎました。", es: "Ayer comí demasiado." }
              ],
              excepciones: "La excepción de siempre: いい → よすぎます.",
              errores: "Usar la forma diccionario antes de すぎます."
          },
          {
            id: "S1b",
            patron: "S（ふつうけい plain form）かもしれません",
            significado: "Puede que... / Quizás...",
            forma: "Oración en forma llana + かもしれません",
              explicacion: "Expresa una posibilidad o suposición con un grado de incertidumbre.",
              ejemplos: [
                { jp: "明日は雨が降るかもしれません。", es: "Puede que mañana llueva." },
                { jp: "彼はもう帰ったかもしれません。", es: "Puede que él ya se haya ido a casa." }
              ],
              excepciones: "En tono informal se usa かも.",
              errores: "Usar la forma cortés antes de かもしれません."
          },
          {
            id: "S2",
            patron: "〜のではないか（〜んじゃないか）",
            significado: "¿No será que...? / ¿No es posible que...?",
            forma: "Forma llana + のではないか / んじゃないか",
              explicacion: "El hablante propone una hipótesis con cierta duda.",
              ejemplos: [
                { jp: "この店は高いのではないか。", es: "¿No será que esta tienda es cara?" },
                { jp: "彼はもう帰ったんじゃないか。", es: "¿No será que ya se fue a casa?" }
              ],
              excepciones: "Na-adj y sustantivo requieren な.",
              errores: "Omitir el な."
          }
        ]
      }
    ]
  },
  {
    categoria: "4. La Oración Compleja (Conectores Lógicos)",
    subcategorias: [
      {
        nombre: "Causa y Contraste",
        usos: [
          {
            id: "L1",
            patron: "S1 から、S2",
            significado: "Como... / Porque... (Causa subjetiva)",
            forma: "Oración 1 (forma llana o cortés) + から、Oración 2",
              explicacion: "Indica causa o razón. Es más subjetivo que ので y se usa mucho para dar excusas o justificar una opinión personal.",
              ejemplos: [
                { jp: "時間がないから、行きません。", es: "Como no tengo tiempo, no voy." },
                { jp: "美味しいから、食べてみてください。", es: "Como está delicioso, pruébalo." }
              ],
              excepciones: "Puede ir al final de la frase para dar una excusa.",
              errores: "Usar から para causas objetivas en lenguaje escrito formal."
          },
          {
            id: "L1b",
            patron: "S1 ので、S2",
            significado: "Como... / Porque... (Causa objetiva)",
            forma: "Oración 1 (forma llana o cortés) + ので、Oración 2",
              explicacion: "Indica causa o razón. A diferencia de から, ので es más objetivo y suave, por lo que se usa para dar explicaciones lógicas, excusas formales o cuando quieres sonar educado.",
              ejemplos: [
                { jp: "雨が降っているので、行きません。", es: "Como está lloviendo, no iré." },
                { jp: "用事があるので、先に帰ります。", es: "Como tengo cosas que hacer, me iré antes." }
              ],
              excepciones: "Con sustantivos y adjetivos な en presente afirmativo, se usa なので (ej. 学生なので).",
              errores: "Usarlo con peticiones directas o mandatos (para eso se usa から)."
          },
          {
            id: "C1",
            patron: "イA-いけど／ナA-だけど／N だけど、イA／ナA／…",
            significado: "Pero / Aunque... (Coloquial)",
            forma: "Adjetivo い + けど / Adjetivo な (sin な) + だけど / Sustantivo + だけど",
              explicacion: "Conecta dos oraciones contrastantes. Es la versión informal de 'が'.",
              ejemplos: [
                { jp: "この部屋は広いけど、古いです。", es: "Esta habitación es amplia, pero es vieja." },
                { jp: "彼は静かだけど、面白いです。", es: "Él es tranquilo, pero es interesante." },
                { jp: "学生だけど、お金がありません。", es: "Soy estudiante, pero no tengo dinero." }
              ],
              excepciones: "En lenguaje formal, se usa が en lugar de けど.",
              errores: "Olvidar el だ en adjetivos な y sustantivos."
          },
          {
            id: "C2",
            patron: "S1 が、S2",
            significado: "Pero / Sin embargo (Formal)",
            forma: "Oración 1 + が、Oración 2",
              explicacion: "Es la versión formal de けど. También se puede usar para suavizar una negativa o una petición.",
              ejemplos: [
                { jp: "日本語は難しいですが、面白いです。", es: "El japonés es difícil, pero es interesante." },
                { jp: "すみませんが、水をください。", es: "Disculpe, pero deme agua." }
              ],
              excepciones: "No se usa para un simple 'y'.",
              errores: "Usarlo en contextos demasiado informales."
          },
          {
            id: "C4b",
            patron: "イA-くても／なくても＿＿＿ ／ ナA／N でも／じゃなくても＿＿＿",
            significado: "Aunque... / Incluso si...",
            forma: "Adjetivo い (quitar い) + くても / Adjetivo な + でも / Sustantivo + でも",
              explicacion: "Expresa una condición que no cambia el resultado de la segunda parte.",
              ejemplos: [
                { jp: "高くても、買います。", es: "Aunque sea caro, lo compraré." },
                { jp: "雨でも、試合をします。", es: "Aunque llueva, jugaremos el partido." }
              ],
              excepciones: "Forma negativa: 〜なくても.",
              errores: "Usar la forma normal con ても: ✗ 高いても."
          },
          {
            id: "C5",
            patron: "S1 のに、S2",
            significado: "A pesar de que... / Aunque... (con queja o sorpresa)",
            forma: "Oración 1 (forma llana) + のに、Oración 2",
              explicacion: "Expresa una contradicción con un matiz de queja, decepción o sorpresa. A diferencia de が o けど, のに siempre conlleva una carga emocional.",
              ejemplos: [
                { jp: "一生懸命勉強したのに、テストに落ちました。", es: "A pesar de que estudié duro, suspendí el examen." },
                { jp: "薬を飲んだのに、まだ頭が痛いです。", es: "A pesar de que me tomé la medicina, todavía me duele la cabeza." }
              ],
              excepciones: "Con sustantivos y adjetivos な en presente afirmativo se usa なのに.",
              errores: "Usarlo para simples contrastes sin emoción (para eso se usa が o けど)."
          },
        ]
      },
      {
        nombre: "Listas y Citas",
        usos: [
          {
            id: "L3",
            patron: "V-たり して、＿＿＿",
            significado: "Hacer cosas como... y (etcétera)",
            forma: "Verbo en forma た + り + して、Oración 2",
              explicacion: "Variante de 〜たり〜たりします. Se usa cuando se da un solo ejemplo de una acción para luego continuar la frase.",
              ejemplos: [
                { jp: "休みの日は、映画を見たりして、過ごします。", es: "Los días de descanso los paso haciendo cosas como ver películas." },
                { jp: "週末は、掃除をしたりして、ゆっくり休みます。", es: "Los fines de semana hago cosas como limpiar y descanso tranquilamente." }
              ],
              excepciones: "Se suele usar con el verbo する en forma て (して).",
              errores: "Usarlo con el verbo ます directamente."
          },
          {
            id: "Q1",
            patron: "S（ふつうけい plain form）と 思います",
            significado: "Creo que... / Pienso que...",
            forma: "Oración en forma llana + と 思います",
              explicacion: "Expresa una opinión o suposición personal de forma suave.",
              ejemplos: [
                { jp: "明日は雨が降ると思います。", es: "Creo que mañana lloverá." },
                { jp: "この本は面白いと思います。", es: "Pienso que este libro es interesante." }
              ],
              excepciones: "En negativo: 〜とは思いません.",
              errores: "Usar la forma cortés antes de と."
          },
          {
            id: "Q2",
            patron: "S（ふつうけい plain form）と 言っていました",
            significado: "Dijo que... / Estaba diciendo que...",
            forma: "Oración en forma llana + と 言っていました",
              explicacion: "Transmite lo que otra persona dijo.",
              ejemplos: [
                { jp: "田中さんは明日来ると言っていました。", es: "Tanaka dijo que vendría mañana." },
                { jp: "先生は試験は難しいと言っていました。", es: "El profesor dijo que el examen sería difícil." }
              ],
              excepciones: "Para citas directas, se usa 「...」と言いました.",
              errores: "Usar la forma cortés antes de と."
          },
          {
            id: "Q3",
            patron: "〜ということです (Reporte)",
            significado: "Dicen que... / Quiere decir que...",
            forma: "Oración en forma llana + ということです",
              explicacion: "Reporta información de tercera persona o explica el significado de algo de forma formal.",
              ejemplos: [
                { jp: "明日は雨だということです。", es: "Dicen que mañana lloverá." },
                { jp: "つまり、行かないということですね。", es: "Es decir, que no vas, ¿no?" }
              ],
              excepciones: "La forma 〜とのことです es aún más formal.",
              errores: "Usarlo para experiencias propias directas."
          },
          {
            id: "Q4",
            patron: "S（いつ／どこ／…ふつうけい plain form）が、しっていますか／わかりますか",
            significado: "¿Sabes...? / ¿Entiendes...?",
            forma: "Oración interrogativa (forma llana) + が + しっていますか / わかりますか",
              explicacion: "Pregunta si alguien sabe o entiende algo.",
              ejemplos: [
                { jp: "田中さんがどこにいるか、知っていますか。", es: "¿Sabes dónde está el señor Tanaka?" },
                { jp: "この言葉の意味が分かりますか。", es: "¿Entiendes el significado de esta palabra?" }
              ],
              excepciones: "En negativo se usa 知りません o 分かりません.",
              errores: "Usar la forma cortés dentro de la pregunta indirecta."
          }
        ]
      },
      {
        nombre: "Formas Corteses y Negación",
        usos: [
          {
            id: "L2",
            patron: "N／イA／ナA-です／でした／V-ます／ました (Repaso cortés)",
            significado: "Formas corteses (Presente/Pasado, Afirmativo/Negativo)",
            forma: "Sustantivo/Adjetivo + です / でした / じゃないです / じゃなかったです",
              explicacion: "Consolidación de la conjugación básica cortés.",
              ejemplos: [
                { jp: "学生です。", es: "Soy estudiante." },
                { jp: "学生でした。", es: "Era estudiante." },
                { jp: "学生じゃないです。", es: "No soy estudiante." }
              ],
              excepciones: "Los verbos NO usan です para conjugar.",
              errores: "Mezclar la forma llana con la cortés."
          },
          {
            id: "L5",
            patron: "＿＿＿ないです／＿＿＿ありません",
            significado: "Negación (informal / formal)",
            forma: "Verbo en forma ない + です / Verbo en forma ます (sin ます) + ません",
              explicacion: "Repaso de las dos formas de negar.",
              ejemplos: [
                { jp: "肉を食べないです。", es: "No como carne. (ないです)" },
                { jp: "肉を食べません。", es: "No como carne. (ません)" }
              ],
              excepciones: "ありません es la forma negativa de あります.",
              errores: "Mezclar formas: ✗ 食べませんです."
          }
        ]
      }
    ]
  },
  {
    categoria: "5. Condicionales (El 'Si...')",
    subcategorias: [
      {
        nombre: "Condicionales Básicos (と, たら, なら)",
        usos: [
          {
            id: "C1",
            patron: "V-と (Condicional natural)",
            significado: "Si / Cuando... (Consecuencia inevitable)",
            forma: "Verbo en forma diccionario + と",
              explicacion: "Expresa una consecuencia automática o natural. Si pasa A, inevitablemente pasa B. Muy usado para dar direcciones.",
              ejemplos: [
                { jp: "春になると、桜が咲きます。", es: "Cuando llega la primavera, florecen los cerezos." },
                { jp: "このボタンを押すと、ドアが開きます。", es: "Si presionas este botón, la puerta se abre." }
              ],
              excepciones: "No se puede usar con intenciones, deseos o peticiones en la segunda parte.",
              errores: "Usarlo para invitaciones: ✗ 時間があると、映画を見ますか."
          },
          {
            id: "C2",
            patron: "V-たら (Condicional de situación)",
            significado: "Si / Cuando... (Hipótesis)",
            forma: "Verbo en forma た + ら",
              explicacion: "El condicional más versátil. Se puede usar con intenciones, sugerencias o peticiones en la segunda parte.",
              ejemplos: [
                { jp: "雨が降ったら、行きません。", es: "Si llueve, no iré." },
                { jp: "時間があったら、映画を見ましょう。", es: "Si tienes tiempo, veamos una película." }
              ],
              excepciones: "También se puede usar para descubrimientos en el pasado.",
              errores: "Olvidar la ら final."
          },
          {
            id: "C4",
            patron: "N なら / V-のなら",
            significado: "Si es el caso de que... / Hablando de...",
            forma: "Sustantivo / Verbo en forma llana + なら",
              explicacion: "Da una recomendación o consejo basado en lo que acaba de decir la otra persona.",
              ejemplos: [
                { jp: "日本に行くなら、京都がおすすめです。", es: "Si vas a Japón, te recomiendo Kioto." },
                { jp: "あなたが行くなら、私も行きます。", es: "Si tú vas, yo también iré." }
              ],
              excepciones: "También se usa para expresar una condición hipotética.",
              errores: "Usarlo como un simple 'si' condicional."
          }
        ]
      },
      {
        nombre: "Condicionales Formales (ば, とすると)",
        usos: [
          {
            id: "C3",
            patron: "V-ば (Condicional formal)",
            significado: "Si... (Condición necesaria)",
            forma: "Grupo 1: U→E + ば / Grupo 2: quitar る + れば / Irregulares: すれば, くれば",
              explicacion: "Condición formal. Se usa mucho en refranes o para hablar de condiciones ideales.",
              ejemplos: [
                { jp: "時間があれば、旅行に行きたいです。", es: "Si tengo tiempo, quiero ir de viaje." },
                { jp: "お金がなければ、買えません。", es: "Si no tengo dinero, no puedo comprar." }
              ],
              excepciones: "Con adjetivos: い→ければ, な→ならば.",
              errores: "Usarlo con peticiones directas."
          },
          {
            id: "C5",
            patron: "V-ば〜ほど",
            significado: "Cuanto más... más...",
            forma: "Verbo en forma ば + Verbo en forma diccionario + ほど",
              explicacion: "Relación proporcional. A medida que A aumenta, B también lo hace.",
              ejemplos: [
                { jp: "日本語は勉強すればするほど、難しくなります。", es: "Cuanto más estudio japonés, más difícil se vuelve." },
                { jp: "高ければ高いほど、品質がいいです。", es: "Cuanto más caro, mejor es la calidad." }
              ],
              excepciones: "Con adjetivos: 高ければ高いほど.",
              errores: "Usar verbos diferentes: ✗ 食べれば飲むほど."
          },
          {
            id: "C6",
            patron: "V-とすると / V-としたら",
            significado: "Suponiendo que... / Si asumimos que...",
            forma: "Verbo en forma diccionario + とすると / としたら",
              explicacion: "Para hacer una suposición hipotética.",
              ejemplos: [
                { jp: "もし、宝くじが当たったとしたら、何をしますか。", es: "Si te tocara la lotería, ¿qué harías?" },
                { jp: "明日、雨が降るとしたら、試合は中止です。", es: "Suponiendo que mañana llueva, el partido se cancela." }
              ],
              excepciones: "としたら es más coloquial.",
              errores: "Usarlo para hechos reales."
          }
        ]
      }
    ]
  },
  {
    categoria: "6. La Voz y la Dirección (Pasiva, Causativa y Favores)",
    subcategorias: [
      {
        nombre: "Voz Pasiva y Causativa",
        usos: [
          {
            id: "V1",
            patron: "V-(ら)れます (Voz Pasiva)",
            significado: "Ser hecho / Sufrir una acción",
            forma: "Grupo 1: U→A+れます / Grupo 2: quitar る+られます / Irregulares: されます, こられます",
              explicacion: "El sujeto recibe la acción de otra persona. Se usa mucho para molestias (pasiva de sufrimiento).",
              ejemplos: [
                { jp: "先生に褒められました。", es: "Fui elogiado por el profesor." },
                { jp: "雨に降られました。", es: "Me llovió encima." }
              ],
              excepciones: "El agente que realiza la acción lleva la partícula に (o によって).",
              errores: "Olvidar la partícula に: ✗ 先生が褒められました."
          },
          {
            id: "V2",
            patron: "V-(さ)せます (Voz Causativa)",
            significado: "Hacer que alguien haga / Dejar que haga",
            forma: "Grupo 1: U→A+せます / Grupo 2: る→させます / Irregulares: させます, こさせます",
              explicacion: "El sujeto obliga o permite a otro hacer algo.",
              ejemplos: [
                { jp: "先生は学生に本を読ませました。", es: "El profesor hizo leer el libro a los estudiantes." },
                { jp: "子供に好きなものを食べさせました。", es: "Dejé que mi hijo comiera lo que quisiera." }
              ],
              excepciones: "La persona que recibe la acción lleva に (o を con transitivos).",
              errores: "Usar を con intransitivos: ✗ 学生を走らせました."
          },
          {
            id: "V3",
            patron: "V-(さ)せて ください",
            significado: "Por favor, déjame hacer... / Permíteme hacer...",
            forma: "Verbo en forma causativa + て + ください",
              explicacion: "Pedir permiso para hacer algo uno mismo de forma educada.",
              ejemplos: [
                { jp: "トイレに行かせてください。", es: "Por favor, déjeme ir al baño." },
                { jp: "少し考えさせてください。", es: "Por favor, déjeme pensarlo un poco." }
              ],
              excepciones: "Más formal: させていただけませんか.",
              errores: "Confundirlo con てください."
          },
          {
            id: "V4",
            patron: "V-(さ)せて いただきます",
            significado: "Permítame hacer... (Humilde)",
            forma: "Verbo en forma causativa + て + いただきます",
              explicacion: "Expresa humildemente que uno va a realizar una acción.",
              ejemplos: [
                { jp: "では、説明させていただきます。", es: "Permítame que le explique." }
              ],
              excepciones: "También existe させてもらいます.",
              errores: "Usarlo para acciones de otras personas."
          },
          {
            id: "V5",
            patron: "A は B に V-（ら）れます／A は B に N を V-（ら）れます",
            significado: "Sufrir que alguien haga algo a una parte de mi cuerpo",
            forma: "A (víctima) は + B (agente) に + (N を) + Verbo pasivo",
              explicacion: "Se usa cuando alguien (B) realiza una acción que afecta al sujeto (A), ya sea directamente o a través de una posesión.",
              ejemplos: [
                { jp: "私は友達に足を踏まれました。", es: "Mi amigo me pisó el pie." },
                { jp: "私は泥棒に財布を盗まれました。", es: "El ladrón me robó la cartera." }
              ],
              excepciones: "El agente siempre lleva la partícula に.",
              errores: "Usar la partícula が para la parte del cuerpo: ✗ 足が踏まれました."
          }
        ]
      },
      {
        nombre: "Dar y Recibir Favores",
        usos: [
          {
            id: "F1",
            patron: "A は B に C を あげます",
            significado: "Dar (desde la perspectiva de A)",
            forma: "A (dador) は B (receptor) に C (objeto) を あげます",
              explicacion: "Indica que alguien da algo a otra persona.",
              ejemplos: [
                { jp: "私は友達に本をあげました。", es: "Le di un libro a mi amigo." }
              ],
              excepciones: "Si el receptor es un animal o alguien inferior, se usa やります.",
              errores: "Usarlo si el dador soy yo y el receptor es mi superior."
          },
          {
            id: "F2",
            patron: "B は A に／から C を もらいます",
            significado: "Recibir (desde la perspectiva de B)",
            forma: "B (receptor) は A (dador) に/から C (objeto) を もらいます",
              explicacion: "Indica que alguien recibe algo de otra persona.",
              ejemplos: [
                { jp: "私は友達にプレゼントをもらいました。", es: "Recibí un regalo de mi amigo." }
              ],
              excepciones: "に y から son intercambiables en la mayoría de los casos.",
              errores: "Usarlo si yo soy el dador."
          },
          {
            id: "F3",
            patron: "N（ひと）は／が V-て くれます",
            significado: "Alguien me hace un favor a mí",
            forma: "Persona + は/が + Verbo en forma て + くれます",
              explicacion: "Otra persona hace un favor al hablante.",
              ejemplos: [
                { jp: "友達が私に日本語を教えてくれました。", es: "Mi amigo me enseñó japonés." }
              ],
              excepciones: "Forma humilde: くださいます.",
              errores: "Usarlo para favores que yo hago: ✗ 私が友達に教えてくれました."
          },
          {
            id: "F4",
            patron: "N（ひと）に V-て もらいます",
            significado: "Recibir un favor de alguien",
            forma: "Persona (receptor) + は + Persona (dador) + に + Verbo en forma て + もらいます",
              explicacion: "El hablante recibe un favor.",
              ejemplos: [
                { jp: "私は彼に日本語を教えてもらいました。", es: "Recibí el favor de que él me enseñara japonés." }
              ],
              excepciones: "Forma humilde: いただきます.",
              errores: "Usarlo cuando yo hago el favor."
          }
        ]
      }
    ]
  },
  {
    categoria: "7. Cantidades, Comparaciones y Definiciones",
    subcategorias: [
      {
        nombre: "Cantidades y Distribución",
        usos: [
          {
            id: "Q1",
            patron: "N（かず quantity）ずつ",
            significado: "Cada uno / En cantidades de...",
            forma: "Cantidad + ずつ",
              explicacion: "Se usa para indicar que algo se reparte en cantidades iguales o que se hace de forma repetida.",
              ejemplos: [
                { jp: "一人に2つずつあげます。", es: "Daré 2 a cada persona." },
                { jp: "毎日、少しずつ日本語を勉強しています。", es: "Estudio japonés poco a poco (un poco cada día)." }
              ],
              excepciones: "También se usa con adverbios como 少し.",
              errores: "Usarlo con el contador en lugar de la cantidad."
          },
          {
            id: "Q2",
            patron: "N（かず quantity）で＋V",
            significado: "Entre X personas / En grupos de X",
            forma: "Cantidad + で + Verbo",
              explicacion: "Indica el número de personas que realizan una acción de forma conjunta, o el precio total de un grupo de cosas.",
              ejemplos: [
                { jp: "3人で映画を見に行きます。", es: "Vamos a ver una película entre 3 personas." },
                { jp: "このみかんは5つで300円です。", es: "Estas mandarinas son 300 yenes por 5." }
              ],
              excepciones: "No confundir con el で de medio (電車で).",
              errores: "Usar に en lugar de で."
          },
          {
            id: "Q4",
            patron: "(数量) も",
            significado: "¡Hasta...! / ¡Nada menos que...!",
            forma: "Cantidad + も + Verbo",
              explicacion: "Enfatiza una cantidad, a menudo con sorpresa.",
              ejemplos: [
                { jp: "昨日、ビールを5本も飲みました。", es: "Ayer me bebí nada menos que 5 cervezas." }
              ],
              excepciones: "La partícula も sustituye a が o を.",
              errores: "Usar を con も."
          },
          {
            id: "Q5",
            patron: "N / V-て ばかり います",
            significado: "Solo / Únicamente (con matiz negativo o de exceso)",
            forma: "Sustantivo + ばかり / Verbo en forma て + ばかりいます",
              explicacion: "Indica que alguien hace algo en exceso o que solo hay una cosa. A diferencia de だけ (que es neutral), ばかり a menudo conlleva un matiz de queja o crítica.",
              ejemplos: [
                { jp: "彼は遊んでばかりいます。", es: "Él no hace más que jugar. (Queja)" },
                { jp: "この店は肉ばかりです。", es: "En esta tienda solo hay carne. (Exceso)" }
              ],
              excepciones: "Con sustantivos, ばかり significa 'solo'. Con verbos en forma て, significa 'no hacer más que...'.",
              errores: "Confundirlo con だけ (solo neutral): 水ばかり飲んでいます (No hago más que beber agua / Bebo demasiada agua) vs 水だけ飲みます (Solo bebo agua)."
          },
          {
            id: "Q6",
            patron: "N さえ",
            significado: "Incluso... / Hasta...",
            forma: "Sustantivo + さえ",
              explicacion: "Se usa para dar un ejemplo extremo. 'Incluso X (que es lo mínimo que se espera)'. A menudo se usa con negación para decir 'ni siquiera'.",
              ejemplos: [
                { jp: "子供さえ知っています。", es: "Incluso un niño lo sabe." },
                { jp: "水さえ飲みません。", es: "Ni siquiera bebo agua." }
              ],
              excepciones: "Con verbos en forma て: 〜てさえ (Incluso haciendo...).",
              errores: "Confundirlo con でも (incluso, pero でも es más general)."
          },
        ]
      },
      {
        nombre: "Comparaciones y Preferencias",
        usos: [
          {
            id: "CP1",
            patron: "N1 と N2（と）どちらが いいですか／N1 が いいです",
            significado: "¿Cuál es mejor, N1 o N2? / Prefiero N1",
            forma: "N1 + と + N2 + (と) + どちらが + いいですか",
              explicacion: "Se usa para pedir una recomendación entre dos opciones o expresar una preferencia.",
              ejemplos: [
                { jp: "コーヒーと紅茶とどちらがいいですか。", es: "¿Qué prefieres, café o té?" },
                { jp: "紅茶がいいです。", es: "Prefiero el té." }
              ],
              excepciones: "どちら es para dos opciones. Para tres o más, se usa どれ.",
              errores: "Usar どれ para dos opciones."
          },
          {
            id: "CP2",
            patron: "(N1 より) N2 のほうが 〜です",
            significado: "N2 es más... (que N1)",
            forma: "(N1 + より) + N2 + の + ほうが + Adjetivo + です",
              explicacion: "Afirma que una de las opciones es más [adjetivo] que la otra.",
              ejemplos: [
                { jp: "犬より猫のほうが好きです。", es: "Me gustan más los gatos que los perros." },
                { jp: "コーヒーのほうがいいです。", es: "Prefiero el café." }
              ],
              excepciones: "Si el contexto está claro, se puede omitir 'N1 より'.",
              errores: "Olvidar el の antes de ほう."
          },
          {
            id: "CP4",
            patron: "V1-る より V2-る ほうが イA／ナA です",
            significado: "Hacer V2 es más [adjetivo] que hacer V1",
            forma: "Verbo 1 en forma diccionario + より + Verbo 2 en forma diccionario + ほうが + Adjetivo",
              explicacion: "Compara dos acciones.",
              ejemplos: [
                { jp: "食べるより、寝るほうが好きです。", es: "Me gusta más dormir que comer." }
              ],
              excepciones: "Los verbos deben ir en forma diccionario.",
              errores: "Usar la forma ます."
          }
        ]
      },
      {
        nombre: "Definiciones y Explicaciones",
        usos: [
          {
            id: "D1",
            patron: "＿＿＿ と いう いみ",
            significado: "El significado de... / ¿Qué significa...?",
            forma: "Palabra/Frase + と いう + 意味 (いみ)",
              explicacion: "Se usa para preguntar o explicar el significado de una palabra o expresión.",
              ejemplos: [
                { jp: "「ありがとう」はどういう意味ですか。", es: "¿Qué significa 'arigatou'?" },
                { jp: "この言葉の意味が分かりません。", es: "No entiendo el significado de esta palabra." }
              ],
              excepciones: "También se puede usar simplemente 意味 con la partícula の.",
              errores: "Usar と いう sin la palabra o frase."
          },
          {
            id: "D2",
            patron: "N1 と いう N2",
            significado: "N2 llamado N1 / N2 que se llama N1",
            forma: "N1 + と いう + N2",
              explicacion: "Se usa para presentar o definir el nombre de algo.",
              ejemplos: [
                { jp: "これは「さくら」という花です。", es: "Esta es una flor llamada 'sakura'." },
                { jp: "田中さんという人を知っていますか。", es: "¿Conoces a una persona llamada Tanaka?" }
              ],
              excepciones: "No se usa con nombres propios muy conocidos.",
              errores: "Olvidar el sustantivo final: ✗ さくらというです."
          }
        ]
      }
    ]
  },
  {
    categoria: "8. Keigo (Lenguaje Honorífico y Formal)",
    subcategorias: [
      {
        nombre: "Kenjougo (Lenguaje Humilde)",
        usos: [
          {
            id: "K1",
            patron: "いたします (Forma humilde de する)",
            significado: "Hacer (Humilde)",
            forma: "Sustantivo (acción) + いたします / お + Raíz del verbo + いたします",
              explicacion: "Es la forma humilde del verbo する. Se usa para rebajar las propias acciones ante un superior o cliente. No es una regla exclusiva de お願い; se usa con cualquier acción propia (ej. ご連絡いたします - le contactaré; お待ちいたします - le esperaré).",
              ejemplos: [
                { jp: "資料をお送りいたします。", es: "Le enviaré los documentos. (Humilde)" },
                { jp: "私がご案内いたします。", es: "Yo le guiaré. (Humilde)" }
              ],
              excepciones: "No se usa para acciones de terceras personas.",
              errores: "Usarlo de forma incorrecta con la raíz de un verbo que no admite el prefijo お/ご."
          },
          {
            id: "K2",
            patron: "V-て おります",
            significado: "Estar haciendo... (Humilde)",
            forma: "Verbo en forma て + おります",
              explicacion: "Es la forma humilde de 〜ています. Se usa para describir el estado o acción propia (o de la empresa) ante un cliente o superior.",
              ejemplos: [
                { jp: "ただいま、準備しております。", es: "Ahora mismo estoy preparándolo." },
                { jp: "東京に住んでおります。", es: "Resido en Tokio." }
              ],
              excepciones: "Nunca se usa para describir acciones de otras personas.",
              errores: "Usarlo para describir lo que hace el cliente."
          },
          {
            id: "K3",
            patron: "V-て まいります",
            significado: "Ir y volver / Hacer algo (Humilde)",
            forma: "Verbo en forma て + まいります",
              explicacion: "Es la forma humilde de 〜てきます. Se usa en atención al cliente cuando el empleado va a hacer algo y volver.",
              ejemplos: [
                { jp: "コーヒーをお持ちしてまいります。", es: "Le traigo el café (ahora mismo)." }
              ],
              excepciones: "Solo para acciones propias.",
              errores: "Usarlo para acciones del cliente."
          }
        ]
      },
      {
        nombre: "Teineigo (Lenguaje Cortés Extremo)",
        usos: [
          {
            id: "K4",
            patron: "～でございます",
            significado: "Ser... (Muy formal)",
            forma: "Sustantivo + でございます",
              explicacion: "Es la versión ultra-formal de です. Se usa en tiendas de lujo, hoteles o anuncios oficiales para elevar el nivel de cortesía.",
              ejemplos: [
                { jp: "こちらでございます。", es: "Es por aquí. (Muy formal)" },
                { jp: "私は田中でございます。", es: "Soy Tanaka. (Muy formal)" }
              ],
              excepciones: "No se usa con adjetivos い directamente.",
              errores: "Usarlo en conversaciones normales del día a día."
          }
        ]
      }
    ]
  }
];
