const toCurrency = content => {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency'
  }).format(content)
}

document.querySelectorAll('.price').forEach(item => {
  item.textContent = toCurrency(item.textContent)
})

const $card = document.querySelector('#card')

if ($card) {
  $card.addEventListener('click', e => {
    const { id } = e.target.dataset
    if (id) {
      fetch('card/remove/' + id, {
        method: 'delete'
      }).then(res => res.json())
        .then(card => {
          if (card.courses.length) {
            const html = card.courses.map(item => {
              return `
                <tr>
                  <td>${item.title}</td>
                  <td>${item.count}</td>
                  <td>
                    <button class="btn btm-small" data-id=${item.id}>Удалить</button>
                  </td>
                </tr>
              `
            }).join('')
            $card.querySelector('tbody').innerHTML = html
            $card.querySelector('.price').textContent = toCurrency(card.price)
          } else {
            $card.innerHTML = '<p>Корзина пуста</p>'
          }
        })
    }
  })
}