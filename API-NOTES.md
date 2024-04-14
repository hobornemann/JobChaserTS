# API

API-Documentation:  
https://gitlab.com/arbetsformedlingen/job-ads/jobsearch-apis/-/blob/main/docs/GettingStartedJobSearchSE.md#Endpoints


## HOB

https://jobsearch.api.jobtechdev.se/search?q=React%20JavaScript%20Vue%20Stockholm%20Uppsala

=> sökningen verkar ge "OR"-logik mellan söktermerna inom respektive kategori (Skill respektive Location) och "AND"-logik mellan kategorierna. Toppen!




## SEARCH - FLEXIBLE  

Filter by search term: 
https://jobsearch.api.jobtechdev.se/search?q=Flen

### Wildcard-search: (*)
https://jobsearch.api.jobtechdev.se/search?q=muse*

Frassökning
För att söka en fras i annonstexten, använd q parametern och skriv frasen inom situationstecken: "den här frasen"
För att anropa den behöver du omvandla till HTML koden %22

https://jobsearch.api.jobtechdev.se/search?q=%22search%20for%20this%20phrase%22


### Sökning inom specifikt yrkesområde
Först, använd Taxonomy API för att få Id Data/IT (occupation field). Gör
sedan en fritext sökning på "IT" för att specificera sökningen till occupation-fältet.
I svaret hittar du conceptId (apaJ_2ja_LuF)för termen Data/IT. Använd detta tilsammans med "search" endpoint för att
definera vad du vill ha. Så nu vill jag kombinera det här med mitt favorit programmeringsspråk utan alla liknande jobb
förstör min sökning.
Request URL

https://jobsearch.api.jobtechdev.se/search?occupation-field=apaJ_2ja_LuF&q=python


På liknande sätt kan du använda Taxonomy API för att hitta conceptId för
parametrarna  occupation-group och occupation-collection.
occupation-collection kan användas i kombination med occupation-name, occupation-field och occupation-group och
sökningen kommer att visa annonser som finns i alla.


### Negativ sökning
Så, det här är väldigt enkelt om du använder q-fältet. Tillexempel, du vill hitta Unix jobb.
Request URL

https://jobsearch.api.jobtechdev.se/search?q=unix


Men du upptäcker att du får flera träffar för Linux jobb, vilket du inte alls vill. Det enda du behöver göra är att
sätta ett - tecken och det ord du vill utesluta
Request URL

https://jobsearch.api.jobtechdev.se/search?q=unix%20-linux


## SEARCH BY ID

Filter by job-ad ID:
https://jobsearch.api.jobtechdev.se/ad/8430129






ERRORS:

Misslyckade frågor får följande responkoder:
HTTP Status code	Reason	Explanation
400	Bad Request	Något fel i frågan
404	Missing ad	Annonsen du försökte hämta är inte tillgänglig
429	Rate limit exceeded	You have sent too many requests in a given amount of time
500	Internal Server Error	Något fel på serversidan


