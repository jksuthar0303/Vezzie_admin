// routes
import { PATH_PAGE } from '../../../routes/paths';
// config

// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="eva:home-fill" />,
    path: '/',
  },

  {
    title: 'Bikaneri Namkeens',
    icon: <Iconify icon="eva:book-open-fill" />,
    path: PATH_PAGE.bikaneriNamkeens,
  },
];

export default navConfig;
