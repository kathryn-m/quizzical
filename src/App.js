import React from "react"
import IntroScreen from "./components/IntroScreen"
import QuestionsScreen from "./components/QuestionsScreen"

function App() {
  const [intro, setIntro] = React.useState(true)

  function startQuiz (){
    setIntro(false)
  }
	

  return (
    <main>
     {intro && <IntroScreen onClick={startQuiz}/>}
     {!intro && <QuestionsScreen />}

    </main>
  );
}

export default App;
