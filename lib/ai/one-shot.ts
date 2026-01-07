// Added this to stabilize the output
export const ONE_SHOT_EXAMPLE = `
ONE-SHOT EXAMPLE (FOLLOW THIS FORMAT EXACTLY):

Description:
"Quadratic formula"

Expected Output:
{
	"meta": {
	"formula": "Quadratic Formula",
	"latex": "x = \\\\frac{-b \\\\pm \\\\sqrt{b^2 - 4ac}}{2a}",
	"slug": "quadratic-formula",
	"category": "Algebra"
	},
	"operators": ["=", "\\\\pm", "/"],
	"fullFormulaSevenVector": {
	"Role": "Solves quadratic equations for their roots",
	"Domain": "Real or complex numbers depending on the discriminant",
	"Binding": "Relates coefficients a, b, c to the solutions x",
	"Variance": "Roots change as coefficients change",
	"Geometric": "Represents x-intercepts of a parabola",
	"Invariant": "The equation structure ax^2 + bx + c = 0",
	"Limits": "As a approaches 0, the formula becomes undefined",
	"narrative": "The quadratic formula provides an exact method to find where a parabola crosses the x-axis. It connects algebraic coefficients to geometric solutions and works even when factoring fails.",
	"babyDefinition": "This formula tells you where a curved graph crosses the x-axis."
	},
	"subFormulas": [
	{
		"chunk": "b^2 - 4ac",
		"displayName": "Discriminant",
		"sevenVector": {
		"Role": "Determines the number and type of solutions",
		"Domain": "Real numbers",
		"Binding": "Combines coefficients a, b, and c",
		"Variance": "Changes with coefficients",
		"Geometric": "Controls whether the parabola touches or crosses the x-axis",
		"Invariant": "Uses the same coefficients from the equation",
		"Limits": "Negative values lead to complex solutions",
		"narrative": "The discriminant decides how many solutions exist. It encodes whether the parabola intersects the x-axis zero, one, or two times.",
		"babyDefinition": "This part tells us if the equation has two answers, one answer, or none."
		},
		"babyDefinition": "It checks how many solutions the equation has."
	},
	{
		"chunk": "\\\\sqrt{b^2 - 4ac}",
		"displayName": "Square Root of Discriminant",
		"sevenVector": {
		"Role": "Introduces nonlinearity and branching",
		"Domain": "Non-negative real numbers or complex numbers",
		"Binding": "Depends directly on the discriminant",
		"Variance": "Grows as the discriminant grows",
		"Geometric": "Measures distance from the vertex to x-intercepts",
		"Invariant": "Always derived from the same discriminant",
		"Limits": "Approaches zero as discriminant approaches zero",
		"narrative": "Taking the square root separates the two possible solutions. It reflects how far the roots are from the center of the parabola.",
		"babyDefinition": "This part spreads the two answers apart."
		},
		"babyDefinition": "It helps create two possible answers."
	},
	{
		"chunk": "2a",
		"displayName": "Normalization Term",
		"sevenVector": {
		"Role": "Scales the solution",
		"Domain": "Non-zero real numbers",
		"Binding": "Depends on coefficient a",
		"Variance": "Larger a compresses the solutions",
		"Geometric": "Controls the width of the parabola",
		"Invariant": "Uses the leading coefficient",
		"Limits": "Cannot be zero",
		"narrative": "Dividing by 2a adjusts the solutions based on how steep the parabola is. It ensures the formula correctly accounts for scaling.",
		"babyDefinition": "This part adjusts the answer based on how steep the curve is."
		},
		"babyDefinition": "It scales the final answer correctly."
	}
	]
}

END OF ONE-SHOT EXAMPLE
`