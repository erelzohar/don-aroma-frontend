import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './Components/LayoutArea/Layout/Layout';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import { LocalizationProvider } from '@mui/x-date-pickers';
import 'dayjs/locale/he';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
      <Layout />
    </LocalizationProvider>
  </Provider>
);
