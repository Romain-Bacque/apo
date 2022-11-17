import classes from "./style.module.scss";

// Component
function Loader() {
  return (
    <div className={classes["loader-container"]}>
      <span className={classes["loader-container__dot"]} />
      <span className={classes["loader-container__dot"]} />
      <span className={classes["loader-container__dot"]} />
    </div>
  );
}

export default Loader;
