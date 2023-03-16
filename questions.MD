1.
Q: What is the difference between Component and PureComponent? give an example where it might break my app.

A: A component in react will re-render when its parent re-renders. Pure components in react are components that implement the shouldComponentUpdate lifecycle method by performing a shallow comparison of its props and state. This sometimes helps with performance if neither of these has changed. It differs from normal components in that it only re-renders if props or state has changed.

A case where React.PureComponent can break an application due to shallow comparison is one where the data (previous and next state/props) being compared is deep(nested) eg objects.  This is because the comparison is done by value for primitives and by reference for objects. What this means is because the comparison is not deep, it can lead to stale data causing bugs or unexpected behaviour.

2.
Q: Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
A: ShouldComponentUpdate is a lifecycle method that checks if a component should re-render based on certain condition(s), thus, improving performance. However, if not used properly, it can prevent updates if determinant conditions are not met. Context in react is used to pass information down to the part of the tree where it is needed.
When used together, if a descendant component implements shouldComponent update incorrectly, it can prevent data propagation, cutting itself and its descendants out completely from an update leading to a buggy application.

3.
Q: Describe 3 ways to pass information from a component to its PARENT.
A: 
a. Callback functions: By passing a callback from parent to child as a prop, when this callback is called in the child, it can update data in the parent.
b. render props: Under the hood, via the use of a callback function, data can be manipulated in the parent by the child. 
c. events: 

4.
Q: Give 2 ways to prevent components from re-rendering.
a. shouldComponentUpdate: it is a lifecycle method used in class components to determine if based on some conditions, a component should update and re-render.
b. React.memo: This is a higher order component for optimising functional components through memoization ie by caching the result and returning the component is if it is rendered with the same props.

5.
Q: What is a fragment and why do we need it? Give an example where it mightbreak my app.
A:Fragments in react are a pattern used to group sibling elements/components without adding an extra node to the DOM.
Breaking the app ? Generally, fragments add minute syntactical changes to the DOM but
when rendering a list of elements programmatically using .map, it is suggested to use the <React.Fragment> as against <> so as to be able to pass in key prop. This key prop is used by react to help identify elements that have changed(added, removed or re-added). Else might lead to some issues.

6.
Q: Give 3 examples of the HOC pattern.
A: import { withRouter } from 'react-router'
...
class CurrentLocation {
  render() {
     const { history } = this.props;
      return <span>Current Location: {location.pathname}</span>
  }
}
class 
b. const withTheme = (WrappedComponent) => {
  class ThemedComponent extends Component {
      render() {
         <ThemeContext.Consumer>
           {(theme) => <WrappedCompnent {...this.props} theme={theme} />}
         </ThemeContext.Consumer>
      }
  }
}

c. Using render props
class Counter extends Component {
  state = {
    count: 0,
  };

  incrementCount = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  render() {
    const { count } = this.state;
    const { render } = this.props;

    return render({ count, incrementCount: this.incrementCount });
  }
}

const App = () => (
  <Counter
    render={({ count, incrementCount }) => (
      <div>
        <h1>Count: {count}</h1>
        <button onClick={incrementCount}>Increment</button>
      </div>
    )}
  />
);

7.
Q: what's the difference in handling exceptions in promises, callbacks and async...await.
A: 
a promises: via the .catch method which takes an error argument. where you handle errors that show up.
b. async/await: via the catch block of a try-catch block, 
c. callback: the first argument of a callback is serves as the error argument and within the callback, the error can be handled. Alternatively, a try catch block can be used with this error can also be handled.

8.
Q: How many arguments does setState take and why is it async.
A: The setState method takes two arguments: an object with the partial state to update and an optional callback to be executed after the state update. The setState method is asynchronous because it batches multiple setState calls together to improve performance by avoiding multiple re-renders of the component and update the UI efficiently.

9.
Q: List the steps needed to migrate a Class to Function Component.
A: Create a functional component that will replace the class component.
	i. where necessary, use the appropriate hooks to replace state/lifecycle methods such as:
		a: useState to manage initial state and state change handler
		b: useEffect to replace componentDidMount, shouldComponentUpdate, componentDidUpdate and componentWillUnmount
	ii. replace instance methods with regular functions knowing when to use the useCallback hook when passing them
	iii. remove the render method and return the functional component
 

10.
10 Q: List a few ways styles can be used with components
a. Via stylesheets which are imported for use where the components are defined or rendered.
b.Inline styles: Similar to inline styling of html elements via the style attribute.  Here, a style prop is used with the styles object passed into the jsx braces

eg <div style={{ margin: "10px" }}>Hello</div>

c. CSS Modules: here the css is declared in a .css file and imported for use in the component. The module name used in the import is referenced via dot notation when styling the components 
eg. import styles from "./styles.module.js"
...
<button className={styles.btn}>Click</button>
...
d. classNames: Because class is a keyword, in react , we use classNames to represent classes and style the css the same way regular css is styled.

11. 
Q: How to render an HTML string coming from the server.
A: This can be done using the dangerouslySetInnerHTML prop passing an object containing "__html" as key and the html you wish to pass as a string
eg ...
return (
	...
	<div dangerouslySetInnerHTML={{ __html: <span>deel</span>}}></div>
	...
)
