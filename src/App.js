import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
// import AllQuotes from "./pages/AllQuotes";
// import NewQuotes from "./pages/NewQuote";
// import NotFound from "./pages/NotFound";
// import QuotesDetail from "./pages/QuoteDetail";

const NewQuotes = React.lazy(() => import("./pages/NewQuote"));
const QuotesDetail = React.lazy(() => import("./pages/QuoteDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const AllQuotes = React.lazy(() => import("./pages/AllQuotes"));

function App() {
	return (
		<Layout>
			<Suspense
				fallback={
					<div className='centered'>
						<LoadingSpinner></LoadingSpinner>
					</div>
				}>
				<Switch>
					<Route path='/' exact>
						<Redirect to='/quotes'></Redirect>
					</Route>
					<Route path='/quotes' exact>
						<AllQuotes></AllQuotes>
					</Route>
					<Route path='/quotes/:quoteId'>
						<QuotesDetail></QuotesDetail>
					</Route>
					<Route path='/new-quote'>
						<NewQuotes></NewQuotes>
					</Route>
					<Route path='*'>
						<NotFound></NotFound>
					</Route>
				</Switch>
			</Suspense>
		</Layout>
	);
}

export default App;
