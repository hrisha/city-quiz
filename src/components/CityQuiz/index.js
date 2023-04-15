import React from 'react';
import { useState } from "react";
import { submitForm } from "./helpers";

const CityQuiz = () => {

  const [answer, setAnswer] = useState("");
  /**
   * 1 : initial step when the textarea is empty
   * 2 : when submit the text
   * 3 : when got success response
   * 4 : when got error response
   * 5 : while typing before submit
   */
  const [step, setStep] = useState(1);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setStep(2);
    try {
      await submitForm(answer);
      setStep(3);
    } catch (err) {
      setStep(4);
    }
  }

  function handleOnInput(e) {
    setAnswer(e.target.value);
    if (e.target.value.length === 0) {
      setStep(1);
    } else {
      setStep(5);
    }
  }

  return (
    <div>
        <form onSubmit={handleFormSubmit}>
          <h2>City quiz</h2>
          <p>What city is located on two continents?</p>
          <textarea value={answer} onChange={handleOnInput}></textarea>
          <br />
          {step === 1 && <button disabled>Submit</button>}
          {step === 5 && <button>Submit</button>}
          {step === 2 && <p>Loading...</p>}
          {step === 4 && (
            <p style={{ color: "red" }}>
              Good guess but a wrong answer. Try again!
            </p>
          )}
          {step === 3 && <h1>That's right!</h1>}
        </form>
    </div>
  )
}

export default CityQuiz
