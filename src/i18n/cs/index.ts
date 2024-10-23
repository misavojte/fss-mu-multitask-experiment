import type { BaseTranslation } from '../i18n-types';

const cs = {
	// TODO: your translations go here
	HI: 'Hi {name:string}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n',
	footerText: 'Aplikace je součástí výzkumu na Fakultě sociálních studií Masarykovy univerzity.',
	loading: 'Načítání',
	pleaseWait: 'Prosím, čekejte na načtení dat.',
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
				1: 'V tomto experimentu se budete současně účastnit tří úkolů: výběr vhodného tvaru, sledování dokumentu a reagování na memy na sociálních médiích. Na dalších snímcích následující podrobnější instrukce.'
			}
		},
		'2b': {
			heading: 'Pokyny ke studii',
			confirm: 'Pokračovat',
			paragraphs: {
				1: 'V tomto experimentu se budete současně účastnit tří úkolů: výběr vhodného tvaru, sledování dokumentu a reagování na memy na sociálních médiích. Žádný z úkolů není prioritní a všechny úkoly jsou stejně důležité. Na dalších snímcích následující podrobnější instrukce.'
			}
		},
		3: {
			heading: 'Nejprve zadejte párovací ID pro experiemnt.',
			confirm: 'Potvrdit'
		},
		4: {
			heading: 'Úkol 1: Výběr vhodného tvaru',
			confirm: 'Rozumím',
			paragraphs: {
				1: 'Toto je váš hlavní úkol. Bude vám předložena 3 × 3 matice, kde osm z devíti buněk obsahuje abstraktní tvary a jedna buňka v pravém dolním rohu je prázdná.',
				2: 'Vaším cílem je dokončit matici tím, že odvodíte chybějící tvar ze čtyř možných alternativ a vyberete jej kliknutím myší. Chcete-li najít správný tvar, analyzujte vztahy mezi tvary v matici s ohledem na čtyři dimenze: tvar, barvu, velikost a polohu.',
				3: 'Na odpovídání není stanoven časový limit. Po vaší odpovědi bude následovat další úloha. Za každou správnou odpověď získáte tři body.'
			}
		},
		'4b': {
			heading: 'Úkol 1: Výběr vhodného tvaru',
			confirm: 'Rozumím',
			paragraphs: {
				1: 'Toto je váš hlavní úkol. Bude vám předložena 3 × 3 matice, kde osm z devíti buněk obsahuje abstraktní tvary a jedna buňka v pravém dolním rohu je prázdná.',
				2: 'Vaším cílem je dokončit matici tím, že odvodíte chybějící tvar ze čtyř možných alternativ a vyberete jej kliknutím myší. Chcete-li najít správný tvar, analyzujte vztahy mezi tvary v matici s ohledem na čtyři dimenze: tvar, barvu, velikost a polohu.',
				3: 'Na odpovídání není stanoven časový limit. Po vaší odpovědi bude následovat další úloha. Za každou správnou odpověď získáte jeden bod.'
			}
		},
		5: {
			heading: 'Úkol 2: Sledování dokumentu',
			confirm: 'Rozumím',
			paragraphs: {
				1: 'Zatímco se soustředíte na úkol shody vzorů, musíte také sledovat dokumentární video. Výběr vhodného tvaru je vaším hlavním úkolem a očekáváme, že většina vaší pozornosti bude věnována právě jemu. Přesto byste měli pravidelně přepínat/přesouvat svou pozornost na video.',
				2: 'Po dokončení všech testových úloh se vás budeme ptát i na informace z dokumentu. Za každou správnou odpověď získáte jeden bod.'
			}
		},
		'5b': {
			heading: 'Úkol 2: Sledování dokumentu',
			confirm: 'Rozumím',
			paragraphs: {
				1: 'Zatímco se soustředíte na úkol shody vzorů, musíte také pečlivě sledovat dokumentární video.',
				2: 'Po dokončení všech testových úloh se vás budeme ptát i na informace z dokumentu. Za každou správnou odpověď získáte jeden bod.'
			}
		},
		6: {
			heading: 'Úkol 3: Reakce na příspěvky na sociální síti',
			confirm: 'Rozumím',
			paragraphs: {
				1: 'Mimo výše uvedené úkoly budete plnit ještě jeden úkol. Pro tento experiment jsme vytvořili fiktivní sociální síť (Chitralok), která funguje podobně jako Instagram. Na této platformě dostanete anonymní účet. Během experimentu vám systém bude zobrazovat různé příspěvky na této síti (složené z textu a obrázků), které se budou objevovat na obrazovce, doprovázené zvukem upozornění. Pod každým příspěvkem bude označen jeden z vašich kontaktů na této platformě. Na každý příspěvek máte možnost reagovat čtyřmi způsoby:',
				2: `•	Líbí se mi: Vyjadřujete, že příspěvek schvalujete.
•	Nelíbí se mi: Vyjadřujete, že příspěvek neschvalujete.
•	Sdílet: Rozhodnete se přesdílet nebo repostovat obsah ostatním na platformě.
•	Nahlásit: Označíte příspěvek jako nevhodný, urážlivý nebo škodlivý, což může upozornit platformu k přezkoumání.`,
				3: 'Vaším úkolem je reagovat na tyto příspěvky výběrem jedné ze čtyř možností pomocí myši: líbí se mi, nelíbí se mi, sdílet nebo nahlásit. Vaše volba bude veřejně viditelná ostatním účastníkům studie, což simuluje skutečné prostředí sociálních médií. Každá odpověď na příspěvek vám přinese jeden bod.'
			}
		},
		7: {
			heading: 'Získejte dostatek bodů a vyhrajte 2500 Kč',
			confirm: 'Rozumím, začít zácviřnou úlohu',
			paragraphs: {
				1: 'Vaším cílem je nasbírat co nejvíce bodů. Celkový počet bodů, které získáte, určí vaši šanci na to získat dodatečnou  odměnu. Pokud budete patřit mezi pět nejlepších účastníků, budete mít šanci vyhrát v losování hlavní cenu 2500,- Kč.',
				2: 'Vzhledem k tomu, že za úkol na hledání vhodného tvaru je nejvíc bodů, tento úkol upřednostněte, zatímco budete řešit i ostatní úkoly.'
			}
		},
		'7b': {
			heading: 'Získejte dostatek bodů a vyhrajte 2500 Kč',
			confirm: 'Rozumím, začít zácviřnou úlohu',
			paragraphs: {
				1: 'Vaším cílem je nasbírat co nejvíce bodů. Celkový počet bodů, které získáte, určí vaši šanci na to získat dodatečnou  odměnu. Pokud budete patřit mezi pět nejlepších účastníků, budete mít šanci vyhrát v losování hlavní cenu 2500,- Kč.',
				2: 'Proto se soustřeďte na všechny úkoly a získejte maximální počet bodů.'
			}
		},
		'ap-1': {
			heading: 'Je Vám vše jasné?',
			options: {
				0: 'Ano, pokračovat na ostrý test',
				1: 'Ne, potřebuji zopakovat praxi'
			}
		}
	}
} satisfies BaseTranslation;

export default cs;
