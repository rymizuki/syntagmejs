var flux = syntagme()

flux.reducer(function todoReducer (payload, previous) {
  previous || (previous = {})
  switch (payload.action.type) {
    case 'ADD_TODO':
      return Object.assign({}, previous, {
        items: (previous.items || []).concat([payload.action.item]),
        text: null,
      })
    case 'TOGGLE_TODO_STATE':
      var items = previous.items || []
      for (var i = 0; i < items.length; i++) {
        if (items[i].title == payload.action.item.title)
          items[i].done = !items[i].done
      }
      return Object.assign({}, previous, {
        items: items
      })
  }
})
flux.reducer(function textReducer (payload, previous) {
  previous || (previous = {})
  if (payload.action.type == 'INPUT_TEXT')
    return Object.assign({}, previous, { text: payload.action.text })
})

var ac = (function () {
  function add (text) {
    flux.ac('ADD_TODO', {item: {title: text}})
  }
  function edit (value) {
    flux.ac('INPUT_TEXT', {text: value})
  }
  function toggle (item) {
    flux.ac('TOGGLE_STATE', {item: item})
  }
  return { add: add, edit: edit, toggle: toggle, }
}())

<todo>
  <h3>{ opts.title }</h3>
  <ul>
    <li each={ items }>
      <label class={ completed: done }>
        <input type="checkbox" checked={ done } onclick={ parent.toggle }> { title }
      </label>
    </li>
  </ul>

  <form onsubmit={ add }>
    <input name="input" onkeyup={ edit }>
    <button disabled={ !text }>Add #{ items.length + 1 }</button>
  </form>

  <script>
    this.items = opts.items || []

    edit(e) {
      ac.edit(e.target.value)
    }

    add(e) {
      ac.add(this.text)
    }

    toggle(e) {
      ac.toggle(e.item)
      return true
    }

    onDispatch (state) {
      this.update(state)
    }

    flux.subscribe(this.onDispatch)

    this.on('update', function (data) {
      if (!this.text) {
        this.text = this.input.value = ''
      }
    })
  </script>
</todo>
