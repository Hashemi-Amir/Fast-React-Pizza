import { Form, useActionData, useNavigation } from 'react-router-dom';
import Button from '../../ui/Button';
import EmptyCart from '../cart/EmptyCart';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { getTotalPizzasPrice } from '../cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const { username } = useSelector((state) => state.user);
  const firstName = username.split(' ').at(0);

  const isSubmitting = useNavigation().state === 'submitting';

  const formErrors = useActionData();

  const cart = useSelector((state) => state.cart.cart);

  const totalCartPrice = useSelector(getTotalPizzasPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            defaultValue={firstName}
            className="input grow"
            type="text"
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className=" grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className=" ml-3 mt-1 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-400 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? 'Placing order...'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
