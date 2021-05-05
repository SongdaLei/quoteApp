import {
	useParams,
	Route,
	Redirect,
	Link,
	useRouteMatch,
	matchPath,
} from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useEffect } from "react";

const DUMMY_QUOTES = [
	{ id: "q1", author: "Max", text: "Learning React is fun!" },
	{ id: "q2", author: "Maximilian", text: "Learning React is great!" },
];
const QuotesDetail = () => {
	const match = useRouteMatch();
	const params = useParams();
	const { quoteId } = params;
	const { sendRequest, status, data: loadedQuote, error } = useHttp(
		getSingleQuote,
		true
	);
	useEffect(() => {
		sendRequest(quoteId);
	}, [sendRequest, quoteId]);
	if (status === "pending") {
		return (
			<div className='centered'>
				<LoadingSpinner />
			</div>
		);
	}

	if (error) {
		return <p className='centered'>{error}</p>;
	}

	if (!loadedQuote.text) {
		return <p>No quote found!</p>;
	}
	return (
		<div>
			<HighlightedQuote
				text={loadedQuote.text}
				author={loadedQuote.author}></HighlightedQuote>
			<Route path={match.path} exact>
				<div className='centered'>
					<Link className='btn--flat' to={`${match.url}/comments`}>
						Load Comments
					</Link>
				</div>
			</Route>

			<Route path={`${match.path}/comments`}>
				<Comments></Comments>
			</Route>
		</div>
	);
};
export default QuotesDetail;
