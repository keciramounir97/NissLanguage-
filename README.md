# NissLanguage

NissLanguage est la langue inventée par Nissou. On l'écrit avec des emojis, des surnoms, des chiffres maquillés, des bonbons et de la pâtisserie. La page Traduire la rend en français, en anglais ou en arabe, selon l'humeur. Le dictionnaire montre la langue choisie, anglais par défaut, à côté de l'équivalent niss.

Le point d'entrée du code est `translateText({ text, source: "niss", target, context })`. `source` vaut toujours `niss`. `target` vaut `fr`, `en` ou `ar`. `context` est une humeur.

## Quatre règles

1. Un mot est un jeton. Les jetons se séparent par des espaces.
2. La plus longue suite connue gagne. `💯 👍` veut dire « ça va ». Tout seul, `💯` veut dire « vraiment » et `👍` veut dire « oui ».
3. Des lettres collées, sans espace, épellent un mot. Si ce mot est un alias du lexique, on traduit l'alias. Sinon on garde le mot épelé, comme un prénom.
4. L'humeur ne change pas l'écriture. Elle change le sens rendu.

## Alphabet

| Lettre | Emoji | Lettre | Emoji |
| --- | --- | --- | --- |
| a | 🍓 | n | 💅 |
| b | 🧋 | o | 🍑 |
| c | 🧁 | p | 👛 |
| d | 💎 | q | 🎀 |
| e | ✨ | r | 🌹 |
| f | 🧚 | s | ⭐ |
| g | 💗 | t | 🌷 |
| h | 🍯 | u | 🦄 |
| i | 💋 | v | 💜 |
| j | 🦋 | w | 🌊 |
| k | 👑 | x | ✖️ |
| l | 🌙 | y | 💛 |
| m | 🧸 | z | 🦓 |

`honey` s'écrit en collant h, o, n, e, y. Un prénom inconnu du lexique reste tel quel dans les trois langues, quelle que soit l'humeur.

`hi` collé se lit comme l'alias de `💌 ☀` : salut.

## Chiffres

| Code | Valeur | Sens |
| --- | --- | --- |
| 🫧0 | 0 | zéro, une bulle |
| 1ce | 1 | un, de la glace |
| 2tu | 2 | deux, un tutu |
| 3lle | 3 | trois, elle |
| 4ev | 4 | quatre, pour toujours |
| 5ly | 5 | cinq, un sourire |
| 6xy | 6 | six, un peu de feu |
| 7vn | 7 | sept, le paradis |
| 8te | 8 | huit, elle a assuré |
| 9ne | 9 | neuf, un éclat |

En registre contraire, `4ev` ne veut plus dire « pour toujours ». Il veut dire « pas pour toujours ».

## Humeurs

La locutrice du code est au féminin. Quand elle s'adresse à la personne qu'elle aime, le « tu » arabe des phrases romantiques est au masculin.

| Id | Nom | Effet |
| --- | --- | --- |
| literal | Littéral | Le sens direct. |
| cute | Douce | La même idée, plus tendre. |
| gf | Copine | Elle parle à la personne qu'elle aime. |
| hangry | Hangry | La faim recouvre la phrase. |
| hormones | Hormones | L'émotion monte d'un cran. |
| angry | Hormones en colère | Le mot peut rester doux. Le ton ne l'est pas. |
| contraire | Contraire | Registre du code : le sens est l'inverse de la phrase écrite. |

`💯 👍` dans les sept humeurs :

| Humeur | Français | English | العربية |
| --- | --- | --- | --- |
| Littéral | Ça va. | I'm fine. | أنا بخير. |
| Douce | Ça va, tout doux. | I'm fine, softly. | أنا بخير بلطف. |
| Copine | Ça va, mon cœur. | I'm fine, babe. | أنا بخير يا عمري. |
| Hangry | Ça va, mais j'ai faim. | I'm fine, but I'm hungry. | أنا بخير، لكنني جائعة. |
| Hormones | Ça va, et je ressens tout. | I'm fine, and I feel everything. | أنا بخير، وأشعر بكل شيء. |
| Hormones en colère | Ça va. N'insiste pas. | I'm fine. Don't push. | أنا بخير. لا تضغط. |
| Contraire | Ça ne va pas. | I'm not fine. | أنا لست بخير. |

`k` tout seul est un d'accord. En hormones en colère : « D'accord. Arrête d'écrire. » En contraire : « Pas d'accord. »

`kk` est « d'accord, d'accord ». En colère, la phrase a fini la conversation. En contraire, ce n'est pas d'accord du tout.

