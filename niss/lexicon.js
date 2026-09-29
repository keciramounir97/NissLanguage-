import { normalize } from "./alphabet.js";

export const MOODS = [
  { id: "literal", label: "Littéral", hint: "Le sens direct, sans humeur." },
  { id: "cute", label: "Douce", hint: "La même idée, dite plus tendrement." },
  { id: "gf", label: "Copine", hint: "Elle parle à la personne qu'elle aime." },
  { id: "hangry", label: "Hangry", hint: "La faim recouvre la phrase." },
  { id: "hormones", label: "Hormones", hint: "L'émotion monte d'un cran." },
  { id: "angry", label: "Hormones en colère", hint: "Le mot reste doux. Le ton, non." },
  {
    id: "contraire",
    label: "Contraire",
    hint: "Dans ce registre, le sens est l'inverse de la phrase écrite.",
  },
];

export const TARGETS = [
  { id: "fr", label: "Français" },
  { id: "en", label: "English" },
  { id: "ar", label: "العربية" },
];

function phrase(niss, aliases, readings) {
  return {
    kind: "phrase",
    niss: niss.map(normalize),
    aliases,
    readings,
  };
}

function word(token, aliases, readings) {
  return phrase([token], aliases, readings);
}

const fine = phrase(["💯", "👍"], ["imfine"], {
  literal: { en: "I'm fine.", fr: "Ça va.", ar: "أنا بخير." },
  cute: { en: "I'm fine, softly.", fr: "Ça va, tout doux.", ar: "أنا بخير بلطف." },
  gf: { en: "I'm fine, babe.", fr: "Ça va, mon cœur.", ar: "أنا بخير يا عمري." },
  hangry: {
    en: "I'm fine, but I'm hungry.",
    fr: "Ça va, mais j'ai faim.",
    ar: "أنا بخير، لكنني جائعة.",
  },
  hormones: {
    en: "I'm fine, and I feel everything.",
    fr: "Ça va, et je ressens tout.",
    ar: "أنا بخير، وأشعر بكل شيء.",
  },
  angry: {
    en: "I'm fine. Don't push.",
    fr: "Ça va. N'insiste pas.",
    ar: "أنا بخير. لا تضغط.",
  },
  contraire: { en: "I'm not fine.", fr: "Ça ne va pas.", ar: "أنا لست بخير." },
});

const love = phrase(["😍", "🫶"], ["ily"], {
  literal: { en: "I love you.", fr: "Je t'aime.", ar: "أحبك." },
  cute: { en: "I love you, softly.", fr: "Je t'aime, tout bas.", ar: "أحبك بلطف." },
  gf: { en: "I love you, babe.", fr: "Je t'aime, mon cœur.", ar: "أحبك يا عمري." },
  hangry: {
    en: "I love you. Feed me.",
    fr: "Je t'aime. Donne-moi à manger.",
    ar: "أحبك. أطعمني.",
  },
  hormones: {
    en: "I love you so much it spills over.",
    fr: "Je t'aime tellement que ça déborde.",
    ar: "أحبك حبًا يفيض.",
  },
  angry: {
    en: "I love you, and I'm furious.",
    fr: "Je t'aime, et je suis furieuse.",
    ar: "أحبك، وأنا غاضبة.",
  },
  contraire: {
    en: "I don't love you right now.",
    fr: "Je ne t'aime pas, là.",
    ar: "لا أحبك الآن.",
  },
});

