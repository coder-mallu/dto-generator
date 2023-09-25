import { Helmet } from 'react-helmet-async';
// sections
import DtoView from '../sections/dto/view/dto-view';

// ----------------------------------------------------------------------

export default function PaymentPage() {
  return (
    <>
      <Helmet>
        <title>DTO Generator</title>
      </Helmet>

      <DtoView />
    </>
  );
}
