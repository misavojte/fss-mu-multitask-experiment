import { mathStimuli } from '$lib/data/mathStimuli';
import type {
	ITaskPatternMatchingObjectText,
	ITaskPatternMatchingObjectImage
} from '$lib/interfaces/ITaskHandler';
import { fisherYatesShuffle } from './shuffle';

// Math task functions
export function getMathTaskPatternMatchingObject(id: string): ITaskPatternMatchingObjectText {
	// find by id in mathStimuli
	const obj = mathStimuli.find((stimulus) => stimulus.id === id);
	if (obj === undefined) {
		throw new Error('Task not found');
	}
	return obj;
}

export function getMathTaskPatternMatchingObjectsForPractice(): ITaskPatternMatchingObjectText[] {
	const ids = ['1', '2', '3', '4'];
	// shuffle
	const shuffledIds = fisherYatesShuffle(ids);
	return shuffledIds.map((id) => getMathTaskPatternMatchingObject(id));
}

export function getMathTaskPatternMatchingObjectsForTest(): ITaskPatternMatchingObjectText[] {
	// create programatically an array of ids from 5 to 200
	const getIds = (start: number, end: number) => {
		const ids = [];
		for (let i = start; i <= end; i++) {
			ids.push(i.toString());
		}
		return ids;
	};
	const ids = getIds(5, 200);
	const shuffledIds = fisherYatesShuffle(ids);
	return shuffledIds.map((id) => getMathTaskPatternMatchingObject(id));
}

// Intelligence task functions
export function getIntelligenceTaskPatternMatchingObject(
	id: string,
	base: string
): ITaskPatternMatchingObjectImage {
	// assuming that id is in "N_ssN" format
	const idParts = id.split('_');
	const matrixSrc = base + `${idParts[0]}_M_${idParts[1]}.jpeg`;
	const T1Src = base + `${idParts[0]}_T1_${idParts[1]}_md.jpeg`;
	const T2Src = base + `${idParts[0]}_T2_${idParts[1]}_md.jpeg`;
	const T3Src = base + `${idParts[0]}_T3_${idParts[1]}_md.jpeg`;
	const T4Src = base + `${idParts[0]}_T4_${idParts[1]}_md.jpeg`;
	return {
		type: 'image',
		id: id,
		matrixSrc,
		responses: [
			{
				id: 'T1' as const,
				src: T1Src
			},
			{
				id: 'T2' as const,
				src: T2Src
			},
			{
				id: 'T3' as const,
				src: T3Src
			},
			{
				id: 'T4' as const,
				src: T4Src
			}
		]
	};
}

export function getIntelligenceTaskPatternMatchingObjectsForPractice(
	base: string
): ITaskPatternMatchingObjectImage[] {
	const ids = ['1_ss3', '3_ss2', '35_ss1'];
	const shuffledIds = fisherYatesShuffle(ids);
	const basePath = base + 'task/1/intelligence/practice/tf1_';
	return shuffledIds.map((id) => getIntelligenceTaskPatternMatchingObject(id, basePath));
}

export function getIntelligenceTaskPatternMatchingObjectsForTest(
	base: string
): ITaskPatternMatchingObjectImage[] {
	const ids = [
		`2_ss1`,
		`4_ss3`,
		`5_ss1`,
		'6_ss2',
		'7_ss3',
		'8_ss1',
		'9_ss2',
		'10_ss3',
		'11_ss1',
		'12_ss2',
		'13_ss3',
		'14_ss1',
		'15_ss2',
		'16_ss3',
		'17_ss1',
		'18_ss2',
		'19_ss3',
		'20_ss1',
		'21_ss2',
		'22_ss3',
		'23_ss1',
		'24_ss2',
		'25_ss3',
		'26_ss1',
		'27_ss2',
		'28_ss3',
		'29_ss1',
		'30_ss2',
		'31_ss3',
		'32_ss1',
		'33_ss2',
		'34_ss3',
		'35_ss1',
		'36_ss2',
		'37_ss3',
		'38_ss1',
		'39_ss2',
		'40_ss3',
		'41_ss1',
		'42_ss2',
		'43_ss3',
		'44_ss1',
		'45_ss2',
		'46_ss3',
		'47_ss1',
		'48_ss2',
		'49_ss3',
		'50_ss1',
		'51_ss2',
		'52_ss3',
		'53_ss1',
		'54_ss2',
		'55_ss3',
		'56_ss1',
		'57_ss2',
		'58_ss3',
		'59_ss1',
		'60_ss2',
		'61_ss3',
		'62_ss1',
		'63_ss2',
		'64_ss3',
		'65_ss1',
		'66_ss2',
		'67_ss3',
		'68_ss1',
		'69_ss2',
		'70_ss3',
		'71_ss1',
		'72_ss2',
		'73_ss3',
		'74_ss1',
		'75_ss2',
		'76_ss3',
		'77_ss1',
		'78_ss2',
		'79_ss3',
		'80_ss1'
	];
	const shuffledIds = fisherYatesShuffle(ids);

	const basePath = base + 'task/1/intelligence/test/tf1_';
	return shuffledIds.map((id) => getIntelligenceTaskPatternMatchingObject(id, basePath));
}