export const entries = [
  phrase(["💌", "☀"], ["hi"], {
    literal: { en: "Hello.", fr: "Salut.", ar: "مرحبًا." },
    cute: { en: "Hello, softly.", fr: "Coucou.", ar: "أهلًا بلطف." },
    gf: { en: "Hey, babe.", fr: "Coucou, mon cœur.", ar: "أهلًا يا عمري." },
    hangry: { en: "Hello. I'm hungry.", fr: "Salut. J'ai faim.", ar: "مرحبًا. أنا جائعة." },
    hormones: {
      en: "Hello. I feel a lot right now.",
      fr: "Salut. Je ressens beaucoup de choses.",
      ar: "مرحبًا. أشعر بالكثير الآن.",
    },
    angry: { en: "Hello. Make it quick.", fr: "Salut. Fais vite.", ar: "مرحبًا. اختصر." },
    contraire: {
      en: "I don't want to talk.",
      fr: "Je ne veux pas te parler.",
      ar: "لا أريد الكلام.",
    },
  }),
  phrase(["💌", "😴"], ["gn"], {
    literal: { en: "Good night.", fr: "Bonne nuit.", ar: "تصبح على خير." },
    cute: { en: "Sweet night.", fr: "Dors bien.", ar: "ليلة لطيفة." },
    gf: { en: "Good night, babe.", fr: "Bonne nuit, mon cœur.", ar: "تصبح على خير يا عمري." },
    hangry: {
      en: "Good night, after a snack.",
      fr: "Bonne nuit, après un encas.",
      ar: "تصبح على خير، بعد قطعة أكل.",
    },
    hormones: {
      en: "Good night. My heart is loud.",
      fr: "Bonne nuit. Mon cœur est bruyant.",
      ar: "تصبح على خير. قلبي صاخب.",
    },
    angry: { en: "Good night. We're done.", fr: "Bonne nuit. On a fini.", ar: "تصبح على خير. انتهينا." },
    contraire: { en: "Don't sleep. Stay.", fr: "Ne dors pas. Reste.", ar: "لا تنم. ابقَ." },
  }),
  phrase(["☀", "💌"], ["gm"], {
    literal: { en: "Good morning.", fr: "Bonjour.", ar: "صباح الخير." },
    cute: { en: "Soft morning.", fr: "Bonjour tout doux.", ar: "صباح لطيف." },
    gf: { en: "Good morning, babe.", fr: "Bonjour, mon cœur.", ar: "صباح الخير يا عمري." },
    hangry: { en: "Good morning. Where is breakfast?", fr: "Bonjour. Où est le petit-déjeuner ?", ar: "صباح الخير. أين الفطور؟" },
    hormones: { en: "Good morning. I already feel everything.", fr: "Bonjour. Je ressens déjà tout.", ar: "صباح الخير. أشعر بكل شيء منذ الآن." },
    angry: { en: "Morning. Don't start.", fr: "Bonjour. Ne commence pas.", ar: "صباح الخير. لا تبدأ." },
    contraire: { en: "I am not up.", fr: "Je ne suis pas réveillée.", ar: "لست مستيقظة." },
  }),
  love,
  phrase(["😘", "💕"], ["bisou"], {
    literal: { en: "A kiss for you.", fr: "Un bisou pour toi.", ar: "قبلة لك." },
    cute: { en: "A tiny kiss.", fr: "Un petit bisou.", ar: "قبلة صغيرة." },
    gf: { en: "A kiss, babe.", fr: "Un bisou, mon cœur.", ar: "قبلة يا عمري." },
    hangry: { en: "A kiss, then food.", fr: "Un bisou, puis à manger.", ar: "قبلة، ثم الأكل." },
    hormones: { en: "A kiss. I miss you too much.", fr: "Un bisou. Tu me manques trop.", ar: "قبلة. أشتاق إليك كثيرًا." },
    angry: { en: "A kiss. I'm still mad.", fr: "Un bisou. Je suis encore fâchée.", ar: "قبلة. ما زلت غاضبة." },
    contraire: { en: "No kiss.", fr: "Pas de bisou.", ar: "لا قبلة." },
  }),
  fine,
  phrase(["💯", "👎"], ["imnotfine"], {
    literal: { en: "I'm not fine.", fr: "Ça ne va pas.", ar: "أنا لست بخير." },
    cute: { en: "I'm not fine, said gently.", fr: "Ça ne va pas, dit tout doux.", ar: "أنا لست بخير، بهدوء." },
    gf: { en: "I'm not fine, babe.", fr: "Ça ne va pas, mon cœur.", ar: "أنا لست بخير يا عمري." },
    hangry: { en: "I'm not fine because I'm hungry.", fr: "Ça ne va pas parce que j'ai faim.", ar: "أنا لست بخير لأنني جائعة." },
    hormones: { en: "I'm not fine, and it's big.", fr: "Ça ne va pas, et c'est énorme.", ar: "أنا لست بخير، والأمر كبير." },
    angry: { en: "I'm not fine. Obviously.", fr: "Ça ne va pas. Évidemment.", ar: "أنا لست بخير. واضح." },
    contraire: { en: "I'm fine.", fr: "Ça va.", ar: "أنا بخير." },
  }),
  phrase(["😡", "💢"], [], {
    literal: { en: "I'm angry.", fr: "Je suis en colère.", ar: "أنا غاضبة." },
    cute: { en: "I'm a little angry.", fr: "Je suis un peu en colère.", ar: "أنا غاضبة قليلًا." },
    gf: { en: "I'm angry, babe.", fr: "Je suis en colère, mon cœur.", ar: "أنا غاضبة يا عمري." },
    hangry: { en: "I'm angry because I need food.", fr: "Je suis en colère parce qu'il me faut à manger.", ar: "أنا غاضبة لأنني أحتاج إلى الأكل." },
    hormones: { en: "I'm angry and it floods me.", fr: "Je suis en colère et ça me submerge.", ar: "أنا غاضبة وهذا يغرقني." },
    angry: { en: "I'm angry. Leave it.", fr: "Je suis en colère. Laisse.", ar: "أنا غاضبة. اترك الأمر." },
    contraire: { en: "I'm not angry.", fr: "Je ne suis pas en colère.", ar: "لست غاضبة." },
  }),
  phrase(["🤤", "🍔"], ["hangry"], {
    literal: { en: "I'm hangry.", fr: "J'ai faim et les nerfs.", ar: "أنا جائعة وعصبية." },
    cute: { en: "I'm sweetly hangry.", fr: "J'ai faim, version douce.", ar: "أنا جائعة بلطف وعصبية." },
    gf: { en: "I'm hangry, babe. Feed us.", fr: "J'ai les crocs, mon cœur. On mange.", ar: "أنا جائعة يا عمري. لنأكل." },
    hangry: { en: "I'm hangry. This is the whole message.", fr: "J'ai faim et les nerfs. C'est tout le message.", ar: "أنا جائعة وعصبية. هذه الرسالة كلها." },
    hormones: { en: "I'm hangry and everything annoys me.", fr: "J'ai faim et tout m'agace.", ar: "أنا جائعة وكل شيء يزعجني." },
    angry: { en: "I'm hangry. Don't talk, bring food.", fr: "J'ai les crocs. Ne parle pas, apporte à manger.", ar: "أنا جائعة. لا تتكلم، أحضر الأكل." },
    contraire: { en: "I'm full and calm.", fr: "Je n'ai plus faim, je suis calme.", ar: "أنا شبعة وهادئة." },
  }),
  phrase(["🥺", "🍕"], [], {
    literal: { en: "Please, let's eat.", fr: "S'il te plaît, on mange.", ar: "من فضلك، لنأكل." },
    cute: { en: "Please, a little bite.", fr: "S'il te plaît, une petite bouchée.", ar: "من فضلك، قضمة صغيرة." },
    gf: { en: "Please eat with me, babe.", fr: "Mange avec moi, mon cœur.", ar: "كُل معي يا عمري." },
    hangry: { en: "We eat now.", fr: "On mange maintenant.", ar: "نأكل الآن." },
    hormones: { en: "Please. Food would fix the feeling.", fr: "S'il te plaît. Manger apaiserait tout.", ar: "من فضلك. الأكل سيهدئ الشعور." },
    angry: { en: "Food. Now.", fr: "À manger. Maintenant.", ar: "الطعام. الآن." },
    contraire: { en: "I don't want to eat.", fr: "Je ne veux pas manger.", ar: "لا أريد أن آكل." },
  }),
  phrase(["😴", "🍵"], [], {
    literal: { en: "I'm tired.", fr: "Je suis fatiguée.", ar: "أنا متعبة." },
    cute: { en: "I'm sleepy and soft.", fr: "J'ai sommeil, toute douce.", ar: "أنا نعسانة وهادئة." },
    gf: { en: "I'm tired, babe.", fr: "Je suis fatiguée, mon cœur.", ar: "أنا متعبة يا عمري." },
    hangry: { en: "I'm tired and hungry.", fr: "Je suis fatiguée et j'ai faim.", ar: "أنا متعبة وجائعة." },
    hormones: { en: "I'm tired down to the bones.", fr: "Je suis fatiguée jusqu'aux os.", ar: "أنا متعبة حتى العظم." },
    angry: { en: "I'm tired. Stop asking.", fr: "Je suis fatiguée. Arrête de demander.", ar: "أنا متعبة. توقف عن السؤال." },
    contraire: { en: "I'm wide awake.", fr: "Je suis parfaitement réveillée.", ar: "أنا مستيقظة تمامًا." },
  }),
  phrase(["🙄", "😤"], [], {
    literal: { en: "Whatever. I'm annoyed.", fr: "Bof. Je suis agacée.", ar: "لا يهم. أنا منزعجة." },
    cute: { en: "A tiny bit annoyed.", fr: "Un tout petit peu agacée.", ar: "منزعجة قليلًا." },
    gf: { en: "I'm annoyed, babe, but I'm here.", fr: "Je suis agacée, mon cœur, mais je suis là.", ar: "أنا منزعجة يا عمري، لكنني هنا." },
    hangry: { en: "I'm annoyed because nobody fed me.", fr: "Je suis agacée parce que personne ne m'a nourrie.", ar: "أنا منزعجة لأن أحدًا لم يطعمني." },
    hormones: { en: "Everything annoys me.", fr: "Tout m'agace.", ar: "كل شيء يزعجني." },
    angry: { en: "Whatever. Leave me alone.", fr: "Bof. Laisse-moi.", ar: "لا يهم. اتركني." },
    contraire: { en: "I'm delighted.", fr: "Je suis ravie.", ar: "أنا مبتهجة." },
  }),
  phrase(["🥰", "🙈"], [], {
    literal: { en: "You're sweet and I'm shy.", fr: "Tu es adorable et je suis timide.", ar: "أنت لطيف وأنا خجولة." },
    cute: { en: "This is too sweet. I'm hiding.", fr: "C'est trop doux. Je me cache.", ar: "هذا لطيف جدًا. أختبئ." },
    gf: { en: "You're sweet, babe. I'm shy about it.", fr: "Tu es adorable, mon cœur. J'en suis timide.", ar: "أنت لطيف يا عمري. أخجل من ذلك." },
    hangry: { en: "You're sweet. I still need food.", fr: "Tu es adorable. J'ai quand même faim.", ar: "أنت لطيف. ما زلت بحاجة إلى الأكل." },
    hormones: { en: "You're sweet and I might cry.", fr: "Tu es adorable et je pourrais pleurer.", ar: "أنت لطيف وقد أبكي." },
    angry: { en: "You're sweet. I'm still irritated.", fr: "Tu es adorable. Je reste irritée.", ar: "أنت لطيف. ما زلت متضايقة." },
    contraire: { en: "This isn't sweet.", fr: "Ce n'est pas mignon.", ar: "هذا ليس لطيفًا." },
  }),
  phrase(["😔", "🌧"], [], {
    literal: { en: "I'm sad.", fr: "Je suis triste.", ar: "أنا حزينة." },
    cute: { en: "I'm a little sad.", fr: "Je suis un peu triste.", ar: "أنا حزينة قليلًا." },
    gf: { en: "I'm sad, babe.", fr: "Je suis triste, mon cœur.", ar: "أنا حزينة يا عمري." },
    hangry: { en: "I'm sad and hungry.", fr: "Je suis triste et j'ai faim.", ar: "أنا حزينة وجائعة." },
    hormones: { en: "I'm sad and it takes the whole room.", fr: "Je suis triste et ça prend toute la pièce.", ar: "أنا حزينة وهذا يملأ الغرفة." },
    angry: { en: "I'm sad. Don't fix it.", fr: "Je suis triste. Ne répare pas.", ar: "أنا حزينة. لا تصلح الأمر." },
    contraire: { en: "I'm happy.", fr: "Je suis heureuse.", ar: "أنا سعيدة." },
  }),
  phrase(["☀", "🌈"], [], {
    literal: { en: "I'm happy.", fr: "Je suis heureuse.", ar: "أنا سعيدة." },
    cute: { en: "I'm softly happy.", fr: "Je suis heureuse, tout doux.", ar: "أنا سعيدة بلطف." },
    gf: { en: "I'm happy with you, babe.", fr: "Je suis heureuse avec toi, mon cœur.", ar: "أنا سعيدة معك يا عمري." },
    hangry: { en: "I'm happy, and still hungry.", fr: "Je suis heureuse, et j'ai quand même faim.", ar: "أنا سعيدة، وما زلت جائعة." },
    hormones: { en: "I'm so happy I could burst.", fr: "Je suis tellement heureuse que je pourrais éclater.", ar: "أنا سعيدة إلى حد الانفجار." },
    angry: { en: "I'm happy. Don't ruin it.", fr: "Je suis heureuse. Ne gâche pas ça.", ar: "أنا سعيدة. لا تفسد هذا." },
    contraire: { en: "I'm not happy.", fr: "Je ne suis pas heureuse.", ar: "لست سعيدة." },
  }),
  phrase(["🚫", "💌"], [], {
    literal: { en: "Don't text me.", fr: "Ne m'écris pas.", ar: "لا تراسلني." },
    cute: { en: "Not now, gently.", fr: "Pas maintenant, tout doux.", ar: "ليس الآن، بهدوء." },
    gf: { en: "Don't text yet, babe. I need a minute.", fr: "N'écris pas tout de suite, mon cœur. J'ai besoin d'une minute.", ar: "لا تراسلني الآن يا عمري. أحتاج دقيقة." },
    hangry: { en: "Don't text. Send food.", fr: "N'écris pas. Envoie à manger.", ar: "لا تراسلني. أرسل طعامًا." },
    hormones: { en: "Don't text. I can't hold one more feeling.", fr: "N'écris pas. Je ne peux plus porter un sentiment.", ar: "لا تراسلني. لا أحتمل شعورًا آخر." },
    angry: { en: "Don't text me.", fr: "Ne m'écris pas.", ar: "لا تراسلني." },
    contraire: { en: "Text me.", fr: "Écris-moi.", ar: "راسلني." },
  }),
  phrase(["👀", "💌"], [], {
    literal: { en: "Look at my message.", fr: "Regarde mon message.", ar: "انظر إلى رسالتي." },
    cute: { en: "A tiny look at my message?", fr: "Un petit regard sur mon message ?", ar: "نظرة صغيرة على رسالتي؟" },
    gf: { en: "Read me, babe.", fr: "Lis-moi, mon cœur.", ar: "اقرأني يا عمري." },
    hangry: { en: "Read this, then feed me.", fr: "Lis ça, puis nourris-moi.", ar: "اقرأ هذا، ثم أطعمني." },
    hormones: { en: "Please look. It matters too much.", fr: "Regarde, s'il te plaît. Ça compte trop.", ar: "انظر من فضلك. الأمر أهم مما ينبغي." },
    angry: { en: "Look at my message. Now.", fr: "Regarde mon message. Maintenant.", ar: "انظر إلى رسالتي. الآن." },
    contraire: { en: "Ignore my message.", fr: "Ignore mon message.", ar: "تجاهل رسالتي." },
  }),
  phrase(["🫠", "😤"], [], {
    literal: { en: "I'm overwhelmed.", fr: "Je suis dépassée.", ar: "أنا مرهقة." },
    cute: { en: "I'm a little overwhelmed.", fr: "Je suis un peu dépassée.", ar: "أنا مرهقة قليلًا." },
    gf: { en: "I'm overwhelmed, babe.", fr: "Je suis dépassée, mon cœur.", ar: "أنا مرهقة يا عمري." },
    hangry: { en: "I'm overwhelmed and hungry.", fr: "Je suis dépassée et j'ai faim.", ar: "أنا مرهقة وجائعة." },
    hormones: { en: "I'm overwhelmed. Everything is loud.", fr: "Je suis dépassée. Tout est bruyant.", ar: "أنا مرهقة. كل شيء صاخب." },
    angry: { en: "I'm overwhelmed. Back off.", fr: "Je suis dépassée. Recule.", ar: "أنا مرهقة. تراجع." },
    contraire: { en: "I'm perfectly in control.", fr: "J'ai parfaitement le contrôle.", ar: "أنا مسيطرة تمامًا." },
  }),
  phrase(["💐", "🥺"], [], {
    literal: { en: "I'm sorry.", fr: "Je suis désolée.", ar: "أنا آسفة." },
    cute: { en: "I'm sorry, softly.", fr: "Pardon, tout doux.", ar: "أنا آسفة بلطف." },
    gf: { en: "I'm sorry, babe.", fr: "Pardon, mon cœur.", ar: "أنا آسفة يا عمري." },
    hangry: { en: "I'm sorry. I was hungry.", fr: "Pardon. J'avais faim.", ar: "أنا آسفة. كنت جائعة." },
    hormones: { en: "I'm sorry, and I mean it with my whole chest.", fr: "Pardon, et je le pense de toute ma poitrine.", ar: "أنا آسفة، وأعنيها من كل قلبي." },
    angry: { en: "I'm sorry. Don't make it a scene.", fr: "Pardon. N'en fais pas une scène.", ar: "أنا آسفة. لا تجعلها مشهدًا." },
    contraire: { en: "I'm not sorry.", fr: "Je ne suis pas désolée.", ar: "لست آسفة." },
  }),
  phrase(["🍦", "💖"], [], {
    literal: { en: "This is so cute.", fr: "C'est trop mignon.", ar: "هذا لطيف جدًا." },
    cute: { en: "This is unbearably cute.", fr: "C'est d'une mignonnerie insupportable.", ar: "هذا لطيف إلى حد لا يُطاق." },
    gf: { en: "You're so cute, babe.", fr: "Tu es trop mignon, mon cœur.", ar: "أنت لطيف جدًا يا عمري." },
    hangry: { en: "Cute. Still need a snack.", fr: "Mignon. Il me faut quand même un encas.", ar: "لطيف. ما زلت أحتاج إلى قطعة." },
    hormones: { en: "This is so cute I might melt.", fr: "C'est tellement mignon que je fonds.", ar: "هذا لطيف لدرجة أنني أذوب." },
    angry: { en: "It's cute. I'm still annoyed.", fr: "C'est mignon. Je reste agacée.", ar: "لطيف. ما زلت منزعجة." },
    contraire: { en: "This isn't cute.", fr: "Ce n'est pas mignon.", ar: "هذا ليس لطيفًا." },
  }),
  phrase(["🍰", "💖"], [], {
    literal: { en: "Let's celebrate.", fr: "On fête ça.", ar: "لنحتفل." },
    cute: { en: "A tiny celebration.", fr: "Une petite fête.", ar: "احتفال صغير." },
    gf: { en: "Celebrate with me, babe.", fr: "Fête ça avec moi, mon cœur.", ar: "احتفل معي يا عمري." },
    hangry: { en: "We celebrate with food.", fr: "On fête ça en mangeant.", ar: "نحتفل بالأكل." },
    hormones: { en: "Celebrate. I feel huge about this.", fr: "On fête. Ça me prend tout entière.", ar: "نحتفل. هذا يملؤني كلها." },
    angry: { en: "We can celebrate. Briefly.", fr: "On peut fêter. Brièvement.", ar: "يمكن أن نحتفل. باختصار." },
    contraire: { en: "Nothing to celebrate.", fr: "Rien à fêter.", ar: "لا شيء لنحتفل به." },
  }),
  phrase(["🍫", "😔"], [], {
    literal: { en: "I need comfort.", fr: "J'ai besoin de réconfort.", ar: "أحتاج إلى مواساة." },
    cute: { en: "A little comfort, please.", fr: "Un peu de réconfort, s'il te plaît.", ar: "قليل من المواساة، من فضلك." },
    gf: { en: "Comfort me, babe.", fr: "Console-moi, mon cœur.", ar: "واسني يا عمري." },
    hangry: { en: "I need comfort and chocolate.", fr: "J'ai besoin de réconfort et de chocolat.", ar: "أحتاج إلى مواساة وشوكولاتة." },
    hormones: { en: "I need comfort. The feeling is huge.", fr: "J'ai besoin de réconfort. Le sentiment est énorme.", ar: "أحتاج إلى مواساة. الشعور ضخم." },
    angry: { en: "I need comfort. Don't lecture me.", fr: "J'ai besoin de réconfort. Pas de leçon.", ar: "أحتاج إلى مواساة. بلا محاضرة." },
    contraire: { en: "I need nothing.", fr: "Je n'ai besoin de rien.", ar: "لا أحتاج إلى شيء." },
  }),
  word("k", [], {
    literal: { en: "Okay.", fr: "D'accord.", ar: "حسنًا." },
    cute: { en: "Okay, softly.", fr: "D'accord, tout doux.", ar: "حسنًا بلطف." },
    gf: { en: "Okay, babe.", fr: "D'accord, mon cœur.", ar: "حسنًا يا عمري." },
    hangry: { en: "Okay, after we eat.", fr: "D'accord, après manger.", ar: "حسنًا، بعد أن نأكل." },
    hormones: { en: "Okay. I feel a lot under that.", fr: "D'accord. Je ressens beaucoup en dessous.", ar: "حسنًا. أشعر بالكثير تحت هذه الكلمة." },
    angry: { en: "Okay. Stop writing.", fr: "D'accord. Arrête d'écrire.", ar: "حسنًا. توقف عن الكتابة." },
    contraire: { en: "Not okay.", fr: "Pas d'accord.", ar: "لست موافقة." },
  }),
  word("kk", [], {
    literal: { en: "Okay, okay.", fr: "D'accord, d'accord.", ar: "حسنًا، حسنًا." },
    cute: { en: "Okay, okay, gently.", fr: "D'accord, d'accord, tout doux.", ar: "حسنًا حسنًا، بهدوء." },
    gf: { en: "Okay, okay, babe.", fr: "D'accord, d'accord, mon cœur.", ar: "حسنًا حسنًا يا عمري." },
    hangry: { en: "Okay, okay. Bring food.", fr: "D'accord, d'accord. Apporte à manger.", ar: "حسنًا حسنًا. أحضر الأكل." },
    hormones: { en: "Okay, okay. I'm at the edge.", fr: "D'accord, d'accord. Je suis au bord.", ar: "حسنًا حسنًا. أنا على الحافة." },
    angry: { en: "Okay, okay. I'm actually done.", fr: "D'accord, d'accord. J'en ai vraiment fini.", ar: "حسنًا حسنًا. انتهيت فعلًا." },
    contraire: { en: "It is not okay at all.", fr: "Ce n'est pas d'accord du tout.", ar: "هذا ليس حسنًا على الإطلاق." },
  }),
  word("💯", [], {
    literal: { en: "Truly.", fr: "Vraiment.", ar: "حقًا." },
    cute: { en: "Truly, softly.", fr: "Vraiment, tout doux.", ar: "حقًا، بلطف." },
  }),
  word("👍", [], {
    literal: { en: "Yes.", fr: "Oui.", ar: "نعم." },
    cute: { en: "Yes, softly.", fr: "Oui, tout doux.", ar: "نعم، بلطف." },
    contraire: { en: "No.", fr: "Non.", ar: "لا." },
  }),
  word("👎", [], {
    literal: { en: "No.", fr: "Non.", ar: "لا." },
    contraire: { en: "Yes.", fr: "Oui.", ar: "نعم." },
  }),
  phrase(["🍬", "🍭"], ["bonbon"], {
    literal: { en: "candy", fr: "un bonbon", ar: "حلوى" },
  }),
  phrase(["🍫", "🍪"], ["chocolat"], {
    literal: { en: "chocolate", fr: "du chocolat", ar: "شوكولاتة" },
  }),
  phrase(["🍩", "🥐"], ["patisserie"], {
    literal: { en: "pastry", fr: "une pâtisserie", ar: "معجنات" },
  }),
  phrase(["🎂", "🎈"], [], {
    literal: { en: "birthday cake", fr: "un gâteau d'anniversaire", ar: "كعكة عيد" },
  }),
  phrase(["🍨", "🍒"], [], {
    literal: { en: "ice cream", fr: "une glace", ar: "آيس كريم" },
  }),
  phrase(["🍿", "🎬"], [], {
    literal: { en: "popcorn", fr: "du pop-corn", ar: "فشار" },
  }),
  phrase(["🥨", "🧈"], [], {
    literal: { en: "a pretzel", fr: "un bretzel", ar: "بريتزل" },
  }),
  phrase(["🥧", "🍎"], [], {
    literal: { en: "a pie", fr: "une tarte", ar: "فطيرة" },
  }),
  phrase(["🍧", "🫐"], [], {
    literal: { en: "a sweet ice", fr: "une glace pilée", ar: "ثلج محلى" },
  }),
  phrase(["🍮", "🥄"], [], {
    literal: { en: "pudding", fr: "un flan", ar: "بودينغ" },
  }),
  phrase(["🧇", "🍁"], [], {
    literal: { en: "a waffle", fr: "une gaufre", ar: "وافل" },
  }),
];

