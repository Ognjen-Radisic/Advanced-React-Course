import React, { useState, useReducer } from 'react'
import Modal from './Modal'
import { data } from '../../data'
// reducer function

const reducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const newPeople = [...state.people, action.payload]
    return {
      ...state,
      people: newPeople,
      isShowModal: true,
      modalContent: 'Item added',
    }
  }
  if (action.type === 'NO_VALUE') {
    return {
      ...state,
      isShowModal: true,
      modalContent: 'No input value',
    }
  }

  throw new Error('No matching action type')
}

const defaultState = {
  people: [],
  isShowModal: false,
  modalContent: '',
}

const Index = () => {
  const [name, setName] = useState('')
  const [state, dispatch] = useReducer(reducer, defaultState)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (name) {
      const newItem = { id: new Date().getTime().toString(), name }
      dispatch({ type: 'ADD_ITEM', payload: newItem })
    } else {
      dispatch({ type: 'NO_VALUE' })
    }
  }

  return (
    <>
      {state.isShowModal && <Modal modalContent={state.modalContent} />}
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
      {state.people.map((person) => {
        const { id, name } = person
        return (
          <div key={id}>
            <h4>{name}</h4>
          </div>
        )
      })}
    </>
  )
}

export default Index
