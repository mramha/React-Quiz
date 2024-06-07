export const StartScreen = ({ numOfQuestions, dispatch }) => {
  return (
    <div className="start">
      <h2>Welcome To The React Quiz</h2>
      <h3>{numOfQuestions} question to test your React Mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        {" "}
        Let's Start
      </button>
    </div>
  );
};
