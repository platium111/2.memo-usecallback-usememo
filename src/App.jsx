import Parent from "./Parent";
import React, { useCallback, useMemo } from "react";

function App() {
  console.log("----------");
  console.log("App loading");
  const [appState, setAppState] = React.useState({
    count: 0,
    name: "clark",
  });
  const [ages, setAges] = React.useState([12, 22, 5, 44, 55, 66, 77]);

  const handleClick = () => {
    console.log("Click in App");
    setAppState({ ...appState, count: appState.count + 1 });
  };

  const changeName = () => {
    const random = Math.random(20);
    const fullName = `clark-${random}`;
    setAppState({ ...appState, name: fullName });
  };

  const changeAge = () => {
    setAges([11, 22]);
  };

  // [learn] we use hook fn or normal fn inside useCallback, we need to declare it inside useCallback, otherwise just disable warning in dependencies
  // Don't use `appState` inside dependencies because function never changes
  const increaseCount = useCallback(() => {
    setAppState({ ...appState, count: appState.count + 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sumAge = () => {
    console.log("Run sum age");
    return ages.reduce((acc, current) => {
      return (acc += current);
    }, 0);
  };

  // [learn] useMemo will return the value, used to memorise the function with heavy calculation
  // it will based on values in dependencies to know when it should render
  const memorisedSumAge = useMemo(sumAge, [ages]);

  /**
   * (1) if I pass setAppState into Parent, if I use memo in Parent, the hook functions is considered remain the same, but if we use different fn, it' re-created everytime App render
   *    -> with different fns (not hook fn), we use useCallback with [] dependencies because fn is never change regardless dependencies
   */
  return (
    <div className="App">
      <Parent name={appState.name} increaseCount={increaseCount}></Parent>
      <p>Current App</p>
      <p>App state {appState.count}</p>

      {/* Everytime App() render, sumAge is called */}
      <p>Sum age {memorisedSumAge}</p>

      {/* test useCallback -> not loading Parent and Child again*/}
      <button onClick={handleClick}>Increase App</button>
      {/* use to test memo React, in this case we change the name, it will render again, if not, Parent not render */}
      <button onClick={changeName}>Change name App</button>
      {/* change useMemo values, will change values in state then memorised value is calculated again */}
      <button onClick={changeAge}>Change age App</button>
    </div>
  );
}

export default App;
