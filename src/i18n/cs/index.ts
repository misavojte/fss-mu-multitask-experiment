import type { BaseTranslation } from '../i18n-types';

const cs = {
	// TODO: your translations go here
	HI: 'Hi {name:string}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n',
	footerText: 'Aplikace je součástí výzkumu na Fakultě sociálních studií Masarykovy univerzity.',
	loading: 'Načítání',
	pleaseWait: 'Prosím, čekejte na načtení dat.',
	socialButtons: {
		react: 'Zjistit víc',
		ignore: 'Nemám zájem'
	},
	reminder: {
		priority: 'Připomínáme, že **matematická úloha je prioritní**.',
		even: 'Připomínáme, že **žádný úkol není prioritní**.'
	},
	question: {
		battery: {
			back: 'Předchozí sekce',
			next: 'Přeskočit na další sekci'
		},
		1: {
			heading: 'Vítejte v experimentu mediálního multitaskingu',
			confirm: 'Pokračovat',
			paragraphs: {
				1: 'Simulujeme typické digitální prostředí, kde je často vyžadován takzvaný "mediální multitasking", což nám pomůže pochopit, jak dobře lidé zvládají více úkolů současně. Předtím, než přejdete k cvičným úkolům a samotné mediální multitaskingové úloze, si pečlivě přečtěte pokyny.'
			}
		},
		2: {
			heading: 'Pokyny ke studii',
			confirm: 'Pokračovat',
			paragraphs: {
				1: 'V tomto experimentu se budete současně účastnit tří úkolů: řešení jednoduchých matematických úloh, sledování dokumentu a reagování na příspěvky na fiktivní sociální síti Chatbook. Prioritní úlohou je řešení matematických úloh. Na dalších snímcích následující podrobnější instrukce.'
			}
		},
		'2b': {
			heading: 'Pokyny ke studii',
			confirm: 'Pokračovat',
			paragraphs: {
				1: 'V tomto experimentu se budete současně účastnit tří úkolů: řešení jednoduchých matematických úloh, sledování dokumentu a reagování na příspěvky na fiktivní sociální síti Chatbook. Získáte jeden bod za jakýkoliv úkol, který splníte. Vaším cílem je získat co nejvíce bodů plněním všech tří typů úkolů současně.'
			}
		},
		'2b-dual': {
			heading: 'Pokyny ke studii',
			confirm: 'Pokračovat',
			paragraphs: {
				1: 'V tomto experimentu se budete současně účastnit dvou úkolů: řešení jednoduchých matematických úloh a reagování na příspěvky na fiktivní sociální síti Chatbook. Získáte jeden bod za jakýkoliv úkol, který splníte. Vaším cílem je získat co nejvíce bodů plněním obou typů úkolů současně.'
			}
		},
		3: {
			heading: 'Nejprve zadejte párovací ID pro experiemnt.',
			confirm: 'Potvrdit'
		},
		4: {
			heading: 'Úkol 1: Řešení matematických úloh',
			confirm: 'Rozumím',
			paragraphs: {
				1: 'Toto je váš hlavní úkol. Bude vám předložena jednoduchá matematická úloha, kterou budete muset vyřešit.',
				2: 'Vaším cílem je vybrat správný výsledek ze čtyř možností kliknutím myší.',
				3: `- **Bez časového limitu:** Na odpovídání není stanoven časový limit. Odpověď můžete promýšlet tak dlouho, jak budete potřebovat. Nelze ji však změnit.
- **Bodové ohodnocení:** Získáte tři body za každou správnou odpověď.
- **Automatický postup:** Po vaší odpovědi bude následovat další úloha.`
			}
		},
		'4b': {
			heading: 'Úkol 1: Řešení matematických úloh',
			confirm: 'Rozumím',
			paragraphs: {
				1: 'Bude vám předložena jednoduchá matematická úloha, kterou budete muset vyřešit.',
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
				1: 'Zatímco budete řešit matematické úlohy, budete muset současně pozorně sledovat dokumentární video. Matematické úlohy jsou však stále vaším hlavním úkolem.',
				2: 'Video několikrát zmíní specifické slovo v různých svých tvarech. Pokaždé, když slovo uslyšíte, zmáčkněte tlačítko uvnitř videa. Konkrétně jde o slovo **"mokřad"** a všechna odvozená slova (tedy např. i přídavné jméno *mokřadní*). Pokud odpovíte dostatečně rychle a správně, získáte jeden bod.'
			}
		},
		'5b': {
			heading: 'Úkol 2: Sledování dokumentu',
			confirm: 'Rozumím',
			paragraphs: {
				1: 'Zatímco budete řešit matematické úlohy, budete muset současně pozorně sledovat dokumentární video.',
				2: 'Video několikrát zmíní specifické slovo v různých svých tvarech. Pokaždé, když slovo uslyšíte, zmáčkněte tlačítko uvnitř videa. Konkrétně jde o slovo **"mokřad"** a všechna odvozená slova (tedy např. i přídavné jméno *mokřadní*). Pokud odpovíte dostatečně rychle a správně, získáte jeden bod.'
			}
		},
		6: {
			heading: 'Úkol 3: Reakce na příspěvky na sociální síti',
			confirm: 'Rozumím',
			paragraphs: {
				1: 'V této aktivitě budete interagovat s fiktivní sociální sítí Chatbook. Chatbook je navržen tak, aby zobrazoval příspěvky, které odrážejí různé každodenní zájmy, nálady a myšlenky - podobně jako byste mohli potkat při procházení skutečných sociálních sítí.',
				2: 'Pro tuto relaci máte přiřazen anonymní účet. Během úkolu uvidíte příspěvky podobné těm, které by sdíleli přátelé nebo kolegové při běžném procházení.',
				3: 'Při zobrazení každého příspěvku jednoduše reagujte podle svého osobního dojmu výběrem jedné z následujících možností:',
				4: `- **Zjistit víc:** Vyberte tuto možnost, pokud cítíte potřebu okamžitě reagovat na příspěvek (např. pomoci, komentovat, sdílet, dozvědět se více).
- **Nemám zájem:** Vyberte tuto možnost, pokud vás příspěvek nezajímá nebo byste ho normálně přescrollovali.
- **Bodování:** Získáte jeden bod za každou reakci - ať už zvolíte "Zjistit víc" nebo "Nemám zájem". Snažte se reagovat na každý příspěvek, abyste získali co nejvíce bodů.`,
				5: 'Příspěvky se budou objevovat ve středu obrazovky, doprovázené zvukem upozornění. Na každý příspěvek máte jen několik sekund na reakci, než zmizí. Těsně před zmizením vás na tuto skutečnost upozorní zvukový signál. Prosím, reagujte rychle a upřímně podle své první reakce.'
			}
		},
		'6-dual': {
			heading: 'Úkol 2: Reakce na příspěvky na sociální síti',
			confirm: 'Rozumím',
			paragraphs: {
				1: 'V této aktivitě budete interagovat s fiktivní sociální sítí Chatbook. Chatbook je navržen tak, aby zobrazoval příspěvky, které odrážejí různé každodenní zájmy, nálady a myšlenky - podobně jako byste mohli potkat při procházení skutečných sociálních sítí.',
				2: 'Pro tuto relaci máte přiřazen anonymní účet. Během úkolu uvidíte příspěvky podobné těm, které by sdíleli přátelé nebo kolegové při běžném procházení.',
				3: 'Při zobrazení každého příspěvku jednoduše reagujte podle svého osobního dojmu výběrem jedné z následujících možností:',
				4: `- **Zjistit víc:** Vyberte tuto možnost, pokud cítíte potřebu okamžitě reagovat na příspěvek (např. pomoci, komentovat, sdílet, dozvědět se více).
- **Nemám zájem:** Vyberte tuto možnost, pokud vás příspěvek nezajímá nebo byste ho normálně přescrollovali.
- **Bodování:** Získáte jeden bod za každou reakci - ať už zvolíte "Zjistit víc" nebo "Nemám zájem". Snažte se reagovat na každý příspěvek, abyste získali co nejvíce bodů.`,
				5: 'Příspěvky se budou objevovat ve středu obrazovky, doprovázené zvukem upozornění. Na každý příspěvek máte jen několik sekund na reakci, než zmizí. Těsně před zmizením vás na tuto skutečnost upozorní zvukový signál. Prosím, reagujte rychle a upřímně podle své první reakce.'
			}
		},
		7: {
			heading: 'Shrnutí',
			confirm: 'Rozumím, začít zácvičnou úlohu',
			paragraphs: {
				1: 'Vaším cílem je nasbírat co nejvíce bodů. Každý získaný bod reflektuje vaši schopnost plnit daný úkol. Snažte se tedy získat co nejvíce bodů! Připomínáme, že **matematická úloha je prioritní**. Váš výsledek bude zobrazen na konci.',
				2: 'Vzhledem k tomu, že za řešení matematické úlohy je nejvíc bodů, tento úkol upřednostněte, zatímco budete řešit i ostatní úkoly.'
			}
		},
		'7b': {
			heading: 'Shrnutí',
			confirm: 'Rozumím, začít zácvičnou úlohu',
			paragraphs: {
				1: 'Vaším cílem je nasbírat co nejvíce bodů. Snažte se tedy získat co nejvíce bodů napříč všemi třemi typy úkolů! Připomínáme, že **žádný úkol není prioritní**. Váš výsledek bude zobrazen na konci.',
				2: 'Nyní Vás čeká zácvičná úloha, která vám pomůže seznámit se všemi třemi typy úkolů zároveň.'
			}
		},
		'7b-dual': {
			heading: 'Shrnutí',
			confirm: 'Rozumím, začít zácvičnou úlohu',
			paragraphs: {
				1: 'Vaším cílem je nasbírat co nejvíce bodů. Snažte se tedy získat co nejvíce bodů napříč oběma typy úkolů! Připomínáme, že **žádný úkol není prioritní**. Váš výsledek bude zobrazen na konci.',
				2: 'Nyní Vás čeká zácvičná úloha, která vám pomůže seznámit se s oběma typy úkolů zároveň.'
			}
		},
		'ap-1': {
			heading: 'Chcete pokračovat na ostrý test?',
			options: {
				0: 'Ano, pokračovat na ostrý test',
				1: 'Ne, chci zopakovat zácvik'
			}
		},
		'presingle-1': {
			heading: 'Děkujeme! Nyní Vás čeká poslední úloha.',
			confirm: 'Pokračovat',
			paragraphs: {
				1: 'Blahopřejeme! Úspěšně jste dokončili experiment mediálního multitaskingu! Vaše výsledky:',
				2: '- **Matematické úlohy:** {patternMatchingPoints:number} bodů ({maxPatternMatchingPoints:number})',
				3: '- **Dokumentární video:** {documentaryPoints:number} bodů ({maxDocumentaryPoints:number})',
				4: '- **Sociální média:** {socialMediaPoints:number} bodů ({maxSocialMediaPoints:number})',
				5: 'Nyní Vás čeká poslední úloha.'
			}
		},
		'presingle-2': {
			heading: 'Pouze reakce na příspěvky na sociální síti',
			confirm: 'Pokračovat',
			paragraphs: {
				1: 'Účastníte se studie, která simuluje prostředí sociálních médií. V této aktivitě budete interagovat s fiktivní sociální sítí Chatbook. Chatbook je navržen tak, aby zobrazoval příspěvky, které odrážejí různé každodenní zájmy, nálady a myšlenky - podobně jako byste mohli potkat při procházení skutečných sociálních sítí.',
				2: 'Pro tuto relaci máte přiřazen anonymní účet. Během úkolu uvidíte příspěvky podobné těm, které by sdíleli přátelé nebo kolegové při běžném procházení.',
				3: 'Při zobrazení každého příspěvku jednoduše reagujte podle svého osobního dojmu výběrem jedné z následujících možností:',
				4: `- **Zjistit víc:** Klikněte na toto tlačítko, pokud vás příspěvek zaujme nebo vás nutí reagovat - ať už pomoci, komentovat, sdílet nebo dozvědět se více.
- **Nemám zájem:** Klikněte na toto tlačítko, pokud vás příspěvek nezajímá nebo byste ho normálně přescrollovali.`,
				5: 'V této úloze se budete věnovat pouze interakci se sociálními médii - žádné další úkoly nebudou zobrazeny.',
				6: 'Příspěvky se budou objevovat ve středu obrazovky, doprovázené zvukem upozornění. Na každý příspěvek máte jen několik sekund na reakci, než zmizí. Těsně před zmizením vás na tuto skutečnost upozorní zvukový signál. Prosím, reagujte rychle a upřímně podle své první reakce.'
			}
		}
	},
	'pt-end': {
		heading: 'Děkujeme za účast!',
		confirm: 'Ukončit',
		paragraphs: {
			0: 'Blahopřejeme! Úspěšně jste dokončili celý experiment! Vaše výsledky v poslední části:',
			1: 'Sociální média: {socialMediaPoints:number} bodů ({maxSocialMediaPoints:number})',
			2: 'Velmi děkujeme za Vaši účast!'
		}
	}
} satisfies BaseTranslation;

export default cs;
