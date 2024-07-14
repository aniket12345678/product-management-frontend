import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import * as productSlice from './app/slice/product.slice';
import Home from './app/page/Home'
import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
const middlewares = [createAsyncThunk];
const mockStore = configureStore(middlewares);


jest.mock('react-data-table-component', () => ({
  __esModule: true,
  default: (props) => (
    <div data-testid="data-table">
      {props.columns.map((col) => (
        <div key={col.name}>{col.name}</div>
      ))}
      {props.data.map((item, index) => (
        <div key={index}>{item.product}</div>
      ))}
    </div>
  ),
}));

jest.mock('moment', () => {
  const moment = jest.requireActual('moment');
  return () => moment('2023-01-01');
});

jest.mock('./app/components/product/AddUpdateModal', () => (props) => (
  <div data-testid="add-update-modal">
    {props.show && <div>Modal is Open</div>}
    <button onClick={() => props.onSubmit({}, jest.fn(), jest.fn())}>Submit</button>
    <button onClick={() => props.handleClose()}>Close</button>
  </div>
));


describe('Home Component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      productSlice: {
        findAll: [
          { id: 1, product: 'Product 1', price: '10', creation_date: '2023-01-01' },
          { id: 2, product: 'Product 2', price: '20', creation_date: '2023-01-02' },
        ],
        filteredFindAll: [
          { id: 1, product: 'Product 1', price: '10', creation_date: '2023-01-01' },
          { id: 2, product: 'Product 2', price: '20', creation_date: '2023-01-02' },
        ],
      },
    });

    jest.spyOn(store, 'dispatch');
  });

  test('renders Home component', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText('Add')).toBeInTheDocument();
    expect(screen.getByText('Reset date')).toBeInTheDocument();
    expect(screen.getByTestId('data-table')).toBeInTheDocument();
  });

  test('opens AddUpdateModal when Add button is clicked', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByTestId('add-update-modal')).toHaveTextContent('Modal is Open');
  });

  test('closes AddUpdateModal when Close button is clicked', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    fireEvent.click(screen.getByText('Add'));
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByText('Modal is Open')).not.toBeInTheDocument();
  });

  test('calls productFindAll on component mount', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith(productSlice.productFindAll());
  });

  test('calls productFilter on date change', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2023-01-01' } });
    fireEvent.change(screen.getByLabelText(/End Date/i), { target: { value: '2023-12-31' } });

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(productSlice.productFilter(expect.any(Array)));
    });
  });

  test('searches products when input changes', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'Product 1' } });

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(productSlice.productFilter(expect.any(Array)));
    });
  });

  test('calls handleFormSubmit on form submission', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    fireEvent.click(screen.getByText('Add'));
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
