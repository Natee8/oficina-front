import * as yup from 'yup';

export const stepTwoOsSchema = yup.object().shape({
  pecas: yup
    .array()
    .of(
      yup.object().shape({
        nome: yup.string().required('Informe o nome da peça'),
        quantidade: yup
          .number()
          .typeError('Quantidade inválida')
          .required('Informe a quantidade')
          .min(1, 'Quantidade deve ser maior que 0'),
        valorUnitario: yup
          .number()
          .typeError('Valor inválido')
          .required('Informe o valor unitário')
          .min(0, 'Valor não pode ser negativo'),
      }),
    )
    .min(1, 'Adicione pelo menos uma peça'),
});
