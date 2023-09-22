import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import Header from './Header';
import LoaderIndicator from './LoaderIndicator';

function AppLayout() {
  const isLoading = useNavigation().state === 'loading';

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] ">
      {isLoading && <LoaderIndicator />}

      <Header />

      <div className="overflow-auto">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
