import { useRef, useState } from "react";
import { Prompt } from "react-router";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
	const authorInputRef = useRef();
	const textInputRef = useRef();

	function submitFormHandler(event) {
		event.preventDefault();

		const enteredAuthor = authorInputRef.current.value;
		const enteredText = textInputRef.current.value;

		// optional: Could validate here

		props.onAddQuote({ author: enteredAuthor, text: enteredText });
	}
	const [isEntering, setIsEntering] = useState(false);
	const formFoucsHanlder = () => {
		setIsEntering(true);
	};
	const finishEnteringHandler = () => {
		setIsEntering(false);
	};
	return (
		<div>
			<Card>
				<Prompt
					when={isEntering}
					message={(location) =>
						"Are you sure that you want to leave? All your entered data will be lost."
					}></Prompt>
				<form
					className={classes.form}
					onFocus={formFoucsHanlder}
					onSubmit={submitFormHandler}>
					{props.isLoading && (
						<div className={classes.loading}>
							<LoadingSpinner />
						</div>
					)}

					<div className={classes.control}>
						<label htmlFor='author'>Author</label>
						<input type='text' id='author' ref={authorInputRef} />
					</div>
					<div className={classes.control}>
						<label htmlFor='text'>Text</label>
						<textarea id='text' rows='5' ref={textInputRef}></textarea>
					</div>
					<div className={classes.actions}>
						<button className='btn' onClick={finishEnteringHandler}>
							Add Quote
						</button>
					</div>
				</form>
			</Card>
		</div>
	);
};

export default QuoteForm;
