<script lang="ts">
	import QuestionManager from '$lib/components/QuestionManager.svelte';
	import type { IQuestionBattery, ITimestampQuestionService } from '$lib/interfaces/IQuestion';
	import { createEventDispatcher } from 'svelte';
	import InterfaceFooter from './InterfaceFooter.svelte';

	export let questionsService: ITimestampQuestionService;
	export let priority: 'math' | 'social' | 'none';

	const dispatch = createEventDispatcher();

	// Get the instruction slides based on priority
	const getInstructionSlides = (priority: 'math' | 'social' | 'none'): IQuestionBattery => {
		const baseSlide1 = {
			id: 'instructions-1',
			headingText: 'Úvod do studie',
			confirmText: 'Další',
			paragraphs: [
				`Simulujeme běžné digitální prostředí, ve kterém je často vyžadován multitasking – tedy práce s různými médii současně (například používání sociálních médií při práci).`,
				`Tato studie nám pomáhá porozumět tomu, jak dobře lidé zvládají více úkolů najednou.`,
				`Před zahájením cvičných a testových úloh si prosím pečlivě přečtěte následující pokyny.`
			],
			type: 'instruction' as const,
			required: true
		};

		const baseSlide2 = {
			id: 'instructions-2',
			headingText: 'Pokyny ke studii',
			confirmText: 'Další',
			paragraphs: [
				`Budete současně plnit dva úkoly: Matematický úkol (řešení příkladů) a reagování na příspěvky na sociálních sítích.`,
				priority === 'math'
					? `Představte si to jako typickou situaci, kdy musíte dokončit důležitou práci a zároveň reagujete na příspěvky na sociálních sítích.`
					: priority === 'social'
						? `Představte si to jako typickou situaci, kdy musíte dokončit důležitou práci a zároveň reagujete na příspěvky na sociálních sítích.`
						: `Představte si to jako typickou situaci, kdy musíte dokončit důležitou práci a zároveň reagujete na příspěvky na sociálních sítích. Žádný z úkolů nemá prioritu a řešení obou je stejně důležité. Vaším cílem je věnovat oběma stejnou pozornost, věnovat se najednou jak "práci", tak reakci na sociální média.`
			],
			type: 'instruction' as const,
			required: true
		};

		const mathDescription =
			priority === 'math'
				? `Toto je váš hlavní úkol, proto mu věnujte většinu pozornosti.`
				: priority === 'social'
					? ``
					: ``;

		const mathPoints = priority === 'math' ? '3' : '1';
		const socialPoints = priority === 'social' ? '3' : '1';

		const mathSlide = {
			id: 'instructions-math',
			headingText: 'Matematický úkol',
			confirmText: 'Další',
			paragraphs: [
				mathDescription,
				`Na obrazovce se budou objevovat jednoduché matematické příklady.`,
				`- Klikněte na správnou odpověď z nabízených možností`,
				`- Za každou správnou odpověď získáte *${mathPoints} bod${mathPoints === '1' ? '' : 'y'}*`,
				`- Časový limit není stanoven – další příklad se zobrazí po odeslání odpovědi`
			],
			type: 'instruction' as const,
			required: true
		};

		const socialSlide = {
			id: 'instructions-social',
			headingText: 'Reakce na sociální média',
			confirmText: 'Další',
			paragraphs: [
				priority === 'social'
					? `Toto je váš hlavní úkol, proto mu věnujte většinu pozornosti. `
					: ``,
				`Čas od času se na obrazovce objeví příspěvek ze sociálních sítí. Představte si, že pomáháte umělé inteligenci učit se rozhodovat, které příspěvky by měli ostatní lidé vidět ve svém kanálu příspěvků.`,
				`U každého příspěvku se rozhodněte, zda:`,
				`- ho **ponecháte** (objeví se ostatním v kanálu příspěvků), nebo`,
				`- ho **odstraníte** (nechcete, aby ho ostatní viděli).`,
				`Pamatujte, že ostatní nemají čas sledovat všechno, a příliš mnoho sdílených příspěvků může jejich kanál příspěvků zahlcovat. Snažte se tedy ponechat jen ty příspěvky, které opravdu stojí za pozornost. Každé vaše rozhodnutí pomáhá formovat celkový obsah kanálu příspěvků – vybírejte proto pečlivě a usilujte o kvalitní, nepřehlcený přehled příspěvků.`,
				`- Za každý vyhodnocený příspěvek získáte *${socialPoints} bod${socialPoints === '1' ? '' : 'y'}*`,
				`- Pokud neodpovíte, AI se nemůže naučit, které příspěvky jsou podle vás hodnotné`
			],
			type: 'instruction' as const,
			required: true
		};

		const priorityText =
			priority === 'math'
				? `Vaším hlavním cílem je nasbírat co nejvíce bodů. Každý získaný bod odráží vaši pozornost a dovednost při plnění úkolu. Pamatujte, že prioritu má matematický úkol, ale zároveň byste měli sledovat i příspěvky a reagovat na ně, když se objeví.`
				: priority === 'social'
					? `Vaším hlavním cílem je nasbírat co nejvíce bodů. Každý získaný bod odráží vaši pozornost a dovednost při plnění úkolu. Pamatujte, že prioritu má reakce na sociální média, ale zároveň byste měli i řešit matematické úlohy.`
					: `Vaším hlavním cílem je nasbírat co nejvíce bodů. Každý získaný bod odráží vaši pozornost a dovednost při plnění úkolu. Pamatujte, že prioritu nemá ani jeden z úkolů.`;

		const finalSlide = {
			id: 'instructions-final',
			headingText: 'Závěrečná instrukce',
			confirmText: 'Pokračovat',
			paragraphs: [
				priorityText,
				`**Usilujte o co nejlepší výsledek a snažte se dosáhnout svého maxima!**`,
				`- Vaše konečné skóre se zobrazí na konci`,
				`- Pokud těmto instrukcím rozumíte, klikněte na "Pokračovat" pro zahájení cvičných úloh`
			],
			type: 'instruction' as const,
			required: true
		};

		return [baseSlide1, baseSlide2, mathSlide, socialSlide, finalSlide];
	};

	let questions: IQuestionBattery = getInstructionSlides(priority);

	const handleQuestionnaireDone = async (data: any) => {
		dispatch('continue');
	};
</script>

<div class="w-full h-full p-8 mx-auto flex flex-col gap-8">
	<QuestionManager {questions} {questionsService} on:questionnaireDone={handleQuestionnaireDone} />
	<InterfaceFooter />
</div>
