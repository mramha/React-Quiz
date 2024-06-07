import { useEffect, useReducer } from "react";
import Header from "./Header";
import { Main } from "./Main";
import { Error } from "./Error";
import { StartScreen } from "./StartScreen";
import { Question } from "./Question";
import Loader from "./Loader";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "Error" };
    case "start":
      return { ...state, status: "start", time: 0 }; // Reset time on start
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finish",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };

    default:
      throw new Error("Action Unknown");
  }
}

export default function App() {
  const [{ status, questions, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const numOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "ready" && (
          <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === "start" && (
          <>
            <Progress
              index={index}
              numOfQuestions={numOfQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numOfQuestions={numOfQuestions}
              />
            </Footer>
          </>
        )}
      </Main>
      {status === "finish" && (
        <FinishScreen
          points={points}
          maxPossiblePoints={maxPossiblePoints}
          highscore={highscore}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}
