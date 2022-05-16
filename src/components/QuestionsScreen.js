import React from 'react'
import Question from './Question.js'


export default function QuestionsScreen () {

	// Determines whether 'check answers' or 'play again' button is displayed
	const [inProgress, setInProgress] = React.useState(true)

	const [quizData, setQuizData] = React.useState([])

	const [error, setError] = React.useState(false)

	const [questionElems, setQuestionElems] = React.useState([])

	const [score, setScore] = React.useState()

	// called on inital render and when the 'play again' button is clicked
	function getQuizData(){
		fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
		.then(res => {
			// console.log(res.status)
			// console.log(res.ok)
			// console.log(res.statusText)
			return res.json()
		})
		.then(data => {

			const results = data.results
			
			// The string data from results includes html entities and numeric character references that need to be decoded.
			function decodeHtml(html) {
				var txt = document.createElement("textarea");
				txt.innerHTML = html;
				return txt.value;
			}
			
			// Each question element needs an index. Also, need to merge correct and incorrect answers from fetched data and transform each answer to an object that can show isSelected? and isCorrect?
			setQuizData(results.map((elem, index) => {
				const question = decodeHtml(elem.question)
				
				const correctAnswer = {
					"text" : decodeHtml(elem.correct_answer),
					"isCorrect": true,
					"isSelected": false
				}

				const incorrectAnswersText = elem.incorrect_answers
				
				let allAnswers = []

				incorrectAnswersText.forEach(answer => {
					allAnswers.push(
						{
							"text" : decodeHtml(answer),
							"isCorrect": false,
							"isSelected": false
						}
					)
				})

				const randomNum = Math.floor(Math.random() * (incorrectAnswersText.length + 1))
				
				allAnswers.splice(randomNum, 0, correctAnswer)

				// const allAnswersWithIndices = allAnswers.map((answer, index)=> {
				// 	return {
				// 		...answer,
				// 		answerIndex: index
				// 	}
				// })
				
				return (
					{
						"questionIndex": index,
						"question": question,
						"answers": allAnswers
						// "answers": allAnswersWithIndices
					}
				)	
			}))
		})
		.catch(err => {
			// console.log(err)
			setError(true)
		})
	}

	// Gets quiz data on QuestionsScreen.js initial render
	React.useEffect(()=> {
		getQuizData()
	}, [])

	// Delete for production
	React.useEffect(()=> {
		console.log(quizData)
	}, [quizData])

	function calculateScore(){
		let count = 0

		quizData.forEach(quizQuest => {
			const answers = quizQuest.answers
			answers.forEach(answer => {
				if(answer.isCorrect && answer.isSelected){
					count++
				}

			})
		})

		setScore(count)
	}


	function endQuiz (){
		setInProgress(false)
		calculateScore()
	}

	function restartQuiz (){
		setInProgress(true)
		getQuizData()
		setScore()
	}


	// Every time quizData changes (because of a fetch, or because an answer is clicked), this creates the question elements or updates isSelected?
	//Also when inProgress changes so the button colors indicating right or wrong answers render immediately.
	React.useEffect(()=> {

		function selectAnswer(e, qindex) {
			const btnText = e.target.textContent

			setQuizData(oldData => oldData.map (elem => {

					if (elem.questionIndex === qindex){
						// console.log(`matched the question element of qindex ${qindex}`)

						let updatedAnswers = []
						
						const answersArray = elem.answers
						// console.log(answersArray)						
						answersArray.forEach(answer => {

							if(answer.text === btnText){
								// console.log(`matched the btn text of button "${btnText}"`)

								const updatedAnswer = {
										...answer,
										isSelected: true
									}

								// console.log(updatedAnswer)
								
								updatedAnswers.push(updatedAnswer)

							}else{
								// console.log(`text did not match this time`)

								const updatedAnswer = {
										...answer,
										isSelected: false 
									}
								updatedAnswers.push(updatedAnswer)
							}
						})

						// console.log(updatedAnswers)
						return (
							{
								...elem,
								answers: updatedAnswers
							}
						)
					}else{
						return elem
					}
				
			}))
		}

		setQuestionElems(quizData.map((elem) => {
			
			
				return (

					<Question 
						key={elem.questionIndex} 
						questionindex={elem.questionIndex}
						question={elem.question}
						answers={elem.answers}
						onClick={(e) => selectAnswer(e, elem.questionIndex, )}
						//added stuff
						inProgress={inProgress}
						
					/>
				)	
			}))
	}, [quizData, inProgress])


	// React.useEffect(()=> {

	// 	function selectAnswer(e, qindex) {
	// 		console.log(`selectAnswer function has fired!`)

	// 		const btnText = e.target.textContent
	// 		console.log(btnText)
	// 		console.log(qindex)

	// 		setQuizData(oldData => oldData.map (elem => {

	// 				if (elem.questionIndex === qindex){
	// 					console.log(`matched the question element of qindex ${qindex}`)

	// 					console.log(elem.answers)
	// 					let updatedAnswers = []
	// 					console.log(typeof updatedAnswers)
	// 					console.log(updatedAnswers)

	// 					for (let i = 0; i < elem.answers.length; i++){
							
	// 						const currentAnswer = elem.answers[i]
							
	// 						console.log(currentAnswer)
	// 						// console.log(...currentAnswer)
							
	// 						if(elem.answers[i].text === btnText){
	// 							console.log(`matched the btn text of button "${btnText}"`)
	// 							updatedAnswers.push(
	// 								{
	// 									...currentAnswer,
	// 									[elem.answers[i].isSelected]: true
	// 								}
	// 							)
	// 						}else{
	// 							console.log(`text did not match this time`)
	// 							updatedAnswers.push(
	// 								{
	// 									...elem.answers[i],
	// 									[elem.answers[i].isSelected]: false 
	// 								}
	// 							)
	// 						}
	// 					}
						
	// 					console.log(updatedAnswers)
	// 					return (
	// 						{
	// 							...elem,
	// 							answers: updatedAnswers
	// 						}
	// 					)
	// 				}else{
	// 					return elem
	// 				}
				
	// 		}))
	// 	}

	// 	setQuestionElems(quizData.map((elem) => {
			
			
	// 			return (

	// 				<Question 
	// 					key={elem.questionIndex} 
	// 					questionindex={elem.questionIndex}
	// 					question={elem.question}
	// 					answers={elem.answers}
	// 					onClick={(e) => selectAnswer(e, elem.questionIndex, )}
						
	// 				/>
	// 			)	
	// 		}))
	// }, [quizData])

	//Renders the QuestionsScreen.js
	return (
		<div>
			{error ?
				<div className='flex-column-start questions-screen-container'>
					<p>😞 Oh dear, there's a problem.</p>
					<p>🤔 What can I do?</p>
					<p>Check your internet connection and refresh the browser.</p>
					<p>If that doesn't work it's most likely a problem beyond your control and you'll just have to try again later.</p>
				</div> 
				:
			
				<div className='flex-column-start questions-screen-container'>
					{questionElems}
					<div className="flex-row-around">
						{typeof score === "number" && <p className="score-sentence">You scored {score}/5 correct answers</p> }
						{inProgress ? 
							<button 
								className='btn btn-dark btn-medium'
								onClick={endQuiz}
								>Check answers
							</button> :

							<button 
								className='btn btn-dark btn-medium'
								onClick={restartQuiz}
								>Play again!
							</button>
						}
					</div>
				</div>
			}
		</div>
	)
}