export const names = [
  name("bby", {
    literal: { en: "baby", fr: "bébé", ar: "حبيبي" },
    cute: { en: "my baby", fr: "mon bébé", ar: "حبيبي الصغير" },
    gf: { en: "babe", fr: "mon cœur", ar: "يا عمري" },
    hangry: { en: "baby, feed me", fr: "bébé, nourris-moi", ar: "حبيبي، أطعمني" },
    hormones: { en: "baby, I feel everything", fr: "bébé, je ressens tout", ar: "حبيبي، أشعر بكل شيء" },
    angry: { en: "baby. Don't.", fr: "bébé. Non.", ar: "حبيبي. لا." },
    contraire: { en: "not my baby", fr: "pas mon bébé", ar: "لست حبيبي" },
  }),
  name("pookie", {
    literal: { en: "sweetheart", fr: "mon trésor", ar: "يا عمري" },
    cute: { en: "sweet pookie", fr: "mon petit trésor", ar: "يا عمري اللطيف" },
    gf: { en: "pookie", fr: "mon trésor", ar: "يا روحي" },
    hangry: { en: "sweetheart, I'm hungry", fr: "mon trésor, j'ai faim", ar: "يا عمري، أنا جائعة" },
    hormones: { en: "sweetheart, this is a lot", fr: "mon trésor, c'est beaucoup", ar: "يا عمري، هذا كثير" },
    angry: { en: "sweetheart. Watch it.", fr: "mon trésor. Doucement.", ar: "يا عمري. بهدوء." },
    contraire: { en: "not my sweetheart", fr: "pas mon trésor", ar: "لست يا عمري" },
  }),
  name("qween", {
    literal: { en: "queen", fr: "reine", ar: "ملكتي" },
    cute: { en: "my queen", fr: "ma reine", ar: "ملكتي" },
    gf: { en: "queen", fr: "ma reine", ar: "يا ملكتي" },
    hangry: { en: "queen, we need food", fr: "reine, il nous faut à manger", ar: "ملكتي، نحتاج إلى الأكل" },
    hormones: { en: "queen, I feel royal and raw", fr: "reine, je me sens royale et à vif", ar: "ملكتي، أشعر بأني ملكية ومكشوفة" },
    angry: { en: "queen. Not now.", fr: "reine. Pas maintenant.", ar: "ملكتي. ليس الآن." },
    contraire: { en: "not the queen", fr: "pas la reine", ar: "ليست الملكة" },
  }),
  name("girlie", {
    literal: { en: "girlie", fr: "ma fille", ar: "يا بنت" },
    cute: { en: "girlie", fr: "ma fille", ar: "يا بنت لطيفة" },
    gf: { en: "girlie", fr: "ma belle", ar: "يا جميلة" },
    hangry: { en: "girlie, I'm hungry", fr: "ma fille, j'ai faim", ar: "يا بنت، أنا جائعة" },
    hormones: { en: "girlie, the feelings are loud", fr: "ma fille, les sentiments crient", ar: "يا بنت، المشاعر صاخبة" },
    angry: { en: "girlie. Read the room.", fr: "ma fille. Lis l'air.", ar: "يا بنت. افهمي الجو." },
    contraire: { en: "not your girlie", fr: "pas ta fille", ar: "لستِ يا بنت" },
  }),
  name("bestie", {
    literal: { en: "bestie", fr: "ma bestie", ar: "صديقتي المقربة" },
    cute: { en: "my bestie", fr: "ma bestie", ar: "صديقتي اللطيفة" },
    gf: { en: "bestie", fr: "ma bestie d'amour", ar: "صديقتي الغالية" },
    hangry: { en: "bestie, bring snacks", fr: "ma bestie, apporte des encas", ar: "صديقتي، أحضري قطعًا" },
    hormones: { en: "bestie, I need you close", fr: "ma bestie, j'ai besoin de toi près", ar: "صديقتي، أحتاجكِ قريبة" },
    angry: { en: "bestie. Give me space.", fr: "ma bestie. Laisse-moi de l'air.", ar: "صديقتي. اتركيني." },
    contraire: { en: "not my bestie", fr: "pas ma bestie", ar: "ليست صديقتي المقربة" },
  }),
  name("boo", {
    literal: { en: "crush", fr: "mon crush", ar: "حبيبي" },
    cute: { en: "my crush", fr: "mon petit crush", ar: "حبيبي" },
    gf: { en: "boo", fr: "mon amour", ar: "يا حبيبي" },
    hangry: { en: "crush, feed me", fr: "mon crush, nourris-moi", ar: "حبيبي، أطعمني" },
    hormones: { en: "crush, I feel too much", fr: "mon crush, je ressens trop", ar: "حبيبي، أشعر بأكثر مما ينبغي" },
    angry: { en: "crush. Not a word.", fr: "mon crush. Pas un mot.", ar: "حبيبي. ولا كلمة." },
    contraire: { en: "not my crush", fr: "pas mon crush", ar: "لست حبيبي" },
  }),
  name("momo", {
    literal: { en: "me", fr: "moi", ar: "أنا" },
    cute: { en: "little me", fr: "moi toute douce", ar: "أنا بلطف" },
    gf: { en: "me, yours", fr: "moi, à toi", ar: "أنا، لك" },
    hangry: { en: "me, hungry", fr: "moi, affamée", ar: "أنا، جائعة" },
    hormones: { en: "me, overflowing", fr: "moi, qui déborde", ar: "أنا، أفيض" },
    angry: { en: "me. Back up.", fr: "moi. Recule.", ar: "أنا. تراجع." },
    contraire: { en: "not me", fr: "pas moi", ar: "لست أنا" },
  }),
  name("uhu", {
    literal: { en: "you", fr: "toi", ar: "أنت" },
    cute: { en: "you, softly", fr: "toi, tout doux", ar: "أنت بلطف" },
    gf: { en: "you, babe", fr: "toi, mon cœur", ar: "أنت يا عمري" },
    hangry: { en: "you, the one with the food", fr: "toi, celui qui a à manger", ar: "أنت، صاحب الأكل" },
    hormones: { en: "you, and it's a lot", fr: "toi, et c'est beaucoup", ar: "أنت، وهذا كثير" },
    angry: { en: "you. Careful.", fr: "toi. Attention.", ar: "أنت. انتبه." },
    contraire: { en: "not you", fr: "pas toi", ar: "لست أنت" },
  }),
];

