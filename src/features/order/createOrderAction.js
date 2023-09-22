import { redirect } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import store from '../../store';
import { clearCart } from '../cart/cartSlice';

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export async function createOrderAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const formErrors = {};

  if (!isValidPhone(order.phone))
    formErrors.phone = 'type a valid phone number';

  if (Object.entries(formErrors).length > 0) return formErrors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}
