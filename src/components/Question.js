import Options from "./Options";

export const Question = ({ questions, dispatch, answer }) => {
  console.log(questions.question);
  return <div>
    <h4>{questions.question}</h4>
    <Options questions={questions}  dispatch= {dispatch} answer={answer}/>
  </div>;
};
