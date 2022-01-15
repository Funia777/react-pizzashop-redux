export const setLoaded = (payload) => ({
  type: 'SET_LOADED',
  payload,
})

export const fetchPizzas = (sortBy, category) => (dispatch) => {
  dispatch(setLoaded(false))
  fetch(
    `  /pizzas?${category !== null ? `category=${category}` : ''}&_sort=${
      sortBy.type
    }&_order=${sortBy.order}`
  )
    .then((resp) => resp.json())
    .then((json) => dispatch(setPizzas(json)))
}

export const setPizzas = (items) => ({
  type: 'SET_PIZZAS',
  payload: items,
})
