const myId = '9e63fcbef5bfd8892bbb773a'
const root = document.querySelector('.root')
const formNew = document.forms.new
const formInfo = document.forms.info
const formPhoto = document.forms.userphoto
const deleteButtonElement = root.querySelector('.place-card__delete-icon')
const openFormButton = root.querySelector('.user-info__button')
const popUpForm = root.querySelector('.popup')
const popUpCloseButton = root.querySelector('.popup__close')
const popUpCloseEditButton = root.querySelector('.popup__close_edit')
const openEditButton = root.querySelector('.user-info__button_edit')
const popUpFormEdit = root.querySelector('.popup_edit')
const popUpFormPhoto = root.querySelector('.popup_photo')
const userName = root.querySelector('.user-info__name')
const userInfo = root.querySelector('.user-info__job')
const popUpEditSaveButton = root.querySelector('.popup__button_edit')
const popUpPhotoSaveButton = root.querySelector('.popup__button_photo')
const addButton = root.querySelector('.popup__button')
const popupImage = root.querySelector('.popup__image')
const placesList = root.querySelector('.places-list')
const userPhoto = root.querySelector('.user-info__photo')
const owner = {}

class Api {
  constructor (baseUrl, headers) {
    this.baseUrl = baseUrl
    this.headers = headers
  }

