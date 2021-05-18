import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
    product: Yup.string()
      .required('Please select a valid product'),
    customer: Yup.string().required('Please Customer is required').max(11),
    amount: Yup.number().required('Amount to Purchase is required'),
    note: Yup.string()
  });