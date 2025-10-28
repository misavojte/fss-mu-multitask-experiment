/**
 * Media stimuli organized by training/final phases and emotional valence
 */
export const mediaStimuli = {
	/**
	 * Training stimuli from /static/task/3/training/
	 */
	training: {
		/** 4 negative training stimuli */
		negative: ['Neg23', 'Neg11', 'Neg5', 'Neg4'],
		/** 4 neutral training stimuli */
		neutral: ['N21', 'N20', 'N19', 'N11'],
		/** 4 positive training stimuli */
		positive: ['P23', 'P11', 'P5', 'P4']
	},
	/**
	 * Final stimuli from /static/task/3/final/
	 */
	final: {
		/** 10 negative final stimuli */
		negative: [
			'Neg20',
			'Neg19',
			'Neg18',
			'Neg17',
			'Neg14',
			'Neg13',
			'Neg10',
			'Neg8',
			'Neg7',
			'Neg24'
		],
		/** 16 neutral final stimuli */
		neutral: [
			'N24',
			'N23',
			'N21',
			'N20',
			'N18',
			'N17',
			'N16',
			'N14',
			'N12',
			'N10',
			'N7',
			'N6',
			'N5',
			'N4',
			'N3',
			'N2'
		],
		/** 10 positive final stimuli */
		positive: [
			'P20',
			'P19',
			'P18',
			'P17',
			'P14',
			'P13',
			'P10',
			'P8',
			'P7',
			'P24'
		]
	}
} as const;