Si un mot n'a pas de ligne spéciale pour une humeur, le littéral reste en Douce. Les autres humeurs ajoutent une courte fin dans la langue demandée. Les phrases du lexique ont, elles, une ligne écrite pour chaque humeur.

## Surnoms

| Niss | Français | English | العربية |
| --- | --- | --- | --- |
| bby | bébé | baby | حبيبي |
| pookie | mon trésor | sweetheart | يا عمري |
| qween | reine | queen | ملكتي |
| girlie | ma fille | girlie | يا بنت |
| bestie | ma bestie | bestie | صديقتي المقربة |
| boo | mon crush | crush | حبيبي |
| momo | moi | me | أنا |
| uhu | toi | you | أنت |

## Mots courants

| Niss | Français | English | العربية |
| --- | --- | --- | --- |
| plz | s'il te plaît | please | من فضلك |
| rn | maintenant | right now | الآن |
| idk | je ne sais pas | I don't know | لا أعرف |
| nvm | laisse tomber | never mind | لا يهم |
| wyd | tu fais quoi | what are you doing | ماذا تفعل |
| noo | pas | not | ليس |
| iz | est | is | يكون |
| ily | je t'aime | I love you | أحبك |
| slay | tu as tout déchiré | you did amazingly | أبدعت |
| periodt | et c'est point final | and that's final | وانتهى الأمر |
| ate | tu as assuré | you nailed it | أتقنت |
| tea | le potin | the gossip | القيل والقال |
| gtg | je dois y aller | I have to go | يجب أن أذهب |
| brb | je reviens | I'll be right back | أعود حالًا |
| omw | j'arrive | I'm on my way | أنا في الطريق |
| idc | je m'en fiche | I don't care | لا يهمني |
| delulu | je me raconte une belle histoire | I'm telling myself a lovely lie | أروي لنفسي قصة جميلة |
| itsgiving | ça donne | it feels like | يعطي إحساس |
| h8 | je déteste ça | I hate this | أكره هذا |
| hangry | j'ai faim et les nerfs | I'm hangry | أنا جائعة وعصبية |

`ily` est l'alias de `😍 🫶`. `hangry` est l'alias de `🤤 🍔`. `hi` est l'alias de `💌 ☀`.

## Phrases

| Niss | Français | English | العربية |
| --- | --- | --- | --- |
| 💌 ☀ | Salut. | Hello. | مرحبًا. |
| 💌 😴 | Bonne nuit. | Good night. | تصبح على خير. |
| ☀ 💌 | Bonjour. | Good morning. | صباح الخير. |
| 😍 🫶 | Je t'aime. | I love you. | أحبك. |
| 😘 💕 | Un bisou pour toi. | A kiss for you. | قبلة لك. |
| 💯 👍 | Ça va. | I'm fine. | أنا بخير. |
| 💯 👎 | Ça ne va pas. | I'm not fine. | أنا لست بخير. |
| 😡 💢 | Je suis en colère. | I'm angry. | أنا غاضبة. |
| 🤤 🍔 | J'ai faim et les nerfs. | I'm hangry. | أنا جائعة وعصبية. |
| 🥺 🍕 | S'il te plaît, on mange. | Please, let's eat. | من فضلك، لنأكل. |
| 😴 🍵 | Je suis fatiguée. | I'm tired. | أنا متعبة. |
| 🙄 😤 | Bof. Je suis agacée. | Whatever. I'm annoyed. | لا يهم. أنا منزعجة. |
| 🥰 🙈 | Tu es adorable et je suis timide. | You're sweet and I'm shy. | أنت لطيف وأنا خجولة. |
| 😔 🌧 | Je suis triste. | I'm sad. | أنا حزينة. |
| ☀ 🌈 | Je suis heureuse. | I'm happy. | أنا سعيدة. |
| 🚫 💌 | Ne m'écris pas. | Don't text me. | لا تراسلني. |
| 👀 💌 | Regarde mon message. | Look at my message. | انظر إلى رسالتي. |
| 🫠 😤 | Je suis dépassée. | I'm overwhelmed. | أنا مرهقة. |
| 💐 🥺 | Je suis désolée. | I'm sorry. | أنا آسفة. |
| 🍦 💖 | C'est trop mignon. | This is so cute. | هذا لطيف جدًا. |
| 🍰 💖 | On fête ça. | Let's celebrate. | لنحتفل. |
| 🍫 😔 | J'ai besoin de réconfort. | I need comfort. | أحتاج إلى مواساة. |

Les autres humeurs de ces phrases sont dans `niss/lexicon.js` et dans le tableau de l'application.

## Ce qui reste inconnu

Un jeton qui n'est ni un mot du lexique, ni une suite de lettres, reste tel quel. La ligne « Inconnu » le signale.