export const particles = [
  gloss("plz", { en: "please", fr: "s'il te plaît", ar: "من فضلك" }),
  gloss("rn", { en: "right now", fr: "maintenant", ar: "الآن" }),
  gloss("idk", { en: "I don't know", fr: "je ne sais pas", ar: "لا أعرف" }),
  gloss("nvm", { en: "never mind", fr: "laisse tomber", ar: "لا يهم" }),
  gloss("wyd", { en: "what are you doing", fr: "tu fais quoi", ar: "ماذا تفعل" }),
  gloss("noo", { en: "not", fr: "pas", ar: "ليس" }),
  gloss("iz", { en: "is", fr: "est", ar: "يكون" }),
  gloss("slay", { en: "you did amazingly", fr: "tu as tout déchiré", ar: "أبدعت" }),
  gloss("periodt", { en: "and that's final", fr: "et c'est point final", ar: "وانتهى الأمر" }),
  gloss("ate", { en: "you nailed it", fr: "tu as assuré", ar: "أتقنت" }),
  gloss("tea", { en: "the gossip", fr: "le potin", ar: "القيل والقال" }),
  gloss("gtg", { en: "I have to go", fr: "je dois y aller", ar: "يجب أن أذهب" }),
  gloss("brb", { en: "I'll be right back", fr: "je reviens", ar: "أعود حالًا" }),
  gloss("omw", { en: "I'm on my way", fr: "j'arrive", ar: "أنا في الطريق" }),
  gloss("idc", { en: "I don't care", fr: "je m'en fiche", ar: "لا يهمني" }),
  gloss("delulu", { en: "I'm telling myself a lovely lie", fr: "je me raconte une belle histoire", ar: "أروي لنفسي قصة جميلة" }),
  gloss("itsgiving", { en: "it feels like", fr: "ça donne", ar: "يعطي إحساس" }),
  gloss("h8", { en: "I hate this", fr: "je déteste ça", ar: "أكره هذا" }),
];

