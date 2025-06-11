/**
 * Media stimuli organized by training/final phases and emotional valence
 */
export const mediaStimuli = {
	/**
	 * Training stimuli from /static/task/3/training/
	 */
	training: {
		/** 4 negative training stimuli */
		negative: ['Neg23.png', 'Neg11.png', 'Neg5.png', 'Neg4.png'],
		/** 4 neutral training stimuli */
		neutral: ['N21.png', 'N20.png', 'N19.png', 'N11.png'],
		/** 4 positive training stimuli */
		positive: ['P23.png', 'P11.png', 'P5.png', 'P4.png']
	},
	/**
	 * Final stimuli from /static/task/3/final/
	 */
	final: {
		/** 10 negative final stimuli */
		negative: [
			'Neg20.png',
			'Neg19.png',
			'Neg18.png',
			'Neg17.png',
			'Neg14.png',
			'Neg13.png',
			'Neg10.png',
			'Neg8.png',
			'Neg7.png',
			'Neg24.png'
		],
		/** 16 neutral final stimuli */
		neutral: [
			'N24.png',
			'N23.png',
			'N21.png',
			'N20.png',
			'N18.png',
			'N17.png',
			'N16.png',
			'N14.png',
			'N12.png',
			'N10.png',
			'N7.png',
			'N6.png',
			'N5.png',
			'N4.png',
			'N3.png',
			'N2.png'
		],
		/** 10 positive final stimuli */
		positive: [
			'P20.png',
			'P19.png',
			'P18.png',
			'P17.png',
			'P14.png',
			'P13.png',
			'P10.png',
			'P8.png',
			'P7.png',
			'P24.png'
		]
	}
} as const;
