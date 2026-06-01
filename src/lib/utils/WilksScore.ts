/**
 * Counterpart to the WilksScoreCalculator class in the backend, used for calculating the Wilks score based on the same formula. This allows us to calculate the Wilks score on the client side without needing to call the backend, which can be useful for instant feedback when users input their lifts and body weight.
 */
export function calculateWilksScore(
	gender: 'male' | 'female' | 'other',
	bodyWeightInGrams: number,
	totalLiftedKg: number
): number {
	const x = bodyWeightInGrams / 1000; 
	
	const isFemale = gender === 'female';

	const a = isFemale ? 594.31747775 : -216.0475144;
	const b = isFemale ? -27.23842536 : 16.2606339;
	const c = isFemale ? 0.8211222687 : -0.002388645;
	const d = isFemale ? -0.0047230355 : -0.00113732;
	const e = isFemale ? 0.00001401501 : 0.00000701863;
	const f = isFemale ? -0.00000001544 : -0.00000001291;

	const denominator = a + (b * x) + (c * Math.pow(x, 2)) + (d * Math.pow(x, 3)) + (e * Math.pow(x, 4)) + (f * Math.pow(x, 5));

	if (denominator === 0) return 0;

	const coefficient = 500 / denominator;
	const score = totalLiftedKg * coefficient;

	return Math.round(score * 100) / 100;
}