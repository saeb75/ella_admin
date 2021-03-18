const { Route, Redirect } = require("react-router-dom");

const PriviteRoute = ({ Component, authenticate, ...rest }) => {
  return (
    <Route
      component={(props) => {
        const token = window.localStorage.getItem("token");
        if (token) {
          return <Component {...props} />;
        } else {
          return <Redirect to={`/signin`} />;
        }
      }}
    />
  );
};

export default PriviteRoute;
