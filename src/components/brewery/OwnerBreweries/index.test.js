import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material";
import { act } from "react-dom/test-utils";
import OwnerBrewery from ".";
import theme from "../../../styles/theme";
import { saveBreweries, saveUser } from "../../../actions";
import { createTestStore } from "../../../utilities/testStore";
import "@testing-library/jest-dom";

// dummy data
const dummyUser = {
  id: 0,
  name: "toto",
  email: "toto@toto.com",
  password: "11111tT/",
  role: "brewer",
};
const dummyOwner = {
  id: 124,
  name: "toto",
  email: "toto@toto.com",
  password: "11111tT/",
  role: "brewer",
};
const dummyBreweries = [
  {
    address: "22160 Carnoët, France",
    categories: [
      { id: 1, tag: "blonde" },
      { id: 5, tag: "IPA" },
    ],
    description: "ADRESSE: Pen ar VernCP: 22160VILLE: CARNOËT",
    id: 87,
    image:
      '{"path":"https://loremflickr.com/640/480/nature?lock=50968","filename":null}',
    lat: "48.36796",
    lon: "-3.522382",
    phone: "0406226355",
    title: "Les Fous",
    user_id: 124,
  },
  {
    address: "Route de la Marana, 20600 Furiani, France",
    categories: (2)[({ id: 1, tag: "blonde" }, { id: 5, tag: "IPA" })],
    description: "ADRESSE: Route de la MaranaCP: 20600VILLE: FURIANI",
    id: 74,
    image:
      '{"path":"https://loremflickr.com/640/480/nature?lock=40912","filename":null}',
    lat: "42.6422449",
    lon: "9.4598298",
    phone: "0282464680",
    title: "Pietra",
    user_id: 124,
  },
];

// mock react-router-dom and change <Navigate /> behavior
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  // eslint-disable-next-line react/prop-types
  Navigate: ({ to }) => <div data-testid="navigate">{to}</div>,
}));

// prevent side-effects
console.log = jest.fn();
window.confirm = jest.fn();

// initialize store
let store = createTestStore();

describe("<BreweryForm />", () => {
  // hook called before each test to clean up store
  beforeEach(() => {
    store = createTestStore();
  });

  it("should display Navigate component that redirect to correct path if brewer is not connected", () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <OwnerBrewery />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );

    // Act
    const navigateElt = screen.getByTestId("navigate");
    const navigatePath = screen.getByText("/", { exact: true });

    // Assert
    expect(navigateElt).toBeInTheDocument();
    expect(navigatePath).toBeInTheDocument();
  });

  it("should not display Navigate component if brewer is connected", () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <OwnerBrewery />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );

    // Act
    act(() => {
      store.dispatch(
        saveUser(
          dummyOwner.id,
          dummyOwner.name,
          dummyOwner.email,
          dummyOwner.password,
          dummyOwner.role
        )
      );
    });
    const navigateElt = screen.queryByTestId("navigate");

    // Assert
    expect(navigateElt).toBeNull();
  });

  it("should display all the owner breweries", () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <OwnerBrewery />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );

    // Act
    act(() => {
      store.dispatch(
        saveUser(
          dummyOwner.id,
          dummyOwner.name,
          dummyOwner.email,
          dummyOwner.password,
          dummyOwner.role
        )
      );
      store.dispatch(saveBreweries(dummyBreweries));
    });
    const { user, brewery } = store.getState();
    const ownerBreweries = brewery.breweries?.filter(
      (brewery) => brewery.user_id === user.id
    );
    const listItemElements = screen.getAllByRole("listitem");

    // Assert
    expect(listItemElements).toHaveLength(ownerBreweries.length);
  });

  it("should display 'Aucune brasserie enregistrée.' if the brewer owns no brewery", () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <OwnerBrewery />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );

    // Act
    act(() => {
      store.dispatch(
        saveUser(
          dummyUser.id,
          dummyUser.name,
          dummyUser.email,
          dummyUser.password,
          dummyUser.role
        )
      );
      store.dispatch(saveBreweries(dummyBreweries));
    });
    const noBreweryMessage = screen.getByText(/Aucune brasserie enregistrée./i); // i --> case insensitive

    // Assert
    expect(noBreweryMessage).toBeInTheDocument();
  });

  it("should display the modal when we click on the button 'Supprimer' in a brewery card", async () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <OwnerBrewery />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );

    // Act
    act(() => {
      store.dispatch(
        saveUser(
          dummyOwner.id,
          dummyOwner.name,
          dummyOwner.email,
          dummyOwner.password,
          dummyOwner.role
        )
      );
      store.dispatch(saveBreweries(dummyBreweries));
    });
    const deleteButton = screen.getAllByText(/Supprimer/i);
    userEvent.click(deleteButton[0]);

    const modalTitle = await screen.findByText(/Suppression de la brasserie/i);
    const validateButton = await screen.findByText(/Valider/i);
    const CancelButton = await screen.findByText(/Annuler/i);

    // Assert
    expect(modalTitle).toBeInTheDocument();
    expect(validateButton).toBeInTheDocument();
    expect(CancelButton).toBeInTheDocument();
  });

  it("should 'Ajouter une Brasserie' link have the correct href attribute value", () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <OwnerBrewery />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );

    // Act
    const addLink = screen.getByRole("link", {
      name: /Ajouter une Brasserie/i,
    });

    // Assert
    expect(addLink).toHaveAttribute("href", "/brewery/breweryForm");
  });

  it("should 'Modifier' link on brewery card have the correct href attribute value", async () => {
    // Arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <OwnerBrewery />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );

    // Act
    store.dispatch(
      saveUser(
        dummyOwner.id,
        dummyOwner.name,
        dummyOwner.email,
        dummyOwner.password,
        dummyOwner.role
      )
    );
    store.dispatch(saveBreweries(dummyBreweries));

    const updateLink = await screen.findAllByRole("link", {
      name: /Modifier/i,
    });

    // Assert
    expect(updateLink[0]).toHaveAttribute(
      "href",
      `/brewery/breweryForm/${dummyBreweries[0].id}`
    );
  });
});
