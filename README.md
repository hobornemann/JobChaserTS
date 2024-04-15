# VECKANS FRÅGOR

## Vad är Redux Toolkit? 

Redux Toolkit bygger på Redux och är ett paket som gör det enkelt skapa centralt belägna states (de bor i en store, som utvecklaren delar upp i sammanhörande bitar, så kallade slices). Dessutom möjliggör Redux Toolkit att man uppdaterar dessa states via funktioner, så kallade reducers, som ligger samlade i samma slice-objekt som det tillhörande state:t.

Genom att använda sig av immer-biblioteket kan utvecklaren skriva muterbar kod, men som sedan blir immutable. För att kunna genomföra asynkrona fetchar, behöver man använda sig av Async Thunks. Redux DevTools är ett hjälpverktyg för utvecklare att felsöka sin kod. Fördelen med Redux Toolkit jämfört med Redux är att man slipper en hel del boiler plate kod. 


## När, i vilka situationer vill man använda Redux Toolkit?

I medelstora och större projekt kan det vara lämpligt att använda sig av Redux Toolkit. Även i situationer där projektet innehåller komponenter som bygger i många nivåer. Om man inte använder sig av Redux Toolkit, så behöver man skicka props genom många nivåer av komponenter för att till slut komma fram där de ska användas (prop-drilling). Utöver att det tar tid att skriva kod för att skicka vidare props:en genom komponentträdet, så kan det bli bökigt / tidskrävande att genomföra förändringar och underhålla applikationen. Med Redux Toolkit importerar man helt enkelt de objekt/variabler man vill använda sig av och uppdaterar deras state genom att dispatcha den relevanta funktionen/reducern med den/de uppdaterade variablerna (action.payload).


## Beskriv typiska områden hur man använder Typescript i React? (ex props, event, useReducer,etc)

Typscript i React: För att minimera risken att fel uppstår i applikationen, kräver Typescript att man typar alla variabler/objekt när man instantierar dem. Även om det tar lite extra tid att ange vilken typ det är, så sparar man in tid på felsökning och på så sätt att man får mer hjälp med VSCode's intellisense. Typen bestämmer vilka properties och metoder som typen har och VSCode kan därför kontrollera i realtid huruvida man gör något fel eller inte när man kodar.

Exempel på event-typer: React.FocusEvent<HTMLInputElement>, React.ChangeEvent<HTMLInputElement>
Exempel på typning av props: 

 type searchJobsState = {
    isLoading: boolean
    messageToUser: string
    error: string 
    currentLocationFilters: string[]
    allLocationFilters: string[]
    currentSkillsFilters: string[]
    allSkillsFilters: string[]
    currentSkillsOperand: "AND" | "OR"
    currentJobs: Job[]
    allJobs: Job[]
  }

Exempel för Typescript useReducer:

import React, { useReducer } from 'react';

type CounterState = {
  count: number;
};

type Action = { type: 'increment' } | { type: 'decrement' } | { type: 'reset'; payload: number };

const reducer = (state: CounterState, action: Action): CounterState => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    case 'reset':
      return { ...state, count: action.payload };
    default:
      return state;
  }
};








