import type { BaseTranslation } from '../i18n-types';

const cs = {
	// TODO: your translations go here
	HI: 'Hi {name:string}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n',
	footerText: 'Aplikace je součástí výzkumu na Fakultě sociálních studií Masarykovy univerzity.',
	loading: 'Načítání',
	pleaseWait: 'Prosím, čekejte na načtení dat.',
	socialButtons: {
		like: 'Líbí se mi',
		dislike: 'Nelíbí se mi'
	},
	reminder: {
		priority: 'Připomínáme, že **výběr vhodného tvaru je prioritní**.',
		even: 'Připomínáme, že **žádný úkol není prioritní**.'
	},
	question: {
		battery: {
			back: 'Předchozí sekce',
			next: 'Přeskočit na další sekci'
		},
		1: {
			heading: 'Vítejte v Multitasking experimentu',
			confirm: 'Pokračovat',
			paragraphs: {
				1: 'Simulujeme typické digitální prostředí, kde je často vyžadován takzvaný “multitasking”, což nám pomůže pochopit, jak dobře lidé zvládají více úkolů současně. Předtím, než přejdete k cvičným úkolům a samotné multitaskingové úloze, si pečlivě přečtěte pokyny.'
			}
		},
		2: {
			heading: 'Pokyny ke studii',
			confirm: 'Pokračovat',
			paragraphs: {
				1: 'V tomto experimentu se budete současně účastnit tří úkolů: řešení jednoduchých aritmetických rovnic, sledování dokumentu a reagování na příspěvky na fiktivní sociální síti Chitralok. Prioritní úlohou je řešení aritmetických rovnic. Na dalších snímcích následující podrobnější instrukce.'
			}
		},
		'2b': {
			heading: 'Pokyny ke studii',
			confirm: 'Pokračovat',
			paragraphs: {
				1: 'V tomto experimentu se budete současně účastnit tří úkolů: řešení jednoduchých aritmetických rovnic, sledování dokumentu a reagování na příspěvky na fiktivní sociální síti Chitralok. Žádný z úkolů není prioritní a všechny úkoly jsou stejně důležité. Na dalších snímcích následující podrobnější instrukce.'
			}
		},
		3: {
			heading: 'Nejprve zadejte párovací ID pro experiemnt.',
			confirm: 'Potvrdit'
		},
		4: {
			heading: 'Úkol 1: Řešení aritmetických rovnic',
			confirm: 'Rozumím',
			paragraphs: {
				1: 'Toto je váš hlavní úkol. Bude vám předložena jednoduchá aritmetická rovnice, kterou budete muset vyřešit.',
				2: 'Vaším cílem je vybrat správný výsledek ze čtyř možností kliknutím myší.',
				3: `- **Bez časového limitu:** Na odpovídání není stanoven časový limit. Odpověď můžete promýšlet tak dlouho, jak budete potřebovat. Nelze ji však změnit.
- **Bodové ohodnocení:** Získáte tři body za každou správnou odpověď.
- **Automatický postup:** Po vaší odpovědi bude následovat další úloha.`
			}
		},
		'4b': {
			heading: 'Úkol 1: Řešení aritmetických rovnic',
			confirm: 'Rozumím',
			paragraphs: {
				1: 'Bude vám předložena jednoduchá aritmetická rovnice, kterou budete muset vyřešit.',
				2: 'Vaším cílem je vybrat správný výsledek ze čtyř možností kliknutím myší.',
				3: `- **Bez časového limitu:** Na odpovídání není stanoven časový limit. Odpověď můžete promýšlet tak dlouho, jak budete potřebovat. Nelze ji však změnit.
- **Bodové ohodnocení:** Získáte jeden bod za každou správnou odpověď.
- **Automatický postup:** Po vaší odpovědi bude následovat další úloha.`
			}
		},
		5: {
			heading: 'Úkol 2: Sledování dokumentu',
			confirm: 'Rozumím',
			paragraphs: {
				1: 'Zatímco budete řešit aritmetické rovnice, budete muset současně pozorně sledovat dokumentární video. Aritmetické rovnice jsou však stále vaším hlavním úkolem.',
				2: 'Video několikrát zmíní specifické slovo v různých svých tvarech. Pokaždé, když slovo uslyšíte, zmáčkněte tlačítko uvnitř videa. V zácvičné úloze jde o slovo "Paretto", v hlavní úloze o slovo **"mokřad"**. Pokud odpovíte dostatečně rychle a správně, získáte jeden bod.'
			}
		},
		'5b': {
			heading: 'Úkol 2: Sledování dokumentu',
			confirm: 'Rozumím',
			paragraphs: {
				1: 'Zatímco budete řešit aritmetické rovnice, budete muset současně pozorně sledovat dokumentární video.',
				2: 'Video několikrát zmíní specifické slovo v různých svých tvarech. Pokaždé, když slovo uslyšíte, zmáčkněte tlačítko uvnitř videa. V zácvičné úloze jde o slovo "Paretto", v hlavní úloze o slovo **"mokřad"**. Pokud odpovíte dostatečně rychle a správně, získáte jeden bod.'
			}
		},
		6: {
			heading: 'Úkol 3: Reakce na příspěvky na sociální síti',
			confirm: 'Rozumím',
			paragraphs: {
				1: 'Dále budete interagovat s fiktivní sociální sítí Chitralok. Vaše volba pomáhá utvářet veřejnou digitální zeď, kterou vidí Vaši přátelé a veřejnost. Představte si, že každý příspěvek, který označíte jako oblíbený, se objeví na této zdi, která je věnována vašim přátelům a dalším lidem.',
				2: 'Během experimentu vám systém bude zobrazovat různé příspěvky, které se budou objevovat na obrazovce vlevo, doprovázené zvukem upozornění. Na každý příspěvek můžete reagovat jen několik sekund, než zmizí. Těsně před zmizením Vás na tuto skutečnost upozorní zvukový signál. Zareagujte na každý příspěvek kliknutím na tlačítko **"Líbí se mi"** nebo **"Nelíbí se mi"**.',
				3: `- **Líbí se mi:** Vyjadřujete, že příspěvek chcete zobrazit na veřejné zdi.
- **Nelíbí se mi:** Vyjadřujete, že příspěvek na této zdi nechcete.
- **Bodování:** Každá reakce, ať už pozitivní nebo negativní, vám přinese jeden bod. Snažte se reagovat na každý příspěvek, abyste získali co nejvíce bodů.`
			}
		},
		7: {
			heading: 'Shrnutí',
			confirm: 'Rozumím, začít zácvičnou úlohu',
			paragraphs: {
				1: 'Vaším cílem je nasbírat co nejvíce bodů. Každý získaný bod reflektuje vaši schopnost plnit daný úkol. Snažte se tedy získat co nejvíce bodů! Připomínáme, že **výběr vhodného tvaru je prioritní**. Váš výsledek bude zobrazen na konci.',
				2: 'Vzhledem k tomu, že za řešení aritmetických rovnic je nejvíc bodů, tento úkol upřednostněte, zatímco budete řešit i ostatní úkoly.'
			}
		},
		'7b': {
			heading: 'Shrnutí',
			confirm: 'Rozumím, začít zácvičnou úlohu',
			paragraphs: {
				1: 'Vaším cílem je nasbírat co nejvíce bodů. Každý získaný bod reflektuje vaši schopnost plnit daný úkol. Snažte se tedy získat co nejvíce bodů! Připomínáme, že **žádný úkol není prioritní**. Váš výsledek bude zobrazen na konci.',
				2: 'Všechny úkoly jsou stejně důležité, takže se snažte získat co nejvíce bodů ve všech úkolech.'
			}
		},
		'ap-1': {
			heading: 'Chcete pokračovat na ostrý test?',
			options: {
				0: 'Ano, pokračovat na ostrý test',
				1: 'Ne, chci zopakovat zácvik'
			}
		}
	},
	'pt-end': {
		heading: 'Děkujeme za účast!',
		confirm: 'Ukončit',
		paragraphs: {
			0: 'Blahopřejeme! Úspěšně jste dokončili multitaskingovou úlohu! Vaše skóre činí {points:number} bodů.'
		}
	}
} satisfies BaseTranslation;

export default cs;
