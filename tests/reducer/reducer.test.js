import breweryReducer, { initialState } from "./src/reducers/brewery";

descibe("brewery reducer", () => {
  it("should return initial state by default", () => {
    const newState = breweryReducer();
    expect(newState).toBe(initialState);
  });
});
