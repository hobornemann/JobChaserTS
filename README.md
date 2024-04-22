# STYRKOR OCH BRISTER I KODEN

## Styrkor

+ UseContext har använts för globala variabler som inte ändras så mycket, tex för autentisering.

+ Redux Toolkit har använts för globala variabler som ändras ofta

+ CreateAsyncThunk har använts för att fetcha extern data på ett asynkront sätt, så att även fetchnings-staten pending, fulfilled och rejected kunde användas och en mer detaljerad kommunikation med användaren kunde uppnås.

+ Autentisering sker via Firebase. 

+ Användarens registrerings- och inloggningsuppgifter valideras.

+ Användaren kan endast skapa- och avmarkera jobbfavoriter samt se listan av favoritmarkerade jobb i inloggat läge.

+ Användarens senast använda input-data för sökning sparas i localStorage och dyker upp i sökfälten när användaren startar JobChaser appen vid nästa tillfälle igen.

+ Användaren kan söka på sökbegreppen (inklusive anställningstiden) på två olika logiska operander:  'OCH' säkerställer att samtliga sökbegrepp uppfylls (dock ej Orten/-erna, då dessa gäller separat) 
'ELLER' tar fram jobbannonser där åtminstone 1 sökbegrepp (inklusive anställningstid-variabeln) är uppfyllt.

+ Användaren kan själv bestämma hur många sökresultat som han/hon maximalt vill ha (valbara antal finns i en select-dropdown).

+ Användaren får reda på hur många sökresultat som hittades (träffar) för de sökbegrepp användaren angav.

+ Användaren kan ange komma-separerade söksträngar eller blankstegsseparerade söksträngar i fritext-sökfälten för sökbegrepp och för orter. Sökningen använder sig av lowercase för både sökbegreppen och texten som ska genomsökas.

+ Användaren får meddelanden om när fetchning pågår, när sökresultatet innehöll noll träffar, när Arbetsförmedlingens hemsida inte kan nås, när det inte finns några favorit-annonser sparade ännu etc.

+ När användaren klickar inför att titta på favoriter, så döljs sök-komponenten.

+ Applikationen är skriven i Typescript och har noll Typescript-fel.

+ Applikationen använder sig av ett riktigt API som Arbetsförmedlingen tillhandahåller.


## Brister

- Lyckades inte förstå i tid varför jag inte lyckades publicera projektet på GitHub pages. 

- Det finns ingen service worker eller motsvarande funktionalitet som skulle ibland skulle kunna använda sig redan hämtade och cachade data istället för att fetcha externt vid varje sökning.

- Applikationen är inte helt responsiv. Jag fokuserade på att använda verktygen vi lärt oss. 

- Applikationen har ingen dark-mode.

- Projektet lämnades inte in i tid. Jag upptäckte först nu på morgonen att uppgiften skulle redan ha lämnats in i går kväll söndag istället för idag måndag. Ber om ursäkt för den missen. Trodde att det var på en måndag som tidigare veckor. 

- Hann inte lägga till felhantering överallt i koden.


## Sammanfattning

- JobChaser var ett lärorikt och intressant projekt som innehöll många nyttiga verktyg för att skapa verkliga websidor. 







