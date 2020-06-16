---
title: "Humørteste sosiale medier"
date: 2013-12-03
image: ./mark-adriane-muS2RraYRuQ-unsplash.jpg
tags: [AI, API, idea, Twitter]
author: tomfa
status: publish
---

**Hvordan kan man hente ut humøret eller følelser fra store datamengder? Hva kan dataen brukes til?** 

Å forstå språk er en stor utfordring innen kunstig intelligens. Det er flere grunner til dette. Tvetydigheten av ord, ulik uttalelse og tonefall, ironi. Barn trenger årevis av intensiv læring for å beherske et språk. Selv en voksen nordmann har ofte vanskeligheter med å forstå enkelte ord og dialekter til andre nordmenn. To venner kan misforstå hverandre om de ikke er i samme kontekst. Og selv om i samme kontekst, oppstår misforståelser dersom de kommuniserer kun via tekst, særlig uten emojis 😉. 

En litt enklere oppgave enn en robot man kan føre en samtale med (ala [Cleverbot](http://cleverbot.com/), som forøvrig hadde vært en drøm å kunne være med å utvikle), er å [humørteste et stort sett med meldinger](http://videolectures.net/cvss08_dodds_tecolst/), som tweets. Antall tweets ligger på [flere hundre millioner daglig](https://blog.twitter.com/2011/03/numbers.html), så datasettet er mer enn stort nok selv om vi bare skulle hente ut en liten andel av de. Oppgaven er i sin essens å kunne analysere en setning og si i hvilken grad skribenten er glad eller trist. Om denne fungerer nogenlunde godt trenger vi bare å analysere nok tweets for å kunne gi en poengsum på hvor glad folk er (eller rettere sagt hvor glade unge og litt over gjennomsnittlig utdannede amerikanere er – den jevne twitrer). 

Resultatet kunne vi presentert på en nettside som en smileyface av varierende humør. Første del av oppgaven er som nevnt å kunne analysere en setning og sette en poengsum på hvor bra eller dårlig den er humørmessig. Dette kan løses (i sin letteste form) ved å ha en liste over følelsesladde ord, og en tilhørende verdi (f.eks. fra minus til pluss 10) for hvert ord. Man summerer opp summen av de ladde ordene i en tweet og får en poengsum. Metoden kunne så gradvis bli tweaket ved f.eks å benytte utropstegn og capslock som multipliers, blant mye annet. Listen over hvilke ord som er gode og dårlige ville selvsagt vært en saftig utfordring å lage, men heldigvis har [noen andre allerede tatt seg bryet](http://www.uvm.edu/~pdodds/files/papers/others/1999/bradley1999a.pdf). 

Vår "mood-analyzer" vil selvsagt ofte ta feil, ha problemer med hele konseptet "ironi" osv., men om datasettet er stort nok vil den sannsynligvis fungerer godt. Andre delen av oppgaven er da å hente dataen ut fra Twitter (sidenote: Når jeg tenker meg om, er vell egentlig dette den første delen av oppgaven). Å datamine samtlige tweets vil kreve en saftig kraftpumpe, og er noe man dessuten ikke får tilgang til i praksis. Men du kan få [en representativ og god nok samling til å leke deg med](https://sites.google.com/site/twitterresearch09/articles/datamining-twitter-part-2-accessing-the-gardenhose)

 **Lærdom og nytteverdi:**

*   Hvordan datamining Twitter
*   Generell Twitter-API

**Ulemper og utfordringer:**

*   Vil ikke virke korrekt på små datamengder.
*   Ingen/lite praktisk nytte av applikasjonen.
*   Ressurskrevende.

**Utvidelser**

*   Istedet for å finne et generelt humør, finn humør knyttet til merkevarer og produkter. Lag så en merkevare/produkt-humør indeks.
*   Samle data om aksjekurser for selskapene som fører merkevarene, og sett opp en hypotetisk aksjetrader – Se hvor godt den gjør det i forhold til indexen.
