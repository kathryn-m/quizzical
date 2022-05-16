import React from 'react'

export default function IntroScreen (props){
	
	// const sampleText = "Who is the &amp; creator&apos;s of &lt; &gt; the &quot;manga&quot; series &quot;One Piece&quot;?"
	
	// const plainText = {
	// 	"&amp;": "&",
	// 	"&lt;": "<",
	// 	"&gt;": ">",
	// 	"&quot;": '"',
	// 	"&apos;": "'"
	// 	} 
		
		
	// function convertToPlainText(str) {
	// 	return (
	// 		str.replace(
	// 			/&amp;|&lt;|&gt;|&quot;|&apos;/g, 
	// 			match => plainText[match]
	// 		)
	// 	)
	// }
		
	// console.log(convertToPlainText(sampleText))

	return (
		<div className="flex-column-center">
			<header>
				<h1 className="title">Quizzical</h1>
			</header>
			<main className='flex-column-center'>
				<p className="subtitle">Five questions. Any topic. Are you ready?
				</p>
				<button 
					className="btn btn-dark btn-big"
					onClick={props.onClick}
				>Start quiz</button>
			</main>
		</div>
	)
}