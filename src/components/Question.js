import React from 'react'

export default function Question (props){

	function chooseStyles(inProgress, isSelected, isCorrect) {
		
		const selectedStyles = {
					backgroundColor:  "#D6DBF5",
					'&:hover': {
						backgroundColor: "#D6DBF5"
					},
					border: "none"
				}

		const unselectedStyles = {
					backgroundColor: "#F5F7FB",
					border: ".8px solid #4D5B9E"

				}

		const correctStyles = {
					backgroundColor: "#94D7A2",
					border: "none",
					color: "#293264"

		}

		const wrongStyles = {
					backgroundColor: "#F8BCBC",
					border: "none",
					color: "#4D5B9E",
					opacity: .5

		}

		const irrelevantStyles = {
					backgroundColor: "#F5F7FB",
					border: ".8px solid #4D5B9E",
					color: "#293264",
					opacity: .5

		}
		

		if(inProgress && isSelected){
			return selectedStyles
		}else if(inProgress && !isSelected){
			return unselectedStyles
		}else if(!inProgress && isCorrect){
			return correctStyles
		}else if(!inProgress && isSelected && !isCorrect){
			return wrongStyles
		}else if(!inProgress && !isSelected){
			return irrelevantStyles
		}
	}


	return (
		<div className="question-answer-container">
			<p className='question'>
				{props.question}
			</p>
			<div className='answer-container flex-row'>
			
				<button 
					className='answer flex-column-center'
					questionindex={props.questionindex}
					onClick={props.onClick}	
					style = {chooseStyles(props.inProgress, props.answers[0].isSelected, props.answers[0].isCorrect)}
				>
					{props.answers[0].text}	
				</button>
				
				<button 
					style = {chooseStyles(props.inProgress, props.answers[1].isSelected, props.answers[1].isCorrect)}
					className='answer flex-column-center'
					questionindex={props.questionindex}
					onClick={e => props.onClick(e)}	
				>
					{props.answers[1].text}	
				</button>
				
				<button 
					className='answer flex-column-center'
					questionindex={props.questionindex}
					onClick={e => props.onClick(e)}	
					style = {chooseStyles(props.inProgress, props.answers[2].isSelected, props.answers[2].isCorrect)}
				>
					{props.answers[2].text}	
				</button>
				
				<button 
					className='answer flex-column-center'
					questionindex={props.questionindex}
					onClick={e => props.onClick(e)}	
					style = {chooseStyles(props.inProgress, props.answers[3].isSelected, props.answers[3].isCorrect)}
				>
					{props.answers[3].text}	
				</button>
			</div>
		</div>
	)
}