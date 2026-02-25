import { createBrowserRouter } from 'react-router';
import LoginScreen from './screens/LoginScreen';
import TripSelectionScreen from './screens/TripSelectionScreen';
import TripDetailScreen from './screens/TripDetailScreen';
import SessionExpiredScreen from './screens/SessionExpiredScreen';
import UnauthorizedScreen from './screens/UnauthorizedScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LoginScreen,
  },
  {
    path: '/trips',
    Component: TripSelectionScreen,
  },
  {
    path: '/trip/:tripId',
    Component: TripDetailScreen,
  },
  {
    path: '/session-expired',
    Component: SessionExpiredScreen,
  },
  {
    path: '/unauthorized',
    Component: UnauthorizedScreen,
  },
]);
