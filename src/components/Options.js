export default function Options({ questions, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {questions.options.map((options, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} 
      ${
        hasAnswered
          ? index === questions.correctOption
            ? "correct"
            : "wrong"
          : ""
      }`}
          key={options}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {options}
        </button>
      ))}
    </div>
  );
}