  getUserInfo () {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Что-то пошло не так ${res.status}`)
      })
  }

  patchUserInfo () {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: formInfo.elements.user.value,
        about: formInfo.elements.about.value
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status)
      })
  }

  patchUserPhoto (link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`)
      })
  }

  getUserPhoto () {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`)
      })
  }

  getInitialCards () {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.regect(`Ошибка ${res.status}`)
      })
  }

  postCard (name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status)
      })
  }

  delCard (cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status)
      })
  }

  likeCard (cardId, queryMethod) {
    return fetch(`${this.baseUrl}/cards/like/${cardId}`, {
      method: queryMethod,
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(res.status)
      })
  }

  // deleteLike (cardId) {
  //   return fetch(`${this.baseUrl}/cards/like/${cardId}`, {
  //     method: 'DELETE',
  //     headers: this.headers
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         return res.json()
  //       }
  //       return Promise.reject(res.status)
  //     })
  // }
}

const api = new Api(
  'http://95.216.175.5/cohort3',
  {
    authorization: '70f2226f-be57-4015-8706-b73d7a08cde1',
    'Content-Type': 'application/json'
  }
)

class Card {
  constructor (link, name, trash, cardId, likes) {
    this.remove = this.remove.bind(this)
    this.like = this.like.bind(this)
    this.name = name
    this.link = link
    this.trash = trash
    this.cardId = cardId
    this.likes = likes
    this.wasLikedPreviously = !!(likes.find(like => like._id === myId))
    this.cardElement = this.createCard(link, name)
    this.likeCounter = this.likes.length
    this.likeButton = this.cardElement
      .querySelector('.place-card__like-icon')
    this.likeButton
      .addEventListener('click', this.like)
    if (this.trash) {
      this.cardElement
        .querySelector('.place-card__delete-icon')
        .addEventListener('click', this.remove)
    }
  }

  createCard () {
    const placeCardElement = document.createElement('div')
    const cardImageElement = document.createElement('div')

    if (this.trash) {
      const deleteButtonElement = document.createElement('button')
      deleteButtonElement.classList.add('place-card__delete-icon')
      cardImageElement.appendChild(deleteButtonElement)
    }

    const cardDescriptionElement = document.createElement('div')
    const cardNameElement = document.createElement('h3')
    const likeCards = document.createElement('div')
    const likeButtonElement = document.createElement('button')
    const likeCountElement = document.createElement('p')

    placeCardElement.classList.add('place-card')
    placeCardElement.setAttribute('card-id', this.cardId)
    cardImageElement.classList.add('place-card__image')
    cardImageElement.style.backgroundImage = `url(${this.link})`
    likeCards.classList.add('place-card__like-cards')
    cardDescriptionElement.classList.add('place-card__description')
    cardNameElement.classList.add('place-card__name')
    cardNameElement.textContent = this.name
    likeButtonElement.classList.add('place-card__like-icon')
    if (this.wasLikedPreviously) {
      likeButtonElement.classList.add('place-card__like-icon_liked')
    }
    likeCountElement.classList.add('place-card__like-count')

    placeCardElement.appendChild(cardImageElement)
    placeCardElement.appendChild(cardDescriptionElement)
    cardDescriptionElement.appendChild(cardNameElement)
    cardDescriptionElement.appendChild(likeCards)
    likeCards.appendChild(likeButtonElement)
    likeCards.appendChild(likeCountElement)
    likeCountElement.textContent = this.likes.length
    return placeCardElement
  }

  like (event) {
    if (!this.likeButton.classList.contains('place-card__like-icon_liked')) {
      api.likeCard(this.cardId,'PUT')
        .then(data => {
          this.likeCounter += 1
          this.cardElement
            .querySelector('.place-card__like-count').textContent = (this.likeCounter)
          this.likeButton.classList.add('place-card__like-icon_liked')
        })
        .catch(err => {
          console.log(`Ошибка: ${err}`)
        })
    } else {
      api.likeCard(this.cardId,'DELETE')
        .then(data => {
          this.likeCounter -= 1
          this.cardElement
            .querySelector('.place-card__like-count').textContent = (this.likeCounter)
          this.likeButton.classList.remove('place-card__like-icon_liked')
        })
        .catch(err => {
          console.log(`Ошибка: ${err}`)
        })
    }
  }

  remove (event) {
    const question = confirm('Вы действительно хотите удалить эту карточку?')
    if (question) {
      api.delCard(this.cardId)
        .then(data => {
          event.target.closest('.place-card').remove()
        })
        .catch(err => {
          console.log(`Ошибка: ${err}`)
        })
    }
  }
}

class CardList {
  constructor (container, initialCards, amIOwner) {
    this.container = container
    this.initialCards = initialCards
    this.amIOwner = amIOwner
  }

  render () {
    this.initialCards.forEach(({ name, link, owner, _id, likes }) => {
      if (this.amIOwner._id == owner._id) {
        this.trash = true
      } else {
        this.trash = false
      }
      this.addCard(link, name, this.trash, _id, likes)
    })
  }

  addCard (image, name, trash, _id, likes) {
    const { cardElement } = new Card(image, name, trash, _id, likes)
    this.container.appendChild(cardElement)
  }
}

class Popup {
  constructor (container) {
    this.container = document.querySelector(container)
    this.open()
    this.container
      .querySelector('.popup__close')
      .addEventListener('click', this.close)
  }

  open () {
    this.container.classList.add('popup_is-opened')
  }

  close (event) {
    event.target.closest('.popup').classList.remove('popup_is-opened')
  }
}

function addButtonActive () {
  addButton.removeAttribute('disabled')
  addButton.classList.remove('popup__button_disabled')
}

function addButtonDisabled () {
  const addButton = root.querySelector('.popup__button')
  addButton.setAttribute('disabled', true)
  addButton.classList.add('popup__button_disabled')
}

function openForm (event) {
  document.querySelector('.error-name').textContent = ''
  document.querySelector('.error-link').textContent = ''
  addButtonDisabled()
  new Popup('.popup_card')
}

function openFormEdit (event) {
  const user = formInfo.elements.user
  const about = formInfo.elements.about
  document.querySelector('.error-user').textContent = ''
  document.querySelector('.error-about').textContent = ''
  user.value = userName.textContent
  about.value = userInfo.textContent
  new Popup('.popup_edit')
}

function openFormPhoto (event) {
  document.querySelector('.error-photo').textContent = ''
  new Popup('.popup_photo')
}

function addImg (event) {
  if (event.target.classList.contains('place-card__image')) {
    const image = event.target.style.backgroundImage
    const imgString = image.slice(5, length - 2)
    popupImage.setAttribute('src', imgString)
    new Popup('.popup_img')
  }
}

function closeForm () {
  popUpForm.classList.remove('popup_is-opened')
}

function closeEdit () {
  popUpFormEdit.classList.remove('popup_is-opened')
}

function closePhoto () {
  popUpFormPhoto.classList.remove('popup_is-opened')
}

function closeCard () {
  root.removeChild(event.target.closest('.popup_img'))
}

function isValidLenght (length, errorMessage) {
  if (length === 0) {
    document.querySelector(errorMessage).textContent = 'Это обязательное поле'
  } else if (length < 2 || length > 30) {
    document.querySelector(errorMessage).textContent =
      'Должно быть от 2 до 30 символов'
  } else {
    document.querySelector(errorMessage).textContent = ''
    return true
  }
  return false
}

function isValidLink (link, errorMessage) {
  if (link.value.length === 0) {
    document.querySelector(errorMessage).textContent = 'Это обязательное поле'
  } else if (!link.validity.valid) {
    document.querySelector(errorMessage).textContent =
      'Здесь должна быть ссылка'
  } else {
    document.querySelector(errorMessage).textContent = ''
    return true
  }
  return false
}

function handleValidateCard (event) {
  const form = event.currentTarget
  const name = form.elements.name
  const link = form.elements.link

  addButtonDisabled()

  const validName = isValidLenght(name.value.length, '.error-name')
  const validLink = isValidLink(link, '.error-link')

  if (validName && validLink) {
    addButtonActive()
  }
}

function handleValidatePhoto (event) {
  const form = event.currentTarget
  const photo = formPhoto.elements.photo

  popUpPhotoSaveButton.setAttribute('disabled', true)
  popUpPhotoSaveButton.classList.add('popup__button_disabled')

  const validPhoto = isValidLink(photo, '.error-photo')

  if (validPhoto) {
    popUpPhotoSaveButton.removeAttribute('disabled')
    popUpPhotoSaveButton.classList.remove('popup__button_disabled')
  }
}

function handleValidateInfo (event) {
  const user = formInfo.elements.user
  const about = formInfo.elements.about
  const form = event.currentTarget

  popUpEditSaveButton.setAttribute('disabled', true)
  popUpEditSaveButton.classList.add('popup__button_disabled')

  const validName = isValidLenght(user.value.length, '.error-user')
  const validInfo = isValidLenght(about.value.length, '.error-about')

  if (validName && validInfo) {
    popUpEditSaveButton.removeAttribute('disabled')
    popUpEditSaveButton.classList.remove('popup__button_disabled')
  }
}

function renderLoadingInfo (isLoading) {
  if (isLoading) {
    popUpEditSaveButton.textContent = 'Загрузка...'
  } else {
    popUpEditSaveButton.textContent = 'Сохранить'
  }
}

function renderLoadingCard (isLoading) {
  if (isLoading) {
    addButton.textContent = 'Загрузка...'
  } else {
    addButton.textContent = 'Сохранить'
  }
}

function renderLoadingPhoto (isLoading) {
  if (isLoading) {
    popUpPhotoSaveButton.textContent = 'Загрузка...'
  } else {
    popUpPhotoSaveButton.textContent = 'Сохранить'
  }
}

const cardList = new CardList(document.querySelector('.places-list'), [], owner)

function newCard (event) {
  event.preventDefault()
  renderLoadingCard(true)
  api.postCard(formNew.elements.name.value, formNew.elements.link.value)
    .then((data) => {
      cardList.addCard(formNew.elements.link.value, formNew.elements.name.value, true)
      formNew.reset()
      addButtonDisabled()
      closeForm()
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      renderLoadingCard(false)
    })
}

function newInfo (event) {
  event.preventDefault()
  renderLoadingInfo(true)
  api.patchUserInfo()
    .then((data) => {
      userName.textContent = formInfo.elements.user.value
      userInfo.textContent = formInfo.elements.about.value
      closeEdit()
    })
    .catch(err => {
      cosole.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      renderLoadingInfo(false)
    })
}

api.getInitialCards().then(data => {
  const cardList = new CardList(document.querySelector('.places-list'), data, owner)
  cardList.render()
  console.log(data)
})

api.getUserInfo()
  .then(data => {
    Object.assign(owner, data)
    userName.textContent = data.name
    userInfo.textContent = data.about
  })
  .catch(err => {
    console.log(`Ошибка: ${err}`)
  })

function newPhoto (event) {
  event.preventDefault()
  renderLoadingPhoto(true)
  api.patchUserPhoto(formPhoto.elements.photo.value)
    .then(data => {
      userPhoto.style.backgroundImage = `url(${formPhoto.elements.photo.value})`
      closePhoto()
      formPhoto.elements.photo.value = ''
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      renderLoadingPhoto(false)
    })
}

api.getUserPhoto()
  .then(data => {
    userPhoto.style.backgroundImage = `url(${data.avatar})`
  })
  .catch(err => {
    console.log(`Ошибка: ${err}`)
  })

formNew.addEventListener('submit', newCard)
openFormButton.addEventListener('click', openForm)
popUpCloseButton.addEventListener('click', closeForm)

openEditButton.addEventListener('click', openFormEdit)
popUpCloseEditButton.addEventListener('click', closeEdit)
formInfo.addEventListener('input', handleValidateInfo)
formNew.addEventListener('input', handleValidateCard)
formPhoto.addEventListener('input', handleValidatePhoto)
formInfo.addEventListener('submit', newInfo)
placesList.addEventListener('click', addImg)
userPhoto.addEventListener('click', openFormPhoto)
formPhoto.addEventListener('click', newPhoto)