export const numbers = [
  number("🫧0", "0", { en: "zero, a bubble", fr: "zéro, une bulle", ar: "صفر، فقاعة" }),
  number("1ce", "1", { en: "one, ice", fr: "un, de la glace", ar: "واحد، ثلج" }),
  number("2tu", "2", { en: "two, a tutu", fr: "deux, un tutu", ar: "اثنان، تنورة رقص" }),
  number("3lle", "3", { en: "three, she", fr: "trois, elle", ar: "ثلاثة، هي" }),
  number("4ev", "4", {
    en: "four, forever",
    fr: "quatre, pour toujours",
    ar: "أربعة، إلى الأبد",
    contraire: { en: "not forever", fr: "pas pour toujours", ar: "ليس إلى الأبد" },
    hangry: { en: "forever, after snacks", fr: "pour toujours, après les encas", ar: "إلى الأبد، بعد القطع" },
  }),
  number("5ly", "5", { en: "five, a smile", fr: "cinq, un sourire", ar: "خمسة، ابتسامة" }),
  number("6xy", "6", { en: "six, a little heat", fr: "six, un peu de feu", ar: "ستة، قليل من الحرارة" }),
  number("7vn", "7", { en: "seven, heaven", fr: "sept, le paradis", ar: "سبعة، جنة" }),
  number("8te", "8", { en: "eight, she ate", fr: "huit, elle a assuré", ar: "ثمانية، أتقنت" }),
  number("9ne", "9", { en: "nine, a shine", fr: "neuf, un éclat", ar: "تسعة، لمعان" }),
];

function name(token, readings) {
  return { kind: "name", niss: [token], aliases: [], readings };
}

function gloss(token, literal) {
  return { kind: "particle", niss: [token], aliases: [], readings: { literal } };
}

function number(token, digit, extra) {
  const { en, fr, ar, ...rest } = extra;
  return {
    kind: "number",
    digit,
    niss: [normalize(token)],
    aliases: [],
    readings: { literal: { en, fr, ar }, ...rest },
  };
}

export const lexicon = [...entries, ...names, ...particles, ...numbers];

export function buildIndex(list = lexicon) {
  const index = new Map();
  for (const entry of list) {
    index.set(entry.niss.join(" "), entry);
    for (const alias of entry.aliases) index.set(alias, entry);
  }
  return index;
}
