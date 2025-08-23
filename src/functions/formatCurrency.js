function formatCurrencyBR(value) {
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export { formatCurrencyBR }
