document.querySelector('form').addEventListener('submit',
  (e) => {
    e.preventDefault()
    const elements = document.querySelectorAll('.required')
    let hasError = false
    const values = {}
    for (const element of elements) {
      let isValid = true
      const input = element.querySelector('.input-text')
      const radios = element.querySelectorAll('input[type=radio]')
      if (input) {
        values[input.name] = input.value
        if (!input.value) {
          isValid = false
        }
      } else if (radios.length) {
        if ([...radios].some((radio) => radio.checked)) {
          const check = element.querySelector('input[type=radio]:checked')
          values[check.name] = check.value
        } else {
          isValid = false
        }
      } else {
        continue
      }

      if (!isValid) {
        element.classList.remove('hide__data-error')
        hasError = true
      } else {
        element.classList.add('hide__data-error')
      }
    }

    if (!hasError) {
      const other = document.querySelector('input[name=other]')
      if (other.value) {
        values[other.name] = other.value
      }
      alert(JSON.stringify(values))
    }
  }
)
